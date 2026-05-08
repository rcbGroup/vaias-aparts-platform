"use client";

import { useEffect, useMemo, useState } from "react";
import { apartments } from "@/lib/apartments";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aptSlug, setAptSlug] = useState(apartments[0].slug);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("apartament");
    if (slug && apartments.find((a) => a.slug === slug)) setAptSlug(slug);
  }, []);

  const apartment = apartments.find((a) => a.slug === aptSlug)!;

  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    const ms = new Date(checkout).getTime() - new Date(checkin).getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [checkin, checkout]);

  const totalEUR = useMemo(() => {
    if (!nights) return 0;
    let t = nights * apartment.pricePerNightEUR;
    if (nights >= 7) t = Math.round(t * (1 - apartment.weeklyDiscountPct / 100));
    return t;
  }, [nights, apartment]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-forest-50 border border-forest-200 p-10 md:p-14 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-forest-700 text-cream-50 mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-forest-900">Cerere primită!</h3>
        <p className="mt-4 text-stone-600 max-w-md mx-auto">
          Mulțumim! Verificăm disponibilitatea pentru <strong>{apartment.name}</strong> și
          revenim în maxim 4 ore cu confirmarea, prin WhatsApp sau telefon.
        </p>
        <a
          href="https://wa.me/40740000000"
          className="btn-primary mt-8"
        >
          Continuă pe WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-stone-50 border border-stone-200 p-8 md:p-10 shadow-soft"
    >
      <h2 className="font-display text-3xl text-forest-900 mb-2">Cere o rezervare</h2>
      <p className="text-stone-500 mb-8">Completează datele — confirmăm într-o clipă.</p>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-forest-800 mb-1.5 block">Apartament</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {apartments.map((a) => (
              <button
                type="button"
                key={a.slug}
                onClick={() => setAptSlug(a.slug)}
                className={`text-left p-4 rounded-xl border-2 transition ${
                  aptSlug === a.slug
                    ? "border-walnut-500 bg-walnut-50"
                    : "border-stone-200 bg-cream-50 hover:border-stone-300"
                }`}
              >
                <div className="font-display text-lg text-forest-900">{a.name}</div>
                <div className="text-sm text-stone-500 mt-1">
                  {a.guests} oaspeți · de la €{a.pricePerNightEUR}/noapte
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-forest-800 mb-1.5 block">Check-in</label>
            <input
              type="date"
              required
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest-800 mb-1.5 block">Check-out</label>
            <input
              type="date"
              required
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-forest-800 mb-1.5 block">Oaspeți</label>
            <input
              type="number"
              min={1}
              max={apartment.guests}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
            <div className="text-xs text-stone-500 mt-1">Maxim {apartment.guests} pentru acest apartament</div>
          </div>
          <div>
            <label className="text-sm font-medium text-forest-800 mb-1.5 block">Telefon*</label>
            <input
              type="tel"
              required
              placeholder="+40 7XX XXX XXX"
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-forest-800 mb-1.5 block">Nume*</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest-800 mb-1.5 block">Email*</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 focus:outline-none focus:border-walnut-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-forest-800 mb-1.5 block">Cerințe speciale</label>
          <textarea
            rows={4}
            placeholder="Mic dejun, late check-out, animale de companie, ocazie specială..."
            className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500"
          />
        </div>

        {nights > 0 && (
          <div className="rounded-xl bg-forest-50 border border-forest-200 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-forest-800">{nights} {nights === 1 ? "noapte" : "nopți"} × €{apartment.pricePerNightEUR}</span>
              <span className="text-forest-900">€{nights * apartment.pricePerNightEUR}</span>
            </div>
            {nights >= 7 && (
              <div className="flex justify-between text-sm text-walnut-600 mt-1">
                <span>Reducere săptămânală</span>
                <span>−{apartment.weeklyDiscountPct}%</span>
              </div>
            )}
            <div className="flex justify-between font-display text-2xl text-forest-900 mt-3 pt-3 border-t border-forest-200">
              <span>Total estimativ</span>
              <span>€{totalEUR}</span>
            </div>
            <div className="text-xs text-stone-500 mt-1">Tarif final confirmat după verificarea disponibilității.</div>
          </div>
        )}

        <label className="flex items-start gap-3 text-sm text-stone-500 leading-snug">
          <input type="checkbox" required className="mt-1 accent-walnut-500" />
          <span>
            Sunt de acord cu <a href="/termeni-conditii" className="text-walnut-600 underline">termenii și condițiile</a> și cu <a href="/politica-confidentialitate" className="text-walnut-600 underline">politica de confidențialitate</a>.
          </span>
        </label>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
          {submitting ? "Se trimite cererea..." : "Trimite cerere de rezervare"}
        </button>
      </div>
    </form>
  );
}
