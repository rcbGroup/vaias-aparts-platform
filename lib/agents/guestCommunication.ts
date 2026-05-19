/**
 * VAIA OS — Guest Communication Agent (Agent 1).
 *
 * Single source of truth for outbound guest messaging across the full booking
 * lifecycle. The cron worker calls {@link runGuestCommunicationAgent} every
 * 15 minutes; the agent scans confirmed bookings, picks the templates that
 * are due, renders them in the right language(s) and dispatches via WhatsApp
 * (Twilio) + email (Resend), logging every send to MessageSent and
 * GuestMessage so the admin dashboard can show progress.
 *
 * Master-prompt rules enforced here:
 *   • Gate code 0623# IS allowed in messages.
 *   • The door / key-box code is NEVER allowed in messages — verbal only.
 *   • No quiet hours — the agent runs 24/7/365.
 *   • Romanian-only for +40 numbers; RO + EN + native language otherwise.
 *   • Every message ends with "Echipa Vaias Aparts".
 *   • Review requests use platform sets specific to the booking source and
 *     mention the multi-platform raffle.
 *   • Each (booking, templateKey) is sent at most once — idempotent.
 */

import { prisma } from "@/lib/prisma";
import {
  detectGuestLanguages,
  type Language,
} from "@/lib/guest-journey/languageDetection";
import {
  CITY_TAX_PER_ADULT_PER_NIGHT,
  containsBannedSecrets,
  renderTemplate,
  type TemplateKey,
  type TemplateVars,
} from "@/lib/guest-journey/messageTemplates";
import {
  renderReviewLinksBlock,
  type BookingSource,
} from "@/lib/guest-journey/reviewRequests";
import type { Booking } from "@prisma/client";

// ---------------------------------------------------------------------------
// Identity (consumed by the agent registry / autopilot UI)
// ---------------------------------------------------------------------------

export const GUEST_COMMS_AGENT_ID = "guest-communication" as const;
export const GUEST_COMMS_AGENT_NUMERIC_ID = 9 as const;

export const GUEST_COMMS_AGENT_META = {
  id: GUEST_COMMS_AGENT_ID,
  numericId: GUEST_COMMS_AGENT_NUMERIC_ID,
  name: "Guest Communication Agent",
  description:
    "Handles every outbound guest message — confirmations, pre-arrival info, " +
    "in-stay touchpoints, departure procedure, and review requests. Operates " +
    "24/7/365, never sends the door code, never breaks language rules.",
  icon: "💬",
  color: "bg-emerald-700",
  systemPrompt:
    `You are the Vila Vaias Aparts Guest Communication Agent. ` +
    `You message every guest from booking to post-stay review across six ` +
    `scenarios (Standard 9-msg, Same-day 4-msg, One-night 4-msg, Returning, ` +
    `Group/full villa, International multilingual). ` +
    `ALWAYS sign as "Echipa Vaias Aparts". ` +
    `The vehicle gate code 0623# IS allowed in messages. The door / key-box ` +
    `code is NEVER sent — it is delivered verbally on arrival only. ` +
    `Language: +40 phone numbers receive Romanian only. All other guests ` +
    `receive Romanian + English + their native language (when supported). ` +
    `City tax is ${CITY_TAX_PER_ADULT_PER_NIGHT} lei/adult/night. Key return: ` +
    `brown metal post box on the ground floor, next to Bucătăria pentru Toți, ` +
    `under Apartment 2. WiFi: Vaias Aparts / VaiasAparts. ` +
    `Operate 24/7/365 — there are no quiet hours for this agent.`,
} as const;

// ---------------------------------------------------------------------------
// Scenario classification
// ---------------------------------------------------------------------------

export type Scenario = "A" | "B" | "C" | "D" | "E" | "F";

export type ScenarioPlan = {
  scenario: Scenario;
  templates: TemplateKey[];
};

