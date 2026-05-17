import { NextRequest, NextResponse } from "next/server";
import { DIRECT_BENEFITS, compareWithOTA, evaluateBRG } from "@/src/lib/agents/directBookingOptimizer";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const directPrice = Number(url.searchParams.get("directPrice") || "0");
  const otaPrice = url.searchParams.get("otaPrice") ? Number(url.searchParams.get("otaPrice")) : undefined;

  if (directPrice > 0) {
    return NextResponse.json({ ok: true, comparison: compareWithOTA(directPrice, otaPrice) });
  }
  return NextResponse.json({ ok: true, benefits: DIRECT_BENEFITS });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body.kind === "brg") {
    return NextResponse.json({ ok: true, decision: evaluateBRG(body.claim) });
  }
  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
