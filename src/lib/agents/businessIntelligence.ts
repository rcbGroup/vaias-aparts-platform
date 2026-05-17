/**
 * VAIA OS — Agent 20: Business Intelligence.
 *
 * KPIs: RevPAR, ADR, Occupancy, Revenue by Source, Direct Booking %, Repeat Rate.
 * Outputs a daily briefing that the admin dashboard renders directly.
 */
import { apartments } from "../../../lib/apartments";

export type BookingFact = {
  apartmentSlug: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  finalPrice: number;
  source: string;
  status: string;
  guestId?: number | null;
};

export type KPISet = {
  windowStart: string;
  windowEnd: string;
  windowDays: number;
  totalRoomNights: number;
  bookedRoomNights: number;
  occupancyPct: number;
  adrRON: number;
  revparRON: number;
  totalRevenueRON: number;
  bookingsCount: number;
  directBookings: number;
  otaBookings: number;
  directBookingPct: number;
  revenueBySource: Record<string, number>;
  revenueByApartment: Record<string, number>;
  averageStayNights: number;
  repeatRatePct: number;
  trends: {
    yoYGrowthHint: string;
    occupancyTrend: "rising" | "falling" | "stable";
  };
};

function diffNights(a: Date, b: Date): number {
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));
}

export function computeKPIs(
  bookings: BookingFact[],
  windowStart: Date,
  windowEnd: Date,
  totalApartments = apartments.length
): KPISet {
  const days = Math.max(1, diffNights(windowStart, windowEnd));
  const totalRoomNights = days * totalApartments;

  let bookedRoomNights = 0;
  let totalRevenue = 0;
  let bookingsCount = 0;
  let directBookings = 0;
  let otaBookings = 0;
  let stayLengthSum = 0;
  const revenueBySource: Record<string, number> = {};
  const revenueByApartment: Record<string, number> = {};
  const guestIds = new Set<number>();
  const repeatGuestIds = new Set<number>();

  for (const b of bookings) {
    if (b.status !== "CONFIRMED" && b.status !== "PAID" && b.status !== "COMPLETED") continue;
    const start = b.checkIn > windowStart ? b.checkIn : windowStart;
    const end = b.checkOut < windowEnd ? b.checkOut : windowEnd;
    const n = diffNights(start, end);
    if (n <= 0) continue;

    const prorated = b.finalPrice * (n / Math.max(1, b.nights));
    bookedRoomNights += n;
    totalRevenue += prorated;
    bookingsCount++;
    stayLengthSum += b.nights;

    const src = b.source.toLowerCase();
    if (src === "direct" || src === "website" || src === "whatsapp") directBookings++;
    else otaBookings++;

    revenueBySource[src] = (revenueBySource[src] ?? 0) + prorated;
    revenueByApartment[b.apartmentSlug] = (revenueByApartment[b.apartmentSlug] ?? 0) + prorated;

    if (b.guestId) {
      if (guestIds.has(b.guestId)) repeatGuestIds.add(b.guestId);
      else guestIds.add(b.guestId);
    }
  }

  const occupancyPct = totalRoomNights > 0 ? Math.round((bookedRoomNights / totalRoomNights) * 1000) / 10 : 0;
  const adr = bookedRoomNights > 0 ? Math.round(totalRevenue / bookedRoomNights) : 0;
  const revpar = totalRoomNights > 0 ? Math.round(totalRevenue / totalRoomNights) : 0;
  const directPct = bookingsCount > 0 ? Math.round((directBookings / bookingsCount) * 1000) / 10 : 0;
  const avgStay = bookingsCount > 0 ? Math.round((stayLengthSum / bookingsCount) * 10) / 10 : 0;
  const repeatPct = guestIds.size > 0 ? Math.round((repeatGuestIds.size / guestIds.size) * 1000) / 10 : 0;

  // Lightweight trend hint: compare first vs second half of window.
  const mid = new Date(windowStart.getTime() + (windowEnd.getTime() - windowStart.getTime()) / 2);
  let firstHalfNights = 0;
  let secondHalfNights = 0;
  for (const b of bookings) {
    if (b.status !== "CONFIRMED" && b.status !== "PAID" && b.status !== "COMPLETED") continue;
    const s = b.checkIn > windowStart ? b.checkIn : windowStart;
    const e = b.checkOut < windowEnd ? b.checkOut : windowEnd;
    if (e <= mid) firstHalfNights += diffNights(s, e);
    else if (s >= mid) secondHalfNights += diffNights(s, e);
    else {
      firstHalfNights += diffNights(s, mid);
      secondHalfNights += diffNights(mid, e);
    }
  }
  let occupancyTrend: "rising" | "falling" | "stable" = "stable";
  if (secondHalfNights > firstHalfNights * 1.15) occupancyTrend = "rising";
  else if (firstHalfNights > secondHalfNights * 1.15) occupancyTrend = "falling";

  return {
    windowStart: windowStart.toISOString().slice(0, 10),
    windowEnd: windowEnd.toISOString().slice(0, 10),
    windowDays: days,
    totalRoomNights,
    bookedRoomNights,
    occupancyPct,
    adrRON: adr,
    revparRON: revpar,
    totalRevenueRON: Math.round(totalRevenue),
    bookingsCount,
    directBookings,
    otaBookings,
    directBookingPct: directPct,
    revenueBySource,
    revenueByApartment,
    averageStayNights: avgStay,
    repeatRatePct: repeatPct,
    trends: {
      yoYGrowthHint: "Compară cu aceeași perioadă anul trecut pentru tendință reală.",
      occupancyTrend,
    },
  };
}

