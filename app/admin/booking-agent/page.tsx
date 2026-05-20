"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Severity = "low" | "medium" | "high" | "critical";
type Classification = "weekday" | "weekend" | "holiday" | "shoulder" | "peak";

type Gap = {
  apartmentId: number;
  apartmentSlug: string;
  apartmentName: string;
  startDate: string;
  endDate: string;
  nights: number;
  daysUntilStart: number;
  classification: Classification;
  severity: Severity;
  priorityScore: number;
  basePrice: number;
  suggestedDiscountPct: number;
  suggestedPrice: number;
};

type Campaign = {
  id: string;
  type: string;
  channel: string;
  apartmentSlugs: string[];
  startDate: string;
  endDate: string;
  discountPct: number;
  messageRO: string;
  messageEN: string;
  whatsappMessageRO: string;
  whatsappMessageEN: string;
  rationale: string;
  estimatedReach: number;
  estimatedRevenue: number;
  status: string;
  createdAt: string;
};

type Status = {
  state: {
    paused: boolean;
    lastRunAt?: string;
    lastSummary?: string;
    totalRuns: number;
    totalGapsDetected: number;
    totalCampaignsDrafted: number;
    totalMessagesSent: number;
  };
  metrics: {
    occupancyPct: number;
    bookingsThisMonth: number;
    revenueThisMonth: number;
    upcomingGaps: number;
    criticalGaps: number;
    activeCampaigns: number;
    leadsThisWeek: number;
    conversionRate: number;
  };
  blackouts: string[];
  feeds: Record<string, string[]>;
  upcomingGaps: Gap[];
  quietHours: boolean;
};

type RunResult = {
  run: {
    id: string;
    summary: string;
    gapsDetected: number;
    campaignsDrafted: number;
    messagesSent: number;
    messagesScheduled: number;
    errors: string[];
  };
  metrics: Status["metrics"];
  gaps: Gap[];
  campaigns: Campaign[];
};

const SEVERITY_STYLE: Record<Severity, string> = {
  critical: "bg-red-100 text-red-800 border-red-300",
  high: "bg-orange-100 text-orange-800 border-orange-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  low: "bg-emerald-100 text-emerald-800 border-emerald-300",
};

const CLASS_LABEL: Record<Classification, string> = {
  weekday: "Lucrătoare",
  weekend: "Weekend",
  holiday: "Sărbătoare",
  shoulder: "Inter-sezon",
  peak: "Vârf sezon",
};

const CAMPAIGN_LABEL: Record<string, string> = {
  last_minute: "Last-minute",
  extended_stay: "Sejur lung",
  weekend_package: "Pachet weekend",
  seasonal: "Sezonier",
  diaspora: "Diaspora",
  corporate_retreat: "Retreat corporate",
  re_engagement: "Re-engagement",
};

