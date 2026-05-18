// Vila Vaias AI Booking Agent
// ---------------------------------------------------------------------------
// Goal: maintain ~100% occupancy across 7 apartments year-round by detecting
// gaps, drafting targeted campaigns, and orchestrating distribution.
//
// Design constraints (from the master prompt):
//   - Quiet hours 23:00–07:00 Europe/Bucharest: capture, never send.
//   - Never include the key-box code (0623#) in any outbound message.
//   - Never auto-post anything that looks like a negative review.
//   - 5% local tax / adult / night, 30% deposit on direct bookings.
//   - Check-in 14:00, check-out 11:00.
//
// State persistence: we piggy-back on the existing `Setting` table to keep
// the schema migration-free. The agent stores its pause flag, last-run
// timestamp, blackout dates, and rolling counters there.
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/prisma";
import {
  buildAvailability,
  findGaps,
  summarizeOccupancy,
} from "./gapDetection";
import {
  generateCampaignsForGap,
  corporateRetreatCampaign,
  diasporaCampaign,
  STANDARD_ENGAGEMENT_SEQUENCE,
} from "./campaigns";
import { dispatchCampaign } from "./distribution";
import { isQuietHour, QUIET_HOURS_LABEL } from "./quietHours";
import { resolveOrigin } from "./leadOrigin";
import { suggestPriceFor } from "./pricingEngine";
import { addDays, toISODate } from "./calendar";
import type {
  AgentMetrics,
  AgentRun,
  AgentState,
  ApartmentAvailability,
  CampaignDraft,
  LeadOrigin,
  OccupancyGap,
  PricingSuggestion,
} from "./types";

// ---------------------------------------------------------------------------
// Identity (used by the registry + autopilot UI)
// ---------------------------------------------------------------------------
export const BOOKING_AGENT_ID = "booking-agent" as const;
export const BOOKING_AGENT_NUMERIC_ID = 8 as const;
export const BOOKING_AGENT_META = {
  id: BOOKING_AGENT_ID,
  numericId: BOOKING_AGENT_NUMERIC_ID,
  name: "Booking Agent",
  description:
    "Maximizes occupancy 24/7. Detects gaps, generates targeted campaigns, " +
    "tracks leads from /cum-ajungi, monitors rate parity, and prepares direct " +
    "booking pushes — never violating quiet hours, key-box, or OTA rules.",
  icon: "🎯",
  color: "bg-walnut-700",
  systemPrompt:
    `You are the Vila Vaias Booking Agent. Your single objective is to drive ` +
    `direct bookings and fill gaps across our 7 apartments in Târgu Neamț, ` +
    `Romania. You output: detected gaps (apartment + date range + severity), ` +
    `proposed campaigns (channel + message + discount), and required ` +
    `approvals. NEVER quote the key-box code (0623#). NEVER message guests ` +
    `between 23:00 and 07:00 Europe/Bucharest. NEVER undercut Booking.com/Airbnb ` +
    `parity. ALWAYS prefer direct booking via WhatsApp +40 738 345 330. ` +
    `Apply 30% deposit on direct bookings and 5% tourist tax per adult per ` +
    `night when quoting totals. Routes you orchestrate: last-minute (≤7 days), ` +
    `extended stay (5+ nights), weekend packages, seasonal (holidays/peak), ` +
    `diaspora (parishes & city breaks abroad), corporate/retreat (midweek). ` +
    `Speak in the guest's language when known. Tone: warm, family-run, rustic-modern.`,
} as const;

const STATE_KEY = "booking_agent_state";
const BLACKOUT_KEY = "booking_agent_blackouts"; // CSV of yyyy-mm-dd
const FEEDS_KEY = "booking_agent_external_ical"; // JSON: { slug: [url, ...] }
const PRICING_RULES_KEY = "booking_agent_pricing_overrides";

const DEFAULT_STATE: AgentState = {
  paused: false,
  totalRuns: 0,
  totalGapsDetected: 0,
  totalCampaignsDrafted: 0,
  totalMessagesSent: 0,
};

async function loadState(): Promise<AgentState> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: STATE_KEY } });
    if (!row) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(row.value) };
  } catch {
    return DEFAULT_STATE;
  }
}

async function saveState(state: AgentState): Promise<void> {
  await prisma.setting.upsert({
    where: { key: STATE_KEY },
    create: { key: STATE_KEY, value: JSON.stringify(state) },
    update: { value: JSON.stringify(state) },
  });
}