export function dailyBriefing(kpis: KPISet): string {
  const lines: string[] = [];
  lines.push(`📊 *Briefing zilnic — Vaias Aparts*`);
  lines.push(`Perioada: ${kpis.windowStart} → ${kpis.windowEnd} (${kpis.windowDays} zile)`);
  lines.push("");
  lines.push(`*Ocupare:* ${kpis.occupancyPct}% (${kpis.bookedRoomNights}/${kpis.totalRoomNights} room-nights)`);
  lines.push(`*ADR:* ${kpis.adrRON} lei | *RevPAR:* ${kpis.revparRON} lei`);
  lines.push(`*Venit total:* ${kpis.totalRevenueRON.toLocaleString("ro-RO")} lei`);
  lines.push(`*Rezervări:* ${kpis.bookingsCount} (${kpis.directBookingPct}% directe)`);
  lines.push(`*Durată medie sejur:* ${kpis.averageStayNights} nopți`);
  lines.push(`*Rată retenție clienți:* ${kpis.repeatRatePct}%`);
  lines.push("");

  if (kpis.occupancyPct < 40) {
    lines.push("⚠️ Ocupare sub 40% — recomand să activăm campanie WhatsApp pentru clienții fideli și diaspora.");
  } else if (kpis.occupancyPct > 85) {
    lines.push("🔥 Ocupare excelentă — verifică tarife dinamice (Agent 3) pentru ridicare premium pe ultimele apartamente.");
  } else {
    lines.push("✅ Ocupare sănătoasă — focus pe direct bookings (Agent 8).");
  }

  if (kpis.directBookingPct < 30) {
    lines.push("📈 Direct bookings sub 30% — activează tactici Agent 8 (Best Rate Guarantee, beneficii directe).");
  }

  if (kpis.trends.occupancyTrend === "falling") {
    lines.push("📉 Tendință descrescătoare — analizează cauza (sezonalitate, OTA, competiție).");
  } else if (kpis.trends.occupancyTrend === "rising") {
    lines.push("📈 Tendință ascendentă — pregătește operațional pentru pic.");
  }

  return lines.join("\n");
}
