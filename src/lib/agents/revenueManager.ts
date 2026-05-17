/**
 * VAIA OS — Agent 3: Revenue Manager.
 *
 * Dynamic pricing engine for Vila Vaias Aparts.
 * Combines five pricing levers:
 *   1. Occupancy-based adjustments (<30% reduce 10–15%, >80% raise 20–30%)
 *   2. Event calendar (Orthodox Easter, Aug 15 Adormirea Maicii Domnului, Christmas, NYE — +20–40%)
 *   3. Gap management (1-night orphan gap −30%, 2-night gap → mini-package CTA)
 *   4. MinLOS (peak nights require min 2 nights, single-night surcharge +20%)
 *   5. Source mix (direct retains best rate; OTA gets parity but with no benefits)
 *
 * Pure functions — no DB dependency in the core. The API layer pulls live state.
 */
import { apartments, type Apartment } from "../../../lib/apartments";

export type PricingInputs = {
  apartmentSlug: string;
  checkIn: Date | string;
  checkOut: Date | string;
  occupancyPct?: number;       // 0–100, building-wide for the window
  source?: "direct" | "booking" | "airbnb" | "ota" | string;
  gapBeforeNights?: number;    // how many empty nights before this booking
  gapAfterNights?: number;     // how many empty nights after
};

export type PricingAdjustment = {
  rule: string;
  label: string;
  multiplier: number; // e.g. 1.30 = +30%, 0.85 = -15%
  appliesPerNight?: boolean;
};

export type PricingResult = {
  apartment: string;
  apartmentName: string;
  nights: number;
  basePricePerNightRON: number;
  basePriceTotalRON: number;
  adjustments: PricingAdjustment[];
  finalMultiplier: number;
  finalPricePerNightRON: number;
  finalTotalRON: number;
  minLOS: number;
  recommendation: string;
};

const ORTHODOX_EASTER_MULTIPLIER = 1.4;
const AUGUST_15_MULTIPLIER = 1.3;
const CHRISTMAS_MULTIPLIER = 1.3;
const NYE_MULTIPLIER = 1.4;

/**
 * Romanian Orthodox Easter (Paștele Ortodox) — hardcoded for upcoming years.
 * Adormirea Maicii Domnului is always 15 August.
 */
const ORTHODOX_EASTER_DATES: Record<number, string> = {
  2026: "2026-04-12",
  2027: "2027-05-02",
  2028: "2028-04-16",
  2029: "2029-04-08",
  2030: "2030-04-28",
};

function toDate(d: Date | string): Date {
  return typeof d === "string" ? new Date(d) : d;
}

