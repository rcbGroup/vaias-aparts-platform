import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apartments } from "@/lib/apartments";
import { fetchICalForApartment, isDateBlocked, iCalUrlForApartment } from "@/lib/ical-sync";

type ApartmentCard = {
  slug: string;
  name: string;
  floor: string;
  hasAC: boolean;
  accessible: boolean;
  status: "OCCUPIED" | "AVAILABLE" | "UNKNOWN";
  currentGuest: string | null;
  currentCheckIn: string | null;
  currentCheckOut: string | null;
  nextCheckIn: string | null;
  icalConfigured: boolean;
};

type ArrivalRow = {
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  apartment: string;
  apartmentSlug: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  source: string;
  status: string;
};

function todayInBucharest(): string {
  // Romania is GMT+2/+3 — use Intl to avoid edge cases.
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const today = todayInBucharest();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const daysInMonth = endOfMonth.getDate();

  // Pull bookings around today
  const startWindow = new Date(now);
  startWindow.setDate(startWindow.getDate() - 14);
  const endWindow = new Date(now);
  endWindow.setDate(endWindow.getDate() + 30);

  const [bookingsWindow, monthBookings, pendingMessages, recentReviews] = await Promise.all([
    prisma.booking.findMany({
      where: {
        status: { in: ["CONFIRMED", "PAID", "PENDING"] },
        OR: [
          { checkIn: { gte: startWindow, lte: endWindow } },
          { checkOut: { gte: startWindow, lte: endWindow } },
        ],
      },
      include: { apartment: true },
    }),
    prisma.booking.findMany({
      where: {
        createdAt: { gte: startOfMonth, lte: endOfMonth },
        status: { not: "CANCELLED" },
      },
    }),
    prisma.guestMessage.count({ where: { direction: "INBOUND", read: false } }),
    prisma.review.findMany({
      orderBy: { date: "desc" },
      take: 5,
    }),
  ]);

  // Fetch iCal data in parallel for any apartment that has it configured
  const icalResults = await Promise.all(
    apartments.map(async (apt) => {
      if (!iCalUrlForApartment(apt.slug)) return { slug: apt.slug, ranges: null };
      const ranges = await fetchICalForApartment(apt.slug);
      return { slug: apt.slug, ranges };
    })
  );

  const cards: ApartmentCard[] = apartments.map((apt) => {
    const icalEntry = icalResults.find((r) => r.slug === apt.slug);
    const icalRanges = icalEntry?.ranges ?? null;
    const icalConfigured = !!iCalUrlForApartment(apt.slug);

    // Find current booking from DB
    const current = bookingsWindow.find(
      (b) =>
        b.apartment.slug === apt.slug &&
        b.checkIn.toISOString().split("T")[0] <= today &&
        b.checkOut.toISOString().split("T")[0] > today
    );
    const upcoming = bookingsWindow
      .filter(
        (b) => b.apartment.slug === apt.slug && b.checkIn.toISOString().split("T")[0] > today
      )
      .sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime())[0];

    // Compute status — DB takes priority, iCal is a fallback signal
    let status: ApartmentCard["status"] = "AVAILABLE";
    if (current) {
      status = "OCCUPIED";
    } else if (icalRanges && isDateBlocked(today, icalRanges)) {
      status = "OCCUPIED";
    } else if (icalRanges === null && !iCalUrlForApartment(apt.slug)) {
      // No iCal configured AND no DB booking — leave AVAILABLE (best signal we have)
      status = "AVAILABLE";
    }

    return {
      slug: apt.slug,
      name: apt.name,
      floor: apt.floor,
      hasAC: apt.hasAC,
      accessible: apt.accessible,
      status,
      currentGuest: current ? current.guestName : null,
      currentCheckIn: current ? current.checkIn.toISOString().split("T")[0] : null,
      currentCheckOut: current ? current.checkOut.toISOString().split("T")[0] : null,
      nextCheckIn: upcoming ? upcoming.checkIn.toISOString().split("T")[0] : null,
      icalConfigured,
    };
  });

  const arrivalsToday: ArrivalRow[] = bookingsWindow
    .filter((b) => b.checkIn.toISOString().split("T")[0] === today)
    .map((b) => ({
      bookingRef: b.bookingRef,
      guestName: b.guestName,
      guestPhone: b.guestPhone,
      apartment: b.apartment.name,
      apartmentSlug: b.apartment.slug,
      checkIn: b.checkIn.toISOString().split("T")[0],
      checkOut: b.checkOut.toISOString().split("T")[0],
      nights: b.nights,
      adults: b.adults,
      children: b.children,
      source: b.source,
      status: b.status,
    }));

  const departuresToday: ArrivalRow[] = bookingsWindow
    .filter((b) => b.checkOut.toISOString().split("T")[0] === today)
    .map((b) => ({
      bookingRef: b.bookingRef,
      guestName: b.guestName,
      guestPhone: b.guestPhone,
      apartment: b.apartment.name,
      apartmentSlug: b.apartment.slug,
      checkIn: b.checkIn.toISOString().split("T")[0],
      checkOut: b.checkOut.toISOString().split("T")[0],
      nights: b.nights,
      adults: b.adults,
      children: b.children,
      source: b.source,
      status: b.status,
    }));

  const monthlyRevenue = monthBookings.reduce((s, b) => s + b.finalPrice, 0);
  const bookedNights = monthBookings.reduce((s, b) => s + b.nights, 0);
  const maxNights = apartments.length * daysInMonth;
  const occupancyPct = maxNights > 0 ? Math.round((bookedNights / maxNights) * 100) : 0;

  const occupiedNow = cards.filter((c) => c.status === "OCCUPIED").length;

  return NextResponse.json({
    today,
    apartments: cards,
    arrivalsToday,
    departuresToday,
    pendingMessages,
    summary: {
      occupiedNow,
      totalApartments: apartments.length,
      bookingsThisMonth: monthBookings.length,
      revenueThisMonth: Math.round(monthlyRevenue),
      occupancyPct,
    },
    recentReviews: recentReviews.map((r) => ({
      id: r.id,
      platform: r.platform,
      authorName: r.authorName,
      rating: r.rating,
      body: r.body,
      apartment: r.apartment,
      date: r.date.toISOString().split("T")[0],
    })),
  });
}
