"use client";

import { useState } from "react";
import Link from "next/link";

type Guest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  firstVisit: string;
  lastVisit: string;
  totalStays: number;
  totalNights: number;
  totalSpentEUR: number;
  favoriteApartment: string;
  tags: string[];
  notes?: string;
  language: string;
};

const mockGuests: Guest[] = [
  {
    id: "1",
    name: "Ionescu Andrei",
    phone: "+40721000001",
    email: "andrei.ionescu@gmail.com",
    city: "București",
    country: "RO",
    firstVisit: "2025-08-10",
    lastVisit: "2026-05-15",
    totalStays: 4,
    totalNights: 12,
    totalSpentEUR: 840,
    favoriteApartment: "Apartament 3",
    tags: ["Revine", "Familie", "Direct"],
    language: "ro"
  },
  {
    id: "2",
    name: "Popescu Maria",
    phone: "+40721000002",
    email: "maria.p@yahoo.ro",
    city: "Cluj-Napoca",
    country: "RO",
    firstVisit: "2026-03-20",
    lastVisit: "2026-05-20",
    totalStays: 1,
    totalNights: 2,
    totalSpentEUR: 112,
    favoriteApartment: "Apartament 1",
    tags: ["Nou", "Cuplu"],
    language: "ro"
  },
  {
    id: "3",
    name: "Constantin Dan",
    phone: "+40721000003",
    email: "dan.c@gmail.com",
    city: "Iași",
    country: "RO",
    firstVisit: "2025-06-01",
    lastVisit: "2026-06-01",
    totalStays: 3,
    totalNights: 18,
    totalSpentEUR: 1050,
    favoriteApartment: "Apartament 5",
    tags: ["Revine", "Grup", "Diaspora"],
    notes: "Preferă apartamentul cu AC. Vine cu familia de Crăciun.",
    language: "ro"
  },
  {
    id: "4",
    name: "Müller Hans",
    phone: "+49151000001",
    email: "hans.m@web.de",
    city: "München",
    country: "DE",
    firstVisit: "2025-09-15",
    lastVisit: "2025-09-15",
    totalStays: 1,
    totalNights: 7,
    totalSpentEUR: 441,
    favoriteApartment: "Apartament 4",
    tags: ["Diaspora", "Pelerini"],
    language: "de"
  },
  {
    id: "5",
    name: "Georgescu Elena",
    phone: "+40721000004",
    email: "elena.g@outlook.com",
    city: "Bacău",
    country: "RO",
    firstVisit: "2024-12-25",
    lastVisit: "2026-01-05",
    totalStays: 2,
    totalNights: 10,
    totalSpentEUR: 580,
    favoriteApartment: "Apartament 7",
    tags: ["Revine", "Accesibil"],
    notes: "Mobilitate redusă. Preferă Apartamentul 7 (parter, accesibil).",
    language: "ro"
  },
  {
    id: "6",
    name: "Durand Sophie",
    phone: "+33612000001",
    email: "sophie.d@orange.fr",
    city: "Lyon",
    country: "FR",
    firstVisit: "2026-04-10",
    lastVisit: "2026-04-10",
    totalStays: 1,
    totalNights: 5,
    totalSpentEUR: 315,
    favoriteApartment: "Apartament 6",
    tags: ["Nou", "Diaspora"],
    language: "fr"
  }
];

const tagColors: Record<string, string> = {
  "Revine": "bg-green-100 text-green-700",
  "Nou": "bg-blue-100 text-blue-700",
  "Familie": "bg-purple-100 text-purple-700",
  "Cuplu": "bg-pink-100 text-pink-700",
  "Grup": "bg-orange-100 text-orange-700",
  "Direct": "bg-forest-100 text-forest-700",
  "Diaspora": "bg-walnut-100 text-walnut-700",
  "Pelerini": "bg-yellow-100 text-yellow-700",
  "Accesibil": "bg-indigo-100 text-indigo-700"
};

