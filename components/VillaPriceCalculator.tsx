"use client";

import { useMemo, useState } from "react";
import {
  CHANNELS,
  VILLA,
  VILLA_LOS_DISCOUNT,
  quoteVilla,
  buildWhatsAppMessage,
  type Channel,
} from "@/lib/villa-pricing";

const WHATSAPP = "40752388388";

function fmt(n: number): string {
  return n.toLocaleString("ro-RO");
}

function diffDays(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(d: string, n: number): string {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + n);
  return dt.toISOString().slice(0, 10);
}

export default function VillaPriceCalculator() {
  const [checkIn, setCheckIn] = useState<string>(addDays(today(), 7));
  const [checkOut, setCheckOut] = useState<string>(addDays(today(), 10));
  const [guests, setGuests] = useState<number>(VILLA.standardAdults);
  const [channel, setChannel] = useState<Channel>("direct");

  const nights = diffDays(checkIn, checkOut);

  const quote = useMemo(
    () => quoteVilla({ channel, nights: Math.max(1, nights), guests }),
    [channel, nights, guests]
  );

  const directQuote = useMemo(
    () => quoteVilla({ channel: "direct", nights: Math.max(1, nights), guests }),
    [nights, guests]
  );

  const channelOptions: Channel[] = ["direct", "airbnb", "travelminit", "h2b", "booking"];

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    buildWhatsAppMessage(directQuote) +
      `\n\nDate dorite: ${checkIn} → ${checkOut}.`
  )}`;

  return (
    <div className="rounded-3xl bg-cream-50 border border-walnut-200/40 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-forest-900 text-cream-50 p-7 lg:p-9 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian-dark opacity-25 pointer-events-none" />
        <div className="relative">
          <div className="eyebrow-light mb-3">Calculator preț — Toată Vila</div>
          <h2 className="font-display text-3xl md:text-4xl text-cream-50 mb-2">
            Cât costă toată Vila Vaias Aparts?
          </h2>
          <p className="font-serif text-base text-cream-100/80">
            7 apartamente · 18–28 oaspeți · reduceri progresive pentru sejururi mai lungi
          </p>
        </div>
      </div>

      <div className="p-7 lg:p-9 grid gap-8 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-walnut-600 font-semibold mb-2">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              min={today()}
              onChange={(e) => {
                const v = e.target.value;
                setCheckIn(v);
                if (new Date(checkOut) <= new Date(v)) {
                  setCheckOut(addDays(v, 1));
                }
              }}
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-walnut-600 font-semibold mb-2">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              min={addDays(checkIn || today(), 1)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
            <p className="mt-1 text-xs text-stone-500">
              {nights > 0
                ? `${nights} ${nights === 1 ? "noapte" : "nopți"}`
                : "Selectează datele pentru a vedea prețul."}
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-walnut-600 font-semibold mb-2">
              Oaspeți ({VILLA.standardAdults}–{VILLA.maxCapacity})
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(VILLA.standardAdults, g - 1))}
                className="h-11 w-11 rounded-full border border-stone-300 text-xl text-forest-900 hover:bg-stone-50"
                aria-label="Mai puțini oaspeți"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="font-display text-3xl text-forest-900">{guests}</span>
                <span className="block text-xs text-stone-500 uppercase tracking-wider">oaspeți</span>
              </div>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(VILLA.maxCapacity, g + 1))}
                className="h-11 w-11 rounded-full border border-stone-300 text-xl text-forest-900 hover:bg-stone-50"
                aria-label="Mai mulți oaspeți"
              >
                +
              </button>
            </div>
            {quote.extraGuests > 0 && (
              <p className="mt-2 text-xs text-walnut-700">
                +{quote.extraGuests} oaspeți peste capacitatea standard de {VILLA.standardAdults}.
                Supliment {VILLA.extraPersonRON} RON/persoană/noapte.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-walnut-600 font-semibold mb-2">
              Canal rezervare
            </label>
            <div className="grid grid-cols-2 gap-2">
              {channelOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setChannel(c)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    channel === c
                      ? "border-forest-700 bg-forest-700 text-cream-50 shadow"
                      : "border-stone-300 bg-cream-50 text-forest-800 hover:border-walnut-400"
                  }`}
                >
                  {CHANNELS[c].label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              {CHANNELS[channel].description}
            </p>
          </div>
        </div>

        {/* Quote breakdown */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 lg:p-7">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl text-forest-900">Estimare preț</h3>
              <span
                className={`text-[10px] uppercase tracking-[0.24em] font-semibold rounded-full px-2.5 py-1 ${CHANNELS[channel].badgeClass}`}
              >
                {CHANNELS[channel].label}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <Row
                label={`${VILLA.oneBedCount} × apartament 1-dormitor`}
                value={`${VILLA.oneBedCount} × ${fmt(
                  Math.round(VILLA.oneBedBaseRON * (1 + CHANNELS[channel].markupPct / 100))
                )} RON`}
              />
              <Row
                label={`${VILLA.twoBedCount} × apartament 2-dormitoare`}
                value={`${VILLA.twoBedCount} × ${fmt(
                  Math.round(VILLA.twoBedBaseRON * (1 + CHANNELS[channel].markupPct / 100))
                )} RON`}
              />
              <div className="border-t border-stone-200 pt-3">
                <Row
                  label={`Vila întreagă, ${quote.nights} ${
                    quote.nights === 1 ? "noapte" : "nopți"
                  }`}
                  value={`${fmt(quote.subtotal)} RON`}
                />
              </div>

              {quote.discountPct > 0 && (
                <Row
                  label={`Reducere sejur lung (${quote.discountLabel})`}
                  value={`− ${fmt(quote.discountAmount)} RON`}
                  emphasize
                />
              )}

              {quote.extraPersonTotal > 0 && (
                <Row
                  label={`Supliment ${quote.extraGuests} oaspeți × ${quote.nights} nopți`}
                  value={`+ ${fmt(quote.extraPersonTotal)} RON`}
                />
              )}

              <div className="border-t border-stone-300 pt-4 mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-lg text-forest-900">Total estimat</span>
                  <span className="font-display text-3xl text-forest-900">
                    {fmt(quote.total)} RON
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 text-sm text-stone-600">
                  <span>Per noapte (mediu)</span>
                  <span>{fmt(Math.round(quote.total / quote.nights))} RON/noapte</span>
                </div>
              </div>

              {channel !== "direct" && quote.savingsVsBooking > 0 && (
                <div className="mt-4 rounded-xl bg-walnut-50 border border-walnut-200 p-4">
                  <div className="text-xs uppercase tracking-wider text-walnut-700 mb-1 font-semibold">
                    💡 Economisești cu rezervare directă
                  </div>
                  <p className="text-sm text-walnut-800 leading-relaxed">
                    Aceeași perioadă pe Booking.com (fără reducere pentru toată vila) ar costa
                    aproximativ <strong>{fmt(quote.subtotal)} RON</strong>.{" "}
                    {quote.discountAmount > 0 && (
                      <>
                        Direct la noi —{" "}
                        <strong>{fmt(quote.total)} RON</strong>, economie{" "}
                        <strong>{fmt(Math.round(quote.discountAmount))} RON</strong>.
                      </>
                    )}
                  </p>
                </div>
              )}

              {channel === "direct" && quote.discountPct > 0 && (
                <div className="mt-4 rounded-xl bg-forest-50 border border-forest-200 p-4">
                  <div className="text-xs uppercase tracking-wider text-forest-700 mb-1 font-semibold">
                    ✓ Rezervare directă — cel mai bun preț
                  </div>
                  <p className="text-sm text-forest-800 leading-relaxed">
                    Reducere {quote.discountPct}% pentru sejur de {quote.nights} nopți. Economisești{" "}
                    <strong>{fmt(quote.discountAmount)} RON</strong> față de prețul standard.
                  </p>
                </div>
              )}

              {quote.flooredApplied && (
                <p className="text-xs text-stone-500 mt-2 italic">
                  * Prețuri minime aplicate: niciodată sub {VILLA.oneBedFloorRON} RON / 1-dormitor sau{" "}
                  {VILLA.twoBedFloorRON} RON / 2-dormitoare.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 text-center"
              >
                💬 Rezervă toată vila — WhatsApp
              </a>
              <a href={`tel:+${WHATSAPP}`} className="btn-secondary flex-1 text-center">
                📞 Sună acum
              </a>
            </div>
            <p className="mt-3 text-xs text-stone-500 text-center">
              Estimare orientativă. Tariful final se confirmă în funcție de disponibilitate și sezon.
            </p>
          </div>

          <details className="mt-4 rounded-2xl border border-stone-200 bg-cream-50 p-5">
            <summary className="cursor-pointer text-sm font-medium text-forest-900">
              Cum funcționează reducerea progresivă?
            </summary>
            <ul className="mt-3 space-y-1.5 text-sm text-stone-700">
              {VILLA_LOS_DISCOUNT.map((d) => (
                <li key={d.nights} className="flex justify-between">
                  <span>{d.label}</span>
                  <span className="text-walnut-700 font-medium">
                    {d.pct === 0 ? "preț plin" : `−${d.pct}%`}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-stone-500 leading-relaxed">
              Reducerile se aplică doar pentru rezervări ale întregii vile, direct sau prin WhatsApp.
              Tarifele pe canale OTA (Booking, Airbnb, Travelminit, H2B) includ markup-ul de
              comision — direct rămâne mereu cel mai avantajos.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between ${
        emphasize ? "text-walnut-700 font-semibold" : "text-stone-700"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
