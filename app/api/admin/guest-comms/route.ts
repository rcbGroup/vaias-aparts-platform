/**
 * Admin API — Guest Communication Agent.
 *
 *   GET            → dashboard payload (upcoming, recent, review board)
 *   GET ?run=1     → manually run the agent (dry-run unless `dryRun=0`)
 *   POST { bookingRef, templateKey } → re-send a specific message
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getRecentSentMessages,
  getReviewRequestStatusBoard,
  previewUpcomingMessages,
  runGuestCommunicationAgent,
} from "@/lib/agents/guestCommunication";

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const shouldRun = searchParams.get("run") === "1";
  const dryRun = searchParams.get("dryRun") !== "0";

  try {
    if (shouldRun) {
      const result = await runGuestCommunicationAgent({ dryRun });
      return NextResponse.json({
        ok: true,
        ran: true,
        dryRun,
        summary: result.summary,
        scannedBookings: result.scannedBookings,
        duePlans: result.duePlans.length,
        outcomes: result.outcomes.map((o) => ({
          bookingRef: o.bookingRef,
          templateKey: o.templateKey,
          status: o.status,
          channel: o.channel,
          error: o.error,
          scheduledFor: o.scheduledFor.toISOString(),
          languages: o.languages,
        })),
      });
    }

    const horizon = Number(searchParams.get("horizon") ?? 14);
    const [upcoming, recent, reviewBoard] = await Promise.all([
      previewUpcomingMessages(horizon),
      getRecentSentMessages(50),
      getReviewRequestStatusBoard(30),
    ]);

    return NextResponse.json({
      ok: true,
      upcoming: upcoming.map((u) => ({
        bookingRef: u.bookingRef,
        templateKey: u.templateKey,
        scenario: u.scenario,
        channel: u.channel,
        languages: u.languages,
        scheduledFor: u.scheduledFor.toISOString(),
        preview: u.preview,
      })),
      recent: recent.map((r) => ({
        id: r.id,
        bookingRef: r.bookingRef,
        guestName: r.guestName,
        apartment: r.apartment,
        templateKey: r.templateKey,
        language: r.language,
        channel: r.channel,
        status: r.status,
        delivered: r.delivered,
        deliveredAt: r.deliveredAt?.toISOString() ?? null,
        createdAt: r.createdAt.toISOString(),
        errorMessage: r.errorMessage,
      })),
      reviewBoard: reviewBoard.map((b) => ({
        ...b,
        checkOut: b.checkOut.toISOString(),
        reviewSentAt: b.reviewSentAt?.toISOString() ?? null,
      })),
    });
  } catch (err) {
    console.error("[admin][guest-comms][GET]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  try {
    const body = (await req.json().catch(() => ({}))) as {
      bookingRef?: string;
      templateKey?: string;
      dryRun?: boolean;
    };
    if (!body.bookingRef) {
      return NextResponse.json({ error: "bookingRef required" }, { status: 400 });
    }
    const result = await runGuestCommunicationAgent({
      bookingRef: body.bookingRef,
      templateKey: body.templateKey as never,
      dryRun: Boolean(body.dryRun),
    });
    return NextResponse.json({ ok: true, summary: result.summary, outcomes: result.outcomes });
  } catch (err) {
    console.error("[admin][guest-comms][POST]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
