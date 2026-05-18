/**
 * Vila Vaias Aparts — Whole Villa pricing + commission-aware channel pricing.
 *
 * The villa has 7 apartments: 5 × 1-bedroom + 2 × 2-bedroom.
 * Direct-booking base prices are the cheapest (no OTA commission); channel
 * prices are marked up so the host nets the same direct price after commission.
 */

export type Channel =
  | "direct"
  | "booking"
  | "airbnb"
  | "travelminit"
  | "h2b";

export type ChannelInfo = {
  id: Channel;
  label: string;
  description: string;
  /** Markup percentage applied on top of the direct base price. */
  markupPct: number;
  /** Approximate commission the channel takes from the gross price. */
  commissionPct: number;
  /** UI accent for badges (Tailwind class). */
  badgeClass: string;
};

export const CHANNELS: Record<Channel, ChannelInfo> = {
  direct: {
    id: "direct",
    label: "Direct (site / WhatsApp)",
    description: "Rezervare directă — cel mai bun preț, fără comision OTA.",
    markupPct: 0,
    commissionPct: 0,
    badgeClass: "bg-forest-700 text-cream-50",
  },
  airbnb: {
    id: "airbnb",
    label: "Airbnb",
    description: "Airbnb percepe ~3–5% comision de la gazdă.",
    markupPct: 5,
    commissionPct: 5,
    badgeClass: "bg-rose-500 text-white",
  },
  travelminit: {
    id: "travelminit",
    label: "Travelminit",
    description: "Travelminit percepe ~12–15% comision.",
    markupPct: 15,
    commissionPct: 14,
    badgeClass: "bg-sky-600 text-white",
  },
  h2b: {
    id: "h2b",
    label: "H2B",
    description: "Comision H2B aproximativ 18%.",
    markupPct: 18,
    commissionPct: 18,
    badgeClass: "bg-amber-600 text-white",
  },
  booking: {
    id: "booking",
    label: "Booking.com",
    description: "Booking.com percepe ~18% comision — markup 20% pentru a păstra net-ul.",
    markupPct: 20,
    commissionPct: 18,
    badgeClass: "bg-indigo-600 text-white",
  },
};

/**
 * Villa composition. Base prices below are the *direct booking* prices —
 * cheapest available, the reward for booking direct.
 */
export const VILLA = {
  totalApartments: 7,
  oneBedCount: 5,
  twoBedCount: 2,
  // Direct-booking base (per night, per apartment)
  oneBedBaseRON: 295,
  twoBedBaseRON: 595,
  // Hard floors — never go below these, even at max discount.
  oneBedFloorRON: 200,
  twoBedFloorRON: 400,
  // Capacity
  standardAdults: 18, // 5×2 + 2×4 = 18
  maxCapacity: 28,
  extraPersonRON: 50,
};

/**
 * Length-of-stay progressive discount (whole villa).
 * Index = nights, value = discount percent. Capped at 7+ = max.
 */
export const VILLA_LOS_DISCOUNT: { nights: number; pct: number; label: string }[] = [
  { nights: 1, pct: 0, label: "1 noapte" },
  { nights: 2, pct: 5, label: "2 nopți · 5%" },
  { nights: 3, pct: 7.5, label: "3 nopți · 7.5%" },
  { nights: 4, pct: 10, label: "4 nopți · 10%" },
  { nights: 5, pct: 12.5, label: "5 nopți · 12.5%" },
  { nights: 6, pct: 15, label: "6 nopți · 15%" },
  { nights: 7, pct: 17.5, label: "7+ nopți · 17.5% (reducere maximă)" },
];

export function getLosDiscount(nights: number): { pct: number; label: string } {
  if (nights <= 0) return { pct: 0, label: "" };
  if (nights >= 7) return VILLA_LOS_DISCOUNT[VILLA_LOS_DISCOUNT.length - 1];
  return VILLA_LOS_DISCOUNT[nights - 1];
}

/**
 * Channel-adjusted per-night base for a single apartment (before discount).
 */
export function channelBasePerNight(
  channel: Channel,
  type: "oneBed" | "twoBed"
): number {
  const base =
    type === "oneBed" ? VILLA.oneBedBaseRON : VILLA.twoBedBaseRON;
  const markup = CHANNELS[channel].markupPct;
  return Math.round(base * (1 + markup / 100));
}

/**
 * Full villa per-night gross price for a given channel (before LOS discount).
 */
export function villaBasePerNight(channel: Channel): number {
  return (
    VILLA.oneBedCount * channelBasePerNight(channel, "oneBed") +
    VILLA.twoBedCount * channelBasePerNight(channel, "twoBed")
  );
}

