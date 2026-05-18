// Public endpoint called from /cum-ajungi when a visitor clicks an airport /
// city-break origin card. Records a Lead row, returns a personalised greeting,
// and queues a Day-1 / Day-3 / Day-7 engagement sequence in the agent.
//
// Rate-limited per IP via a simple in-memory bucket (sufficient for current
// scale; swap for Vercel Edge Config or KV if traffic grows).

import { NextRequest, NextResponse } from "next/server";
import { recordLead } from "@/lib/agents/bookingAgent";
import { resolveOrigin } from "@/lib/agents/leadOrigin";

type Bucket = { count: number; resetAt: number };
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
const buckets = new Map<string, Bucket>();

function rateLimitKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "anon";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count++;
  return bucket.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const key = rateLimitKey(req);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const airportCode = typeof body.airportCode === "string" ? body.airportCode.slice(0, 10) : undefined;
  const cityHint = typeof body.cityHint === "string" ? body.cityHint.slice(0, 80) : undefined;
  const countryCode = typeof body.countryCode === "string" ? body.countryCode.slice(0, 4) : undefined;
  const utmSource = typeof body.utmSource === "string" ? body.utmSource.slice(0, 80) : undefined;
  const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 200) : req.headers.get("referer") ?? undefined;
  const name = typeof body.name === "string" ? body.name : undefined;
  const phone = typeof body.phone === "string" ? body.phone : undefined;
  const email = typeof body.email === "string" ? body.email : undefined;
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 400) : undefined;

  const detectedLang =
    typeof body.detectedLang === "string"
      ? body.detectedLang.slice(0, 10)
      : req.headers.get("accept-language")?.split(",")[0]?.slice(0, 10);

  try {
    const lead = await recordLead({
      name,
      phone,
      email,
      notes,
      origin: { airportCode, cityHint, countryCode, utmSource, referrer, detectedLang },
    });

    const origin = resolveOrigin({ airportCode, city: cityHint, countryCode });

    return NextResponse.json({
      ok: true,
      leadId: lead.leadId,
      origin,
      suggestedCampaign: lead.suggestedCampaign
        ? {
            id: lead.suggestedCampaign.id,
            type: lead.suggestedCampaign.type,
            messageRO: lead.suggestedCampaign.messageRO,
            messageEN: lead.suggestedCampaign.messageEN,
            whatsappRO: lead.suggestedCampaign.whatsappMessageRO,
            whatsappEN: lead.suggestedCampaign.whatsappMessageEN,
            discountPct: lead.suggestedCampaign.discountPct,
          }
        : null,
      engagement: lead.engagement,
    });
  } catch (err) {
    console.error("[leads/track-origin]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
