/**
 * Cron entry-point — Guest Communication Agent.
 *
 * Vercel cron (configured in vercel.json) hits this endpoint every 15 minutes.
 * The agent operates 24/7/365 — there are no quiet hours, per master prompt.
 *
 * Auth: accepts either Vercel's signed cron header or `Authorization: Bearer
 * $CRON_SECRET` for manual pokes (curl, the admin UI's "Send now" button).
 */

import { NextRequest, NextResponse } from "next/server";
import {
  runGuestCommunicationAgent,
  previewUpcomingMessages,
} from "@/lib/agents/guestCommunication";

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
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
  const previewOnly = searchParams.get("preview") === "1";
  const bookingRef = searchParams.get("bookingRef") ?? undefined;

  try {
    if (previewOnly) {
      const horizon = Number(searchParams.get("horizon") ?? 14);
      const plans = await previewUpcomingMessages(horizon);
      return NextResponse.json({
        ok: true,
        previewed: plans.length,
        plans: plans.map((p) => ({
          bookingRef: p.bookingRef,
          templateKey: p.templateKey,
          scenario: p.scenario,
          channel: p.channel,
          languages: p.languages,
          scheduledFor: p.scheduledFor.toISOString(),
          preview: p.preview,
        })),
      });
    }

    const result = await runGuestCommunicationAgent({ dryRun, bookingRef });
    return NextResponse.json({
      ok: true,
      summary: result.summary,
      scannedBookings: result.scannedBookings,
      due: result.duePlans.length,
      sent: result.outcomes.filter((o) => o.status === "sent").length,
      skipped: result.outcomes.filter((o) => o.status === "skipped").length,
      errors: result.outcomes
        .filter((o) => o.status === "error")
        .map((o) => ({ bookingRef: o.bookingRef, key: o.templateKey, error: o.error })),
    });
  } catch (err) {
    console.error("[cron][guest-messages]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

export const POST = GET;
