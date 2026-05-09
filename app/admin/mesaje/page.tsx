"use client";

import { useState } from "react";
import Link from "next/link";

type Message = {
  id: string;
  guest: string;
  phone: string;
  apartment: string;
  stage: string;
  channel: "WhatsApp" | "Email" | "SMS";
  content: string;
  scheduledAt: string;
  sentAt?: string;
  status: "SCHEDULED" | "SENT" | "FAILED";
};

const mockMessages: Message[] = [
  {
    id: "1",
    guest: "Ionescu Andrei",
    phone: "+40721000001",
    apartment: "Apartament 3",
    stage: "Confirmare rezervare",
    channel: "WhatsApp",
    content: "Rezervarea dumneavoastră este confirmată! Check-in: 15 Mai, ora 14:00. Vă contactăm în ziua sosirii cu instrucțiunile de acces. — Echipa Vaias Aparts",
    scheduledAt: "2026-05-08 10:00",
    sentAt: "2026-05-08 10:00",
    status: "SENT"
  },
  {
    id: "2",
    guest: "Popescu Maria",
    phone: "+40721000002",
    apartment: "Apartament 1",
    stage: "−7 zile înainte",
    channel: "WhatsApp",
    content: "Ne bucurăm că veniți! Aveți întrebări sau cereri speciale? — Echipa Vaias Aparts",
    scheduledAt: "2026-05-13 10:00",
    status: "SCHEDULED"
  },
  {
    id: "3",
    guest: "Constantin Dan",
    phone: "+40721000003",
    apartment: "Apartament 5",
    stage: "−1 zi înainte",
    channel: "Email",
    content: "Confirmare check-in, ghid zonă, recomandări restaurante locale.",
    scheduledAt: "2026-05-31 18:00",
    status: "SCHEDULED"
  },
  {
    id: "4",
    guest: "Georgescu Elena",
    phone: "+40721000004",
    apartment: "Apartament 2",
    stage: "Post check-out",
    channel: "WhatsApp",
    content: "Mulțumim că ați ales Vaias Aparts! O recenzie pe Google ne-ar ajuta enorm. — Echipa Vaias Aparts",
    scheduledAt: "2026-05-05 13:00",
    sentAt: "2026-05-05 13:01",
    status: "SENT"
  },
  {
    id: "5",
    guest: "Munteanu Ion",
    phone: "+40721000005",
    apartment: "Apartament 7",
    stage: "Cerere primită",
    channel: "SMS",
    content: "Cererea dumneavoastră a fost primită. Revenite în maxim 4 ore. — Echipa Vaias Aparts",
    scheduledAt: "2026-05-07 14:22",
    sentAt: "2026-05-07 14:22",
    status: "SENT"
  },
  {
    id: "6",
    guest: "Dumitrescu Radu",
    phone: "+40721000006",
    apartment: "Apartament 4",
    stage: "+2 ore după check-in",
    channel: "WhatsApp",
    content: "Sperăm că v-ați instalat bine. Suntem la dispoziție pentru orice nevoie. — Echipa Vaias Aparts",
    scheduledAt: "2026-05-20 16:00",
    status: "SCHEDULED"
  }
];

const stageColors: Record<string, string> = {
  "Cerere primită": "bg-blue-100 text-blue-700",
  "Confirmare rezervare": "bg-green-100 text-green-700",
  "−7 zile înainte": "bg-yellow-100 text-yellow-700",
  "−1 zi înainte": "bg-orange-100 text-orange-700",
  "+2 ore după check-in": "bg-purple-100 text-purple-700",
  "Post check-out": "bg-pink-100 text-pink-700"
};

