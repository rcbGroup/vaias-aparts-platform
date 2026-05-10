import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const daysInMonth = endOfMonth.getDate();

  const [thisMonthBookings, totalGuests, newGuestsThisMonth, recentBookings] = await Promise.all([
    prisma.booking.findMany({
      where: {
        createdAt: { gte: startOfMonth, lte: endOfMonth },
        status: { not: "CANCELLED" },
      },
    }),
    prisma.guest.count(),
    prisma.guest.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.booking.findMany({
      where: { status: { not: "CANCELLED" } },
      include: { apartment: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const monthlyRevenue = thisMonthBookings.reduce((s, b) => s + b.finalPrice, 0);
  const bookedNights = thisMonthBookings.reduce((s, b) => s + b.nights, 0);
  const maxNights = 7 * daysInMonth;
  const occupancyPct = Math.round((bookedNights / maxNights) * 100);

  const recent = recentBookings.map((b) => ({
    id: b.id,
    bookingRef: b.bookingRef,
    guest: b.guestName,
    phone: b.guestPhone,
    apartment: b.apartment.name,
    checkIn: b.checkIn.toISOString().split("T")[0],
    checkOut: b.checkOut.toISOString().split("T")[0],
    nights: b.nights,
    totalEUR: b.finalPrice,
    status: b.status,
    createdAt: b.createdAt.toISOString().split("T")[0],
  }));

  return NextResponse.json({
    bookingsThisMonth: thisMonthBookings.length,
    occupancyPct,
    revenueThisMonth: Math.round(monthlyRevenue),
    newGuests: newGuestsThisMonth,
    totalGuests,
    recentBookings: recent,
  });
}
