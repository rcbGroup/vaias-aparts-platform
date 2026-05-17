import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import {
  COMPETITORS,
  analyzeAgainstCompetitors,
  baselineSnapshots,
  competitorSummary,
} from "@/src/lib/agents/competitorIntelligence";

export const dynamic = "force-dynamic";

const OUR_BASE_PRICE = 297;

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  // Pull latest snapshots from DB; fall back to catalog baseline.
  let snapshots = baselineSnapshots();
  try {
    const dbSnaps = await prisma.competitorSnapshot.findMany({
      orderBy: { capturedAt: "desc" },
      take: 100,
      include: { competitor: true },
    });
    if (dbSnaps.length) {
      const seen = new Set<string>();
      const fresh: typeof snapshots = [];
      for (const s of dbSnaps) {
        if (!s.competitor) continue;
        if (seen.has(s.competitor.name)) continue;
        seen.add(s.competitor.name);
        fresh.push({
          competitorName: s.competitor.name,
          capturedAt: s.capturedAt.toISOString(),
          priceRON: s.priceRON,
          availability: s.availability ?? undefined,
          source: s.source ?? undefined,
        });
      }
      if (fresh.length) snapshots = fresh;
    }
  } catch {
    /* DB schema may not be migrated — use baseline */
  }

  const analysis = analyzeAgainstCompetitors(OUR_BASE_PRICE, snapshots);
  return NextResponse.json({
    ok: true,
    ourBasePriceRON: OUR_BASE_PRICE,
    summary: competitorSummary(),
    snapshots,
    analysis,
  });
}

export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));

  // Seed competitor catalog into the DB.
  if (body.action === "seed") {
    let created = 0;
    for (const c of COMPETITORS) {
      try {
        const existing = await prisma.competitor.findFirst({ where: { name: c.name } });
        if (!existing) {
          await prisma.competitor.create({
            data: {
              name: c.name,
              category: c.category,
              city: c.city,
              website: c.website ?? null,
              basePriceRON: c.basePriceRON ?? null,
              capacity: c.capacity ?? null,
              notes: c.notes ?? null,
            },
          });
          created++;
        }
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json({ ok: true, seeded: created });
  }

  // Record a new price snapshot.
  if (body.action === "snapshot") {
    const { competitorName, priceRON, availability, source } = body;
    try {
      const competitor = await prisma.competitor.findFirst({ where: { name: competitorName } });
      if (!competitor) return NextResponse.json({ ok: false, error: "Unknown competitor" }, { status: 404 });
      const snap = await prisma.competitorSnapshot.create({
        data: {
          competitorId: competitor.id,
          priceRON: Number(priceRON),
          availability: availability ?? null,
          source: source ?? "manual",
        },
      });
      return NextResponse.json({ ok: true, snapshot: snap });
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