export default function AdminMesaje() {
  const [filter, setFilter] = useState<"ALL" | "SCHEDULED" | "SENT" | "FAILED">("ALL");
  const [channel, setChannel] = useState<"ALL" | "WhatsApp" | "Email" | "SMS">("ALL");

  const filtered = mockMessages.filter((m) => {
    if (filter !== "ALL" && m.status !== filter) return false;
    if (channel !== "ALL" && m.channel !== channel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50 text-sm">← Dashboard</Link>
          <span className="text-cream-100/40">|</span>
          <span className="font-display text-lg">Mesaje Oaspeți</span>
        </div>
        <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">Site →</Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "Programate", value: mockMessages.filter(m => m.status === "SCHEDULED").length.toString(), color: "text-yellow-600" },
            { label: "Trimise azi", value: "3", color: "text-green-600" },
            { label: "Total trimise", value: mockMessages.filter(m => m.status === "SENT").length.toString(), color: "text-forest-700" },
            { label: "Eșuate", value: mockMessages.filter(m => m.status === "FAILED").length.toString(), color: "text-red-600" }
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft text-center">
              <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sequence guide */}
        <div className="rounded-2xl bg-forest-900 text-cream-50 p-6 mb-8">
          <h2 className="font-display text-xl mb-4">Secvența automată de mesaje</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1–2", when: "La primire", msg: "SMS + notificare owner" },
              { step: "3–4", when: "La confirmare", msg: "Email + WA confirmare" },
              { step: "5", when: "−7 zile", msg: "WA bun venit" },
              { step: "6–7", when: "−1 zi", msg: "WA acces + Email ghid" },
              { step: "8", when: "+2h check-in", msg: "WA instalare" },
              { step: "9", when: "−1 zi checkout", msg: "WA reminder 11:00" },
              { step: "10", when: "+2h plecare", msg: "WA/Email recenzie" },
              { step: "11", when: "+7 zile", msg: "Email ofertă revenire" }
            ].map((s) => (
              <div key={s.step} className="bg-forest-800/50 rounded-xl p-3">
                <div className="text-xs uppercase tracking-widest text-walnut-300 mb-1">Pas {s.step}</div>
                <div className="text-sm font-medium text-cream-50">{s.when}</div>
                <div className="text-xs text-cream-100/70 mt-1">{s.msg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {(["ALL", "SCHEDULED", "SENT", "FAILED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === f ? "bg-forest-700 text-cream-50" : "bg-cream-50 border border-stone-200 text-forest-800 hover:bg-stone-100"}`}
              >
                {f === "ALL" ? "Toate" : f === "SCHEDULED" ? "Programate" : f === "SENT" ? "Trimise" : "Eșuate"}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            {(["ALL", "WhatsApp", "Email", "SMS"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setChannel(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${channel === c ? "bg-walnut-500 text-cream-50" : "bg-cream-50 border border-stone-200 text-forest-800 hover:bg-stone-100"}`}
              >
                {c === "ALL" ? "Toate canalele" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Messages list */}
        <div className="space-y-3">
          {filtered.map((m) => (
            <div key={m.id} className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-full grid place-items-center text-sm font-bold shrink-0 ${
                    m.channel === "WhatsApp" ? "bg-green-100 text-green-700" :
                    m.channel === "Email" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {m.channel === "WhatsApp" ? "WA" : m.channel === "Email" ? "✉" : "SM"}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-display text-lg text-forest-900">{m.guest}</span>
                      <span className="text-xs text-stone-500">{m.apartment}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${stageColors[m.stage] || "bg-stone-100 text-stone-600"}`}>
                        {m.stage}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed italic">"{m.content}"</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-stone-400">
                      <span>📅 {m.status === "SENT" ? `Trimis: ${m.sentAt}` : `Programat: ${m.scheduledAt}`}</span>
                      <a href={`tel:${m.phone}`} className="text-walnut-600 hover:underline">{m.phone}</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    m.status === "SENT" ? "bg-green-100 text-green-700" :
                    m.status === "SCHEDULED" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {m.status === "SENT" ? "Trimis" : m.status === "SCHEDULED" ? "Programat" : "Eșuat"}
                  </span>
                  {m.status === "SCHEDULED" && (
                    <button className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:bg-stone-100 transition">
                      Anulează
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Manual send */}
        <div className="mt-8 rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
          <h2 className="font-display text-xl text-forest-900 mb-4">Trimite mesaj manual</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Oaspete</label>
              <select className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-white">
                <option>Selectează oaspete...</option>
                {mockMessages.map(m => <option key={m.id}>{m.guest} — {m.apartment}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Canal</label>
              <select className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-white">
                <option>WhatsApp</option>
                <option>Email</option>
                <option>SMS</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Mesaj</label>
              <textarea
                rows={3}
                placeholder="Scrie mesajul... (se va semna automat — Echipa Vaias Aparts)"
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 resize-none"
              />
            </div>
          </div>
          <button className="mt-4 rounded-full bg-forest-700 text-cream-50 px-6 py-2.5 text-sm font-medium hover:bg-forest-800 transition">
            Trimite mesaj
          </button>
          <p className="mt-2 text-xs text-stone-400">Nota: codul casetei de chei NU se trimite în scris — comunicați-l verbal la telefon.</p>
        </div>
      </div>
    </div>
  );
}
