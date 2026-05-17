import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateSocialPost, generateWeeklyCalendar } from "@/src/lib/agents/socialMedia";

const schema = z.object({
  platform: z.enum(["instagram", "facebook", "tiktok", "linkedin"]),
  category: z.enum([
    "apartment_showcase",
    "review_repost",
    "event",
    "tip",
    "season",
    "monastery",
    "behind_scenes",
    "partner_highlight",
  ]),
  apartmentSlug: z.string().optional(),
  reviewQuote: z.string().optional(),
  reviewerName: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  customSubject: z.string().optional(),
  language: z.enum(["ro", "en"]).optional(),
  season: z.enum(["spring", "summer", "autumn", "winter"]).optional(),
});

export async function GET(req: NextRequest) {
  const platform = (req.nextUrl.searchParams.get("platform") || "instagram") as any;
  const lang = (req.nextUrl.searchParams.get("language") || "ro") as "ro" | "en";
  const calendar = generateWeeklyCalendar(platform, lang);
  return NextResponse.json({ ok: true, calendar });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }
  const post = generateSocialPost(parsed.data);
  return NextResponse.json({ ok: true, post });
}