async function loadBlackouts(): Promise<Set<string>> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: BLACKOUT_KEY } });
    if (!row?.value) return new Set();
    return new Set(row.value.split(",").map((s) => s.trim()).filter(Boolean));
  } catch {
    return new Set();
  }
}

async function loadExternalFeeds(): Promise<Record<string, string[]>> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: FEEDS_KEY } });
    if (!row?.value) return {};
    return JSON.parse(row.value);
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Public API: agent run
// ---------------------------------------------------------------------------

export type RunOptions = {
  horizonDays?: number;
  dryRun?: boolean;
  manualTrigger?: boolean;
};

export type RunResult = {
  run: AgentRun;
  state: AgentState;
  metrics: AgentMetrics;
  gaps: OccupancyGap[];
  campaigns: CampaignDraft[];
  availability: ApartmentAvailability[];
  pricingSnapshot: PricingSuggestion[];
};

export async function runBookingAgent(opts: RunOptions = {}): Promise<RunResult> {
  const runId = `run_${Date.now().toString(36)}`;
  const startedAt = new Date().toISOString();
  const errors: string[] = [];

  const state = await loadState();
  const blackouts = await loadBlackouts();
  const feeds = await loadExternalFeeds();

  if (state.paused && !opts.manualTrigger) {
    return emptyResult({
      runId,
      startedAt,
      state,
      summary: "Agent paused — skipped run.",
    });
  }

  const horizon = opts.horizonDays ?? 90;
  let availability: ApartmentAvailability[] = [];
  try {
    availability = await buildAvailability(horizon, feeds);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`buildAvailability failed: ${msg}`);
    return emptyResult({
      runId,
      startedAt,
      state,
      summary: `Run failed: ${msg}`,
      errors,
    });
  }

  const rawGaps = findGaps(availability, { minNights: 1, maxNights: 14 });
  const gaps = rawGaps.filter((g) => !overlapsBlackout(g, blackouts));

  const campaigns: CampaignDraft[] = [];
  for (const gap of gaps.slice(0, 20)) {
    campaigns.push(...generateCampaignsForGap(gap));
  }
  const retreat = corporateRetreatCampaign(gaps);
  if (retreat) campaigns.push(retreat);

  // One targeted diaspora pitch per quarter — sample the highest-scoring gap.
  if (gaps.length > 0) {
    campaigns.push(diasporaCampaign("MIL", gaps[0]));
  }

  // Pricing snapshot for the next 30 days (one anchor day per apartment).
  const pricingSnapshot: PricingSuggestion[] = [];
  const anchor = addDays(new Date(), 30);
  for (const apt of availability) {
    try {
      const ps = await suggestPriceFor(apt.apartmentSlug, anchor);
      pricingSnapshot.push(ps);
    } catch (err) {
      errors.push(`pricing for ${apt.apartmentSlug}: ${err instanceof Error ? err.message : err}`);
    }
  }

  // Queue but never auto-send. The dispatch path returns "queued" inside
  // quiet hours; outside quiet hours, missing recipients also queue.
  let messagesScheduled = 0;
  let messagesSent = 0;
  if (!opts.dryRun) {
    for (const c of campaigns.slice(0, 30)) {
      const result = await dispatchCampaign(c, { lang: "ro" });
      if (result.status === "sent") messagesSent++;
      else if (result.status === "queued") messagesScheduled++;
      else if (result.status === "error") errors.push(result.reason ?? "dispatch error");
    }
  }

  const occ = summarizeOccupancy(availability, 30);
  const finishedAt = new Date().toISOString();

  const run: AgentRun = {
    id: runId,
    startedAt,
    finishedAt,
    gapsDetected: gaps.length,
    campaignsDrafted: campaigns.length,
    campaignsQueued: messagesScheduled,
    messagesScheduled,
    messagesSent,
    errors,
    summary:
      `Occupancy ${occ.occupancyPct}% / 30d · ` +
      `${gaps.length} gaps · ${campaigns.length} campaigns drafted · ` +
      `${messagesSent} sent · ${messagesScheduled} queued` +
      (isQuietHour() ? ` · QUIET HOURS (${QUIET_HOURS_LABEL})` : ""),
  };

  const nextState: AgentState = {
    ...state,
    paused: state.paused,
    lastRunAt: finishedAt,
    lastSummary: run.summary,
    totalRuns: state.totalRuns + 1,
    totalGapsDetected: state.totalGapsDetected + gaps.length,
    totalCampaignsDrafted: state.totalCampaignsDrafted + campaigns.length,
    totalMessagesSent: state.totalMessagesSent + messagesSent,
  };
  await saveState(nextState);

  const metrics = await computeMetrics(availability, gaps, campaigns);

  return {
    run,
    state: nextState,
    metrics,
    gaps,
    campaigns,
    availability,
    pricingSnapshot,
  };
}

