"use client";

import { useEffect, useMemo, useState } from "react";
import { apartments } from "@/lib/apartments";
import { useLang } from "./LanguageProvider";

export default function BookingForm() {
  const { t } = useLang();
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

  const today = new Date().toISOString().slice(0, 10);
  const minCheckout = checkin
    ? new Date(new Date(checkin).getTime() + 86400000).toISOString().slice(0, 10)
    : today;

  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    const ms = new Date(checkout).getTime() - new Date(checkin).getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [checkin, checkout]);

  const totalEUR = useMemo(() => {
    if (!nights) return 0;
    let total = nights * apartment.pricePerNightEUR;
    if (nights >= 7) total = Math.round(total * (1 - apartment.weeklyDiscountPct / 100));
    return total;
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
      <div className="rounded-2xl bg-forest-50 border border-forest-200 p-10 md:p-14 text-center shadow-soft">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-forest-700 text-cream-50 mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-forest-900">{t("booking.success")}</h3>
        <p className="mt-4 text-stone-600 max-w-md mx-auto">
          {t("booking.successText")} — <strong>{apartment.name}</strong>
        </p>
        <a href="https://wa.me/40740000000" className="btn-primary mt-8">
          {t("booking.continueWa")}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-stone-50 border border-stone-200 p-8 md:p-10 shadow-soft"
    >
      <h2 className="font-display text-3xl text-forest-900 mb-2">{t("booking.title")}</h2>
      <p className="text-stone-500 mb-8">{t("booking.subtitle")}</p>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider text-xs">{t("booking.apartment")}</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {apartments.map((a) => (
              <button
                type="button"
                key={a.slug}
                onClick={() => setAptSlug(a.slug)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  aptSlug === a.slug
                    ? "border-walnut-500 bg-walnut-50 shadow-soft"
                    : "border-stone-200 bg-cream-50 hover:border-stone-300 hover:shadow-soft"
                }`}
              >
                <div className="font-display text-lg text-forest-900">{a.name}</div>
                <div className="text-sm text-stone-500 mt-1">
                  {a.guests} {t("common.guests")} · {t("common.from")} €{a.pricePerNightEUR}{t("common.perNight")}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.checkin")}</label>
            <div className="relative">
              <input
                type="date"
                required
                min={today}
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-cream-50 pl-11 pr-4 py-3.5 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
              />
              <CalendarIcon />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.checkout")}</label>
            <div className="relative">
              <input
                type="date"
                required
                min={minCheckout}
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-cream-50 pl-11 pr-4 py-3.5 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
              />
              <CalendarIcon />
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.guests")}</label>
            <input
              type="number"
              min={1}
              max={apartment.guests}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3.5 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
            />
            <div className="text-xs text-stone-500 mt-1">{t("booking.maxFor", { n: apartment.guests })}</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.phone")}*</label>
            <input
              type="tel"
              required
              placeholder="+40 7XX XXX XXX"
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3.5 text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.name")}*</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3.5 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.emailLabel")}*</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3.5 text-forest-900 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-forest-800 mb-1.5 block uppercase tracking-wider">{t("booking.requests")}</label>
          <textarea
            rows={4}
            placeholder={t("booking.requestsPh")}
            className="w-full rounded-xl border border-stone-300 bg-cream-50 px-4 py-3.5 text-forest-900 placeholder:text-stone-400 focus:outline-none focus:border-walnut-500 focus:ring-2 focus:ring-walnut-500/15 transition"
          />
        </div>

        {nights > 0 && (
          <div className="rounded-xl bg-forest-50 border border-forest-200 p-5 animate-fade-in">
            <div className="flex justify-between text-sm">
              <span className="text-forest-800">{nights} {nights === 1 ? t("booking.night") : t("booking.nights")} × €{apartment.pricePerNightEUR}</span>
              <span className="text-forest-900">€{nights * apartment.pricePerNightEUR}</span>
            </div>
            {nights >= 7 && (
              <div className="flex justify-between text-sm text-walnut-600 mt-1">
                <span>{t("booking.weeklyDiscount")}</span>
                <span>−{apartment.weeklyDiscountPct}%</span>
              </div>
            )}
            <div className="flex justify-between font-display text-2xl text-forest-900 mt-3 pt-3 border-t border-forest-200">
              <span>{t("booking.totalEst")}</span>
              <span>€{totalEUR}</span>
            </div>
            <div className="text-xs text-stone-500 mt-1">{t("booking.finalNote")}</div>
          </div>
        )}

        <label className="flex items-start gap-3 text-sm text-stone-500 leading-snug">
          <input type="checkbox" required className="mt-1 accent-walnut-500" />
          <span>{t("booking.terms")}</span>
        </label>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
          {submitting ? t("booking.submitting") : t("booking.submit")}
        </button>
      </div>
    </form>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-walnut-500 pointer-events-none"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}
