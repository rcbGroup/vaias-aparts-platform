"use client";

import { useState } from "react";
import Link from "next/link";

type Booking = {
  id: string;
  guest: string;
  phone: string;
  email: string;
  apartment: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalEUR: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  source: string;
  createdAt: string;
  specialRequests?: string;
};

const mockData: Booking[] = [
  { id: "1", guest: "Ionescu Andrei", phone: "+40721000001", email: "andrei@example.com", apartment: "Apartament 3", checkIn: "2026-05-15", checkOut: "2026-05-18", nights: 3, guests: 4, totalEUR: 210, status: "CONFIRMED", source: "direct", createdAt: "2026-05-08", specialRequests: "Mic dejun pentru 4 persoane" },
  { id: "2", guest: "Popescu Maria", phone: "+40721000002", email: "maria@example.com", apartment: "Apartament 1", checkIn: "2026-05-20", checkOut: "2026-05-22", nights: 2, guests: 2, totalEUR: 112, status: "PENDING", source: "direct", createdAt: "2026-05-07" },
  { id: "3", guest: "Constantin Dan", phone: "+40721000003", email: "dan@example.com", apartment: "Apartament 5", checkIn: "2026-06-01", checkOut: "2026-06-08", nights: 7, guests: 3, totalEUR: 390, status: "CONFIRMED", source: "booking.com", createdAt: "2026-05-06" }
];

const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: "Confirmat",
  PENDING: "În așteptare",
  CANCELLED: "Anulat"
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700"
};

export default function ReservationsAdmin() {
  const [bookings] = useState(mockData);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "CONFIRMED" | "CANCELLED">("ALL");

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50">← Dashboard</Link>
        <span className="font-display text-lg">Rezervări</span>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl text-forest-900">Rezervări</h1>
          <div className="flex gap-2">
            {(["ALL", "PENDING", "CONFIRMED", "CANCELLED"] as const).map((f) => (
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <th className="px-5 py-4 text-left">Oaspete</th>
                  <th className="px-5 py-4 text-left">Apartament</th>
                  <th className="px-5 py-4 text-left">Check-in</th>
                  <th className="px-5 py-4 text-left">Check-out</th>
                  <th className="px-5 py-4 text-left">Nopți</th>
                  <th className="px-5 py-4 text-left">Oaspeți</th>
                  <th className="px-5 py-4 text-left">Total EUR</th>
                  <th className="px-5 py-4 text-left">Sursă</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-t border-stone-100 hover:bg-stone-50">
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
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded-lg"
                        >
                          WhatsApp
                        </a>
                        <a
                          href={`tel:${b.phone}`}
                          className="text-xs bg-forest-100 text-forest-700 hover:bg-forest-200 px-2 py-1 rounded-lg"
                        >
                          Sună
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-5 py-12 text-center text-stone-400">
                      Nu există rezervări pentru filtrul selectat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