export default function AdminCRM() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("Toate");
  const [selected, setSelected] = useState<Guest | null>(null);

  const allTags = ["Toate", ...Array.from(new Set(mockGuests.flatMap(g => g.tags)))];

  const filtered = mockGuests.filter((g) => {
    const matchSearch = search === "" || g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase()) || g.city.toLowerCase().includes(search.toLowerCase());
    const matchTag = tagFilter === "Toate" || g.tags.includes(tagFilter);
    return matchSearch && matchTag;
  });

  const totalRevenue = mockGuests.reduce((s, g) => s + g.totalSpentEUR, 0);
  const returning = mockGuests.filter(g => g.totalStays > 1).length;

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
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "Total oaspeți", value: mockGuests.length.toString(), color: "text-forest-700" },
            { label: "Care revin", value: returning.toString(), color: "text-green-600" },
            { label: "Venit total", value: `€${totalRevenue.toLocaleString()}`, color: "text-walnut-600" },
            { label: "Țări", value: new Set(mockGuests.map(g => g.country)).size.toString(), color: "text-blue-600" }
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft text-center">
              <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Guest list */}
          <div className="lg:col-span-2">
            {/* Search & filter */}
            <div className="flex flex-wrap gap-3 mb-4">
              <input
                type="text"
                placeholder="Caută oaspete, email, oraș..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[200px] rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-cream-50"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTagFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${tagFilter === t ? "bg-forest-700 text-cream-50" : "bg-cream-50 border border-stone-200 text-forest-800 hover:bg-stone-100"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelected(g)}
                  className={`w-full text-left rounded-2xl border p-5 shadow-soft transition hover:shadow-card ${selected?.id === g.id ? "border-walnut-400 bg-walnut-50" : "border-stone-200 bg-cream-50"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-forest-700 grid place-items-center text-cream-50 font-display text-lg shrink-0">
                        {g.name[0]}
                      </div>
                      <div>
                        <div className="font-display text-lg text-forest-900">{g.name}</div>
                        <div className="text-xs text-stone-500">{g.city}, {g.country} · {g.email}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-medium text-forest-900">€{g.totalSpentEUR}</div>
                      <div className="text-xs text-stone-500">{g.totalStays} sejururi · {g.totalNights} nopți</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {g.tags.map((t) => (
                      <span key={t} className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${tagColors[t] || "bg-stone-100 text-stone-600"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Guest detail */}
          <div>
            {selected ? (
              <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-14 w-14 rounded-full bg-forest-700 grid place-items-center text-cream-50 font-display text-2xl">
                    {selected.name[0]}
                  </div>
                  <div>
                    <div className="font-display text-xl text-forest-900">{selected.name}</div>
                    <div className="text-xs text-stone-500">{selected.city}, {selected.country}</div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Telefon</span>
                    <a href={`tel:${selected.phone}`} className="text-walnut-600 hover:underline">{selected.phone}</a>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Email</span>
                    <a href={`mailto:${selected.email}`} className="text-walnut-600 hover:underline">{selected.email}</a>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Prima vizită</span>
                    <span className="text-forest-900">{selected.firstVisit}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Ultima vizită</span>
                    <span className="text-forest-900">{selected.lastVisit}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Apartament preferat</span>
                    <span className="text-forest-900">{selected.favoriteApartment}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Limbă preferată</span>
                    <span className="text-forest-900 uppercase">{selected.language}</span>
                  </div>
                  {selected.notes && (
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-400 block mb-0.5">Note</span>
                      <p className="text-stone-600 italic text-xs leading-relaxed">{selected.notes}</p>
                    </div>
                  )}
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
                  <a
                    href={`mailto:${selected.email}`}
                    className="rounded-full border border-stone-200 text-forest-900 px-4 py-2 text-sm text-center hover:bg-stone-100 transition"
                  >
                    Trimite email
                  </a>
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
