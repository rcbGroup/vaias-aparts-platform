"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type ApartmentCard = {
  slug: string;
  name: string;
  floor: string;
  hasAC: boolean;
  accessible: boolean;
  status: "OCCUPIED" | "AVAILABLE" | "UNKNOWN";
  currentGuest: string | null;
  currentCheckIn: string | null;
  currentCheckOut: string | null;
  nextCheckIn: string | null;
  icalConfigured: boolean;
};

type ArrivalRow = {
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  apartment: string;
  apartmentSlug: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  source: string;
  status: string;
};

type ReviewRow = {
  id: number;
  platform: string;
  authorName: string;
  rating: number;
  body: string;
  apartment: string | null;
  date: string;
};

type Overview = {
  today: string;
  apartments: ApartmentCard[];
  arrivalsToday: ArrivalRow[];
  departuresToday: ArrivalRow[];
  pendingMessages: number;
  summary: {
    occupiedNow: number;
    totalApartments: number;
    bookingsThisMonth: number;
    revenueThisMonth: number;
    occupancyPct: number;
  };
  recentReviews: ReviewRow[];
};

const quickLinks = [
  { href: "/admin/rezervari", label: "Rezervări", icon: "📋", desc: "Gestionare rezervări" },
  { href: "/admin/apartamente", label: "Apartamente", icon: "🏠", desc: "Disponibilitate & blocare" },
  { href: "/admin/mesaje", label: "Mesaje oaspeți", icon: "💬", desc: "Comunicare automată" },
  { href: "/admin/crm", label: "CRM Oaspeți", icon: "👤", desc: "Baza de date clienți" },
  { href: "/admin/intelligence", label: "Business Intelligence", icon: "📊", desc: "RevPAR, ADR, ocupare" },
  { href: "/admin/blog", label: "Blog & SEO", icon: "✍️", desc: "Articole & conținut" },
  { href: "/admin/notificari", label: "Notificări", icon: "🔔", desc: "Setări WhatsApp & email" },
];

