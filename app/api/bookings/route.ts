import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") ?? "100");
  const skip = parseInt(searchParams.get("skip") ?? "0");

  const where = status && status !== "ALL" ? { status: status as "PENDING" | "CONFIRMED" | "PAID" | "CANCELLED" | "COMPLETED" } : {};

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: { apartment: true, guest: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    }),
    prisma.booking.count({ where }),
  ]);

  const data = bookings.map((b) => ({
    id: b.id,
    bookingRef: b.bookingRef,
    guest: b.guestName,
    phone: b.guestPhone,
    email: b.guestEmail,
    apartment: b.apartment.name,
    apartmentSlug: b.apartment.slug,
    checkIn: b.checkIn.toISOString().split("T")[0],
    checkOut: b.checkOut.toISOString().split("T")[0],
    nights: b.nights,
    guests: b.adults + b.children,
    totalEUR: b.finalPrice,
    status: b.status,
    source: b.source,
    specialRequests: b.specialRequests,
    internalNotes: b.internalNotes,
    createdAt: b.createdAt.toISOString().split("T")[0],
  }));

  return NextResponse.json({ bookings: data, total });
}