function diffNights(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function isWithinEvent(date: Date, eventDate: string, daysBefore = 2, daysAfter = 2): boolean {
  const target = new Date(eventDate);
  const diffDays = Math.round((date.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= -daysBefore && diffDays <= daysAfter;
}

function isOrthodoxEasterWindow(date: Date): boolean {
  const year = date.getFullYear();
  const easter = ORTHODOX_EASTER_DATES[year];
  if (!easter) return false;
  return isWithinEvent(date, easter, 3, 3);
}

function isAugust15Window(date: Date): boolean {
  return date.getMonth() === 7 && date.getDate() >= 13 && date.getDate() <= 17;
}

function isChristmasWindow(date: Date): boolean {
  return date.getMonth() === 11 && date.getDate() >= 22 && date.getDate() <= 27;
}

function isNYEWindow(date: Date): boolean {
  return (date.getMonth() === 11 && date.getDate() >= 28) ||
         (date.getMonth() === 0 && date.getDate() <= 2);
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6; // Friday & Saturday
}

function isPeakSeason(date: Date): boolean {
  const m = date.getMonth();
  return m >= 5 && m <= 8; // June–September
}

/**
 * Compute the per-night and total adjusted price for a booking window.
 */
export function computeDynamicPrice(inputs: PricingInputs): PricingResult {
  const apt = apartments.find(a => a.slug === inputs.apartmentSlug);
  if (!apt) {
    throw new Error(`Unknown apartment: ${inputs.apartmentSlug}`);
  }
  const ci = toDate(inputs.checkIn);
  const co = toDate(inputs.checkOut);
  const nights = diffNights(ci, co);
  const basePerNight = apt.pricePerNightRON;
  const baseTotal = basePerNight * nights;

  const adjustments: PricingAdjustment[] = [];

  // Walk each night, find highest event multiplier across the stay.
  let eventMult = 1.0;
  let eventLabel: string | null = null;
  let weekendMult = 1.0;
  let peakAnyNight = false;
  for (let i = 0; i < nights; i++) {
    const d = new Date(ci.getTime() + i * 24 * 60 * 60 * 1000);
    if (isOrthodoxEasterWindow(d) && ORTHODOX_EASTER_MULTIPLIER > eventMult) {
      eventMult = ORTHODOX_EASTER_MULTIPLIER;
      eventLabel = "Paștele Ortodox";
    }
    if (isAugust15Window(d) && AUGUST_15_MULTIPLIER > eventMult) {
      eventMult = AUGUST_15_MULTIPLIER;
      eventLabel = "Adormirea Maicii Domnului (15 August)";
    }
    if (isChristmasWindow(d) && CHRISTMAS_MULTIPLIER > eventMult) {
      eventMult = CHRISTMAS_MULTIPLIER;
      eventLabel = "Crăciun";
    }
    if (isNYEWindow(d) && NYE_MULTIPLIER > eventMult) {
      eventMult = NYE_MULTIPLIER;
      eventLabel = "Revelion";
    }
    if (isWeekend(d) && weekendMult < 1.08) weekendMult = 1.08;
    if (isPeakSeason(d)) peakAnyNight = true;
  }

  if (eventMult > 1) {
    adjustments.push({
      rule: "event",
      label: `Eveniment major: ${eventLabel}`,
      multiplier: eventMult,
    });
  } else if (weekendMult > 1) {
    adjustments.push({
      rule: "weekend",
      label: "Weekend (vineri/sâmbătă)",
      multiplier: weekendMult,
    });
  }

  // Occupancy-based dynamic adjustment.
  if (typeof inputs.occupancyPct === "number") {
    if (inputs.occupancyPct < 30) {
      adjustments.push({
        rule: "occupancy_low",
        label: `Cerere scăzută (${inputs.occupancyPct.toFixed(0)}% ocupare) — reducere`,
        multiplier: 0.87, // −13%
      });
    } else if (inputs.occupancyPct > 80) {
      adjustments.push({
        rule: "occupancy_high",
        label: `Cerere mare (${inputs.occupancyPct.toFixed(0)}% ocupare) — premium`,
        multiplier: 1.25, // +25%
      });
    } else if (inputs.occupancyPct > 60) {
      adjustments.push({
        rule: "occupancy_med",
        label: `Cerere bună (${inputs.occupancyPct.toFixed(0)}% ocupare) — ușor premium`,
        multiplier: 1.1,
      });
    }
  }

  // Gap management — single orphan night between two bookings is hard to fill.
  if (inputs.gapBeforeNights === 1 || inputs.gapAfterNights === 1) {
    adjustments.push({
      rule: "gap_orphan",
      label: "Noapte orfană între rezervări — reducere fill-up",
      multiplier: 0.7,
    });
  } else if ((inputs.gapBeforeNights === 2 || inputs.gapAfterNights === 2) && nights === 2) {
    adjustments.push({
      rule: "gap_mini_package",
      label: "Mini-pachet 2 nopți (gap de 2 nopți)",
      multiplier: 0.9,
    });
  }

  // MinLOS — peak nights require 2 nights min; single-night exceptions get +20%.
  let minLOS = 1;
  if (peakAnyNight || eventMult > 1) {
    minLOS = 2;
    if (nights === 1) {
      adjustments.push({
        rule: "single_night_peak_surcharge",
        label: "Excepție 1 noapte în vârf de sezon",
        multiplier: 1.2,
      });
    }
  }

  // Source mix — direct bookings preserved at best rate; OTAs at parity but no perks (handled downstream).
  if (inputs.source && inputs.source !== "direct" && inputs.source !== "website") {
    // Parity rule: OTA price never lower than direct. Multiplier stays 1 here;
    // upstream the engine adds OTA fees and removes direct benefits.
  }

  const finalMultiplier = adjustments.reduce((m, a) => m * a.multiplier, 1);
  const finalPerNight = Math.round(basePerNight * finalMultiplier);
  const finalTotal = Math.round(baseTotal * finalMultiplier);

  let recommendation = "Tarif standard recomandat.";
  if (finalMultiplier >= 1.3) recommendation = "Tarif premium — păstrează disponibilitatea pentru rezervări directe.";
  else if (finalMultiplier <= 0.8) recommendation = "Reduce tariful și activează promovare flash pe WhatsApp / diaspora.";
  else if (finalMultiplier > 1.05) recommendation = "Cerere bună — închide canale OTA când ocuparea trece de 90%.";

  return {
    apartment: inputs.apartmentSlug,
    apartmentName: apt.name,
    nights,
    basePricePerNightRON: basePerNight,
    basePriceTotalRON: baseTotal,
    adjustments,
    finalMultiplier: Math.round(finalMultiplier * 1000) / 1000,
    finalPricePerNightRON: finalPerNight,
    finalTotalRON: finalTotal,
    minLOS,
    recommendation,
  };
}

/**
 * Forecast occupancy for a window using a list of bookings.
 */
export function computeOccupancyPct(
  bookings: Array<{ checkIn: Date; checkOut: Date; apartmentSlug: string }>,
  windowStart: Date,
  windowEnd: Date,
  totalApartments = apartments.length
): number {
  const windowNights = Math.max(1, diffNights(windowStart, windowEnd));
  const totalRoomNights = windowNights * totalApartments;
  let bookedRoomNights = 0;
  for (const b of bookings) {
    const start = b.checkIn > windowStart ? b.checkIn : windowStart;
    const end = b.checkOut < windowEnd ? b.checkOut : windowEnd;
    if (end > start) {
      bookedRoomNights += diffNights(start, end);
    }
  }
  return Math.min(100, Math.round((bookedRoomNights / totalRoomNights) * 1000) / 10);
}

/**
 * Daily revenue report data shape — consumed by /api/revenue/daily-report.
 */
export type DailyRevenueReport = {
  date: string;
  occupancyPct: number;
  adrRON: number;
  revparRON: number;
  totalRevenueRON: number;
  directBookingPct: number;
  bookingsCount: number;
  byApartment: Array<{
    slug: string;
    name: string;
    nightsBooked: number;
    revenueRON: number;
    avgRateRON: number;
  }>;
  pricingRecommendations: Array<{
    apartmentSlug: string;
    apartmentName: string;
    recommendation: string;
    suggestedMultiplier: number;
  }>;
};

export function buildDailyReport(
  bookings: Array<{
    apartmentSlug: string;
    apartmentName: string;
    checkIn: Date;
    checkOut: Date;
    finalPrice: number;
    source: string;
  }>,
  reportDate: Date = new Date()
): DailyRevenueReport {
  const ymd = reportDate.toISOString().slice(0, 10);

  // Window: next 30 days starting today.
  const windowStart = new Date(reportDate);
  windowStart.setHours(0, 0, 0, 0);
  const windowEnd = new Date(windowStart);
  windowEnd.setDate(windowEnd.getDate() + 30);

  const inWindow = bookings.filter(b => b.checkOut > windowStart && b.checkIn < windowEnd);

  const totalRoomNights = 30 * apartments.length;
  let bookedRoomNights = 0;
  const byApt = new Map<string, { name: string; nights: number; revenue: number }>();
  let totalRev = 0;
  let directCount = 0;

  for (const b of inWindow) {
    const start = b.checkIn > windowStart ? b.checkIn : windowStart;
    const end = b.checkOut < windowEnd ? b.checkOut : windowEnd;
    const n = diffNights(start, end);
    if (n <= 0) continue;
    bookedRoomNights += n;
    // pro-rata revenue for in-window slice
    const total = b.finalPrice * (n / diffNights(b.checkIn, b.checkOut));
    totalRev += total;
    if (b.source === "direct" || b.source === "website") directCount++;
    const prev = byApt.get(b.apartmentSlug) ?? { name: b.apartmentName, nights: 0, revenue: 0 };
    prev.nights += n;
    prev.revenue += total;
    byApt.set(b.apartmentSlug, prev);
  }

  const occupancyPct = Math.round((bookedRoomNights / totalRoomNights) * 1000) / 10;
  const adr = bookedRoomNights > 0 ? Math.round(totalRev / bookedRoomNights) : 0;
  const revpar = Math.round(totalRev / totalRoomNights);
  const directPct = inWindow.length > 0 ? Math.round((directCount / inWindow.length) * 1000) / 10 : 0;

  const byApartment = apartments.map(a => {
    const entry = byApt.get(a.slug);
    return {
      slug: a.slug,
      name: a.name,
      nightsBooked: entry?.nights ?? 0,
      revenueRON: Math.round(entry?.revenue ?? 0),
      avgRateRON: entry && entry.nights > 0 ? Math.round(entry.revenue / entry.nights) : a.pricePerNightRON,
    };
  });

  const pricingRecommendations = apartments.map(a => {
    const sample = computeDynamicPrice({
      apartmentSlug: a.slug,
      checkIn: windowStart,
      checkOut: new Date(windowStart.getTime() + 2 * 24 * 60 * 60 * 1000),
      occupancyPct,
      source: "direct",
    });
    return {
      apartmentSlug: a.slug,
      apartmentName: a.name,
      recommendation: sample.recommendation,
      suggestedMultiplier: sample.finalMultiplier,
    };
  });

  return {
    date: ymd,
    occupancyPct,
    adrRON: adr,
    revparRON: revpar,
    totalRevenueRON: Math.round(totalRev),
    directBookingPct: directPct,
    bookingsCount: inWindow.length,
    byApartment,
    pricingRecommendations,
  };
}

export const _internal = {
  isOrthodoxEasterWindow,
  isAugust15Window,
  isChristmasWindow,
  isNYEWindow,
  isPeakSeason,
  diffNights,
};