export type VillaQuote = {
  channel: Channel;
  nights: number;
  guests: number;
  extraGuests: number;
  /** Per-night villa price before discount (channel-adjusted). */
  perNightGross: number;
  /** Per-night villa price after discount and floor protection. */
  perNightNet: number;
  /** LOS discount percent applied. */
  discountPct: number;
  discountLabel: string;
  /** Sum of nights × per-night-gross. */
  subtotal: number;
  /** Money saved from LOS discount. */
  discountAmount: number;
  /** Extra-person surcharge total (nights × extraGuests × 50). */
  extraPersonTotal: number;
  /** Final total. */
  total: number;
  /** Savings vs booking same dates per-apartment via Booking.com. */
  savingsVsBooking: number;
  /** True when floor prices forced the discount lower than nominal. */
  flooredApplied: boolean;
  currency: "RON";
};

export function quoteVilla({
  channel = "direct",
  nights,
  guests = VILLA.standardAdults,
}: {
  channel?: Channel;
  nights: number;
  guests?: number;
}): VillaQuote {
  const n = Math.max(1, Math.floor(nights));
  const g = Math.max(VILLA.standardAdults, Math.floor(guests));
  const extraGuests = Math.max(0, g - VILLA.standardAdults);

  const oneBedNight = channelBasePerNight(channel, "oneBed");
  const twoBedNight = channelBasePerNight(channel, "twoBed");
  const perNightGross =
    VILLA.oneBedCount * oneBedNight + VILLA.twoBedCount * twoBedNight;

  const { pct, label } = getLosDiscount(n);

  // Apply discount per apartment so we can enforce per-apartment floor.
  const oneBedDiscounted = Math.max(
    VILLA.oneBedFloorRON,
    Math.round(oneBedNight * (1 - pct / 100))
  );
  const twoBedDiscounted = Math.max(
    VILLA.twoBedFloorRON,
    Math.round(twoBedNight * (1 - pct / 100))
  );
  const flooredApplied =
    oneBedNight * (1 - pct / 100) < VILLA.oneBedFloorRON ||
    twoBedNight * (1 - pct / 100) < VILLA.twoBedFloorRON;

  const perNightNet =
    VILLA.oneBedCount * oneBedDiscounted +
    VILLA.twoBedCount * twoBedDiscounted;

  const subtotal = perNightGross * n;
  const discountAmount = (perNightGross - perNightNet) * n;
  const extraPersonTotal = extraGuests * VILLA.extraPersonRON * n;

  const total = perNightNet * n + extraPersonTotal;

  // Savings vs the same dates booked apartment-by-apartment via Booking.com
  // (Booking +20%, no whole-villa discount).
  const bookingNight = villaBasePerNight("booking");
  const savingsVsBooking = bookingNight * n - total;

  return {
    channel,
    nights: n,
    guests: g,
    extraGuests,
    perNightGross,
    perNightNet,
    discountPct: pct,
    discountLabel: label,
    subtotal,
    discountAmount,
    extraPersonTotal,
    total,
    savingsVsBooking: Math.max(0, savingsVsBooking),
    flooredApplied,
    currency: "RON",
  };
}

/**
 * Pre-formatted "from" price for marketing copy: lowest possible direct rate.
 * Returns "295 RON/noapte" — the headline number used across the site.
 */
export const VILLA_FROM_PRICE_LABEL = `${VILLA.oneBedBaseRON} RON/noapte`;
export const VILLA_FROM_PRICE_LABEL_EN = `${VILLA.oneBedBaseRON} RON/night`;

/**
 * Build a WhatsApp pre-fill text for a villa quote.
 */
export function buildWhatsAppMessage(q: VillaQuote): string {
  return (
    `Bună ziua! Doresc să rezerv toată Vila Vaias Aparts.\n\n` +
    `• Nopți: ${q.nights}\n` +
    `• Oaspeți: ${q.guests} adulți${q.extraGuests > 0 ? ` (inclusiv ${q.extraGuests} oaspeți peste capacitate standard)` : ""}\n` +
    `• Tarif estimat: ${q.total.toLocaleString("ro-RO")} RON total ` +
    `(${q.perNightNet.toLocaleString("ro-RO")} RON/noapte` +
    (q.discountPct > 0 ? `, după reducere ${q.discountPct}% sejur lung` : "") +
    `)\n\n` +
    `Vă rog să-mi confirmați disponibilitatea pentru datele: [DATA CHECK-IN] – [DATA CHECK-OUT].`
  );
}