const SCENARIO_A_TEMPLATES: TemplateKey[] = [
  "A1_booking_confirmed",
  "A2_week_before",
  "A3_three_days",
  "A4_day_before",
  "A5_arrival_morning",
  "A6_post_checkin",
  "A7_mid_stay",
  "A8_checkout_morning",
  "A9_post_stay_review",
];

const SCENARIO_B_TEMPLATES: TemplateKey[] = [
  "B1_lastminute_confirmed",
  "B2_arrival_imminent",
  "B3_post_checkin",
  "B4_post_stay_review",
];

const SCENARIO_C_TEMPLATES: TemplateKey[] = [
  "C1_booking_confirmed",
  "C2_arrival_morning",
  "C3_post_checkin",
  "C4_post_stay_review",
];

// D/E/F are layered on top of A/B/C (returning, group, intl) rather than
// replacing them — but we still emit a dedicated first-touch from those keys.

export function classifyBookingScenario(booking: {
  checkIn: Date;
  checkOut: Date;
  nights: number;
  createdAt: Date;
  adults: number;
  children: number;
  guestId?: number | null;
  apartmentId?: number;
  previousVisits?: number;
  groupSize?: number;
  guestPhone: string;
}): ScenarioPlan {
  const hoursToCheckIn =
    (booking.checkIn.getTime() - booking.createdAt.getTime()) / 3_600_000;

  // E — group / full villa (5 or more guests OR booking spans multiple
  // apartments at once, signalled by groupSize > apartment capacity).
  if (
    (booking.groupSize ?? booking.adults + booking.children) >= 10 ||
    (booking.groupSize ?? 0) >= 5 && (booking.groupSize ?? 0) === (booking.adults + booking.children)
  ) {
    return { scenario: "E", templates: ["E1_group_coordinator", ...SCENARIO_A_TEMPLATES] };
  }

  // D — returning guest (CRM has > 0 prior visits).
  if ((booking.previousVisits ?? 0) > 0) {
    return { scenario: "D", templates: ["D1_returning_welcome_back", ...SCENARIO_A_TEMPLATES] };
  }

  // F — international / non-Romanian phone, get the multilingual welcome on
  // top of the standard journey.
  const isInternational = !/^(\+?40|0)/.test(booking.guestPhone.replace(/\s/g, ""));
  if (isInternational && booking.nights > 1 && hoursToCheckIn > 36) {
    return { scenario: "F", templates: ["F1_intl_pre_arrival", ...SCENARIO_A_TEMPLATES] };
  }

  // C — one-night stay.
  if (booking.nights <= 1) {
    return { scenario: "C", templates: SCENARIO_C_TEMPLATES };
  }

  // B — same-day / last-minute (≤ 36h between booking and arrival).
  if (hoursToCheckIn <= 36) {
    return { scenario: "B", templates: SCENARIO_B_TEMPLATES };
  }

  // A — standard reservation.
  return { scenario: "A", templates: SCENARIO_A_TEMPLATES };
}

// ---------------------------------------------------------------------------
// Schedule rules
// ---------------------------------------------------------------------------

/**
 * Returns the scheduled UTC moment a given template should be dispatched for
 * a booking, or null if the template does not have a calendar-based trigger
 * (e.g. it is sent immediately on booking creation by the booking webhook).
 *
 * All offsets are evaluated against check-in / check-out as UTC dates; the
 * cron picks templates whose due time is in the past.
 */
