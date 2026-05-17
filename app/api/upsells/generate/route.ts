import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateUpsell, UPSELL_CATALOG } from "@/src/lib/agents/upsellEngine";

const schema = z.object({
  bookingRef: z.string().optional(),
  guestName: z.string().optional(),
  apartmentSlug: z.string().optional(),
  guestType: z.enum(["family", "couple", "pilgrim", "business", "diaspora", "wellness", "any"]).optional(),
  language: z.enum(["ro", "en"]).optional(),
  nights: z.number().int().positive().optional(),
  category: z.enum(["pre_arrival", "in_stay", "post_stay"]).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }
  const result = generateUpsell(parsed.data);
  return NextResponse.json({ ok: true, ...result });
}

export async function GET() {
  return NextResponse.json({ ok: true, catalog: UPSELL_CATALOG });
}
