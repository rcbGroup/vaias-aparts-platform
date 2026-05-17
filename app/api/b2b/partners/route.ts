import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { SEED_PARTNERS, templateFor, generateTrackingCode, buildTrackingUrl } from "@/src/lib/agents/b2bDistribution";

export const dynamic = "force-dynamic";

const CATEGORY_ENUM = z.enum([
  "TRAVEL_AGENCY",
  "TOUR_OPERATOR",
  "CORPORATE",
  "PILGRIMAGE",
  "RESTAURANT",
  "EXPERIENCE",
  "DIASPORA",
  "OTHER",
]);

const partnerSchema = z.object({
  name: z.string().min(2),
  category: CATEGORY_ENUM,
  contactName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  commissionPct: z.number().min(0).max(50).default(10),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  const seedOnly = req.nextUrl.searchParams.get("seedCatalog") === "1";
  if (seedOnly) {
    return NextResponse.json({
      ok: true,
      seedCatalog: SEED_PARTNERS.map(p => ({
        ...p,
        trackingCode: generateTrackingCode(p.name),
        trackingUrl: buildTrackingUrl(p.name),
      })),
    });
  }

  try {
    const partners = await prisma.b2BPartner.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json({
      ok: true,
      count: partners.length,
      partners: partners.map(p => ({
        ...p,
        trackingCode: generateTrackingCode(p.name),
        trackingUrl: buildTrackingUrl(p.name),
      })),
    });
  } catch {
    return NextResponse.json({ ok: true, count: 0, partners: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));

  // "seed" — load the SEED_PARTNERS into the DB.
  if (body.action === "seed") {
    let created = 0;
    for (const p of SEED_PARTNERS) {
      try {
        await prisma.b2BPartner.upsert({
          where: { id: -1 }, // never matches
          create: {
            name: p.name,
            category: p.category as any,
            city: p.city ?? null,
            website: p.website ?? null,
            commissionPct: p.commissionPct,
            notes: p.notes ?? null,
          },
          update: {},
        }).catch(async () => {
          // upsert by name not possible without unique constraint; use a different path
          const exists = await prisma.b2BPartner.findFirst({ where: { name: p.name } });
          if (!exists) {
            await prisma.b2BPartner.create({
              data: {
                name: p.name,
                category: p.category as any,
                city: p.city ?? null,
                website: p.website ?? null,
                commissionPct: p.commissionPct,
                notes: p.notes ?? null,
              },
            });
            created++;
          }
        });
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json({ ok: true, seeded: created });
  }

  // "outreach" — produce email template for a partner.
  if (body.action === "outreach") {
    const partner = body.partner;
    const template = templateFor(partner.category);
    const result = template({ partner, contactName: body.contactName, commissionPct: body.commissionPct });
    return NextResponse.json({ ok: true, ...result });
  }

  // default — create a partner
  const parsed = partnerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }
  try {
    const created = await prisma.b2BPartner.create({
      data: { ...parsed.data, category: parsed.data.category as any },
    });
    return NextResponse.json({
      ok: true,
      partner: { ...created, trackingCode: generateTrackingCode(created.name), trackingUrl: buildTrackingUrl(created.name) },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
