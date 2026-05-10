import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";

  const where = search
    ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" as const } },
          { lastName: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search } },
        ],
      }
    : {};

  const guests = await prisma.guest.findMany({
    where,
    include: {
      bookings: {
        include: { apartment: true },
        orderBy: { checkIn: "desc" },
        take: 5,
      },
    },
    orderBy: { totalSpent: "desc" },
    take: 200,
  });

  const data = guests.map((g) => {
    const confirmedBookings = g.bookings.filter((b) => b.status !== "CANCELLED");
    const favoriteApt = confirmedBookings[0]?.apartment?.name ?? "—";
    return {
      id: g.id,
      name: `${g.firstName} ${g.lastName}`.trim(),
      firstName: g.firstName,
      lastName: g.lastName,
      phone: g.phone,
      email: g.email,
      nationality: g.nationality,
      notes: g.notes,
      visits: g.visits,
      totalSpent: g.totalSpent,
      totalNights: confirmedBookings.reduce((s, b) => s + b.nights, 0),
      isVIP: g.isVIP,
      lastVisit: g.lastVisit?.toISOString().split("T")[0] ?? null,
      favoriteApartment: favoriteApt,
      createdAt: g.createdAt.toISOString().split("T")[0],
    };
  });

  return NextResponse.json({ guests: data, total: data.length });
}
