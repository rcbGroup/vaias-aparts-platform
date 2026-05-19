"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Plan = {
  bookingRef: string;
  templateKey: string;
  scenario: "A" | "B" | "C" | "D" | "E" | "F";
  channel: "whatsapp" | "email";
  languages: string[];
  scheduledFor: string;
  preview: string;
};

type SentRow = {
  id: number;
  bookingRef: string | null;
  guestName: string | null;
  apartment: string | null;
  templateKey: string;
  language: string;
  channel: string;
  status: string;
  delivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
  errorMessage: string | null;
};

type ReviewRow = {
  bookingRef: string;
  guestName: string;
  apartment: string;
  checkOut: string;
  source: string;
  reviewSent: boolean;
  reviewSentAt: string | null;
  templateKey: string | null;
};

type Payload = {
  ok: boolean;
  upcoming: Plan[];
  recent: SentRow[];
  reviewBoard: ReviewRow[];
};

const SCENARIO_LABEL: Record<Plan["scenario"], string> = {
  A: "Standard (9 mesaje)",
  B: "Last-minute",
  C: "O noapte",
  D: "Returning",
  E: "Grup/Vilă",
  F: "Internațional",
};

const SCENARIO_COLOR: Record<Plan["scenario"], string> = {
  A: "bg-forest-100 text-forest-800",
  B: "bg-amber-100 text-amber-800",
  C: "bg-blue-100 text-blue-800",
  D: "bg-purple-100 text-purple-800",
  E: "bg-pink-100 text-pink-800",
  F: "bg-cyan-100 text-cyan-800",
};

