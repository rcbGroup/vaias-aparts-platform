import { prisma } from "@/lib/prisma";
import { apartments as APARTMENT_INFO } from "@/lib/apartments";
import { fetchICal } from "./icalParser";
import {
  addDays,
  classifyDate,
  daysBetween,
  toISODate,
} from "./calendar";
import type {
  ApartmentAvailability,
  AvailabilityDay,
  GapClassification,
  GapSeverity,
  OccupancyGap,
} from "./types";

const MAX_HORIZON_DAYS = 90;

function basePriceForSlug(slug: string): number {
  const meta = APARTMENT_INFO.find((a) => a.slug === slug);
  return meta?.pricePerNightRON ?? 297;
}

export type ApartmentRecord = {
  id: number;
  slug: string;
  name: string;
};

export async function loadApartmentRecords(): Promise<ApartmentRecord[]> {
  const rows = await prisma.apartment.findMany({
    where: { active: true },
    select: { id: true, slug: true, name: true },
    orderBy: { id: "asc" },
  });
  return rows;
}

export async function buildAvailability(
  horizonDays: number = MAX_HORIZON_DAYS,
  externalFeeds: Record<string, string[]> = {},
): Promise<ApartmentAvailability[]> {
  const horizon = Math.min(Math.max(horizonDays, 7), MAX_HORIZON_DAYS);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const end = addDays(today, horizon);

  const apartmentRows = await loadApartmentRecords();
  const out: ApartmentAvailability[] = [];

  for (const apt of apartmentRows) {
    const [bookings, blocked] = await Promise.all([
      prisma.booking.findMany({
        where: {
          apartmentId: apt.id,
          status: { in: ["CONFIRMED", "PAID", "PENDING"] },
          checkOut: { gte: today },
          checkIn: { lte: end },
        },
        select: { checkIn: true, checkOut: true },
      }),
      prisma.blockedDate.findMany({
        where: {
          apartmentId: apt.id,
          date: { gte: today, lte: end },
        },
        select: { date: true, source: true },
      }),
    ]);

    const externalUrls = externalFeeds[apt.slug] ?? [];
    const externalBlocks: { from: Date; to: Date; src: string }[] = [];
    for (const url of externalUrls) {
      try {
        const events = await fetchICal(url);
        for (const ev of events) {
          externalBlocks.push({ from: ev.start, to: ev.end, src: url });
        }
      } catch (err) {
        // Soft-fail on external feeds; continue with internal data.
        console.warn(`[gapDetection] iCal fetch failed for ${apt.slug}:`, err);
      }
    }

    const days: AvailabilityDay[] = [];
    for (let i = 0; i < horizon; i++) {
      const day = addDays(today, i);
      const iso = toISODate(day);

      let booked = false;
      for (const b of bookings) {
        const ci = new Date(b.checkIn);
        const co = new Date(b.checkOut);
        ci.setUTCHours(0, 0, 0, 0);
        co.setUTCHours(0, 0, 0, 0);
        if (day >= ci && day < co) {
          booked = true;
          break;
        }
      }
      if (booked) {
        days.push({ date: iso, available: false, source: "booking" });
        continue;
      }

      const blockedRow = blocked.find(
        (b) => toISODate(new Date(b.date)) === iso,
      );
      if (blockedRow) {
        days.push({
          date: iso,
          available: false,
          source: "blocked",
          reason: blockedRow.source,
        });
        continue;
      }

      const ext = externalBlocks.find((b) => {
        const f = new Date(b.from);
        const t = new Date(b.to);
        f.setUTCHours(0, 0, 0, 0);
        t.setUTCHours(0, 0, 0, 0);
        return day >= f && day < t;
      });
      if (ext) {
        days.push({
          date: iso,
          available: false,
          source: "blocked",
          reason: "external_ical",
        });
        continue;
      }

      days.push({ date: iso, available: true, source: "free" });
    }

    out.push({
      apartmentId: apt.id,
      apartmentSlug: apt.slug,
      apartmentName: apt.name,
      days,
    });
  }

  return out;
}

function severityFor(daysUntil: number, classification: GapClassification): GapSeverity {
  if (daysUntil <= 3) return "critical";
  if (daysUntil <= 7) return "high";
  if (classification === "peak" || classification === "holiday") {
    return daysUntil <= 21 ? "high" : "medium";
  }
  if (daysUntil <= 21) return "medium";
  return "low";
}

