"use client";

import { useEffect, useState } from "react";

type KPIs = {
  windowStart: string;
  windowEnd: string;
  windowDays: number;
  occupancyPct: number;
  adrRON: number;
  revparRON: number;
  totalRevenueRON: number;
  directBookingPct: number;
  bookingsCount: number;
  averageStayNights: number;
  repeatRatePct: number;
  revenueBySource: Record<string, number>;
  revenueByApartment: Record<string, number>;
  trends: { occupancyTrend: "rising" | "falling" | "stable" };
};

export default function IntelligencePage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<{ kpis: KPIs; briefing: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/intelligence/kpis?days=${days}`, { credentials: "include" })
      .then(r => r.json())
      .then(j => {
        if (j.ok) setData({ kpis: j.kpis, briefing: j.briefing });
        else setErr(j.error || "Eroare");
      })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, [days]);

  if (loading) return <div className="p-8">Se încarcă datele de business intelligence...</div>;
  if (err) return <div className="p-8 text-rose-600">Eroare: {err}</div>;
  if (!data) return null;

  const { kpis, briefing } = data;
  const trendEmoji = kpis.trends.occupancyTrend === "rising" ? "📈" : kpis.trends.occupancyTrend === "falling" ? "📉" : "→";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="font-display text-3xl text-forest-900">Business Intelligence</h1>
        <select
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          className="border rounded-lg px-3 py-1"
        >
          <option value={7}>7 zile</option>
          <option value={30}>30 zile</option>
          <option value={60}>60 zile</option>
          <option value={90}>90 zile</option>
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card label="Ocupare" value={`${kpis.occupancyPct}%`} hint={`${trendEmoji} ${kpis.trends.occupancyTrend}`} />
        <Card label="ADR" value={`${kpis.adrRON} lei`} hint="rate medie/noapte" />
        <Card label="RevPAR" value={`${kpis.revparRON} lei`} hint="venit per apartament" />
        <Card label="Venit total" value={`${kpis.totalRevenueRON.toLocaleString("ro-RO")} lei`} hint={`${kpis.bookingsCount} rezervări`} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card label="Direct bookings" value={`${kpis.directBookingPct}%`} hint={`pe canale directe`} />
        <Card label="Durată medie sejur" value={`${kpis.averageStayNights} nopți`} />
        <Card label="Rată retenție" value={`${kpis.repeatRatePct}%`} hint="clienți care revin" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <div className="font-display text-lg text-forest-900 mb-3">Venit pe sursă</div>
          {Object.entries(kpis.revenueBySource).length === 0 && (
            <div className="text-sm text-stone-500">Nu sunt date încă.</div>
          )}
          {Object.entries(kpis.revenueBySource)
            .sort(([, a], [, b]) => b - a)
            .map(([src, amt]) => (
              <div key={src} className="flex justify-between text-sm py-1 border-b border-stone-100 last:border-0">
                <span className="capitalize">{src}</span>
                <span className="font-semibold">{Math.round(amt).toLocaleString("ro-RO")} lei</span>
              </div>
            ))}
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <div className="font-display text-lg text-forest-900 mb-3">Venit pe apartament</div>
          {Object.entries(kpis.revenueByApartment).length === 0 && (
            <div className="text-sm text-stone-500">Nu sunt date încă.</div>
          )}
          {Object.entries(kpis.revenueByApartment)
            .sort(([, a], [, b]) => b - a)
            .map(([slug, amt]) => (
              <div key={slug} className="flex justify-between text-sm py-1 border-b border-stone-100 last:border-0">
                <span>{slug}</span>
                <span className="font-semibold">{Math.round(amt).toLocaleString("ro-RO")} lei</span>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-forest-950 text-cream-50 rounded-xl p-6">
        <div className="font-display text-lg mb-3">Briefing zilnic</div>
        <pre className="text-sm whitespace-pre-wrap font-mono text-cream-100/90">{briefing}</pre>
      </div>
    </div>
  );
}

function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="text-xs uppercase tracking-wide text-stone-500 mb-1">{label}</div>
      <div className="font-display text-3xl text-forest-900">{value}</div>
      {hint && <div className="text-xs text-stone-500 mt-1">{hint}</div>}
    </div>
  );
}