export default function AdminDashboard() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/overview", { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as Overview;
        setData(json);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin";
  }

  function onRefresh() {
    setRefreshing(true);
    void load();
  }

  const statCards = [
    {
      label: "Apartamente ocupate",
      value: data ? `${data.summary.occupiedNow}/${data.summary.totalApartments}` : "—",
      icon: "🏠",
      color: "bg-forest-700",
    },
    {
      label: "Rezervări luna aceasta",
      value: data ? data.summary.bookingsThisMonth.toString() : "—",
      icon: "📅",
      color: "bg-walnut-500",
    },
    {
      label: "Venit luna aceasta",
      value: data ? `€${data.summary.revenueThisMonth.toLocaleString()}` : "—",
      icon: "💰",
      color: "bg-forest-600",
    },
    {
      label: "Mesaje în așteptare",
      value: data ? data.pendingMessages.toString() : "—",
      icon: "💬",
      color: "bg-walnut-600",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cream-50/10 grid place-items-center">
            <span className="font-display text-sm">V</span>
          </div>
          <span className="font-display text-lg">Vaias Aparts — VAIA OS</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="text-sm text-cream-100/60 hover:text-cream-50 disabled:opacity-50"
          >
            {refreshing ? "Se reîncarcă..." : "Reîncarcă"}
          </button>
          <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">
            Site →
          </Link>
          <button onClick={handleLogout} className="text-sm text-cream-100/60 hover:text-cream-50">
            Ieșire
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl text-forest-900">Bun venit!</h1>
            <p className="text-stone-500 mt-1">
              Panou de control — {data ? new Date(data.today).toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "Vaias Aparts"}
            </p>
          </div>
          <div className="text-sm text-stone-500">
            Ocupare lună: <span className="font-medium text-forest-900">{data ? `${data.summary.occupancyPct}%` : "—"}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-6 shadow-soft">
              <div className={`h-10 w-10 rounded-full ${s.color} text-cream-50 grid place-items-center text-lg mb-4`}>
                {s.icon}
              </div>
              <div className={`font-display text-3xl text-forest-900 ${loading ? "animate-pulse" : ""}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-forest-900">Apartamente — astăzi</h2>
            <Link href="/admin/apartamente" className="text-sm text-walnut-600 hover:text-walnut-700">
              Gestionează disponibilitate →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(data?.apartments ?? Array.from({ length: 7 }, (_, i) => null)).map((apt, i) => (
              <ApartmentTile key={apt?.slug ?? i} card={apt} loading={loading} />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <ArrivalsBlock title="Check-in azi" rows={data?.arrivalsToday ?? []} loading={loading} kind="in" />
          <ArrivalsBlock title="Check-out azi" rows={data?.departuresToday ?? []} loading={loading} kind="out" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <h2 className="font-display text-xl text-forest-900">Recenzii recente</h2>
                <Link href="/admin/notificari" className="text-sm text-walnut-600 hover:text-walnut-700">
                  Setări →
                </Link>
              </div>
              {loading ? (
                <div className="p-8 text-center text-stone-400 text-sm animate-pulse">Se încarcă...</div>
              ) : !data?.recentReviews?.length ? (
                <div className="p-8 text-center text-stone-400 text-sm">
                  Nu există recenzii salvate. Configurează GOOGLE_BUSINESS_API_KEY și apelează <code className="bg-stone-100 px-1 rounded">/api/reviews?refresh=1</code>.
                </div>
              ) : (
                <ul className="divide-y divide-stone-100">
                  {data.recentReviews.map((r) => (
                    <li key={r.id} className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-forest-900 text-sm">{r.authorName}</div>
                        <div className="text-xs text-stone-500">
                          {r.platform} · {r.date}
                        </div>
                      </div>
                      <div className="text-amber-500 text-sm mb-1">{"★".repeat(Math.round(r.rating))}<span className="text-stone-300">{"★".repeat(5 - Math.round(r.rating))}</span></div>
                      <div className="text-sm text-stone-700 line-clamp-3">{r.body}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
            <h2 className="font-display text-xl text-forest-900 mb-4">Acces rapid</h2>
            <div className="space-y-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition group"
                >
                  <span className="text-xl">{l.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-forest-900">{l.label}</div>
                    <div className="text-xs text-stone-500">{l.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApartmentTile({ card, loading }: { card: ApartmentCard | null; loading: boolean }) {
  if (!card) {
    return (
      <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-5 animate-pulse min-h-[160px]" />
    );
  }
  const isOccupied = card.status === "OCCUPIED";
  return (
    <div
      className={`rounded-2xl border shadow-soft p-5 ${
        isOccupied ? "bg-forest-900 text-cream-50 border-forest-900" : "bg-cream-50 text-forest-900 border-stone-200"
      } ${loading ? "animate-pulse" : ""}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="font-display text-lg">{card.name}</div>
        <span
          className={`text-xs rounded-full px-2 py-0.5 ${
            isOccupied ? "bg-cream-50/15 text-cream-50" : "bg-green-50 text-green-700"
          }`}
        >
          {isOccupied ? "Ocupat" : "Liber"}
        </span>
      </div>
      <div className={`text-xs ${isOccupied ? "text-cream-100/70" : "text-stone-500"} mb-3`}>
        {card.floor}
        {card.hasAC ? " · AC" : ""}
        {card.accessible ? " · Accesibil" : ""}
        {!card.icalConfigured ? " · iCal lipsă" : ""}
      </div>

      {isOccupied ? (
        <div className="space-y-1 text-sm">
          <div className={`${isOccupied ? "text-cream-50" : "text-forest-900"}`}>
            <span className="opacity-70">Oaspete: </span>
            <span className="font-medium">{card.currentGuest ?? "—"}</span>
          </div>
          <div className="text-xs opacity-80">
            {card.currentCheckIn} → {card.currentCheckOut}
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-sm">
          <div className="text-xs text-stone-500">
            {card.nextCheckIn ? `Următor check-in: ${card.nextCheckIn}` : "Niciun check-in programat"}
          </div>
        </div>
      )}
    </div>
  );
}

function ArrivalsBlock({
  title,
  rows,
  loading,
  kind,
}: {
  title: string;
  rows: ArrivalRow[];
  loading: boolean;
  kind: "in" | "out";
}) {
  return (
    <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
      <div className="p-5 border-b border-stone-100 flex items-center justify-between">
        <h2 className="font-display text-lg text-forest-900">{title}</h2>
        <span className="text-xs text-stone-500">{rows.length} {rows.length === 1 ? "oaspete" : "oaspeți"}</span>
      </div>
      {loading ? (
        <div className="p-6 text-center text-stone-400 text-sm animate-pulse">Se încarcă...</div>
      ) : rows.length === 0 ? (
        <div className="p-6 text-center text-stone-400 text-sm">Nu există {kind === "in" ? "sosiri" : "plecări"} astăzi.</div>
      ) : (
        <ul className="divide-y divide-stone-100">
          {rows.map((b) => (
            <li key={b.bookingRef} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-forest-900 text-sm truncate">{b.guestName}</div>
                <div className="text-xs text-stone-500 truncate">
                  {b.apartment} · {b.adults}A{b.children ? ` + ${b.children}C` : ""} · {b.nights} nopți
                </div>
              </div>
              <div className="flex items-center gap-2">
                {kind === "in" && (
                  <Link
                    href={`/admin/mesaje?guest=${encodeURIComponent(b.guestName)}&apt=${b.apartmentSlug}&ref=${b.bookingRef}`}
                    className="text-xs rounded-full bg-walnut-500 text-cream-50 px-3 py-1 hover:bg-walnut-600"
                  >
                    Mesaj
                  </Link>
                )}
                <a
                  href={`tel:${b.guestPhone}`}
                  className="text-xs rounded-full border border-stone-300 px-3 py-1 text-forest-900 hover:bg-stone-50"
                >
                  Sună
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
