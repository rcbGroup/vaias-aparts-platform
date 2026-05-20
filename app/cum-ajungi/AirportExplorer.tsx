"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  airports,
  internationalAirports,
  romanianAirports,
  VILA_VAIAS_COORDS,
  type Airport,
  type Country,
  type Region
} from "@/lib/airports";

// SVG viewport — centered on Romania with extra margin so neighboring
// airports (Budapesta, Chișinău, Sofia…) still land inside the frame.
const MAP_BBOX = {
  west: 18.5,
  east: 30.5,
  north: 50.0,
  south: 42.0
};
const SVG_W = 1000;
const SVG_H = 700;

function projectToSvg(lat: number, lng: number) {
  const x = ((lng - MAP_BBOX.west) / (MAP_BBOX.east - MAP_BBOX.west)) * SVG_W;
  const y = ((MAP_BBOX.north - lat) / (MAP_BBOX.north - MAP_BBOX.south)) * SVG_H;
  return { x: Math.round(x), y: Math.round(y) };
}

type FilterCountry = "all" | Country;

export default function AirportExplorer() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<FilterCountry>("all");
  const [active, setActive] = useState<string | null>(null);

  const vila = projectToSvg(VILA_VAIAS_COORDS.lat, VILA_VAIAS_COORDS.lng);

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
      <div className="rounded-3xl bg-forest-950 overflow-hidden border border-forest-900 shadow-card relative">
        <div className="absolute top-5 left-5 z-10 rounded-full bg-cream-50/95 backdrop-blur px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900">
          Vaias Aparts · Târgu Neamț
        </div>
        <div className="absolute top-5 right-5 z-10 rounded-full bg-walnut-500/95 backdrop-blur px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50">
          {filtered.length} aeroporturi
        </div>

        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-auto block"
          role="img"
          aria-label="Hartă cu aeroporturile din România și țările vecine, marcate față de Vila Vaias Aparts din Târgu Neamț"
        >
          {/* Background gradient */}
          <defs>
            <radialGradient id="bg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1f2e23" />
              <stop offset="100%" stopColor="#0f1a13" />
            </radialGradient>
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(234,217,168,0.04)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width={SVG_W} height={SVG_H} fill="url(#bg)" />
          <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

          {/* Romania-ish silhouette (very loose convex hull, decorative) */}
          <path
            d="
              M 220 250
              Q 260 160, 360 150
              Q 470 130, 580 180
              Q 700 200, 780 240
              Q 820 290, 800 350
              Q 790 420, 740 470
              Q 660 520, 560 510
              Q 440 530, 360 500
              Q 280 470, 240 410
              Q 200 340, 220 250 Z
            "
            fill="rgba(155,183,153,0.07)"
            stroke="rgba(155,183,153,0.30)"
            strokeWidth="1.5"
          />

          {/* Distance lines from Vila to each airport */}
          {filtered.map((a) => {
            const p = projectToSvg(a.lat, a.lng);
            const isActive = active === a.slug;
            return (
              <line
                key={`line-${a.slug}`}
                x1={vila.x}
                y1={vila.y}
                x2={p.x}
                y2={p.y}
                stroke={
                  isActive
                    ? "rgba(211,170,84,0.95)"
                    : a.closest
                      ? "rgba(211,170,84,0.55)"
                      : "rgba(234,217,168,0.18)"
                }
                strokeWidth={isActive ? 2.5 : a.closest ? 1.3 : 0.6}
                strokeDasharray={isActive ? "0" : "4 4"}
              />
            );
          })}

          {/* Airport pins */}
          {filtered.map((a) => {
            const p = projectToSvg(a.lat, a.lng);
            const isActive = active === a.slug;
            return (
              <g
                key={`pin-${a.slug}`}
                onMouseEnter={() => setActive(a.slug)}
                onMouseLeave={() => setActive((s) => (s === a.slug ? null : s))}
                onClick={() => {
                  document
                    .getElementById(`airport-${a.slug}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 14 : a.closest ? 11 : 7}
                  fill={
                    a.closest
                      ? "rgba(211,170,84,0.95)"
                      : a.country === "Romania"
                        ? "rgba(155,183,153,0.85)"
                        : "rgba(234,217,168,0.6)"
                  }
                  stroke="#0f1a13"
                  strokeWidth="2"
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                  fill="#0f1a13"
                >
                  {a.iata}
                </text>
                <text
                  x={p.x}
                  y={p.y + (a.closest ? 26 : 22)}
                  fontSize={isActive ? 14 : 11}
                  fontWeight={isActive ? 700 : 500}
                  textAnchor="middle"
                  fill={isActive ? "#faf6e9" : "rgba(250,246,233,0.75)"}
                  style={{ pointerEvents: "none" }}
                >
                  {a.shortName}
                </text>
                {(a.closest || isActive) && (
                  <text
                    x={p.x}
                    y={p.y + (a.closest ? 40 : 36)}
                    fontSize="10"
                    textAnchor="middle"
                    fill="rgba(211,170,84,0.95)"
                    style={{ pointerEvents: "none" }}
                  >
                    {a.distanceKm} km · {a.driveTime}
                  </text>
                )}
              </g>
            );
          })}

          {/* Vila Vaias star marker */}
          <g>
            <circle
              cx={vila.x}
              cy={vila.y}
              r="22"
              fill="rgba(140,88,50,0.20)"
              stroke="rgba(211,170,84,0.6)"
              strokeWidth="1"
            />
            <circle
              cx={vila.x}
              cy={vila.y}
              r="14"
              fill="#a96f3e"
              stroke="#faf6e9"
              strokeWidth="2.5"
            />
            <text
              x={vila.x}
              y={vila.y + 4}
              fontSize="14"
              fontWeight="900"
              textAnchor="middle"
              fill="#faf6e9"
            >
              ★
            </text>
            <text
              x={vila.x}
              y={vila.y - 28}
              fontSize="14"
              fontWeight="700"
              textAnchor="middle"
              fill="#faf6e9"
            >
              Vila Vaias Aparts
            </text>
            <text
              x={vila.x}
              y={vila.y - 14}
              fontSize="10"
              textAnchor="middle"
              fill="rgba(211,170,84,0.95)"
            >
              Târgu Neamț
            </text>
          </g>
        </svg>
        <div className="px-6 py-4 bg-forest-900/80 border-t border-forest-800 flex flex-wrap items-center justify-between gap-3 text-xs text-cream-100/70">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-walnut-500" />
              Cele 3 aeroporturi închise
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-forest-300" />
              România
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cream-300/70" />
              Internațional
            </span>
          </div>
          <div className="text-cream-200/60">
            Click pe pin pentru detalii. Hover pentru distanță.
          </div>
        </div>
      </div>

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

export { romanianAirports, internationalAirports };
