"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Message = {
  id: number;
  guest: string;
  phone: string;
  apartment: string;
  channel: string;
  direction: string;
  content: string;
  sentAt: string;
  delivered: boolean;
  read: boolean;
};

const CHANNEL_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  sms: "SMS",
};
const CHANNEL_COLORS: Record<string, string> = {
  whatsapp: "bg-green-100 text-green-700",
  email: "bg-blue-100 text-blue-700",
  sms: "bg-orange-100 text-orange-700",
};

export default function AdminMesaje() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sendForm, setSendForm] = useState({ phone: "", channel: "whatsapp", content: "" });
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  useEffect(() => {
    const qs = channelFilter !== "ALL" ? `?channel=${channelFilter.toLowerCase()}&status=${statusFilter}` : `?status=${statusFilter}`;
    setLoading(true);
    fetch(`/api/messages${qs}`)
      .then((r) => r.json())
      .then((data) => { setMessages(data.messages ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [channelFilter, statusFilter]);

  const sent = messages.filter((m) => m.delivered && m.direction === "OUTBOUND").length;
  const failed = messages.filter((m) => !m.delivered && m.direction === "OUTBOUND").length;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!sendForm.content.trim()) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: sendForm.channel, content: sendForm.content }),
      });
      const data = await res.json();
      setSendResult(data.delivered ? "✓ Mesaj trimis cu succes!" : "⚠ Mesaj înregistrat (Twilio/Resend necesită configurare)");
      setSendForm((f) => ({ ...f, content: "" }));
    } catch {
      setSendResult("✗ Eroare la trimitere");
    }
    setSending(false);
  }

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
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "Total mesaje", value: messages.length.toString(), color: "text-forest-700" },
            { label: "Trimise", value: sent.toString(), color: "text-green-600" },
            { label: "Eșuate", value: failed.toString(), color: "text-red-600" },
            { label: "Primite", value: messages.filter((m) => m.direction === "INBOUND").length.toString(), color: "text-blue-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft text-center">
              <div className={`font-display text-3xl ${s.color} ${loading ? "animate-pulse" : ""}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

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
              { step: "11", when: "+7 zile", msg: "Email ofertă revenire" },
            ].map((s) => (
              <div key={s.step} className="bg-forest-800/50 rounded-xl p-3">
                <div className="text-xs uppercase tracking-widest text-walnut-300 mb-1">Pas {s.step}</div>
                <div className="text-sm font-medium text-cream-50">{s.when}</div>
                <div className="text-xs text-cream-100/70 mt-1">{s.msg}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {(["ALL", "SENT", "FAILED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${statusFilter === f ? "bg-forest-700 text-cream-50" : "bg-cream-50 border border-stone-200 text-forest-800 hover:bg-stone-100"}`}
              >
                {f === "ALL" ? "Toate" : f === "SENT" ? "Trimise" : "Eșuate"}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            {(["ALL", "whatsapp", "email", "sms"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setChannelFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${channelFilter === c ? "bg-walnut-500 text-cream-50" : "bg-cream-50 border border-stone-200 text-forest-800 hover:bg-stone-100"}`}
              >
                {c === "ALL" ? "Toate canalele" : CHANNEL_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {loading ? (
            <div className="text-center text-stone-400 py-8 animate-pulse">Se încarcă mesajele...</div>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl bg-cream-50 border border-stone-200 p-8 text-center text-stone-400">
              Niciun mesaj înregistrat încă. Mesajele vor apărea automat la rezervări.
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-full grid place-items-center text-sm font-bold shrink-0 ${CHANNEL_COLORS[m.channel] ?? "bg-stone-100 text-stone-600"}`}>
                      {m.channel === "whatsapp" ? "WA" : m.channel === "email" ? "✉" : "SM"}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-display text-lg text-forest-900">{m.guest || "Necunoscut"}</span>
                        {m.apartment !== "—" && <span className="text-xs text-stone-500">{m.apartment}</span>}
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CHANNEL_COLORS[m.channel] ?? "bg-stone-100 text-stone-600"}`}>
                          {CHANNEL_LABELS[m.channel] ?? m.channel}
                        </span>
                        <span className="text-xs text-stone-400">{m.direction === "OUTBOUND" ? "→ Trimis" : "← Primit"}</span>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed italic max-w-xl truncate">"{m.content}"</p>
                      <div className="mt-2 text-xs text-stone-400">
                        {new Date(m.sentAt).toLocaleString("ro-RO")}
                        {m.phone && <span> · <a href={`tel:${m.phone}`} className="text-walnut-600 hover:underline">{m.phone}</a></span>}
                      </div>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${m.delivered ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {m.delivered ? "Livrat" : "Eșuat"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
          <h2 className="font-display text-xl text-forest-900 mb-4">Trimite mesaj manual</h2>
          <form onSubmit={handleSend} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Canal</label>
              <select
                value={sendForm.channel}
                onChange={(e) => setSendForm((f) => ({ ...f, channel: e.target.value }))}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-white"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Telefon oaspete</label>
              <input
                type="text"
                placeholder="+40738345330"
                value={sendForm.phone}
                onChange={(e) => setSendForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Mesaj</label>
              <textarea
                rows={3}
                value={sendForm.content}
                onChange={(e) => setSendForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Scrie mesajul... (se va semna automat — Echipa Vaias Aparts)"
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-forest-700 text-cream-50 px-6 py-2.5 text-sm font-medium hover:bg-forest-800 transition disabled:opacity-50"
              >
                {sending ? "Se trimite..." : "Trimite mesaj"}
              </button>
              {sendResult && <span className="ml-4 text-sm text-forest-700">{sendResult}</span>}
            </div>
          </form>
          <p className="mt-3 text-xs text-stone-400">Nota: codul casetei de chei NU se trimite în scris — comunicați-l verbal la telefon.</p>
        </div>
      </div>
    </div>
  );
}
