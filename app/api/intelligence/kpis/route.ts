import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { computeKPIs, dailyBriefing } from "@/src/lib/agents/businessIntelligence";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const sp = req.nextUrl.searchParams;
  const windowDays = Number(sp.get("days") || "30");
  const windowStart = new Date();
  windowStart.setHours(0, 0, 0, 0);
  const windowEnd = new Date(windowStart);
  windowEnd.setDate(windowEnd.getDate() + windowDays);

  let bookings: any[] = [];
  try {
    bookings = await prisma.booking.findMany({
      where: {
        checkOut: { gte: windowStart },
        checkIn: { lte: windowEnd },
      },
      include: { apartment: true },
    });
  } catch {
    bookings = [];
  }

  const facts = bookings.map(b => ({
    apartmentSlug: b.apartment.slug,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    nights: b.nights,
    finalPrice: b.finalPrice,
    source: b.source,
    status: b.status,
    guestId: b.guestId,
  }));

  const kpis = computeKPIs(facts, windowStart, windowEnd);
  const briefing = dailyBriefing(kpis);

  return NextResponse.json({ ok: true, kpis, briefing });
}
