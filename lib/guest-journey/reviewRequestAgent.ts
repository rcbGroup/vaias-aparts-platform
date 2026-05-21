/**
 * VAIA OS — Review Request Agent (Agent 10).
 *
 * A dedicated, idempotent post-stay review chaser. The cron worker calls
 * {@link runReviewRequestAgent} once an hour; it finds guests who checked out
 * at least 48 hours ago (within a rolling window) and have NOT yet been sent a
 * review request, renders the platform-specific links block for their booking
 * source, dispatches via WhatsApp (Twilio) → email (Resend) fallback, and logs
 * the send to MessageSent.
 *
 * Relationship to the Guest Communication Agent
 * ----------------------------------------------
 * The 5-message guest journey already includes A5_review_request 48h after
 * check-out. This agent is the safety net + the primary sender for stays the
 * journey misses: COMPLETED bookings and stragglers older than the journey's
 * narrow ±3-day scan window. Both write MessageSent rows keyed by
 * `A5_review_request`, so they share one idempotency key — whichever fires
 * first wins and the other skips. No guest is ever asked twice.
 *
 * Platform tracking
 * -----------------
 * Which platforms a guest is asked to review on is fully determined by the
 * booking source (see {@link platformsForSource}) — Airbnb guests get Airbnb
 * only, Booking guests get Booking only, direct/other guests get the open-web
 * stack. Each send is logged with the rendered links block, and
 * {@link reviewRequestStatusBoard} reports the platform set + sent status per
 * recent stay for the admin dashboard.
 *
 * Master-prompt rules enforced here:
 *   • The door / key-box code is NEVER allowed in a message (banned-secret guard).
 *   • Romanian-only for +40 numbers; RO + EN + native language otherwise.
 *   • Review requests use the platform set specific to the booking source and
 *     mention the multi-platform monthly raffle.
 *   • Operates 24/7/365 — no quiet hours.
 */

import { prisma } from "@/lib/prisma";
import { detectGuestLanguages, type Language } from "./languageDetection";
import {
  CITY_TAX_PER_ADULT_PER_NIGHT,
  containsBannedSecrets,
  renderTemplate,
  type TemplateVars,
} from "./messageTemplates";
import {
  platformsForSource,
  renderReviewLinksBlock,
  type BookingSource,
  type ReviewPlatform,
} from "./reviewRequests";
import { sendWhatsApp, sendEmail, type DispatchOutcome } from "./dispatch";

// ---------------------------------------------------------------------------
// Identity (consumed by the agent registry / autopilot UI)
// ---------------------------------------------------------------------------

export const REVIEW_REQUEST_AGENT_ID = "review-request" as const;
export const REVIEW_REQUEST_AGENT_NUMERIC_ID = 10 as const;

export const REVIEW_REQUEST_AGENT_META = {
  id: REVIEW_REQUEST_AGENT_ID,
  numericId: REVIEW_REQUEST_AGENT_NUMERIC_ID,
  name: "Review Request Agent",
  description:
    "Chases post-stay reviews. Once an hour it finds guests who checked out " +
    "48h+ ago without a review request and sends the platform-specific links " +
    "(Airbnb-only / Booking-only / open-web stack) with the monthly raffle " +
    "incentive. Idempotent — never asks the same guest twice.",
  icon: "⭐",
  color: "bg-amber-600",
  systemPrompt:
    `You are the Vila Vaias Aparts Review Request Agent. 48 hours after a ` +
    `guest checks out, you ask them to leave a review on the platforms that ` +
    `match their booking source: Airbnb guests → Airbnb only; Booking.com ` +
    `guests → Booking only; Travelminit → Travelminit + the open web; direct ` +
    `and other guests → the full open-web set (Google, Facebook, TripAdvisor, ` +
    `Turist Info, Travelminit). Always mention that reviewing on 2+ platforms ` +
    `enters the guest into the monthly free-stay raffle. ALWAYS sign as ` +
    `"Echipa Vaias Aparts". Romanian only for +40 numbers; Romanian + English ` +
    `+ the guest's native language otherwise. NEVER include the door / ` +
    `key-box code. Never ask the same guest twice. Operate 24/7/365.`,
} as const;

// ---------------------------------------------------------------------------
// Tuning
// ---------------------------------------------------------------------------

/** Shared idempotency key with the Guest Communication Agent's A5 message. */
const REVIEW_TEMPLATE_KEY = "A5_review_request" as const;

/** A guest must be at least this many hours past check-out before we ask. */
const DEFAULT_MIN_AGE_HOURS = 48;

/** Stop chasing stays older than this — avoid pestering long-past guests. */
const DEFAULT_MAX_AGE_DAYS = 14;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Channel = "whatsapp" | "email";

type LoadedBooking = {
  id: number;
  bookingRef: string;
  guestId: number | null;
  guestName: string;
  guestEmail: string | null;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  adults: number;
  children: number;
  source: string;
  finalPrice: number;
  currency: string | null;
  apartment: { name: string; floor: string };
};