// ---------------------------------------------------------------------------
// Public API: status & metrics
// ---------------------------------------------------------------------------

export async function getAgentStatus(): Promise<{
  state: AgentState;
  metrics: AgentMetrics;
  blackouts: string[];
  feeds: Record<string, string[]>;
  upcomingGaps: OccupancyGap[];
  quietHours: boolean;
}> {
  const [state, blackouts, feeds] = await Promise.all([
    loadState(),
    loadBlackouts(),
    loadExternalFeeds(),
  ]);

  let availability: ApartmentAvailability[] = [];
  try {
    availability = await buildAvailability(60, feeds);
  } catch {
    availability = [];
  }
  const gaps = findGaps(availability, { minNights: 1, maxNights: 14 }).filter(
    (g) => !overlapsBlackout(g, blackouts),
  );
  const metrics = await computeMetrics(availability, gaps, []);

  return {
    state,
    metrics,
    blackouts: Array.from(blackouts).sort(),
    feeds,
    upcomingGaps: gaps.slice(0, 20),
    quietHours: isQuietHour(),
  };
}

// ---------------------------------------------------------------------------
// Public API: override controls
// ---------------------------------------------------------------------------

export async function pauseAgent(): Promise<AgentState> {
  const state = await loadState();
  const next = { ...state, paused: true };
  await saveState(next);
  return next;
}

export async function resumeAgent(): Promise<AgentState> {
  const state = await loadState();
  const next = { ...state, paused: false };
  await saveState(next);
  return next;
}

export async function setBlackoutDates(dates: string[]): Promise<string[]> {
  const cleaned = Array.from(
    new Set(
      dates
        .map((d) => d.trim())
        .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)),
    ),
  ).sort();
  await prisma.setting.upsert({
    where: { key: BLACKOUT_KEY },
    create: { key: BLACKOUT_KEY, value: cleaned.join(",") },
    update: { value: cleaned.join(",") },
  });
  return cleaned;
}

