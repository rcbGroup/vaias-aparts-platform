import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getAgentStatus,
  pauseAgent,
  resumeAgent,
  runBookingAgent,
  setBlackoutDates,
  setExternalFeeds,
  setPricingMultiplier,
} from "@/lib/agents/bookingAgent";

// GET → current status, metrics, upcoming gaps
export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  try {
    const status = await getAgentStatus();
    return NextResponse.json(status);
  } catch (err) {
    console.error("[booking-agent][GET]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

// POST → trigger a manual run (admin override; runs even when paused)
export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const horizonDays =
      typeof body.horizonDays === "number"
        ? Math.min(Math.max(body.horizonDays, 7), 90)
        : 60;
    const dryRun = body.dryRun !== false; // default: dry-run for safety

    const result = await runBookingAgent({
      horizonDays,
      dryRun,
      manualTrigger: true,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[booking-agent][POST]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

// PATCH → control surface (pause / resume / blackouts / feeds / pricing)
export async function PATCH(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const action = body.action as string | undefined;

    switch (action) {
      case "pause": {
        const state = await pauseAgent();
        return NextResponse.json({ ok: true, state });
      }
      case "resume": {
        const state = await resumeAgent();
        return NextResponse.json({ ok: true, state });
      }
      case "set_blackouts": {
        const dates = Array.isArray(body.dates) ? body.dates : [];
        const saved = await setBlackoutDates(dates);
        return NextResponse.json({ ok: true, blackouts: saved });
      }
      case "set_feeds": {
        const feeds =
          typeof body.feeds === "object" && body.feeds !== null
            ? (body.feeds as Record<string, string[]>)
            : {};
        const saved = await setExternalFeeds(feeds);
        return NextResponse.json({ ok: true, feeds: saved });
      }
      case "set_pricing": {
        const slug = (body.apartmentSlug as string) ?? "all";
        const multiplier = Number(body.multiplier);
        const start = body.startDate as string | undefined;
        const end = body.endDate as string | undefined;
        if (!Number.isFinite(multiplier) || multiplier <= 0) {
          return NextResponse.json(
            { error: "multiplier must be a positive number" },
            { status: 400 },
          );
        }
        await setPricingMultiplier(slug, multiplier, start, end);
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json(
          {
            error:
              `Unknown action. Expected one of: pause, resume, set_blackouts, set_feeds, set_pricing.`,
          },
          { status: 400 },
        );
    }
  } catch (err) {
    console.error("[booking-agent][PATCH]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