function priorityScore(
  daysUntil: number,
  nights: number,
  classification: GapClassification,
): number {
  // 0–100. Closer + longer + peak = higher.
  const urgency = Math.max(0, 100 - daysUntil * 1.5);
  const lengthBonus = Math.min(nights * 5, 25);
  const classBonus =
    classification === "peak"
      ? 20
      : classification === "holiday"
      ? 18
      : classification === "weekend"
      ? 10
      : classification === "shoulder"
      ? 5
      : 0;
  return Math.min(100, Math.round(urgency * 0.6 + lengthBonus + classBonus));
}

function classifyGap(startDate: Date, endDate: Date): GapClassification {
  // The strongest classification across the span wins.
  const order: GapClassification[] = [
    "peak",
    "holiday",
    "weekend",
    "shoulder",
    "weekday",
  ];
  let best: GapClassification = "weekday";
  for (
    let cur = new Date(startDate);
    cur < endDate;
    cur.setUTCDate(cur.getUTCDate() + 1)
  ) {
    const c = classifyDate(cur);
    if (order.indexOf(c) < order.indexOf(best)) best = c;
  }
  return best;
}

function discountFor(
  severity: GapSeverity,
  classification: GapClassification,
  nights: number,
): number {
  // Last-minute logic per master prompt.
  let base = 0;
  if (severity === "critical") base = 25;
  else if (severity === "high") base = 18;
  else if (severity === "medium") base = 10;
  else base = 5;

  // Long-stay bonus (5+ nights)
  if (nights >= 7) base += 10;
  else if (nights >= 5) base += 5;

  // Peak/holiday: never deep-discount below 10%
  if (classification === "peak" || classification === "holiday") {
    base = Math.min(base, 12);
  }

  return Math.min(35, base);
}

export function findGaps(
  availability: ApartmentAvailability[],
  options: { minNights?: number; maxNights?: number } = {},
): OccupancyGap[] {
  const minNights = options.minNights ?? 1;
  const maxNights = options.maxNights ?? 14;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const gaps: OccupancyGap[] = [];

  for (const apt of availability) {
    let runStart: string | null = null;
    let runDays = 0;

    const flush = (endIdx: number) => {
      if (!runStart || runDays < minNights) {
        runStart = null;
        runDays = 0;
        return;
      }
      // Cap each emitted gap to maxNights — longer runs become multiple
      // overlapping suggestions starting at the same anchor.
      const startDate = new Date(runStart + "T00:00:00Z");
      const fullEnd = addDays(startDate, runDays);
      const cappedEnd = addDays(
        startDate,
        Math.min(runDays, maxNights),
      );
      const nights = Math.min(runDays, maxNights);
      const daysUntilStart = daysBetween(today, startDate);
      const classification = classifyGap(startDate, cappedEnd);
      const severity = severityFor(daysUntilStart, classification);
      const base = basePriceForSlug(apt.apartmentSlug);
      const discountPct = discountFor(severity, classification, nights);
      const suggested = Math.round(base * (1 - discountPct / 100));

      gaps.push({
        apartmentId: apt.apartmentId,
        apartmentSlug: apt.apartmentSlug,
        apartmentName: apt.apartmentName,
        startDate: toISODate(startDate),
        endDate: toISODate(cappedEnd),
        nights,
        daysUntilStart,
        classification,
        severity,
        priorityScore: priorityScore(daysUntilStart, nights, classification),
        basePrice: base,
        suggestedDiscountPct: discountPct,
        suggestedPrice: suggested,
      });

      // Avoid re-flagging the same nights — drop the consumed slice and
      // continue with whatever tail is left so callers can act on a single,
      // non-overlapping list of gaps.
      void fullEnd;
      runStart = null;
      runDays = 0;
    };

    for (let i = 0; i < apt.days.length; i++) {
      const d = apt.days[i];
      if (d.available) {
        if (runStart === null) runStart = d.date;
        runDays++;
      } else {
        flush(i);
      }
    }
    flush(apt.days.length);
  }

  return gaps.sort((a, b) => b.priorityScore - a.priorityScore);
}

export function summarizeOccupancy(
  availability: ApartmentAvailability[],
  withinDays: number = 30,
): {
  occupancyPct: number;
  bookedNights: number;
  totalNights: number;
} {
  let booked = 0;
  let total = 0;
  for (const apt of availability) {
    for (let i = 0; i < Math.min(withinDays, apt.days.length); i++) {
      total++;
      if (!apt.days[i].available) booked++;
    }
  }
  const pct = total === 0 ? 0 : Math.round((booked / total) * 100);
  return { occupancyPct: pct, bookedNights: booked, totalNights: total };
}
