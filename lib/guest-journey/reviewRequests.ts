/**
 * VAIA OS — Post-stay review request logic.
 *
 * Master-prompt rules:
 *   • The platform list a guest is asked to review depends on the booking
 *     source (Airbnb-only for Airbnb guests; Booking-only for Booking guests;
 *     direct guests get the full multi-platform set).
 *   • A tombola incentive runs every month for guests who leave reviews on
 *     2+ platforms.  The message body includes that line for every multi-
 *     platform stack.
 *
 * Review URLs are read from environment variables when present so the host
 * can rotate them without redeploying, falling back to known-good public URLs.
 */

import type { Language } from "./languageDetection";

export type ReviewPlatform =
  | "google"
  | "facebook"
  | "tripadvisor"
  | "turist-info"
  | "travelminit"
  | "booking"
  | "airbnb";

export type BookingSource =
  | "direct"
  | "booking"
  | "airbnb"
  | "travelminit"
  | "h2b"
  | "expedia"
  | "vrbo"
  | string;

export type PlatformLink = {
  platform: ReviewPlatform;
  label: string;
  url: string;
};

// ---------------------------------------------------------------------------
// Review links — env-overridable
// ---------------------------------------------------------------------------

const env = (key: string, fallback: string): string =>
  (process.env[key] && process.env[key]!.trim()) || fallback;

export const REVIEW_LINKS: Record<ReviewPlatform, PlatformLink> = {
  google: {
    platform: "google",
    label: "Google Business",
    // Stable Google review URL — host may replace with a deeper share link.
    url: env(
      "REVIEW_URL_GOOGLE",
      "https://search.google.com/local/writereview?placeid=ChIJVilaVaiasAparts",
    ),
  },
  facebook: {
    platform: "facebook",
    label: "Facebook",
    url: env("REVIEW_URL_FACEBOOK", "https://www.facebook.com/VaiasAparts/reviews"),
  },
  tripadvisor: {
    platform: "tripadvisor",
    label: "TripAdvisor",
    url: env("REVIEW_URL_TRIPADVISOR", "https://www.tripadvisor.com/UserReviewEdit-VilaVaiasAparts"),
  },
  "turist-info": {
    platform: "turist-info",
    label: "Turist Info",
    url: env("REVIEW_URL_TURISTINFO", "https://www.turistinfo.ro/targu-neamt/cazare-vila-vaias-aparts"),
  },
  travelminit: {
    platform: "travelminit",
    label: "Travelminit",
    url: env("REVIEW_URL_TRAVELMINIT", "https://www.travelminit.ro/ro/cazare/vila-vaias-aparts"),
  },
  booking: {
    platform: "booking",
    label: "Booking.com",
    url: env("REVIEW_URL_BOOKING", "https://www.booking.com/reviewcenter.html?hotel=vila-vaias-aparts"),
  },
  airbnb: {
    platform: "airbnb",
    label: "Airbnb",
    url: env("REVIEW_URL_AIRBNB", "https://www.airbnb.com/users/show/vaias-aparts"),
  },
};

// ---------------------------------------------------------------------------
// Source → platforms mapping
// ---------------------------------------------------------------------------

/**
 * Which review platforms should we ask the guest to use, given the booking
 * source?  Per master prompt:
 *
 *   • Airbnb guests → Airbnb only (their own review system).
 *   • Booking.com guests → Booking only.
 *   • Travelminit guests → Travelminit + the open Web set (Google / Facebook /
 *     TripAdvisor / Turist Info) so we capture direct-discoverability reviews.
 *   • Direct / other → the full open-web set.
 */
export function platformsForSource(source: BookingSource | undefined): ReviewPlatform[] {
  const normalized = (source ?? "direct").toLowerCase();

  switch (normalized) {
    case "airbnb":
      return ["airbnb"];

    case "booking":
    case "booking.com":
      return ["booking"];

    case "travelminit":
      return [
        "travelminit",
        "google",
        "facebook",
        "tripadvisor",
        "turist-info",
      ];

    case "h2b":
    case "expedia":
    case "vrbo":
      // External-channel guests still see the open-web set (no OTA self-review).
      return ["google", "facebook", "tripadvisor", "turist-info"];

    default:
      // Direct booking — full open-web stack.
      return [
        "google",
        "facebook",
        "tripadvisor",
        "turist-info",
        "travelminit",
      ];
  }
}

