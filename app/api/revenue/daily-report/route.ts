import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { buildDailyReport } from "@/src/lib/agents/revenueManager";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const dateParam = req.nextUrl.searchParams.get("date");
  const reportDate = dateParam ? new Date(dateParam) : new Date();

  // Pull active + upcoming bookings (next 60 days back, next 90 forward).
  const lookbackMs = 60 * 24 * 60 * 60 * 1000;
  const lookaheadMs = 90 * 24 * 60 * 60 * 1000;
  const since = new Date(reportDate.getTime() - lookbackMs);
  const until = new Date(reportDate.getTime() + lookaheadMs);

  const bookings = await prisma.booking.findMany({
    where: {
      checkOut: { gte: since },
      checkIn: { lte: until },
      status: { in: ["CONFIRMED", "PAID", "COMPLETED"] },
    },
    include: { apartment: true },
  }).catch(() => []);

  const data = buildDailyReport(
    bookings.map(b => ({
      apartmentSlug: b.apartment.slug,
      apartmentName: b.apartment.name,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      finalPrice: b.finalPrice,
      source: b.source,
    })),
    reportDate
  );

  // Persist snapshot best-effort.
  try {
    await prisma.revenueSnapshot.upsert({
      where: { date: new Date(data.date) },
      create: {
        date: new Date(data.date),
        totalRevenueRON: data.totalRevenueRON,
        occupancyPct: data.occupancyPct,
        adrRON: data.adrRON,
        revparRON: data.revparRON,
        directBookingPct: data.directBookingPct,
        bookingsCount: data.bookingsCount,
      },
      update: {
        totalRevenueRON: data.totalRevenueRON,
        occupancyPct: data.occupancyPct,
        adrRON: data.adrRON,
        revparRON: data.revparRON,
        directBookingPct: data.directBookingPct,
        bookingsCount: data.bookingsCount,
      },
    });
  } catch {
    /* schema may not be migrated yet — non-fatal */
  }

  return NextResponse.json({ ok: true, report: data });
}
