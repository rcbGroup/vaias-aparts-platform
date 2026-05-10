"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apartments } from "@/lib/apartments";

type Stats = {
  bookingsThisMonth: number;
  occupancyPct: number;
  revenueThisMonth: number;
  newGuests: number;
  totalGuests: number;
  recentBookings: RecentBooking[];
};

type RecentBooking = {
  id: number;
  bookingRef: string;
  guest: string;
  phone: string;
  apartment: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalEUR: number;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
  PAID: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-stone-100 text-stone-600",
};
const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: "Confirmat",
  PENDING: "În așteptare",
  CANCELLED: "Anulat",
  PAID: "Plătit",
  COMPLETED: "Finalizat",
};

const quickLinks = [
  { href: "/admin/rezervari", label: "Rezervări", icon: "📋", desc: "Gestionare rezervări" },
  { href: "/admin/apartamente", label: "Apartamente", icon: "🏠", desc: "Disponibilitate & blocare" },
  { href: "/admin/mesaje", label: "Mesaje oaspeți", icon: "💬", desc: "Comunicare automată" },
  { href: "/admin/crm", label: "CRM Oaspeți", icon: "👤", desc: "Baza de date clienți" },
  { href: "/admin/blog", label: "Blog & SEO", icon: "✍️", desc: "Articole & conținut" },
  { href: "/admin/notificari", label: "Notificări", icon: "🔔", desc: "Setări WhatsApp & email" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin";
  }

  const statCards = stats
    ? [
        { label: "Rezervări luna aceasta", value: stats.bookingsThisMonth.toString(), icon: "📅", color: "bg-forest-700" },
        { label: "Rata ocupare", value: `${stats.occupancyPct}%`, icon: "📊", color: "bg-walnut-500" },
        { label: "Venit estimativ (luna)", value: `€${stats.revenueThisMonth.toLocaleString()}`, icon: "💰", color: "bg-forest-600" },
        { label: "Oaspeți noi", value: stats.newGuests.toString(), icon: "👥", color: "bg-walnut-600" },
      ]
    : [
        { label: "Rezervări luna aceasta", value: "—", icon: "📅", color: "bg-forest-700" },
        { label: "Rata ocupare", value: "—", icon: "📊", color: "bg-walnut-500" },
        { label: "Venit estimativ (luna)", value: "—", icon: "💰", color: "bg-forest-600" },
        { label: "Oaspeți noi", value: "—", icon: "👥", color: "bg-walnut-600" },
      ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cream-50/10 grid place-items-center">
            <span className="font-display text-sm">V</span>
          </div>
          <span className="font-display text-lg">Vaias Aparts — Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">
            Site →
          </Link>
          <button onClick={handleLogout} className="text-sm text-cream-100/60 hover:text-cream-50">
            Ieșire
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-forest-900">Bun venit!</h1>
          <p className="text-stone-500 mt-1">Panou de control — Vaias Aparts</p>
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

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <h2 className="font-display text-xl text-forest-900">Rezervări recente</h2>
                <Link href="/admin/rezervari" className="text-sm text-walnut-600 hover:text-walnut-700">
                  Vezi toate →
                </Link>
              </div>
              {loading ? (
                <div className="p-8 text-center text-stone-400 text-sm animate-pulse">Se încarcă...</div>
              ) : !stats?.recentBookings?.length ? (
                <div className="p-8 text-center text-stone-400 text-sm">Nu există rezervări încă.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                        <th className="px-4 py-3 text-left">Oaspete</th>
                        <th className="px-4 py-3 text-left">Apartament</th>
                        <th className="px-4 py-3 text-left">Check-in</th>
                        <th className="px-4 py-3 text-left">Nopți</th>
                        <th className="px-4 py-3 text-left">Total</th>
                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentBookings.map((b) => (
                        <tr key={b.id} className="border-t border-stone-100 hover:bg-stone-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-forest-900 text-sm">{b.guest}</div>
                            <div className="text-xs text-stone-500">
                              <a href={`tel:${b.phone}`} className="hover:text-walnut-600">{b.phone}</a>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-forest-800">{b.apartment}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{b.checkIn}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{b.nights}</td>
                          <td className="px-4 py-3 text-sm font-medium text-forest-900">€{b.totalEUR}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[b.status] ?? "bg-stone-100 text-stone-600"}`}>
                              {STATUS_LABELS[b.status] ?? b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
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

            <div className="rounded-2xl bg-forest-900 text-cream-50 p-6 shadow-soft">
              <h2 className="font-display text-xl mb-4">Apartamente ({apartments.length})</h2>
              <div className="space-y-2">
                {apartments.map((a) => (
                  <div key={a.slug} className="flex items-center justify-between">
                    <span className="text-sm text-cream-100/80">{a.name}</span>
                    <span className="text-xs text-green-300">Live</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-forest-800 text-xs text-cream-100/60">
                iCal export: /api/ical/[slug]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