export type ReviewRequestOutcome = {
  bookingRef: string;
  guestName: string;
  apartment: string;
  checkOut: Date;
  source: string;
  channel: Channel;
  languages: Language[];
  platforms: ReviewPlatform[];
  status: "sent" | "skipped" | "error";
  providerId?: string;
  error?: string;
  preview?: string;
};

export type ReviewRequestRunOptions = {
  dryRun?: boolean;
  now?: Date;
  bookingRef?: string;
  limit?: number;
  minAgeHours?: number;
  maxAgeDays?: number;
};

export type ReviewRequestRunResult = {
  scannedBookings: number;
  due: number;
  outcomes: ReviewRequestOutcome[];
  summary: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BOOKING_SELECT = {
  id: true,
  bookingRef: true,
  guestId: true,
  guestName: true,
  guestEmail: true,
  guestPhone: true,
  checkIn: true,
  checkOut: true,
  nights: true,
  adults: true,
  children: true,
  source: true,
  finalPrice: true,
  currency: true,
  apartment: { select: { name: true, floor: true } },
} as const;

function pickChannel(b: { guestPhone: string; guestEmail?: string | null }): Channel {
  return b.guestPhone?.trim() ? "whatsapp" : "email";
}

function buildVars(b: LoadedBooking, reviewLinksBlock: string): TemplateVars {
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
    reviewLinksBlock,
    totalPrice: typeof b.finalPrice === "number" ? b.finalPrice : undefined,
    currency: b.currency ?? "RON",
  };
}

function validateBody(body: string, channel: Channel): string | null {
  if (!body || body.trim().length < 40) return "body too short";
  if (containsBannedSecrets(body)) return "body contained banned secret pattern";
  if (channel === "whatsapp" && body.length > 3500) return "whatsapp body too long";
  return null;
}

function emailSubject(apartment: string): string {
  return `Mulțumim! Lăsați-ne o recenzie — ${apartment} | Leave us a review`;
}

/** Has a review request already been sent (by this agent or guest comms)? */
async function alreadySent(bookingRef: string): Promise<boolean> {
  try {
    const row = await prisma.messageSent.findFirst({
      where: {
        bookingRef,
        templateKey: REVIEW_TEMPLATE_KEY,
        status: { in: ["sent", "queued"] },
      },
      select: { id: true },
    });
    return !!row;
  } catch {
    // On a DB read error, fail safe: assume sent so we never risk double-asking.
    return true;
  }
}

