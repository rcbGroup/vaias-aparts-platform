import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatICalDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const apartment = await prisma.apartment.findUnique({
    where: { slug: params.slug },
    include: {
      bookings: {
        where: { status: { in: ["CONFIRMED", "PAID", "PENDING"] } },
        select: { bookingRef: true, guestName: true, checkIn: true, checkOut: true },
      },
      blockedDates: { select: { date: true, source: true } },
    },
  });

  if (!apartment) {
    return new NextResponse("Not found", { status: 404 });
  }

  const now = new Date();
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vaias Aparts//Booking Calendar//RO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${apartment.name} — Vaias Aparts`,
    "X-WR-TIMEZONE:Europe/Bucharest",
  ];

  for (const booking of apartment.bookings) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${booking.bookingRef}@vaiasaparts.ro`);
    lines.push(`DTSTAMP:${formatICalDate(now)}`);
    lines.push(`DTSTART;VALUE=DATE:${booking.checkIn.toISOString().split("T")[0].replace(/-/g, "")}`);
    lines.push(`DTEND;VALUE=DATE:${booking.checkOut.toISOString().split("T")[0].replace(/-/g, "")}`);
    lines.push(`SUMMARY:Rezervat — ${booking.guestName}`);
    lines.push("STATUS:CONFIRMED");
    lines.push("END:VEVENT");
  }

  // Group blocked dates into ranges
  const grouped = new Map<string, { from: Date; to: Date }>();
  for (const d of apartment.blockedDates) {
    if (!grouped.has(d.source)) {
      grouped.set(d.source, { from: d.date, to: d.date });
    } else {
      const g = grouped.get(d.source)!;
      if (d.date < g.from) g.from = d.date;
      if (d.date > g.to) g.to = d.date;
    }
  }

  for (const [source, range] of grouped) {
    const reason = source.split("#")[0];
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:blocked-${source.replace(/[^a-z0-9]/gi, "-")}@vaiasaparts.ro`);
    lines.push(`DTSTAMP:${formatICalDate(now)}`);
    lines.push(`DTSTART;VALUE=DATE:${range.from.toISOString().split("T")[0].replace(/-/g, "")}`);
    lines.push(`DTEND;VALUE=DATE:${range.to.toISOString().split("T")[0].replace(/-/g, "")}`);
    lines.push(`SUMMARY:Blocat — ${reason}`);
    lines.push("STATUS:CONFIRMED");
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${params.slug}.ics"`,
      "Cache-Control": "no-cache",
    },
  });
}
