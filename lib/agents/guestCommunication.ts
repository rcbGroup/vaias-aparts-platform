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
 * Compressed message flow (5 messages for a standard stay):
 *   A1 confirmation        — immediate
 *   A2 pre-arrival info    — 24h before check-in, 10:00 local
 *   A3 welcome check       — Day 1 evening, 20:00 local (SKIPPED if guest
 *                             has already sent us a message)
 *   A4 checkout reminder   — evening before check-out, 20:00 local
 *   A5 review request      — 48h after check-out
 *
 * Same-day booking (≤36h to check-in) → 4 messages: B1 (immediate, fuses
 * A1+A2), A3, A4, A5.  One-night stay → 3 messages: C1 (immediate), A4
 * (20:00 same evening), A5 (48h after).
 *
 * Returning guests, groups (≥5), and international guests use the same
 * 5-message keys; the renderer adjusts tone/content via flags on
 * TemplateVars.  International guests also receive multilingual stacks via
 * {@link detectGuestLanguages}.
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
import {
  sendWhatsApp,
  sendEmail,
  type DispatchOutcome,
} from "@/lib/guest-journey/dispatch";
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
    "Sends a compressed 5-message journey from booking to post-stay review " +
    "(3 for one-night stays, 4 for same-day bookings). Operates 24/7/365, " +
    "never sends the door code, never breaks language rules.",
  icon: "💬",
  color: "bg-emerald-700",
  systemPrompt:
    `You are the Vila Vaias Aparts Guest Communication Agent. ` +
    `You message every guest from booking to post-stay review using a ` +
    `compressed 5-message journey: confirmation, pre-arrival info bundle ` +
    `(24h before, 10:00), welcome check (Day 1 evening, 20:00 — skip if the ` +
    `guest already messaged), checkout reminder (evening before, 20:00), ` +
    `review request (48h after checkout). ` +
    `Same-day bookings collapse to 4 messages (combined confirmation+arrival, ` +
    `then welcome check + checkout + review). One-night stays collapse to 3 ` +
    `(combined arrival, checkout reminder same evening 20:00, review 48h). ` +
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

/**
 *   A = Standard 3+ nights (5 messages)
 *   B = Same-day / last-minute, ≤36h to check-in (4 messages)
 *   C = One-night stay (3 messages)
 *
 * Returning guest (D), group of 5+ (E), international (F) modulate the
 * rendered content but do NOT change the number of messages sent.  We
 * expose them as flags on the plan so the dashboard can colour-code rows.
 */
export type Scenario = "A" | "B" | "C";
export type ScenarioFlag = "returning" | "group" | "international";

export type ScenarioPlan = {
  scenario: Scenario;
  flags: ScenarioFlag[];
  templates: TemplateKey[];
};

const SCENARIO_A_TEMPLATES: TemplateKey[] = [
  "A1_confirmation",
  "A2_pre_arrival",
  "A3_welcome_check",
  "A4_checkout_reminder",
  "A5_review_request",
];

const SCENARIO_B_TEMPLATES: TemplateKey[] = [
  "B1_combined_confirm_arrival",
  "A3_welcome_check",
  "A4_checkout_reminder",
  "A5_review_request",
];

const SCENARIO_C_TEMPLATES: TemplateKey[] = [
  "C1_combined_confirm_arrival",
  "A4_checkout_reminder",
  "A5_review_request",
];

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

  const flags: ScenarioFlag[] = [];
  if ((booking.previousVisits ?? 0) > 0) flags.push("returning");
  if ((booking.groupSize ?? booking.adults + booking.children) >= 5) flags.push("group");
  const isInternational = !/^(\+?40|0)/.test(
    booking.guestPhone.replace(/\s/g, ""),
  );
  if (isInternational) flags.push("international");

  let scenario: Scenario;
  let templates: TemplateKey[];

  if (booking.nights <= 1) {
    scenario = "C";
    templates = SCENARIO_C_TEMPLATES;
  } else if (hoursToCheckIn <= 36) {
    scenario = "B";
    templates = SCENARIO_B_TEMPLATES;
  } else {
    scenario = "A";
    templates = SCENARIO_A_TEMPLATES;
  }

  return { scenario, flags, templates };
}

// ---------------------------------------------------------------------------
// Schedule rules
// ---------------------------------------------------------------------------

/**
 * Returns the scheduled UTC moment a given template should be dispatched for
 * a booking.  Romania is UTC+2/UTC+3; we approximate to UTC+3 (summer) when
 * mapping local hour to UTC because the agent runs in the cron tick and a
 * small drift across DST is acceptable for these courtesy messages.
 */
