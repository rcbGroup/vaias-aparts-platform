"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Guest = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  nationality: string | null;
  notes: string | null;
  visits: number;
  totalSpent: number;
  totalNights: number;
  isVIP: boolean;
  lastVisit: string | null;
  favoriteApartment: string;
  createdAt: string;
};

export default function AdminCRM() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Guest | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState("");

  useEffect(() => {
    fetch("/api/guests")
      .then((r) => r.json())
      .then((data) => { setGuests(data.guests ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = guests.filter((g) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      (g.email?.toLowerCase().includes(q) ?? false) ||
      g.phone.includes(q)
    );
  });

  const totalRevenue = guests.reduce((s, g) => s + g.totalSpent, 0);
  const returning = guests.filter((g) => g.visits > 1).length;

  async function saveNotes() {
    if (!selected) return;
    await fetch(`/api/guests/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notesText }),
    });
    setGuests((prev) => prev.map((g) => g.id === selected.id ? { ...g, notes: notesText } : g));
    setSelected((s) => s ? { ...s, notes: notesText } : s);
    setEditingNotes(false);
  }

  async function toggleVIP() {
    if (!selected) return;
    const newVIP = !selected.isVIP;
    await fetch(`/api/guests/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVIP: newVIP }),
    });
    setGuests((prev) => prev.map((g) => g.id === selected.id ? { ...g, isVIP: newVIP } : g));
    setSelected((s) => s ? { ...s, isVIP: newVIP } : s);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50 text-sm">← Dashboard</Link>
          <span className="text-cream-100/40">|</span>
          <span className="font-display text-lg">CRM Oaspeți</span>
        </div>
        <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">Site →</Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "Total oaspeți", value: loading ? "—" : guests.length.toString(), color: "text-forest-700" },
            { label: "Care revin", value: loading ? "—" : returning.toString(), color: "text-green-600" },
            { label: "Venit total", value: loading ? "—" : `€${Math.round(totalRevenue).toLocaleString()}`, color: "text-walnut-600" },
            { label: "Înregistrați", value: loading ? "—" : guests.length.toString(), color: "text-blue-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft text-center">
              <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Caută oaspete, email, telefon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-cream-50 mb-4"
            />

            {loading ? (
              <div className="text-center text-stone-400 py-10 animate-pulse">Se încarcă oaspeții...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-stone-400 py-10">
                {guests.length === 0 ? "Niciun oaspete înregistrat încă. Rezervările vor apărea automat." : "Niciun rezultat."}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setSelected(g); setNotesText(g.notes ?? ""); setEditingNotes(false); }}
                    className={`w-full text-left rounded-2xl border p-5 shadow-soft transition hover:shadow-card ${selected?.id === g.id ? "border-walnut-400 bg-walnut-50" : "border-stone-200 bg-cream-50"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-11 w-11 rounded-full grid place-items-center text-cream-50 font-display text-lg shrink-0 ${g.isVIP ? "bg-walnut-500" : "bg-forest-700"}`}>
                          {g.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-lg text-forest-900">{g.name}</span>
                            {g.isVIP && <span className="text-[10px] bg-walnut-100 text-walnut-700 rounded-full px-2 py-0.5 font-medium">VIP</span>}
                          </div>
                          <div className="text-xs text-stone-500">{g.phone}{g.email ? ` · ${g.email}` : ""}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-medium text-forest-900">€{Math.round(g.totalSpent)}</div>
                        <div className="text-xs text-stone-500">{g.visits} viz. · {g.totalNights} nopți</div>
                      </div>
                    </div>
                    {g.favoriteApartment !== "—" && (
                      <div className="mt-2 text-xs text-stone-500">Apt. preferat: {g.favoriteApartment}</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {selected ? (
              <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`h-14 w-14 rounded-full grid place-items-center text-cream-50 font-display text-2xl ${selected.isVIP ? "bg-walnut-500" : "bg-forest-700"}`}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <div className="font-display text-xl text-forest-900">{selected.name}</div>
                    {selected.nationality && <div className="text-xs text-stone-500">{selected.nationality}</div>}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Telefon</span>
                    <a href={`tel:${selected.phone}`} className="text-walnut-600 hover:underline">{selected.phone}</a>
                  </div>
                  {selected.email && (
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Email</span>
                      <a href={`mailto:${selected.email}`} className="text-walnut-600 hover:underline">{selected.email}</a>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Vizite</span>
                      <span className="text-forest-900 font-medium">{selected.visits}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Total</span>
                      <span className="text-forest-900 font-medium">€{Math.round(selected.totalSpent)}</span>
                    </div>
                  </div>
                  {selected.lastVisit && (
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Ultima vizită</span>
                      <span className="text-forest-900">{selected.lastVisit}</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs uppercase tracking-wider text-stone-400">Note</span>
                      {!editingNotes && (
                        <button onClick={() => setEditingNotes(true)} className="text-xs text-walnut-600 hover:underline">Editează</button>
                      )}
                    </div>
                    {editingNotes ? (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:border-walnut-400 resize-none"
                        />
                        <div className="flex gap-2">
                          <button onClick={saveNotes} className="text-xs bg-forest-700 text-cream-50 px-3 py-1.5 rounded-full hover:bg-forest-800">Salvează</button>
                          <button onClick={() => setEditingNotes(false)} className="text-xs border border-stone-200 px-3 py-1.5 rounded-full hover:bg-stone-100">Anulează</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-stone-600 italic text-xs leading-relaxed">{selected.notes || "—"}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-stone-100 grid gap-2">
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-green-600 text-cream-50 px-4 py-2 text-sm text-center hover:bg-green-700 transition"
                  >
                    WhatsApp
                  </a>
                  {selected.email && (
                    <a href={`mailto:${selected.email}`} className="rounded-full border border-stone-200 text-forest-900 px-4 py-2 text-sm text-center hover:bg-stone-100 transition">
                      Trimite email
                    </a>
                  )}
                  <button
                    onClick={toggleVIP}
                    className={`rounded-full px-4 py-2 text-sm text-center transition border ${selected.isVIP ? "border-walnut-300 text-walnut-700 hover:bg-walnut-50" : "border-stone-200 text-stone-600 hover:bg-stone-100"}`}
                  >
                    {selected.isVIP ? "✓ VIP — Dezactivează" : "Marchează VIP"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-cream-50 border border-dashed border-stone-300 p-10 text-center text-stone-400">
                <p className="text-sm">Selectează un oaspete pentru detalii</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