// ---------------------------------------------------------------------------
// Block renderers
// ---------------------------------------------------------------------------

const HEADERS: Record<Language, string> = {
  ro: "🌟 *Lăsați o recenzie aici (mulțumim!):*",
  en: "🌟 *Leave a review (thank you!):*",
  fr: "🌟 *Laissez un avis (merci !) :*",
  de: "🌟 *Hier können Sie eine Bewertung hinterlassen (vielen Dank!):*",
  it: "🌟 *Lasci una recensione (grazie!):*",
  es: "🌟 *Deje una reseña (¡gracias!):*",
  hu: "🌟 *Hagyjon értékelést (köszönjük!):*",
};

const RAFFLE_LINE: Record<Language, string> = {
  ro: "🎁 2+ platforme = intrare automată în tombola lunară pentru un sejur gratuit.",
  en: "🎁 Reviews on 2+ platforms automatically enter our monthly free-stay raffle.",
  fr: "🎁 Avis sur 2 plateformes ou plus = participation automatique à la tombola mensuelle (séjour offert).",
  de: "🎁 Bewertungen auf 2+ Plattformen nehmen automatisch an der monatlichen Verlosung teil.",
  it: "🎁 Recensioni su 2+ piattaforme = partecipazione automatica all'estrazione mensile.",
  es: "🎁 Reseñas en 2+ plataformas = participación automática en el sorteo mensual.",
  hu: "🎁 2+ platformon hagyott értékelés = automatikus részvétel a havi sorsoláson.",
};

/**
 * Pre-rendered links block to slot into {@link renderTemplate} via
 * `vars.reviewLinksBlock`.  Each language gets its own header but the
 * platform links themselves are language-neutral URLs.
 */
export function renderReviewLinksBlock(
  source: BookingSource | undefined,
  languages: Language[],
): string {
  const platforms = platformsForSource(source);
  const links = platforms.map((p) => REVIEW_LINKS[p]);

  // Single-language case: don't bother with a delimiter.
  if (languages.length === 1) {
    return [
      HEADERS[languages[0]],
      ...links.map((l) => `• ${l.label}: ${l.url}`),
      links.length >= 2 ? "" : null,
      links.length >= 2 ? RAFFLE_LINE[languages[0]] : null,
    ]
      .filter((s): s is string => s !== null)
      .join("\n");
  }

  // Stack the same link list under multiple headers (links are universal).
  const linkLines = links.map((l) => `• ${l.label}: ${l.url}`).join("\n");

  return languages
    .map((lang) =>
      [
        HEADERS[lang],
        linkLines,
        links.length >= 2 ? RAFFLE_LINE[lang] : null,
      ]
        .filter((s): s is string => s !== null)
        .join("\n"),
    )
    .join("\n\n");
}

/** Convenience: just the platforms (for analytics / admin UI). */
export function getReviewPlatformsForBooking(source: BookingSource | undefined): PlatformLink[] {
  return platformsForSource(source).map((p) => REVIEW_LINKS[p]);
}

/**
 * Categorise a stored ReviewSent record into "pending" vs "sent".  Used by
 * the admin dashboard widget that shows review-request status across recent
 * stays.
 */
export type ReviewRequestStatus = "not_due" | "due" | "sent" | "completed";

export function classifyReviewRequest(args: {
  checkOut: Date;
  reviewSentAt?: Date | null;
  reviewLeftAt?: Date | null;
  now?: Date;
}): ReviewRequestStatus {
  const now = args.now ?? new Date();
  if (args.reviewLeftAt) return "completed";
  if (args.reviewSentAt) return "sent";
  // We send the review request the morning AFTER check-out, so anything
  // before checkOut + 18h is "not due" yet.
  const dueAt = new Date(args.checkOut.getTime() + 18 * 3600 * 1000);
  return now >= dueAt ? "due" : "not_due";
}