async function persistAttempt(
  booking: LoadedBooking,
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
        templateKey: REVIEW_TEMPLATE_KEY,
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
    console.warn("[reviewRequest] failed to persist MessageSent:", err);
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

async function loadDueBookings(
  now: Date,
  minAgeHours: number,
  maxAgeDays: number,
  limit: number,
): Promise<LoadedBooking[]> {
  const upper = new Date(now.getTime() - minAgeHours * 3_600_000); // checked out ≥ 48h ago
  const lower = new Date(now.getTime() - maxAgeDays * 86_400_000); // …but not ancient

  const rows = await prisma.booking.findMany({
    where: {
      checkOut: { gte: lower, lte: upper },
      status: { in: ["CONFIRMED", "PAID", "COMPLETED"] },
    },
    select: BOOKING_SELECT,
    orderBy: { checkOut: "desc" },
    take: limit,
  });
  return rows as LoadedBooking[];
}

// ---------------------------------------------------------------------------
// Per-booking dispatch
// ---------------------------------------------------------------------------

async function dispatchOne(
  booking: LoadedBooking,
  dryRun: boolean,
): Promise<ReviewRequestOutcome> {
  const languages = detectGuestLanguages(booking.guestPhone);
  const platforms = platformsForSource(booking.source as BookingSource);
  const reviewLinksBlock = renderReviewLinksBlock(
    booking.source as BookingSource,
    languages,
  );
  const vars = buildVars(booking, reviewLinksBlock);
  const channel = pickChannel(booking);
  const body = renderTemplate(REVIEW_TEMPLATE_KEY, vars, languages);

  const base: ReviewRequestOutcome = {
    bookingRef: booking.bookingRef,
    guestName: booking.guestName,
    apartment: booking.apartment.name,
    checkOut: booking.checkOut,
    source: booking.source,
    channel,
    languages,
    platforms,
    status: "skipped",
    preview: body,
  };

  const guard = validateBody(body, channel);
  if (guard) {
    await persistAttempt(booking, languages, channel, body, "skipped", guard);
    return { ...base, status: "skipped", error: guard };
  }
  if (dryRun) {
    return { ...base, status: "skipped", error: "dryRun" };
  }

  let outcome: DispatchOutcome;
  if (channel === "whatsapp") {
    outcome = await sendWhatsApp(booking.guestPhone, body);
    if (!outcome.ok && booking.guestEmail) {
      // WhatsApp failed but we have an email — fall back to it.
      outcome = await sendEmail(booking.guestEmail, emailSubject(booking.apartment.name), body);
      if (outcome.ok) {
        await persistAttempt(booking, languages, "email", body, "sent", undefined, outcome.providerId);
        return { ...base, channel: "email", status: "sent", providerId: outcome.providerId };
      }
    }
  } else {
    outcome = await sendEmail(
      booking.guestEmail ?? "",
      emailSubject(booking.apartment.name),
      body,
    );
  }

  if (outcome.ok) {
    await persistAttempt(booking, languages, channel, body, "sent", undefined, outcome.providerId);
    return { ...base, status: "sent", providerId: outcome.providerId };
  }
  await persistAttempt(booking, languages, channel, body, "error", outcome.error);
  return { ...base, status: "error", error: outcome.error };
}

// ---------------------------------------------------------------------------
// Public API — single run
// ---------------------------------------------------------------------------

export async function runReviewRequestAgent(
  opts: ReviewRequestRunOptions = {},
): Promise<ReviewRequestRunResult> {
  const now = opts.now ?? new Date();
  const minAgeHours = opts.minAgeHours ?? DEFAULT_MIN_AGE_HOURS;
  const maxAgeDays = opts.maxAgeDays ?? DEFAULT_MAX_AGE_DAYS;
  const limit = opts.limit ?? 200;

  const bookings = opts.bookingRef
    ? ((await prisma.booking.findMany({
        where: { bookingRef: opts.bookingRef },
        select: BOOKING_SELECT,
      })) as LoadedBooking[])
    : await loadDueBookings(now, minAgeHours, maxAgeDays, limit);

  const outcomes: ReviewRequestOutcome[] = [];
  let due = 0;

  for (const booking of bookings) {
    if (await alreadySent(booking.bookingRef)) continue;
    due++;
    outcomes.push(await dispatchOne(booking, Boolean(opts.dryRun)));
  }

  const sent = outcomes.filter((o) => o.status === "sent").length;
  const skipped = outcomes.filter((o) => o.status === "skipped").length;
  const errors = outcomes.filter((o) => o.status === "error").length;

  return {
    scannedBookings: bookings.length,
    due,
    outcomes,
    summary: `Scanned ${bookings.length} checked-out bookings · ${sent} review requests sent · ${skipped} skipped · ${errors} errors`,
  };
}

// ---------------------------------------------------------------------------
// Public API — status board (admin dashboard)
// ---------------------------------------------------------------------------

export type ReviewRequestBoardRow = {
  bookingRef: string;
  guestName: string;
  apartment: string;
  checkOut: Date;
  source: string;
  platforms: ReviewPlatform[];
  reviewRequestSent: boolean;
  reviewRequestSentAt: Date | null;
};

/**
 * For each recently checked-out booking, report which platforms the guest was
 * (or will be) asked to review on and whether the request has gone out yet.
 */
export async function reviewRequestStatusBoard(
  daysBack = 30,
  now: Date = new Date(),
): Promise<ReviewRequestBoardRow[]> {
  const since = new Date(now.getTime() - daysBack * 86_400_000);
  const bookings = await prisma.booking.findMany({
    where: {
      checkOut: { gte: since, lte: now },
      status: { in: ["CONFIRMED", "PAID", "COMPLETED"] },
    },
    select: {
      bookingRef: true,
      guestName: true,
      source: true,
      checkOut: true,
      apartment: { select: { name: true } },
    },
    orderBy: { checkOut: "desc" },
    take: 200,
  });

  const sends = await prisma.messageSent.findMany({
    where: {
      bookingRef: { in: bookings.map((b) => b.bookingRef) },
      templateKey: REVIEW_TEMPLATE_KEY,
      status: { in: ["sent", "queued"] },
    },
    select: { bookingRef: true, deliveredAt: true, createdAt: true },
  });
  const sentMap = new Map(sends.map((s) => [s.bookingRef, s]));

  return bookings.map((b) => {
    const sent = b.bookingRef ? sentMap.get(b.bookingRef) : undefined;
    return {
      bookingRef: b.bookingRef,
      guestName: b.guestName,
      apartment: b.apartment.name,
      checkOut: b.checkOut,
      source: b.source,
      platforms: platformsForSource(b.source as BookingSource),
      reviewRequestSent: !!sent,
      reviewRequestSentAt: sent?.deliveredAt ?? sent?.createdAt ?? null,
    };
  });
}

// ---------------------------------------------------------------------------
// Tagged export (consumed by the registry)
// ---------------------------------------------------------------------------

export const ReviewRequestAgent = {
  ...REVIEW_REQUEST_AGENT_META,
  run: runReviewRequestAgent,
  board: reviewRequestStatusBoard,
};

export type ReviewRequestAgentApi = typeof ReviewRequestAgent;
