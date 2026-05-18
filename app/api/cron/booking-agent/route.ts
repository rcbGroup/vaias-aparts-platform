// Cron entry-point — wire up in vercel.json:
//   { "crons": [{ "path": "/api/cron/booking-agent", "schedule": "0 * * * *" }] }
//
// Vercel attaches a `CRON_SECRET` header (`x-vercel-cron-secret`) when the
// schedule fires. We accept either that header or a Bearer token equal to
// CRON_SECRET so the route can be invoked manually for debugging.

import { NextRequest, NextResponse } from "next/server";
import { runBookingAgent } from "@/lib/agents/bookingAgent";

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // No secret configured → only accept Vercel's signed cron header.
    return req.headers.get("x-vercel-cron-secret") === "1" || req.headers.has("x-vercel-cron");
  }
  if (req.headers.get("x-vercel-cron-secret") === secret) return true;
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const result = await runBookingAgent({ horizonDays: 60, dryRun: false });
    return NextResponse.json({
      ok: true,
      summary: result.run.summary,
      gaps: result.gaps.length,
      campaigns: result.campaigns.length,
      messagesSent: result.run.messagesSent,
      messagesScheduled: result.run.messagesScheduled,
    });
  } catch (err) {
    console.error("[cron][booking-agent]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

// Allow POST too — handy for one-off pokes via curl.
export const POST = GET;