export function scheduledFor(
  key: TemplateKey,
  booking: { checkIn: Date; checkOut: Date; createdAt: Date },
): Date {
  const checkIn = booking.checkIn;
  const checkOut = booking.checkOut;
  const created = booking.createdAt;

  const localHourUtc = (d: Date, offsetDays: number, localHour: number) => {
    const out = new Date(d);
    out.setUTCDate(out.getUTCDate() + offsetDays);
    out.setUTCHours(localHour - 3, 0, 0, 0);
    return out;
  };

  switch (key) {
    // Immediate-on-create messages.
    case "A1_confirmation":
    case "B1_combined_confirm_arrival":
    case "C1_combined_confirm_arrival":
      return created;

    // 24h before check-in, 10:00 local.
    case "A2_pre_arrival":
      return localHourUtc(checkIn, -1, 10);

    // Evening of Day 1, 20:00 local.
    case "A3_welcome_check":
      return localHourUtc(checkIn, 0, 20);

    // Evening before check-out, 20:00 local.  For a one-night stay this is
    // the same calendar evening as check-in (handled naturally because the
    // C scenario only sends C1, A4, A5 — A4 lands at 20:00 on the check-in
    // day because that is the evening "before" the next-morning check-out).
    case "A4_checkout_reminder":
      return localHourUtc(checkOut, -1, 20);

    // 48h after check-out — float to 10:00 local so it lands in waking hours.
    case "A5_review_request":
      return localHourUtc(checkOut, 2, 10);
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
  return booking.guestPhone?.trim() ? "whatsapp" : "email";
}

// ---------------------------------------------------------------------------
// Send guards
// ---------------------------------------------------------------------------

function validateBody(body: string, channel: Channel): string | null {
  if (!body || body.trim().length < 40) return "body too short";
  if (containsBannedSecrets(body)) return "body contained banned secret pattern";
  if (channel === "whatsapp" && body.length > 3500) return "whatsapp body too long";
  return null;
}

// ---------------------------------------------------------------------------
// Dispatch — WhatsApp + email (transport lives in lib/guest-journey/dispatch)
// ---------------------------------------------------------------------------

function emailSubject(key: TemplateKey, apartment: string): string {
  switch (key) {
    case "A1_confirmation":
      return `Confirmare rezervare — ${apartment} | Booking confirmed`;
    case "A2_pre_arrival":
      return `Informații pentru sosire — ${apartment}`;
    case "A3_welcome_check":
      return `V-ați instalat bine? — ${apartment}`;
    case "A4_checkout_reminder":
      return `Reamintire check-out — ${apartment}`;
    case "A5_review_request":
      return `Mulțumim! Lăsați-ne o recenzie — ${apartment}`;
    case "B1_combined_confirm_arrival":
    case "C1_combined_confirm_arrival":
      return `Confirmare + informații sosire — ${apartment}`;
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
    return true;
  }
}

/**
 * Has the guest ever sent us an inbound message on this booking?  Used to
 * suppress the A3_welcome_check ping — if they've already reached out we
 * don't pile on with a check-in question.
 */
async function guestHasInboundMessage(bookingId: number): Promise<boolean> {
  try {
    const row = await prisma.guestMessage.findFirst({
      where: { bookingId, direction: "INBOUND" },
      select: { id: true },
    });
    return !!row;
  } catch {
    return false;
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
  // Window: from any active check-in to 3 days after check-out (covers A1..A5
  // including the 48h-after review request).
  const lower = new Date(now.getTime() - 3 * 86_400_000);
  const upper = new Date(now.getTime() + 2 * 86_400_000);

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

function buildVars(b: LoadedBooking, flags: ScenarioFlag[]): TemplateVars {
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
    isReturning: flags.includes("returning"),
    isGroup: flags.includes("group"),
    totalPrice: typeof b.finalPrice === "number" ? b.finalPrice : undefined,
    currency: b.currency ?? "RON",
  };
}

export type DispatchPlan = {
  bookingRef: string;
  templateKey: TemplateKey;
  scenario: Scenario;
  flags: ScenarioFlag[];
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
  flags: ScenarioFlag[],
  dryRun: boolean,
): Promise<DispatchOutcomeRecord> {
  let renderVars: TemplateVars = vars;
  if (key === "A5_review_request") {
    renderVars = {
      ...vars,
      reviewLinksBlock: renderReviewLinksBlock(
        booking.source as BookingSource,
        languages,
      ),
    };
  }

  const body = renderTemplate(key, renderVars, languages);
  const guard = validateBody(body, channel);
  const plan: DispatchPlan = {
    bookingRef: booking.bookingRef,
    templateKey: key,
    scenario,
    flags,
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
  dryRun?: boolean;
  now?: Date;
  bookingRef?: string;
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
    const vars = buildVars(booking, plan.flags);

    for (const key of plan.templates) {
      if (opts.templateKey && opts.templateKey !== key) continue;

      const due = scheduledFor(key, booking);
      if (due > now) continue; // not yet — pick up on a future tick
      if (await alreadySent(booking.bookingRef, key)) continue;

      // A3 welcome check is suppressed if the guest already reached out.
      if (key === "A3_welcome_check" && (await guestHasInboundMessage(booking.id))) {
        await persistAttempt(
          booking,
          key,
          languages,
          channel,
          "",
          "skipped",
          "guest already messaged — welcome check suppressed",
        );
        continue;
      }

      duePlans.push({
        bookingRef: booking.bookingRef,
        templateKey: key,
        scenario: plan.scenario,
        flags: plan.flags,
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
        plan.flags,
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
    const vars = buildVars(booking, scenarioPlan.flags);
    for (const key of scenarioPlan.templates) {
      const due = scheduledFor(key, booking);
      if (due > horizon || due < lower) continue;
      if (await alreadySent(booking.bookingRef, key)) continue;
      plans.push({
        bookingRef: booking.bookingRef,
        templateKey: key,
        scenario: scenarioPlan.scenario,
        flags: scenarioPlan.flags,
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

  const messageSends = await prisma.messageSent.findMany({
    where: {
      bookingRef: { in: bookings.map((b) => b.bookingRef) },
      templateKey: "A5_review_request",
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
