/**
 * Cron entry-point — Review Request Agent.
 *
 * Vercel cron (configured in vercel.json) hits this endpoint every hour. The
 * agent finds guests who checked out 48h+ ago without a review request and
 * sends the platform-specific review links. It operates 24/7/365.
 *
 * Auth: accepts either Vercel's signed cron header or `Authorization: Bearer
 * $CRON_SECRET` for manual pokes (curl, the admin UI). Mirrors the other cron
 * routes so all three behave identically.
 */

import { NextRequest, NextResponse } from "next/server";
import { runReviewRequestAgent } from "@/lib/guest-journey/reviewRequestAgent";

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // No secret configured → only accept Vercel's signed cron header.
    return (
      req.headers.get("x-vercel-cron-secret") === "1" ||
      req.headers.has("x-vercel-cron")
    );
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
  const { searchParams } = new URL(req.url);
  const dryRun = searchParams.get("dryRun") === "1";
  const bookingRef = searchParams.get("bookingRef") ?? undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.max(1, Math.min(500, Number(limitParam))) : undefined;

  try {
    const result = await runReviewRequestAgent({ dryRun, bookingRef, limit });
    return NextResponse.json({
      ok: true,
      summary: result.summary,
      scannedBookings: result.scannedBookings,
      due: result.due,
      sent: result.outcomes.filter((o) => o.status === "sent").length,
      skipped: result.outcomes.filter((o) => o.status === "skipped").length,
      requests: result.outcomes.map((o) => ({
        bookingRef: o.bookingRef,
        guestName: o.guestName,
        apartment: o.apartment,
        source: o.source,
        channel: o.channel,
        languages: o.languages,
        platforms: o.platforms,
        status: o.status,
        error: o.error,
      })),
      errors: result.outcomes
        .filter((o) => o.status === "error")
        .map((o) => ({ bookingRef: o.bookingRef, error: o.error })),
    });
  } catch (err) {
    console.error("[cron][review-requests]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

// Allow POST too — handy for one-off pokes via curl.
export const POST = GET;