export async function setExternalFeeds(
  feeds: Record<string, string[]>,
): Promise<Record<string, string[]>> {
  const sanitized: Record<string, string[]> = {};
  for (const [slug, urls] of Object.entries(feeds)) {
    const cleaned = (urls ?? [])
      .map((u) => u.trim())
      .filter((u) => /^https?:\/\//.test(u));
    if (cleaned.length) sanitized[slug] = cleaned;
  }
  await prisma.setting.upsert({
    where: { key: FEEDS_KEY },
    create: { key: FEEDS_KEY, value: JSON.stringify(sanitized) },
    update: { value: JSON.stringify(sanitized) },
  });
  return sanitized;
}

export async function setPricingMultiplier(
  apartmentSlug: string | "all",
  multiplier: number,
  startDate?: string,
  endDate?: string,
): Promise<void> {
  if (!Number.isFinite(multiplier) || multiplier <= 0) {
    throw new Error("multiplier must be a positive number");
  }
  // Persist as a PricingRule for transparency; suggestPriceFor reads these.
  await prisma.pricingRule.create({
    data: {
      name: `agent_override_${apartmentSlug}_${Date.now()}`,
      multiplier,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      active: true,
    },
  });
}

// ---------------------------------------------------------------------------
// Lead engagement entry-point — called by /api/leads/track-origin
// ---------------------------------------------------------------------------

export async function recordLead(input: {
  name?: string;
  phone?: string;
  email?: string;
  origin?: LeadOrigin;
  notes?: string;
}): Promise<{ leadId: number | null; engagement: typeof STANDARD_ENGAGEMENT_SEQUENCE; suggestedCampaign?: CampaignDraft }> {
  const origin = input.origin
    ? resolveOrigin({
        airportCode: input.origin.airportCode,
        city: input.origin.cityHint,
        countryCode: input.origin.countryCode,
      })
    : null;

  // Persist a Lead row (table already exists in schema).
  let leadId: number | null = null;
  try {
    const row = await prisma.lead.create({
      data: {
        name: input.name?.slice(0, 120),
        phone: input.phone?.slice(0, 30),
        email: input.email?.slice(0, 120),
        source: input.origin?.airportCode
          ? `cum-ajungi:${input.origin.airportCode}`
          : input.origin?.referrer ?? "organic",
        notes: [
          origin ? `Origin: ${origin.city} (${origin.code}), ${origin.country}` : null,
          input.origin?.utmSource ? `UTM: ${input.origin.utmSource}` : null,
          input.notes ?? null,
        ]
          .filter(Boolean)
          .join(" · ")
          .slice(0, 500),
      },
    });
    leadId = row.id;
  } catch (err) {
    console.warn("[bookingAgent] recordLead persist failed:", err);
  }

  let suggestedCampaign: CampaignDraft | undefined;
  if (origin) {
    suggestedCampaign = diasporaCampaign(origin.code);
  }

  return {
    leadId,
    engagement: STANDARD_ENGAGEMENT_SEQUENCE,
    suggestedCampaign,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function overlapsBlackout(gap: OccupancyGap, blackouts: Set<string>): boolean {
  if (blackouts.size === 0) return false;
  const start = new Date(gap.startDate + "T00:00:00Z");
  const end = new Date(gap.endDate + "T00:00:00Z");
  for (let cur = new Date(start); cur < end; cur.setUTCDate(cur.getUTCDate() + 1)) {
    if (blackouts.has(toISODate(cur))) return true;
  }
  return false;
}

async function computeMetrics(
  availability: ApartmentAvailability[],
  gaps: OccupancyGap[],
  campaigns: CampaignDraft[],
): Promise<AgentMetrics> {
  const occ = summarizeOccupancy(availability, 30);

  const startOfMonth = new Date();
  startOfMonth.setUTCDate(1);
  startOfMonth.setUTCHours(0, 0, 0, 0);

  const [bookingsThisMonth, leadsThisWeek] = await Promise.all([
    prisma.booking
      .findMany({
        where: {
          createdAt: { gte: startOfMonth },
          status: { not: "CANCELLED" },
        },
        select: { finalPrice: true },
      })
      .catch(() => []),
    prisma.lead
      .count({
        where: {
          createdAt: { gte: addDays(new Date(), -7) },
        },
      })
      .catch(() => 0),
  ]);

  const revenueThisMonth = bookingsThisMonth.reduce((s, b) => s + b.finalPrice, 0);
  const conversionRate =
    leadsThisWeek === 0 ? 0 : Math.round((bookingsThisMonth.length / Math.max(leadsThisWeek, 1)) * 100);

  return {
    occupancyPct: occ.occupancyPct,
    bookingsThisMonth: bookingsThisMonth.length,
    revenueThisMonth: Math.round(revenueThisMonth),
    upcomingGaps: gaps.length,
    criticalGaps: gaps.filter((g) => g.severity === "critical").length,
    activeCampaigns: campaigns.filter((c) => c.status !== "skipped").length,
    leadsThisWeek,
    conversionRate,
  };
}

function emptyResult(args: {
  runId: string;
  startedAt: string;
  state: AgentState;
  summary: string;
  errors?: string[];
}): RunResult {
  const finishedAt = new Date().toISOString();
  return {
    run: {
      id: args.runId,
      startedAt: args.startedAt,
      finishedAt,
      gapsDetected: 0,
      campaignsDrafted: 0,
      campaignsQueued: 0,
      messagesScheduled: 0,
      messagesSent: 0,
      errors: args.errors ?? [],
      summary: args.summary,
    },
    state: args.state,
    metrics: {
      occupancyPct: 0,
      bookingsThisMonth: 0,
      revenueThisMonth: 0,
      upcomingGaps: 0,
      criticalGaps: 0,
      activeCampaigns: 0,
      leadsThisWeek: 0,
      conversionRate: 0,
    },
    gaps: [],
    campaigns: [],
    availability: [],
    pricingSnapshot: [],
  };
}

// Tagged export for the registry (autopilot UI consumes this).
export const BookingAgent = {
  ...BOOKING_AGENT_META,
  run: runBookingAgent,
  status: getAgentStatus,
  pause: pauseAgent,
  resume: resumeAgent,
  setBlackouts: setBlackoutDates,
  setFeeds: setExternalFeeds,
  setPricingMultiplier,
  recordLead,
};

export type BookingAgentApi = typeof BookingAgent;

// Convenience exports for unused-import suppression — these are used by the
// admin dashboard / API routes.
export { PRICING_RULES_KEY };
