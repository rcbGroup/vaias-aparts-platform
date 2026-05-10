import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/blocked-dates?slug=apartament-1
// Returns blocked dates grouped into ranges by their source tag
export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Slug lipsă" }, { status: 400 });

  const apartment = await prisma.apartment.findUnique({ where: { slug } });
  if (!apartment) return NextResponse.json({ ranges: [] });

  const dates = await prisma.blockedDate.findMany({
    where: { apartmentId: apartment.id },
    orderBy: { date: "asc" },
  });

  // Group by source tag (format: "reason#fromISO#toISO")
  const grouped = new Map<string, { from: Date; to: Date; reason: string; source: string }>();
  for (const d of dates) {
    if (!grouped.has(d.source)) {
      grouped.set(d.source, { from: d.date, to: d.date, reason: d.source.split("#")[0], source: d.source });
    } else {
      const g = grouped.get(d.source)!;
      if (d.date < g.from) g.from = d.date;
      if (d.date > g.to) g.to = d.date;
    }
  }

  const ranges = Array.from(grouped.values()).map((g) => ({
    source: g.source,
    from: g.from.toISOString().split("T")[0],
    to: g.to.toISOString().split("T")[0],
    reason: g.reason,
  }));

  return NextResponse.json({ ranges });
}

// POST /api/blocked-dates — creates one BlockedDate per day in range
export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { slug, from, to, reason } = await req.json();
  if (!slug || !from || !to) return NextResponse.json({ error: "Date incomplete" }, { status: 400 });

  const apartment = await prisma.apartment.findUnique({ where: { slug } });
  if (!apartment) return NextResponse.json({ error: "Apartament negăsit" }, { status: 404 });

  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (fromDate > toDate) return NextResponse.json({ error: "Data de start trebuie să fie înainte de data de final" }, { status: 400 });

  const source = `${reason || "manual"}#${from}#${to}`;
  const dates: Date[] = [];
  const cur = new Date(fromDate);
  while (cur <= toDate) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }

  await prisma.blockedDate.createMany({
    data: dates.map((date) => ({ apartmentId: apartment.id, date, source })),
    skipDuplicates: true,
  });

  return NextResponse.json({ ok: true, count: dates.length });
}

// DELETE /api/blocked-dates?slug=X&source=Y — removes all dates for that range
export async function DELETE(req: NextRequest) {
  if (!getAdminSession(req)) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const source = searchParams.get("source");

  if (!slug || !source) return NextResponse.json({ error: "Parametri lipsă" }, { status: 400 });

  const apartment = await prisma.apartment.findUnique({ where: { slug } });
  if (!apartment) return NextResponse.json({ error: "Apartament negăsit" }, { status: 404 });

  const { count } = await prisma.blockedDate.deleteMany({
    where: { apartmentId: apartment.id, source },
  });

  return NextResponse.json({ ok: true, deleted: count });
}
