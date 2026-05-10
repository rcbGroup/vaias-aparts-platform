"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Booking = {
  id: number;
  bookingRef: string;
  guest: string;
  phone: string;
  email: string | null;
  apartment: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalEUR: number;
  status: "PENDING" | "CONFIRMED" | "PAID" | "CANCELLED" | "COMPLETED";
  source: string;
  createdAt: string;
  specialRequests?: string | null;
  internalNotes?: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: "Confirmat",
  PENDING: "În așteptare",
  CANCELLED: "Anulat",
  PAID: "Plătit",
  COMPLETED: "Finalizat",
};
const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
  PAID: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-stone-100 text-stone-600",
};

export default function ReservationsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "CONFIRMED" | "PAID" | "CANCELLED">("ALL");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = useCallback(() => {
    const qs = filter !== "ALL" ? `?status=${filter}` : "";
    setLoading(true);
    fetch(`/api/bookings${qs}`)
      .then((r) => r.json())
      .then((data) => { setBookings(data.bookings ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: number, status: string) {
    setUpdatingId(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    setUpdatingId(null);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50">← Dashboard</Link>
        <span className="font-display text-lg">Rezervări</span>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl text-forest-900">
            Rezervări {!loading && <span className="text-stone-400 text-xl">({bookings.length})</span>}
          </h1>
          <div className="flex flex-wrap gap-2">
            {(["ALL", "PENDING", "CONFIRMED", "PAID", "CANCELLED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === f
                    ? "bg-forest-700 text-cream-50"
                    : "bg-cream-50 text-forest-800 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                {f === "ALL" ? "Toate" : STATUS_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-stone-400 animate-pulse">Se încarcă rezervările...</div>
          ) : bookings.length === 0 ? (
            <div className="p-10 text-center text-stone-400">Nu există rezervări pentru filtrul selectat.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500 border-b border-stone-200">
                    <th className="px-5 py-4 text-left">Ref</th>
                    <th className="px-5 py-4 text-left">Oaspete</th>
                    <th className="px-5 py-4 text-left">Apartament</th>
                    <th className="px-5 py-4 text-left">Check-in</th>
                    <th className="px-5 py-4 text-left">Check-out</th>
                    <th className="px-5 py-4 text-left">Nopți</th>
                    <th className="px-5 py-4 text-left">Pers</th>
                    <th className="px-5 py-4 text-left">Total EUR</th>
                    <th className="px-5 py-4 text-left">Sursă</th>
                    <th className="px-5 py-4 text-left">Status</th>
                    <th className="px-5 py-4 text-left">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-t border-stone-100 hover:bg-stone-50">
                      <td className="px-5 py-4 text-xs font-mono text-stone-500">{b.bookingRef.slice(0, 8)}</td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-forest-900 text-sm">{b.guest}</div>
                        <a href={`tel:${b.phone}`} className="text-xs text-walnut-600 hover:underline">{b.phone}</a>
                        {b.email && <div className="text-xs text-stone-400">{b.email}</div>}
                        {b.specialRequests && (
                          <div className="text-xs text-stone-500 italic mt-1 max-w-xs truncate" title={b.specialRequests}>
                            📝 {b.specialRequests}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-forest-800">{b.apartment}</td>
                      <td className="px-5 py-4 text-sm text-stone-700">{b.checkIn}</td>
                      <td className="px-5 py-4 text-sm text-stone-700">{b.checkOut}</td>
                      <td className="px-5 py-4 text-sm text-stone-700">{b.nights}</td>
                      <td className="px-5 py-4 text-sm text-stone-700">{b.guests}</td>
                      <td className="px-5 py-4 text-sm font-display text-forest-900">€{b.totalEUR}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs bg-stone-100 text-stone-600 rounded-full px-2 py-0.5">{b.source}</span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className={`text-xs rounded-full px-2.5 py-0.5 font-medium border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-walnut-400 ${STATUS_COLORS[b.status]}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded-lg"
                          >
                            WA
                          </a>
                          <a href={`tel:${b.phone}`} className="text-xs bg-forest-100 text-forest-700 hover:bg-forest-200 px-2 py-1 rounded-lg">
                            Sună
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