export function scheduledFor(
  key: TemplateKey,
  booking: { checkIn: Date; checkOut: Date; createdAt: Date },
): Date {
  const checkIn = booking.checkIn;
  const checkOut = booking.checkOut;
  const created = booking.createdAt;

  const dayBefore = (d: Date, days: number, hour: number) => {
    const out = new Date(d);
    out.setUTCDate(out.getUTCDate() - days);
    out.setUTCHours(hour - 3, 0, 0, 0); // Romania is UTC+2/UTC+3 → 10:00 local ≈ 07:00 UTC
    return out;
  };
  const dayAfter = (d: Date, days: number, hour: number) => {
    const out = new Date(d);
    out.setUTCDate(out.getUTCDate() + days);
    out.setUTCHours(hour - 3, 0, 0, 0);
    return out;
  };

  switch (key) {
    // Confirmations are due immediately on booking creation.
    case "A1_booking_confirmed":
    case "B1_lastminute_confirmed":
    case "C1_booking_confirmed":
    case "D1_returning_welcome_back":
    case "E1_group_coordinator":
    case "F1_intl_pre_arrival":
      return created;

    // Standard journey schedule.
    case "A2_week_before":
      return dayBefore(checkIn, 7, 10);
    case "A3_three_days":
      return dayBefore(checkIn, 3, 10);
    case "A4_day_before":
      return dayBefore(checkIn, 1, 17); // 17:00 local
    case "A5_arrival_morning":
    case "C2_arrival_morning":
      return dayBefore(checkIn, 0, 9); // 09:00 local on arrival day
    case "A6_post_checkin":
    case "B3_post_checkin":
    case "C3_post_checkin": {
      // 3h after standard check-in (14:00 local) → 17:00 local
      const arr = new Date(checkIn);
      arr.setUTCHours(14, 0, 0, 0);
      return new Date(arr.getTime() + 3 * 3600 * 1000);
    }
    case "A7_mid_stay": {
      // Halfway through the stay, 11:00 local.
      const midMs = (checkIn.getTime() + checkOut.getTime()) / 2;
      const mid = new Date(midMs);
      mid.setUTCHours(8, 0, 0, 0);
      return mid;
    }
    case "A8_checkout_morning":
      return dayBefore(checkOut, 0, 9);

    // Review requests — sent the morning AFTER check-out at 10:00 local.
    case "A9_post_stay_review":
    case "B4_post_stay_review":
    case "C4_post_stay_review":
      return dayAfter(checkOut, 1, 10);

    // Last-minute "ETA confirmation" — 2h before scheduled check-in window.
    case "B2_arrival_imminent": {
      const arr = new Date(checkIn);
      arr.setUTCHours(11, 0, 0, 0); // 14:00 local = 11:00 UTC (summer)
      return arr;
    }
  }
}

// ---------------------------------------------------------------------------
// Channel preference
// ---------------------------------------------------------------------------

export type Channel = "whatsapp" | "email";

export function pickChannel(booking: {
  guestPhone: string;
  guestEmail?: string | null;
}): Channel {
  // WhatsApp first if we have a phone, otherwise email fallback.
  return booking.guestPhone?.trim() ? "whatsapp" : "email";
}

// ---------------------------------------------------------------------------
// Send guards
// ---------------------------------------------------------------------------

/**
 * Final guardrail before any send. Catches the door-code, blank bodies and
 * over-length WhatsApp payloads. Returns null on success, an error string
 * on rejection.
 */
function validateBody(body: string, channel: Channel): string | null {
  if (!body || body.trim().length < 40) return "body too short";
  if (containsBannedSecrets(body)) return "body contained banned secret pattern";
  // WhatsApp body limit is 1600 chars per template message — we soft-cap at
  // 3500 to allow multi-language stacks but keep email-only ones safe.
  if (channel === "whatsapp" && body.length > 3500) return "whatsapp body too long";
  return null;
}

// ---------------------------------------------------------------------------
// Dispatch — WhatsApp + email
// ---------------------------------------------------------------------------

type DispatchOutcome = {
  ok: boolean;
  providerId?: string;
  error?: string;
};

async function sendWhatsApp(to: string, body: string): Promise<DispatchOutcome> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!accountSid || !authToken || !from) {
    return { ok: false, error: "twilio credentials missing" };
  }
  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const params = new URLSearchParams({
      From: `whatsapp:${from}`,
      To: `whatsapp:${to}`,
      Body: body,
    });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `twilio http ${res.status}: ${text.slice(0, 200)}` };
    }
    const json = (await res.json().catch(() => ({}))) as { sid?: string };
    return { ok: true, providerId: json.sid };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

