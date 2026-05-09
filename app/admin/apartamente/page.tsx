"use client";

import { useState } from "react";
import Link from "next/link";
import { apartments } from "@/lib/apartments";

type DateBlock = {
  id: string;
  apartmentSlug: string;
  from: string;
  to: string;
  reason: string;
  createdAt: string;
};

const mockBlocks: DateBlock[] = [
  { id: "1", apartmentSlug: "apartament-3", from: "2026-07-15", to: "2026-07-22", reason: "Rezervat Booking.com", createdAt: "2026-05-01" },
  { id: "2", apartmentSlug: "apartament-1", from: "2026-08-01", to: "2026-08-08", reason: "Utilizare proprie", createdAt: "2026-04-20" },
  { id: "3", apartmentSlug: "apartament-5", from: "2026-06-20", to: "2026-06-27", reason: "Rezervat Airbnb", createdAt: "2026-05-05" }
];

export default function AdminApartamente() {
  const [blocks, setBlocks] = useState(mockBlocks);
  const [form, setForm] = useState({ apartmentSlug: "", from: "", to: "", reason: "" });
  const [activeApt, setActiveApt] = useState(apartments[0].slug);

  function handleBlock(e: React.FormEvent) {
    e.preventDefault();
    if (!form.apartmentSlug || !form.from || !form.to) return;
    setBlocks(prev => [...prev, {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString().split("T")[0]
    }]);
    setForm({ apartmentSlug: "", from: "", to: "", reason: "" });
  }

  function removeBlock(id: string) {
    setBlocks(prev => prev.filter(b => b.id !== id));
  }

  const activeApartment = apartments.find(a => a.slug === activeApt)!;
  const activeBlocks = blocks.filter(b => b.apartmentSlug === activeApt);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50 text-sm">← Dashboard</Link>
          <span className="text-cream-100/40">|</span>
          <span className="font-display text-lg">Apartamente & Disponibilitate</span>
        </div>
        <Link href="/apartments" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">Site →</Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Capacity overview */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "Total apartamente", value: apartments.length.toString(), color: "text-forest-700" },
            { label: "Capacitate totală", value: "19 pers", color: "text-walnut-600" },
            { label: "Blocate acum", value: blocks.length.toString(), color: "text-orange-600" },
            { label: "Disponibile azi", value: (apartments.length - new Set(blocks.map(b => b.apartmentSlug)).size).toString(), color: "text-green-600" }
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft text-center">
              <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Apartment selector */}
          <div>
            <h2 className="font-display text-xl text-forest-900 mb-4">Apartamente</h2>
            <div className="space-y-2">
              {apartments.map((a) => {
                const blocked = blocks.some(b => b.apartmentSlug === a.slug);
                return (
                  <button
                    key={a.slug}
                    onClick={() => setActiveApt(a.slug)}
                    className={`w-full text-left rounded-2xl border p-4 transition ${activeApt === a.slug ? "border-walnut-400 bg-walnut-50" : "border-stone-200 bg-cream-50 hover:bg-stone-50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg text-forest-900">{a.name}</span>
                      <span className={`text-xs rounded-full px-2 py-0.5 ${blocked ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                        {blocked ? "Blocat" : "Disponibil"}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      {a.floor} · {a.guestsMax} pers · {a.pricePerNightRON} RON/noapte
                      {a.hasAC ? " · AC" : ""}
                      {a.accessible ? " · Accesibil" : ""}
                    </div>
                    <div className="text-xs text-walnut-600 mt-1">
                      {blocks.filter(b => b.apartmentSlug === a.slug).length} blocare(i)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Apartment detail */}
            <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
              <h2 className="font-display text-2xl text-forest-900 mb-2">{activeApartment.name}</h2>
              <div className="grid gap-3 sm:grid-cols-3 text-sm mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Etaj</span>
                  <span className="text-forest-900">{activeApartment.floor}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Capacitate</span>
                  <span className="text-forest-900">{activeApartment.guestsMax} persoane</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Preț/noapte</span>
                  <span className="text-forest-900">{activeApartment.pricePerNightRON} RON / {activeApartment.pricePerNightEUR} EUR</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Pat</span>
                  <span className="text-forest-900">Emperor 2m×2m</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">AC</span>
                  <span className="text-forest-900">{activeApartment.hasAC ? "Da" : "Nu"}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Accesibil</span>
                  <span className="text-forest-900">{activeApartment.accessible ? "Da" : "Nu"}</span>
                </div>
              </div>

              {/* Active blocks */}
              <div className="border-t border-stone-100 pt-4">
                <h3 className="text-sm font-medium text-forest-900 mb-3">Date blocate ({activeBlocks.length})</h3>
                {activeBlocks.length === 0 ? (
                  <p className="text-sm text-stone-400 italic">Nicio blocare activă</p>
                ) : (
                  <div className="space-y-2">
                    {activeBlocks.map((b) => (
                      <div key={b.id} className="flex items-center justify-between rounded-xl bg-orange-50 border border-orange-100 px-4 py-2.5">
                        <div>
                          <span className="text-sm font-medium text-orange-800">{b.from} → {b.to}</span>
                          <span className="text-xs text-orange-600 ml-3">{b.reason}</span>
                        </div>
                        <button
                          onClick={() => removeBlock(b.id)}
                          className="text-xs text-red-600 hover:text-red-700 hover:underline"
                        >
                          Șterge
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add block form */}
            <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
              <h3 className="font-display text-xl text-forest-900 mb-4">Blochează date</h3>
              <form onSubmit={handleBlock} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Apartament</label>
                  <select
                    value={form.apartmentSlug}
                    onChange={(e) => setForm(f => ({ ...f, apartmentSlug: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-white"
                    required
                  >
                    <option value="">Selectează...</option>
                    {apartments.map(a => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Motiv</label>
                  <input
                    type="text"
                    placeholder="Utilizare proprie, Booking.com..."
                    value={form.reason}
                    onChange={(e) => setForm(f => ({ ...f, reason: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">De la</label>
                  <input
                    type="date"
                    value={form.from}
                    onChange={(e) => setForm(f => ({ ...f, from: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Până la</label>
                  <input
                    type="date"
                    value={form.to}
                    onChange={(e) => setForm(f => ({ ...f, to: e.target.value }))}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="rounded-full bg-forest-700 text-cream-50 px-6 py-2.5 text-sm font-medium hover:bg-forest-800 transition"
                  >
                    Adaugă blocare
                  </button>
                </div>
              </form>
            </div>

            {/* iCal sync info */}
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5">
              <h3 className="font-medium text-forest-900 mb-2">Sincronizare OTA (iCal)</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">
                Pentru sincronizare automată cu Booking.com, Airbnb și alte platforme, conectați feed-urile iCal în secțiunea „Calendar" din fiecare platformă.
              </p>
              <div className="text-xs text-stone-400 font-mono bg-stone-100 rounded-lg px-3 py-2">
                {/* Placeholder for future iCal URLs */}
                iCal export: /api/ical/[apartment-slug] (în dezvoltare)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