export default function BookingAgentDashboard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [lastRun, setLastRun] = useState<RunResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [blackoutInput, setBlackoutInput] = useState("");
  const [feedSlug, setFeedSlug] = useState("apartament-1");
  const [feedUrl, setFeedUrl] = useState("");

  const refreshStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/booking-agent");
      if (res.ok) {
        const data = (await res.json()) as Status;
        setStatus(data);
        setBlackoutInput(data.blackouts.join(", "));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  async function triggerRun(dryRun: boolean) {
    setRunning(true);
    setActionMsg(null);
    try {
      const res = await fetch("/api/admin/booking-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horizonDays: 60, dryRun }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as RunResult;
      setLastRun(data);
      setActionMsg(`Run finalizat: ${data.run.summary}`);
      await refreshStatus();
    } catch (err) {
      setActionMsg(`Eroare: ${err instanceof Error ? err.message : "necunoscută"}`);
    } finally {
      setRunning(false);
    }
  }

  async function patchAction(payload: Record<string, unknown>) {
    setActionMsg(null);
    const res = await fetch("/api/admin/booking-agent", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setActionMsg(`Eroare: ${data.error ?? "necunoscută"}`);
      return;
    }
    setActionMsg("Salvat.");
    await refreshStatus();
  }

  const occupancyColor = useMemo(() => {
    const v = status?.metrics.occupancyPct ?? 0;
    if (v >= 90) return "text-emerald-600";
    if (v >= 70) return "text-walnut-600";
    return "text-red-600";
  }, [status?.metrics.occupancyPct]);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cream-50/10 grid place-items-center">
            <span className="font-display text-sm">V</span>
          </div>
          <span className="font-display text-lg">Vaias Aparts — Booking Agent</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/autopilot" className="text-sm text-cream-100/60 hover:text-cream-50">
            ← Autopilot
          </Link>
          <Link href="/admin/dashboard" className="text-sm text-cream-100/60 hover:text-cream-50">
            Dashboard
          </Link>
          <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">
            Site →
          </Link>
        </div>
      </header>

      <div className="bg-walnut-700 text-cream-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl flex items-center gap-2">
              <span>🎯</span> Booking Agent
            </h1>
            <p className="text-cream-100/70 text-sm mt-1">
              Lucrează 24/7 pentru ocupare 100%. Detectează goluri, generează campanii,
              respectă orele de liniște (23:00–07:00) și nu trimite niciodată codul cutiei de chei.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerRun(true)}
              disabled={running}
              className="rounded-xl bg-cream-50 text-walnut-700 px-4 py-2 text-sm font-semibold hover:bg-cream-100 disabled:opacity-40"
            >
              Rulează (dry-run)
            </button>
            <button
              onClick={() => triggerRun(false)}
              disabled={running}
              className="rounded-xl bg-forest-900 text-cream-50 px-4 py-2 text-sm font-semibold hover:bg-forest-800 disabled:opacity-40"
            >
              {running ? "Rulează..." : "Rulează acum"}
            </button>
            {status?.state.paused ? (
              <button
                onClick={() => patchAction({ action: "resume" })}
                className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
              >
                ▶ Reia
              </button>
            ) : (
              <button
                onClick={() => patchAction({ action: "pause" })}
                className="rounded-xl bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700"
              >
                ⏸ Pauză
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {actionMsg && (
          <div className="rounded-xl bg-cream-100 border border-stone-200 px-4 py-3 text-sm text-forest-900">
            {actionMsg}
          </div>
        )}

        {/* Status banner */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Ocupare (30z)"
            value={`${status?.metrics.occupancyPct ?? "—"}%`}
            valueClass={occupancyColor}
            icon="📊"
            loading={loading}
          />
          <StatCard
            label="Goluri viitoare"
            value={String(status?.metrics.upcomingGaps ?? "—")}
            sub={`${status?.metrics.criticalGaps ?? 0} critice`}
            icon="⚠️"
            loading={loading}
          />
          <StatCard
            label="Venit luna curentă"
            value={`${(status?.metrics.revenueThisMonth ?? 0).toLocaleString()} RON`}
            sub={`${status?.metrics.bookingsThisMonth ?? 0} rezervări`}
            icon="💰"
            loading={loading}
          />
          <StatCard
            label="Lead-uri / 7 zile"
            value={String(status?.metrics.leadsThisWeek ?? "—")}
            sub={`Conversie: ${status?.metrics.conversionRate ?? 0}%`}
            icon="📥"
            loading={loading}
          />
        </section>

        {/* Agent state */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-forest-900">Status agent</h2>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  status?.state.paused
                    ? "bg-red-100 text-red-700"
                    : status?.quietHours
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {status?.state.paused
                  ? "ÎN PAUZĂ"
                  : status?.quietHours
                  ? "ORE LINIȘTITE (23:00–07:00)"
                  : "ACTIV"}
              </span>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <dt className="text-stone-500 text-xs uppercase tracking-wider">Rulări totale</dt>
                <dd className="text-forest-900 font-medium text-lg">{status?.state.totalRuns ?? 0}</dd>
              </div>
              <div>
                <dt className="text-stone-500 text-xs uppercase tracking-wider">Goluri detectate</dt>
                <dd className="text-forest-900 font-medium text-lg">{status?.state.totalGapsDetected ?? 0}</dd>
              </div>
              <div>
                <dt className="text-stone-500 text-xs uppercase tracking-wider">Campanii draft</dt>
                <dd className="text-forest-900 font-medium text-lg">{status?.state.totalCampaignsDrafted ?? 0}</dd>
              </div>
              <div>
                <dt className="text-stone-500 text-xs uppercase tracking-wider">Mesaje trimise</dt>
                <dd className="text-forest-900 font-medium text-lg">{status?.state.totalMessagesSent ?? 0}</dd>
              </div>
            </dl>
            {status?.state.lastRunAt && (
              <p className="text-xs text-stone-500 mt-4">
                Ultima rulare:{" "}
                <span className="text-forest-900">{new Date(status.state.lastRunAt).toLocaleString("ro-RO")}</span>{" "}
                — {status.state.lastSummary}
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-forest-900 text-cream-50 shadow-soft p-6">
            <h2 className="font-display text-xl mb-3">Reguli active</h2>
            <ul className="space-y-2 text-sm text-cream-100/80">
              <li>• Ore liniștite: 23:00–07:00 (Europa/București) — capturăm, nu trimitem.</li>
              <li>• Cod cutie chei (0623#): NICIODATĂ în mesaje outbound.</li>
              <li>• Recenzii negative: nu se postează automat.</li>
              <li>• 5% taxă locală/adult/noapte la cotații.</li>
              <li>• Avans 30% rezervări directe.</li>
              <li>• Check-in 14:00 · check-out 11:00.</li>
              <li>• Contact: Vasi +40 752 388 388 · Anca +40 738 345 330.</li>
            </ul>
          </div>
        </section>

        {/* Upcoming gaps */}
        <section className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-display text-xl text-forest-900">Goluri viitoare (top 20)</h2>
            <span className="text-xs text-stone-500">
              Sortate după scor prioritate. Severitate critică = ≤3 zile.
            </span>
          </div>
          {!status?.upcomingGaps?.length ? (
            <div className="p-8 text-center text-stone-500 text-sm">
              {loading ? "Se încarcă..." : "Nici un gol în următoarele 60 de zile. 🎉"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                    <th className="px-4 py-3 text-left">Apartament</th>
                    <th className="px-4 py-3 text-left">Perioadă</th>
                    <th className="px-4 py-3 text-left">Nopți</th>
                    <th className="px-4 py-3 text-left">Tip</th>
                    <th className="px-4 py-3 text-left">Severitate</th>
                    <th className="px-4 py-3 text-left">Tarif sugerat</th>
                    <th className="px-4 py-3 text-left">Scor</th>
                  </tr>
                </thead>
                <tbody>
                  {status.upcomingGaps.map((g) => (
                    <tr key={`${g.apartmentSlug}-${g.startDate}`} className="border-t border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-3 font-medium text-forest-900">{g.apartmentName}</td>
                      <td className="px-4 py-3 text-stone-700">
                        {g.startDate} → {g.endDate}
                        <span className="text-xs text-stone-400 block">+{g.daysUntilStart} zile</span>
                      </td>
                      <td className="px-4 py-3 text-stone-700">{g.nights}</td>
                      <td className="px-4 py-3 text-stone-700">{CLASS_LABEL[g.classification]}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${SEVERITY_STYLE[g.severity]}`}>
                          {g.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-forest-900 font-medium">
                        {g.suggestedPrice} RON
                        <span className="text-xs text-walnut-600 block">−{g.suggestedDiscountPct}%</span>
                      </td>
                      <td className="px-4 py-3 text-stone-700">{g.priorityScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Campaigns drafted in last run */}
        {lastRun && lastRun.campaigns.length > 0 && (
          <section className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h2 className="font-display text-xl text-forest-900">
                Campanii din ultima rulare ({lastRun.campaigns.length})
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Mesajele sunt draft-uri. În afara orelor de liniște, cele cu destinatar sunt trimise; restul rămân în coadă.
              </p>
            </div>
            <div className="divide-y divide-stone-100">
              {lastRun.campaigns.slice(0, 12).map((c) => (
                <div key={c.id} className="p-5 hover:bg-stone-50">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-walnut-100 text-walnut-800 font-medium">
                      {CAMPAIGN_LABEL[c.type] ?? c.type}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-forest-100 text-forest-800">
                      {c.channel}
                    </span>
                    <span className="text-xs text-stone-500">
                      {c.startDate} → {c.endDate}
                    </span>
                    <span className="text-xs text-stone-500">−{c.discountPct}%</span>
                    <span className="text-xs text-stone-500 ml-auto">
                      Reach ~{c.estimatedReach} · ~{c.estimatedRevenue.toLocaleString()} RON
                    </span>
                  </div>
                  <p className="text-sm text-forest-900 whitespace-pre-line">{c.messageRO}</p>
                  <p className="text-xs text-stone-500 mt-2 italic">{c.rationale}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Overrides */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
            <h2 className="font-display text-xl text-forest-900 mb-3">Zile blacklisted</h2>
            <p className="text-xs text-stone-500 mb-3">
              Date pe care agentul le ignoră complet (renovări, evenimente private). Format CSV: yyyy-mm-dd, yyyy-mm-dd.
            </p>
            <textarea
              value={blackoutInput}
              onChange={(e) => setBlackoutInput(e.target.value)}
              rows={3}
              placeholder="2026-06-15, 2026-06-16, 2026-12-24"
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-mono text-forest-900"
            />
            <button
              onClick={() => {
                const dates = blackoutInput
                  .split(/[,\s]+/)
                  .map((s) => s.trim())
                  .filter(Boolean);
                void patchAction({ action: "set_blackouts", dates });
              }}
              className="mt-3 rounded-xl bg-forest-900 text-cream-50 px-4 py-2 text-sm font-medium hover:bg-forest-800"
            >
              Salvează blacklist
            </button>
          </div>

          <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
            <h2 className="font-display text-xl text-forest-900 mb-3">Feed-uri iCal externe (5StarDesk / OTA)</h2>
            <p className="text-xs text-stone-500 mb-3">
              Adăugați iCal-uri din 5StarDesk, Booking.com, Airbnb pentru fiecare apartament. Vor fi fuzionate la următoarea rulare.
            </p>
            <div className="space-y-3">
              {Object.entries(status?.feeds ?? {}).map(([slug, urls]) => (
                <div key={slug} className="text-xs">
                  <div className="font-medium text-forest-900">{slug}</div>
                  <ul className="list-disc pl-5 text-stone-600 break-all">
                    {urls.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <select
                value={feedSlug}
                onChange={(e) => setFeedSlug(e.target.value)}
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={`apartament-${n}`}>
                    Apartament {n}
                  </option>
                ))}
              </select>
              <input
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                placeholder="https://app.5stardesk.com/ical/.../feed.ics"
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-mono"
              />
              <button
                onClick={() => {
                  const nextFeeds = { ...(status?.feeds ?? {}) };
                  const list = nextFeeds[feedSlug] ?? [];
                  if (feedUrl && !list.includes(feedUrl)) {
                    nextFeeds[feedSlug] = [...list, feedUrl];
                  }
                  void patchAction({ action: "set_feeds", feeds: nextFeeds });
                  setFeedUrl("");
                }}
                className="rounded-xl bg-forest-900 text-cream-50 px-4 py-2 text-sm font-medium hover:bg-forest-800"
              >
                Adaugă feed
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
          <h2 className="font-display text-xl text-forest-900 mb-3">Reguli de preț</h2>
          <p className="text-xs text-stone-500 mb-3">
            Aplică un multiplicator de preț pentru perioade specifice. Ex: 1.2 pentru o săptămână de vârf. Se cumulează cu regulile sezoniere.
          </p>
          <form
            className="grid gap-3 sm:grid-cols-5"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              void patchAction({
                action: "set_pricing",
                apartmentSlug: formData.get("apartmentSlug"),
                multiplier: Number(formData.get("multiplier")),
                startDate: formData.get("startDate") || undefined,
                endDate: formData.get("endDate") || undefined,
              });
              form.reset();
            }}
          >
            <select
              name="apartmentSlug"
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
              defaultValue="all"
            >
              <option value="all">Toate apartamentele</option>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={`apartament-${n}`}>
                  Apartament {n}
                </option>
              ))}
            </select>
            <input
              name="multiplier"
              type="number"
              step="0.05"
              min="0.5"
              max="3"
              defaultValue="1.2"
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
              placeholder="Multiplicator"
            />
            <input
              name="startDate"
              type="date"
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
            <input
              name="endDate"
              type="date"
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-forest-900 text-cream-50 px-4 py-2 text-sm font-medium hover:bg-forest-800"
            >
              Aplică regulă
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  valueClass,
  loading,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: string;
  valueClass?: string;
  loading?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-cream-50 border border-stone-200 p-6 shadow-soft">
      <div className="h-10 w-10 rounded-full bg-walnut-700 text-cream-50 grid place-items-center text-lg mb-4">
        {icon}
      </div>
      <div className={`font-display text-3xl ${valueClass ?? "text-forest-900"} ${loading ? "animate-pulse" : ""}`}>
        {value}
      </div>
      <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{label}</div>
      {sub && <div className="text-xs text-stone-500 mt-1">{sub}</div>}
    </div>
  );
}