async function sendEmail(
  to: string,
  subject: string,
  body: string,
): Promise<DispatchOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "resend api key missing" };
  try {
    const html = bodyToEmailHtml(body);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vila Vaias Aparts <contact@vaiasaparts.ro>",
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `resend http ${res.status}: ${text.slice(0, 200)}` };
    }
    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, providerId: json.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

function bodyToEmailHtml(body: string): string {
  // WhatsApp uses *bold* — convert and preserve newlines for HTML.
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const withBold = escaped.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
  const withLineBreaks = withBold.replace(/\n/g, "<br/>");
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; background:#fdfcf7; padding:24px; border:1px solid #e8e3d8; border-radius:12px; color:#1a2820; line-height:1.55">
      ${withLineBreaks}
    </div>
  `;
}

function emailSubject(key: TemplateKey, apartment: string): string {
  switch (key) {
    case "A1_booking_confirmed":
    case "B1_lastminute_confirmed":
    case "C1_booking_confirmed":
      return `Confirmare rezervare — ${apartment} | Booking confirmed`;
    case "A2_week_before":
      return `Bun venit într-o săptămână — ${apartment}`;
    case "A3_three_days":
      return `Informații pentru check-in — ${apartment}`;
    case "A4_day_before":
      return `Mâine ne vedem — ${apartment}`;
    case "A5_arrival_morning":
    case "C2_arrival_morning":
      return `Astăzi sunteți așteptat — ${apartment}`;
    case "A6_post_checkin":
    case "B3_post_checkin":
    case "C3_post_checkin":
      return `Tot ce trebuie să știți pentru sejur — ${apartment}`;
    case "A7_mid_stay":
      return `Idei pentru sejurul dumneavoastră — ${apartment}`;
    case "A8_checkout_morning":
      return `Plecare astăzi — ${apartment}`;
    case "A9_post_stay_review":
    case "B4_post_stay_review":
    case "C4_post_stay_review":
      return `Mulțumim de vizită — vă rugăm să ne lăsați o recenzie`;
    case "D1_returning_welcome_back":
      return `Bine ați revenit la Vila Vaias Aparts`;
    case "E1_group_coordinator":
      return `Coordonare grup — Vila Vaias Aparts`;
    case "B2_arrival_imminent":
      return `Sunteți așteptat — instrucțiuni de sosire`;
    case "F1_intl_pre_arrival":
      return `Welcome to Vila Vaias Aparts — arrival info`;
  }
}

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

async function alreadySent(bookingRef: string, key: TemplateKey): Promise<boolean> {
  try {
    const row = await prisma.messageSent.findFirst({
      where: {
        bookingRef,
        templateKey: key,
        status: { in: ["sent", "queued"] },
      },
      select: { id: true },
    });
    return !!row;
  } catch {
    // If the table query fails (e.g. schema not migrated yet) we conservatively
    // assume the message was already sent so we don't spam guests.
    return true;
  }
}

// ---------------------------------------------------------------------------
// Per-booking dispatch
// ---------------------------------------------------------------------------

type LoadedBooking = Booking & {
  apartment: { id: number; name: string; slug: string; floor: string };
  guest: { id: number; visits: number; firstName: string; lastName: string } | null;
};

async function loadDueBookings(now: Date): Promise<LoadedBooking[]> {
  // Window: any active booking from 8 days before check-in to 3 days after
  // check-out (covers all template triggers).
  const lower = new Date(now.getTime() - 3 * 86_400_000);
  const upper = new Date(now.getTime() + 8 * 86_400_000);

  const rows = await prisma.booking.findMany({
    where: {
      checkIn: { lte: upper },
      checkOut: { gte: lower },
      status: { in: ["CONFIRMED", "PAID"] },
    },
    include: {
      apartment: { select: { id: true, name: true, slug: true, floor: true } },
      guest: { select: { id: true, visits: true, firstName: true, lastName: true } },
    },
    orderBy: { checkIn: "asc" },
    take: 250,
  });

  return rows as LoadedBooking[];
}

function buildVars(b: LoadedBooking): TemplateVars {
  const adults = Math.max(1, b.adults);
  const nights = Math.max(1, b.nights);
  return {
    guestName: b.guestName.split(/\s+/)[0] || b.guestName,
    apartmentName: b.apartment.name,
    apartmentFloor: b.apartment.floor,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    nights,
    adults,
    children: b.children,
    cityTaxTotal: adults * nights * CITY_TAX_PER_ADULT_PER_NIGHT,
    source: b.source,
    previousVisits: b.guest?.visits ?? 0,
  };
}

export type DispatchPlan = {
  bookingRef: string;
  templateKey: TemplateKey;
  scenario: Scenario;
  channel: Channel;
  languages: Language[];
  scheduledFor: Date;
  preview: string;
};

export type DispatchOutcomeRecord = DispatchPlan & {
  status: "sent" | "skipped" | "error";
  providerId?: string;
  error?: string;
};

async function dispatchOne(
  booking: LoadedBooking,
  key: TemplateKey,
  languages: Language[],
  channel: Channel,
  vars: TemplateVars,
  scenario: Scenario,
  dryRun: boolean,
): Promise<DispatchOutcomeRecord> {
  // Build review-link block lazily for review templates.
  let renderVars: TemplateVars = vars;
  if (
    key === "A9_post_stay_review" ||
    key === "B4_post_stay_review" ||
    key === "C4_post_stay_review"
  ) {
    renderVars = {
      ...vars,
      reviewLinksBlock: renderReviewLinksBlock(booking.source as BookingSource, languages),
    };
  }

  const body = renderTemplate(key, renderVars, languages);
  const guard = validateBody(body, channel);
  const plan: DispatchPlan = {
    bookingRef: booking.bookingRef,
    templateKey: key,
    scenario,
    channel,
    languages,
    scheduledFor: scheduledFor(key, booking),
    preview: body,
  };

  if (guard) {
    await persistAttempt(booking, key, languages, channel, body, "skipped", guard);
    return { ...plan, status: "skipped", error: guard };
  }
  if (dryRun) {
    return { ...plan, status: "skipped", error: "dryRun" };
  }

  let outcome: DispatchOutcome;
  if (channel === "whatsapp") {
    outcome = await sendWhatsApp(booking.guestPhone, body);
    if (!outcome.ok && booking.guestEmail) {
      // Fall back to email if WhatsApp credentials are missing or send failed.
      outcome = await sendEmail(booking.guestEmail, emailSubject(key, booking.apartment.name), body);
      if (outcome.ok) {
        await persistAttempt(booking, key, languages, "email", body, "sent", undefined, outcome.providerId);
        return { ...plan, channel: "email", status: "sent", providerId: outcome.providerId };
      }
    }
  } else {
    outcome = await sendEmail(
      booking.guestEmail ?? "",
      emailSubject(key, booking.apartment.name),
      body,
    );
  }

  if (outcome.ok) {
    await persistAttempt(booking, key, languages, channel, body, "sent", undefined, outcome.providerId);
    return { ...plan, status: "sent", providerId: outcome.providerId };
  }
  await persistAttempt(booking, key, languages, channel, body, "error", outcome.error);
  return { ...plan, status: "error", error: outcome.error };
}

async function persistAttempt(
  booking: LoadedBooking,
  key: TemplateKey,
  languages: Language[],
  channel: Channel,
  content: string,
  status: "sent" | "skipped" | "error",
  errorMessage?: string,
  providerId?: string,
): Promise<void> {
  try {
    await prisma.messageSent.create({
      data: {
        bookingRef: booking.bookingRef,
        guestName: booking.guestName,
        guestPhone: booking.guestPhone,
        guestEmail: booking.guestEmail ?? null,
        apartment: booking.apartment.name,
        templateKey: key,
        language: languages.join("+"),
        channel,
        content,
        status,
        delivered: status === "sent",
        deliveredAt: status === "sent" ? new Date() : null,
        providerId: providerId ?? null,
        errorMessage: errorMessage ?? null,
      },
    });
  } catch (err) {
    console.warn("[guestComms] failed to persist MessageSent:", err);
  }

  if (status === "sent" && booking.guestId) {
    try {
      await prisma.guestMessage.create({
        data: {
          bookingId: booking.id,
          guestId: booking.guestId,
          direction: "OUTBOUND",
          channel,
          content,
          delivered: true,
        },
      });
    } catch {
      /* non-fatal */
    }
  }
}

// ---------------------------------------------------------------------------
// Public API — single run
// ---------------------------------------------------------------------------

export type GuestCommsRunOptions = {
  /** Run without dispatching — useful for previewing in the admin UI. */
  dryRun?: boolean;
  /** Override "now" — primarily for tests. */
  now?: Date;
  /** Only process a single booking ref. */
  bookingRef?: string;
  /** Only emit a single template key for a booking. */
  templateKey?: TemplateKey;
};

export type GuestCommsRunResult = {
  scannedBookings: number;
  duePlans: DispatchPlan[];
  outcomes: DispatchOutcomeRecord[];
  summary: string;
};

export async function runGuestCommunicationAgent(
  opts: GuestCommsRunOptions = {},
): Promise<GuestCommsRunResult> {
  const now = opts.now ?? new Date();
  const bookings = opts.bookingRef
    ? ((await prisma.booking.findMany({
        where: { bookingRef: opts.bookingRef },
        include: {
          apartment: { select: { id: true, name: true, slug: true, floor: true } },
          guest: { select: { id: true, visits: true, firstName: true, lastName: true } },
        },
      })) as LoadedBooking[])
    : await loadDueBookings(now);

  const outcomes: DispatchOutcomeRecord[] = [];
  const duePlans: DispatchPlan[] = [];

  for (const booking of bookings) {
    const plan = classifyBookingScenario({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: booking.nights,
      createdAt: booking.createdAt,
      adults: booking.adults,
      children: booking.children,
      guestId: booking.guestId,
      apartmentId: booking.apartmentId,
      previousVisits: booking.guest?.visits ?? 0,
      groupSize: booking.adults + booking.children,
      guestPhone: booking.guestPhone,
    });

    const languages = detectGuestLanguages(booking.guestPhone);
    const channel = pickChannel(booking);
    const vars = buildVars(booking);

    for (const key of plan.templates) {
      if (opts.templateKey && opts.templateKey !== key) continue;

      const due = scheduledFor(key, booking);
      if (due > now) continue; // not yet — pick up on a future tick
      if (await alreadySent(booking.bookingRef, key)) continue;

      duePlans.push({
        bookingRef: booking.bookingRef,
        templateKey: key,
        scenario: plan.scenario,
        channel,
        languages,
        scheduledFor: due,
        preview: renderTemplate(key, vars, languages),
      });

      const outcome = await dispatchOne(
        booking,
        key,
        languages,
        channel,
        vars,
        plan.scenario,
        Boolean(opts.dryRun),
      );
      outcomes.push(outcome);
    }
  }

  const sent = outcomes.filter((o) => o.status === "sent").length;
  const errors = outcomes.filter((o) => o.status === "error").length;
  const skipped = outcomes.filter((o) => o.status === "skipped").length;

  return {
    scannedBookings: bookings.length,
    duePlans,
    outcomes,
    summary: `Scanned ${bookings.length} bookings · ${sent} sent · ${skipped} skipped · ${errors} errors`,
  };
}

// ---------------------------------------------------------------------------
// Public API — preview without dispatching (admin UI)
// ---------------------------------------------------------------------------

export async function previewUpcomingMessages(
  horizonDays = 14,
  now: Date = new Date(),
): Promise<DispatchPlan[]> {
  const horizon = new Date(now.getTime() + horizonDays * 86_400_000);
  const lower = new Date(now.getTime() - 1 * 86_400_000);

  const bookings = (await prisma.booking.findMany({
    where: {
      checkOut: { gte: lower },
      checkIn: { lte: horizon },
      status: { in: ["CONFIRMED", "PAID"] },
    },
    include: {
      apartment: { select: { id: true, name: true, slug: true, floor: true } },
      guest: { select: { id: true, visits: true, firstName: true, lastName: true } },
    },
    orderBy: { checkIn: "asc" },
    take: 200,
  })) as LoadedBooking[];

  const plans: DispatchPlan[] = [];
  for (const booking of bookings) {
    const scenarioPlan = classifyBookingScenario({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: booking.nights,
      createdAt: booking.createdAt,
      adults: booking.adults,
      children: booking.children,
      guestId: booking.guestId,
      apartmentId: booking.apartmentId,
      previousVisits: booking.guest?.visits ?? 0,
      groupSize: booking.adults + booking.children,
      guestPhone: booking.guestPhone,
    });
    const languages = detectGuestLanguages(booking.guestPhone);
    const channel = pickChannel(booking);
    const vars = buildVars(booking);
    for (const key of scenarioPlan.templates) {
      const due = scheduledFor(key, booking);
      if (due > horizon || due < lower) continue;
      const sent = await alreadySent(booking.bookingRef, key);
      if (sent) continue;
      plans.push({
        bookingRef: booking.bookingRef,
        templateKey: key,
        scenario: scenarioPlan.scenario,
        channel,
        languages,
        scheduledFor: due,
        preview: renderTemplate(key, vars, languages),
      });
    }
  }
  plans.sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime());
  return plans;
}

// ---------------------------------------------------------------------------
// Public API — sent log for the admin dashboard
// ---------------------------------------------------------------------------

export async function getRecentSentMessages(limit = 50) {
  return prisma.messageSent.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getReviewRequestStatusBoard(daysBack = 30) {
  const since = new Date(Date.now() - daysBack * 86_400_000);
  const bookings = await prisma.booking.findMany({
    where: {
      checkOut: { gte: since },
      status: { in: ["CONFIRMED", "PAID", "COMPLETED"] },
    },
    include: { apartment: { select: { name: true, slug: true } } },
    orderBy: { checkOut: "desc" },
    take: 100,
  });

  const reviewKeys: TemplateKey[] = [
    "A9_post_stay_review",
    "B4_post_stay_review",
    "C4_post_stay_review",
  ];
  const messageSends = await prisma.messageSent.findMany({
    where: {
      bookingRef: { in: bookings.map((b) => b.bookingRef) },
      templateKey: { in: reviewKeys },
    },
    select: { bookingRef: true, templateKey: true, status: true, deliveredAt: true },
  });
  const sentMap = new Map(messageSends.map((m) => [m.bookingRef, m]));

  return bookings.map((b) => {
    const sent = sentMap.get(b.bookingRef);
    return {
      bookingRef: b.bookingRef,
      guestName: b.guestName,
      apartment: b.apartment.name,
      checkOut: b.checkOut,
      source: b.source,
      reviewSent: sent?.status === "sent",
      reviewSentAt: sent?.deliveredAt ?? null,
      templateKey: sent?.templateKey ?? null,
    };
  });
}

// ---------------------------------------------------------------------------
// Tagged export (consumed by the registry)
// ---------------------------------------------------------------------------

export const GuestCommunicationAgent = {
  ...GUEST_COMMS_AGENT_META,
  run: runGuestCommunicationAgent,
  preview: previewUpcomingMessages,
  recent: getRecentSentMessages,
  reviewBoard: getReviewRequestStatusBoard,
};

export type GuestCommunicationAgentApi = typeof GuestCommunicationAgent;
