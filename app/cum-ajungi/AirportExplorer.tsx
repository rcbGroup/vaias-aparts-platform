"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  airports,
  closestAirports,
  type Airport,
  type Country
} from "@/lib/airports";
import AirportMap from "@/components/AirportMap";

type FilterCountry = "all" | Country;

const CLOSEST_SLUG = closestAirports[0]?.slug;

export default function AirportExplorer() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<FilterCountry>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return airports.filter((a) => {
      if (country !== "all" && a.country !== country) return false;
      if (!q) return true;
      return (
        a.shortName.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.iata.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.routes.some((r) => r.toLowerCase().includes(q)) ||
        a.carriers.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [search, country]);

  const countries: { value: FilterCountry; label: string }[] = [
    { value: "all", label: "Toate" },
    { value: "Romania", label: "România" },
    { value: "Moldova", label: "R. Moldova" },
    { value: "Hungary", label: "Ungaria" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Serbia", label: "Serbia" }
  ];

  return (
    <div>
      {/* ─── MAP ─── */}
      <AirportMap
        airports={filtered}
        closestSlug={CLOSEST_SLUG}
        onSelect={(slug) => {
          document
            .getElementById(`airport-${slug}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      {/* ─── FILTERS ─── */}
      <div className="mt-10 rounded-2xl bg-cream-50 border border-stone-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <label htmlFor="airport-search" className="sr-only">
            Caută aeroport sau destinație
          </label>
          <input
            id="airport-search"
            type="search"
            placeholder='Caută: "Londra", "Wizz", "Bacău", "BCM"...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-forest-900 placeholder-stone-400 focus:outline-none focus:border-walnut-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <button
              key={c.value}
              onClick={() => setCountry(c.value)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] font-semibold transition ${
                country === c.value
                  ? "bg-forest-700 text-cream-50"
                  : "bg-stone-100 text-forest-800 hover:bg-stone-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── AIRPORT CARDS ─── */}
      <div className="mt-10 space-y-6">
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-cream-50 border border-stone-200 p-10 text-center text-stone-500">
            Niciun aeroport nu se potrivește filtrelor tale.
          </div>
        )}
        {filtered.map((a) => (
          <AirportCard key={a.slug} a={a} />
        ))}
      </div>
    </div>
  );
}

function AirportCard({ a }: { a: Airport }) {
  return (
    <article
      id={`airport-${a.slug}`}
      className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden scroll-mt-24"
    >
      <header className="bg-forest-900 text-cream-50 px-6 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center justify-center rounded-md bg-walnut-500 px-3 py-1 text-xs font-bold tracking-wider">
              {a.iata}
            </span>
            {a.closest && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/15 border border-cream-50/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
                ★ Cel mai apropiat
              </span>
            )}
            <span className="text-xs uppercase tracking-[0.2em] text-cream-100/65">
              {a.country === "Romania" ? a.region : a.country}
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-cream-50 mt-2">
            {a.name}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1.5">
            📍 {a.distanceKm} km
          </span>
          <span className="rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1.5">
            ⏱ {a.driveTime} cu mașina
          </span>
        </div>
      </header>

      <div className="p-6 md:p-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="font-serif text-lg text-forest-800 leading-relaxed">
            {a.summary}
          </p>

          <h4 className="mt-7 mb-3 text-xs uppercase tracking-[0.28em] text-walnut-500 font-semibold">
            Companii aeriene
          </h4>
          <div className="flex flex-wrap gap-2">
            {a.carriers.map((c) => (
              <span
                key={c}
                className="rounded-full bg-stone-100 text-forest-800 text-xs px-3 py-1.5"
              >
                {c}
              </span>
            ))}
          </div>

          <h4 className="mt-7 mb-3 text-xs uppercase tracking-[0.28em] text-walnut-500 font-semibold">
            Rute regulate către {a.shortName}
          </h4>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-stone-600">
            {a.routes.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-walnut-500 shrink-0">✈</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-7 mb-3 text-xs uppercase tracking-[0.28em] text-walnut-500 font-semibold">
            De la aeroport la Vaias Aparts ({a.distanceKm} km)
          </h4>
          <div className="space-y-3">
            {a.transport.map((t) => (
              <div
                key={t.label}
                className="rounded-xl bg-stone-50 border border-stone-200 p-4"
              >
                <div className="font-semibold text-forest-900 text-sm">
                  {t.label}
                </div>
                <div className="text-sm text-stone-600 mt-1 leading-relaxed">
                  {t.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* sidebar CTA */}
        <aside className="bg-forest-50 rounded-xl border border-forest-100 p-6 self-start sticky top-28">
          <div className="text-xs uppercase tracking-[0.28em] text-walnut-500 font-semibold mb-2">
            Cazare 4★ ·  ⭐ 5.0 / 99 recenzii
          </div>
          <div className="font-display text-2xl text-forest-900 mb-2">
            De la 297 lei / noapte
          </div>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            7 apartamente boutique cu pat Emperor 2×2m, ultracentral în Târgu
            Neamț. Reduceri: 10% la 2–3 nopți · 15% la 4–6 · 25% la 7+.
          </p>
          <Link
            href={`/rezervare?origin=${a.iata}`}
            className="btn-primary w-full mb-2 text-xs"
          >
            Rezervă pentru zborul tău
          </Link>
          <a
            href={`https://wa.me/40752388388?text=${encodeURIComponent(
              `Bună! Aterizez la ${a.shortName} (${a.iata}). Aș dori o ofertă pentru Vaias Aparts.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full bg-green-600 text-cream-50 text-xs uppercase tracking-[0.18em] font-medium py-3 hover:bg-green-700 transition"
          >
            WhatsApp ofertă
          </a>
          <div className="mt-4 pt-4 border-t border-forest-100 text-xs text-stone-500 space-y-1.5">
            <div>📞 +40 752 388 388</div>
            <div>📧 contact@vaiasaparts.ro</div>
          </div>
        </aside>
      </div>
    </article>
  );
}
