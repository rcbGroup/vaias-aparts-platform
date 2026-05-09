"use client";

import { useState } from "react";
import Link from "next/link";

type ToggleSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  channel: "WhatsApp" | "Email" | "SMS";
};

const defaultSettings: ToggleSetting[] = [
  { id: "owner_wa_booking", label: "WA owner — rezervare nouă", description: "WhatsApp instant la +40 738 345 330 când sosește o cerere de rezervare", enabled: true, channel: "WhatsApp" },
  { id: "owner_email_booking", label: "Email owner — rezervare nouă", description: "Email la contact@VaiasAparts.ro cu toate detaliile rezervării", enabled: true, channel: "Email" },
  { id: "guest_sms_received", label: "SMS oaspete — cerere primită", description: 'SMS automat: "Cererea dumneavoastră a fost primită. Revenite în maxim 4 ore."', enabled: true, channel: "SMS" },
  { id: "guest_wa_confirmed", label: "WA oaspete — confirmare", description: "WhatsApp după confirmarea rezervării cu check-in și instrucțiuni generale", enabled: true, channel: "WhatsApp" },
  { id: "guest_email_confirmed", label: "Email oaspete — confirmare", description: "Email detaliat cu confirmare, instrucțiuni Kitchen for All și ghid zonă", enabled: true, channel: "Email" },
  { id: "guest_wa_minus7", label: "WA oaspete — −7 zile", description: "Mesaj de bun venit cu 7 zile înainte de sosire", enabled: true, channel: "WhatsApp" },
  { id: "guest_wa_minus1", label: "WA oaspete — −1 zi", description: "Instrucțiuni complete de acces (codul cutiei NU se scrie — se sună!)", enabled: true, channel: "WhatsApp" },
  { id: "guest_email_minus1", label: "Email oaspete — −1 zi", description: "Confirmare check-in, ghid zonă, recomandări restaurante", enabled: true, channel: "Email" },
  { id: "guest_wa_checkin", label: "WA oaspete — +2h check-in", description: 'Mesaj de instalare: "Sperăm că v-ați instalat bine."', enabled: true, channel: "WhatsApp" },
  { id: "guest_wa_checkout_reminder", label: "WA oaspete — reminder checkout", description: "Reminder check-out 11:00 cu instrucțiuni cutie chei (cutia metalică maro, parter)", enabled: true, channel: "WhatsApp" },
  { id: "guest_wa_review", label: "WA/Email oaspete — recenzie", description: "+2h după plecare: cerere recenzie Google cu link direct", enabled: true, channel: "WhatsApp" },
  { id: "guest_email_return", label: "Email oaspete — ofertă revenire", description: "+7 zile după plecare: ofertă personalizată cu reducere până la 25%", enabled: false, channel: "Email" }
];

export default function AdminNotificari() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const channelColors = {
    WhatsApp: "bg-green-100 text-green-700",
    Email: "bg-blue-100 text-blue-700",
    SMS: "bg-orange-100 text-orange-700"
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50 text-sm">← Dashboard</Link>
          <span className="text-cream-100/40">|</span>
          <span className="font-display text-lg">Notificări & Canale</span>
        </div>
        <Link href="/" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">Site →</Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Service status */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {[
            { name: "Twilio WhatsApp", status: "Necesită configurare", ok: false, desc: "Verificați numărul în Twilio Console" },
            { name: "Resend Email", status: "Necesită configurare", ok: false, desc: "Verificați domeniul vaiasaparts.ro" },
            { name: "Twilio SMS", status: "Necesită configurare", ok: false, desc: "Activați SMS în Twilio Console" }
          ].map((s) => (
            <div key={s.name} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-forest-900">{s.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.ok ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {s.status}
                </span>
              </div>
              <p className="text-xs text-stone-500">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* API Keys status */}
        <div className="rounded-2xl bg-forest-900 text-cream-50 p-6 mb-8">
          <h2 className="font-display text-xl mb-4">Variabile de mediu necesare</h2>
          <div className="grid gap-2 font-mono text-sm">
            {[
              { key: "TWILIO_ACCOUNT_SID", set: false },
              { key: "TWILIO_AUTH_TOKEN", set: false },
              { key: "TWILIO_WHATSAPP_FROM", set: false },
              { key: "RESEND_API_KEY", set: false },
              { key: "DATABASE_URL", set: false }
            ].map((v) => (
              <div key={v.key} className="flex items-center justify-between">
                <span className="text-cream-100/80">{v.key}</span>
                <span className={`text-xs ${v.set ? "text-green-400" : "text-yellow-400"}`}>
                  {v.set ? "✓ Configurat" : "⚠ Lipsă"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-cream-100/60">
            Adăugați variabilele în Vercel Dashboard → Settings → Environment Variables sau local în .env.local
          </p>
        </div>

        {/* Notification toggles */}
        <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden mb-6">
          <div className="p-5 border-b border-stone-100">
            <h2 className="font-display text-xl text-forest-900">Secvența automată de notificări</h2>
            <p className="text-sm text-stone-500 mt-1">Activați sau dezactivați fiecare pas al secvenței automate.</p>
          </div>
          <div className="divide-y divide-stone-100">
            {settings.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 p-5 hover:bg-stone-50 transition">
                <div className="flex items-start gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium shrink-0 mt-0.5 ${channelColors[s.channel]}`}>
                    {s.channel}
                  </span>
                  <div>
                    <div className="font-medium text-forest-900 text-sm">{s.label}</div>
                    <div className="text-xs text-stone-500 mt-0.5 leading-relaxed">{s.description}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggle(s.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${s.enabled ? "bg-forest-600" : "bg-stone-300"}`}
                  aria-checked={s.enabled}
                  role="switch"
                >
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-5" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Critical rule reminder */}
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-5 mb-6">
          <h3 className="font-display text-lg text-red-800 mb-2">Regulă critică — codul casetei de chei</h3>
          <p className="text-sm text-red-700 leading-relaxed">
            <strong>NICIODATĂ</strong> nu se trimite codul casetei de chei în scris (WhatsApp, SMS, email).
            Codul se comunică <strong>verbal, prin telefon</strong>, în ziua sosirii.
            Verificați că mesajul „−1 zi" nu conține codul.
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`rounded-full px-8 py-3 font-medium transition ${saved ? "bg-green-600 text-cream-50" : "bg-forest-700 text-cream-50 hover:bg-forest-800"}`}
        >
          {saved ? "✓ Salvat!" : "Salvează setările"}
        </button>
      </div>
    </div>
  );
}