function statusBadge(status: string): string {
  if (status === "sent") return "bg-green-100 text-green-800";
  if (status === "error") return "bg-red-100 text-red-800";
  if (status === "skipped") return "bg-gray-100 text-gray-700";
  return "bg-yellow-100 text-yellow-800";
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GuestCommsDashboard() {
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [runResult, setRunResult] = useState<string | null>(null);
  const [tab, setTab] = useState<"upcoming" | "recent" | "reviews">("upcoming");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/guest-comms", { cache: "no-store" });
      const json = (await res.json()) as Payload;
      if (json.ok) setData(json);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function runAgent(dryRun: boolean) {
    setRunning(true);
    setRunResult(null);
    try {
      const res = await fetch(
        `/api/admin/guest-comms?run=1${dryRun ? "" : "&dryRun=0"}`,
        { cache: "no-store" },
      );
      const json = await res.json();
      setRunResult(json.summary ?? "Agent run complete");
      await load();
    } catch (err) {
      setRunResult(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setRunning(false);
    }
  }

  async function resendOne(plan: Plan) {
    if (!confirm(`Send ${plan.templateKey} now to booking ${plan.bookingRef}?`)) return;
    setRunning(true);
    try {
      const res = await fetch("/api/admin/guest-comms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingRef: plan.bookingRef,
          templateKey: plan.templateKey,
          dryRun: false,
        }),
      });
      const json = await res.json();
      setRunResult(json.summary ?? "Sent");
      await load();
    } finally {
      setRunning(false);
    }
  }

  const upcoming = data?.upcoming ?? [];
  const recent = data?.recent ?? [];
  const reviews = data?.reviewBoard ?? [];

  const totalsByScenario = upcoming.reduce<Record<string, number>>((acc, p) => {
    acc[p.scenario] = (acc[p.scenario] ?? 0) + 1;
    return acc;
  }, {});
  const sentToday = recent.filter(
    (r) =>
      r.status === "sent" &&
      new Date(r.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  const reviewsPending = reviews.filter((r) => !r.reviewSent).length;
  const reviewsSent = reviews.filter((r) => r.reviewSent).length;

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 text-sm text-stone-500">
              <Link href="/admin/dashboard" className="hover:text-forest-700">
                ← Admin
              </Link>
              <span>·</span>
              <span>Agent 1 · Guest Communication</span>
            </div>
            <h1 className="mt-1 text-3xl font-serif text-forest-900">
              💬 Comunicare oaspeți
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Agentul rulează 24/7/365 și trimite mesaje pe baza orei de check-in / check-out.
              Codul cutiei cu chei NU este permis în mesaje — doar codul porții (0623#).
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => runAgent(true)}
              disabled={running}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-50"
            >
              {running ? "..." : "Dry-run"}
            </button>
            <button
              onClick={() => runAgent(false)}
              disabled={running}
              className="rounded-lg bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-800 disabled:opacity-50"
            >
              {running ? "Rulez…" : "Trimite acum"}
            </button>
          </div>
        </div>

        {runResult && (
          <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {runResult}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="De trimis (azi/sapt.)" value={upcoming.length} accent="forest" />
          <StatCard label="Trimise astăzi" value={sentToday} accent="green" />
          <StatCard label="Recenzii așteaptă" value={reviewsPending} accent="amber" />
          <StatCard label="Recenzii trimise" value={reviewsSent} accent="blue" />
        </div>

        {/* Scenario breakdown */}
        {upcoming.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(["A", "B", "C", "D", "E", "F"] as const).map((s) =>
              totalsByScenario[s] ? (
                <span
                  key={s}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${SCENARIO_COLOR[s]}`}
                >
                  {s} · {SCENARIO_LABEL[s]} — {totalsByScenario[s]}
                </span>
              ) : null,
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-stone-200">
          {[
            { key: "upcoming", label: `Următoarele (${upcoming.length})` },
            { key: "recent", label: `Trimise recent (${recent.length})` },
            { key: "reviews", label: `Recenzii (${reviews.length})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-4 py-2 text-sm font-medium ${
                tab === t.key
                  ? "border-b-2 border-forest-700 text-forest-800"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Upcoming table */}
        {tab === "upcoming" && (
          <div className="rounded-xl border border-stone-200 bg-white">
            <div className="border-b border-stone-200 p-4">
              <h2 className="font-semibold text-stone-800">Mesaje programate (14 zile)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
                  <tr>
                    <th className="px-4 py-3">Programare</th>
                    <th className="px-4 py-3">Rezervare</th>
                    <th className="px-4 py-3">Scenariu</th>
                    <th className="px-4 py-3">Template</th>
                    <th className="px-4 py-3">Limbi</th>
                    <th className="px-4 py-3">Canal</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-stone-400">
                        Se încarcă…
                      </td>
                    </tr>
                  )}
                  {!loading && upcoming.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-stone-400">
                        Nu sunt mesaje programate.
                      </td>
                    </tr>
                  )}
                  {upcoming.map((p) => (
                    <tr key={`${p.bookingRef}-${p.templateKey}`} className="border-t border-stone-100">
                      <td className="px-4 py-3 text-stone-700">{formatDateTime(p.scheduledFor)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-stone-600">{p.bookingRef}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${SCENARIO_COLOR[p.scenario]}`}
                        >
                          {p.scenario}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-700">{p.templateKey}</td>
                      <td className="px-4 py-3 text-stone-700">{p.languages.join(" + ")}</td>
                      <td className="px-4 py-3 text-stone-700">{p.channel}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedPlan(p)}
                          className="rounded border border-stone-300 px-2 py-1 text-xs text-stone-700 hover:bg-stone-100"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => resendOne(p)}
                          className="ml-2 rounded bg-forest-700 px-2 py-1 text-xs text-white hover:bg-forest-800"
                        >
                          Trimite
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent table */}
        {tab === "recent" && (
          <div className="rounded-xl border border-stone-200 bg-white">
            <div className="border-b border-stone-200 p-4">
              <h2 className="font-semibold text-stone-800">Mesaje trimise (ultimele 50)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
                  <tr>
                    <th className="px-4 py-3">Trimis</th>
                    <th className="px-4 py-3">Oaspete</th>
                    <th className="px-4 py-3">Apartament</th>
                    <th className="px-4 py-3">Template</th>
                    <th className="px-4 py-3">Canal</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-stone-400">
                        Se încarcă…
                      </td>
                    </tr>
                  )}
                  {!loading && recent.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-stone-400">
                        Niciun mesaj trimis încă.
                      </td>
                    </tr>
                  )}
                  {recent.map((r) => (
                    <tr key={r.id} className="border-t border-stone-100">
                      <td className="px-4 py-3 text-stone-700">{formatDateTime(r.createdAt)}</td>
                      <td className="px-4 py-3 text-stone-700">{r.guestName ?? "—"}</td>
                      <td className="px-4 py-3 text-stone-700">{r.apartment ?? "—"}</td>
                      <td className="px-4 py-3 font-mono text-xs text-stone-700">{r.templateKey}</td>
                      <td className="px-4 py-3 text-stone-700">{r.channel}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${statusBadge(r.status)}`}>
                          {r.status}
                        </span>
                        {r.errorMessage && (
                          <div className="mt-1 text-xs text-red-600">{r.errorMessage}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Review board */}
        {tab === "reviews" && (
          <div className="rounded-xl border border-stone-200 bg-white">
            <div className="border-b border-stone-200 p-4">
              <h2 className="font-semibold text-stone-800">Status recenzii (ultimele 30 zile)</h2>
              <p className="mt-1 text-xs text-stone-500">
                Linkuri specifice fiecărei platforme — Google, Facebook, TripAdvisor, Turist Info,
                Travelminit (sau Booking / Airbnb pentru rezervările respective).
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
                  <tr>
                    <th className="px-4 py-3">Check-out</th>
                    <th className="px-4 py-3">Oaspete</th>
                    <th className="px-4 py-3">Apartament</th>
                    <th className="px-4 py-3">Sursă</th>
                    <th className="px-4 py-3">Status recenzie</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-stone-400">
                        Se încarcă…
                      </td>
                    </tr>
                  )}
                  {!loading && reviews.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-stone-400">
                        Niciun check-out în fereastră.
                      </td>
                    </tr>
                  )}
                  {reviews.map((r) => (
                    <tr key={r.bookingRef} className="border-t border-stone-100">
                      <td className="px-4 py-3 text-stone-700">{formatDateTime(r.checkOut)}</td>
                      <td className="px-4 py-3 text-stone-700">{r.guestName}</td>
                      <td className="px-4 py-3 text-stone-700">{r.apartment}</td>
                      <td className="px-4 py-3 text-stone-700">{r.source}</td>
                      <td className="px-4 py-3">
                        {r.reviewSent ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                            Trimisă · {r.reviewSentAt ? formatDateTime(r.reviewSentAt) : "—"}
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                            În așteptare
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Preview drawer */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-white p-6 shadow-2xl sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-forest-900">
                  {selectedPlan.templateKey}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedPlan.bookingRef} · {selectedPlan.languages.join(" + ")} ·{" "}
                  {selectedPlan.channel}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="rounded text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-stone-50 p-4 text-sm text-stone-800">
              {selectedPlan.preview}
            </pre>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedPlan(null)}
                className="rounded border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
              >
                Închide
              </button>
              <button
                onClick={() => {
                  resendOne(selectedPlan);
                  setSelectedPlan(null);
                }}
                className="rounded bg-forest-700 px-4 py-2 text-sm text-white hover:bg-forest-800"
              >
                Trimite acum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "forest" | "green" | "amber" | "blue";
}) {
  const map: Record<typeof accent, string> = {
    forest: "border-forest-200 bg-forest-50 text-forest-900",
    green: "border-green-200 bg-green-50 text-green-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    blue: "border-blue-200 bg-blue-50 text-blue-900",
  };
  return (
    <div className={`rounded-xl border p-4 ${map[accent]}`}>
      <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
    </div>
  );
}
