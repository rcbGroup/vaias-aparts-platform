"use client";

import { useState } from "react";
import {
  airports as allAirports,
  VILA_VAIAS_COORDS,
  type Airport
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

// Kilometres → SVG units. The projection is linear in degrees, so equal
// ground distances map to an ellipse (lng degrees are shorter than lat
// degrees at Romania's latitude). We render the reference rings as ellipses
// so they represent true distance on the ground.
const PX_PER_KM_LAT = SVG_H / (MAP_BBOX.north - MAP_BBOX.south) / 111;
const PX_PER_KM_LNG =
  SVG_W /
  (MAP_BBOX.east - MAP_BBOX.west) /
  (111 * Math.cos((VILA_VAIAS_COORDS.lat * Math.PI) / 180));

const DISTANCE_RINGS = [60, 150, 250, 400];

// ─── COLOUR CODING BY DISTANCE (Moldova always yellow) ───
type Band = {
  key: string;
  fill: string;
  ring: string;
  label: string;
};

const BANDS: Record<string, Band> = {
  closest: { key: "closest", fill: "#34d399", ring: "rgba(52,211,153,0.85)", label: "Cel mai apropiat · Suceava (60 km)" },
  near: { key: "near", fill: "#60a5fa", ring: "rgba(96,165,250,0.85)", label: "Sub 150 km · Bacău, Iași" },
  mid: { key: "mid", fill: "#c084fc", ring: "rgba(192,132,252,0.85)", label: "250–350 km · Cluj, Târgu Mureș" },
  far: { key: "far", fill: "#fb923c", ring: "rgba(251,146,60,0.85)", label: "Peste 350 km · București + restul" },
  moldova: { key: "moldova", fill: "#fbbf24", ring: "rgba(251,191,36,0.85)", label: "R. Moldova · Chișinău" }
};

function bandFor(a: Airport): Band {
  if (a.country === "Moldova") return BANDS.moldova;
  if (a.distanceKm <= 70) return BANDS.closest;
  if (a.distanceKm <= 150) return BANDS.near;
  if (a.distanceKm <= 350) return BANDS.mid;
  return BANDS.far;
}

// A7 (Autostrada Moldovei) — București → Bacău built/in-progress corridor,
// then the unfinished Bacău → Vânători-Neamț spur towards the villa.
const A7_BUILT = [
  { lat: 44.43, lng: 26.1 }, // București
  { lat: 45.15, lng: 26.82 }, // Buzău
  { lat: 45.7, lng: 27.18 }, // Focșani
  { lat: 46.57, lng: 26.91 } // Bacău
];
const A7_CONSTRUCTION = [
  { lat: 46.57, lng: 26.91 }, // Bacău
  VILA_VAIAS_COORDS // Vânători-Neamț / Vila
];

function toPolyline(points: { lat: number; lng: number }[]) {
  return points
    .map((p) => {
      const s = projectToSvg(p.lat, p.lng);
      return `${s.x},${s.y}`;
    })
    .join(" ");
}

export type AirportMapProps = {
  airports: Airport[];
  /** Slug of the single closest airport, highlighted as "CEL MAI APROPIAT". */
  closestSlug?: string;
  /** Called when a pin is clicked (scroll to card / navigate). */
  onSelect?: (slug: string) => void;
  /** Smaller homepage preview: condensed chrome and labels. */
  compact?: boolean;
  showLegend?: boolean;
};

export default function AirportMap({
  airports,
  closestSlug,
  onSelect,
  compact = false,
  showLegend = true
}: AirportMapProps) {
  const [active, setActive] = useState<string | null>(null);
  const vila = projectToSvg(VILA_VAIAS_COORDS.lat, VILA_VAIAS_COORDS.lng);

  // Fall back to computing the closest airport from the full dataset.
  const resolvedClosest =
    closestSlug ??
    [...allAirports].sort((a, b) => a.distanceKm - b.distanceKm)[0]?.slug;

  return (
    <div className="rounded-3xl bg-forest-950 overflow-hidden border border-forest-900 shadow-card relative">
      <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10 rounded-full bg-cream-50/95 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-forest-900">
        Vaias Aparts · Târgu Neamț
      </div>
      <div className="absolute top-4 right-4 md:top-5 md:right-5 z-10 rounded-full bg-walnut-500/95 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-cream-50">
        {airports.length} aeroporturi
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Hartă cu aeroporturile din România și țările vecine, marcate față de Vila Vaias Aparts din Târgu Neamț, cu cercuri de distanță și autostrada A7 în construcție"
      >
        <defs>
          <radialGradient id="airportmap-bg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1f2e23" />
            <stop offset="100%" stopColor="#0f1a13" />
          </radialGradient>
          <pattern id="airportmap-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(234,217,168,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#airportmap-bg)" />
        <rect width={SVG_W} height={SVG_H} fill="url(#airportmap-grid)" />

        {/* Romania-ish silhouette (very loose, decorative) */}
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

        {/* ─── Distance reference rings (60 / 150 / 250 / 400 km) ─── */}
        {DISTANCE_RINGS.map((km) => {
          const rx = km * PX_PER_KM_LNG;
          const ry = km * PX_PER_KM_LAT;
          return (
            <g key={`ring-${km}`} style={{ pointerEvents: "none" }}>
              <ellipse
                cx={vila.x}
                cy={vila.y}
                rx={rx}
                ry={ry}
                fill="none"
                stroke="rgba(234,217,168,0.16)"
                strokeWidth="1"
                strokeDasharray="5 7"
              />
              <text
                x={vila.x}
                y={vila.y - ry - 4}
                fontSize="11"
                textAnchor="middle"
                fill="rgba(234,217,168,0.40)"
              >
                {km} km
              </text>
            </g>
          );
        })}

        {/* ─── A7 motorway corridor ─── */}
        <g style={{ pointerEvents: "none" }}>
          <polyline
            points={toPolyline(A7_BUILT)}
            fill="none"
            stroke="rgba(132,204,22,0.7)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12 7"
          />
          <polyline
            points={toPolyline(A7_CONSTRUCTION)}
            fill="none"
            stroke="rgba(132,204,22,0.45)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 7"
          />
          {(() => {
            const b = projectToSvg(46.57, 26.91);
            const mid = {
              x: Math.round((b.x + vila.x) / 2),
              y: Math.round((b.y + vila.y) / 2)
            };
            return (
              <>
                <text
                  x={Math.round((projectToSvg(45.7, 27.18).x + b.x) / 2) + 8}
                  y={Math.round((projectToSvg(45.7, 27.18).y + b.y) / 2)}
                  fontSize="13"
                  fontWeight="700"
                  fill="rgba(163,230,53,0.95)"
                >
                  A7
                </text>
                <text
                  x={mid.x - 6}
                  y={mid.y - 8}
                  fontSize="10"
                  fontStyle="italic"
                  textAnchor="end"
                  fill="rgba(163,230,53,0.8)"
                >
                  în construcție
                </text>
              </>
            );
          })()}
        </g>

        {/* ─── Connector lines Vila → each airport ─── */}
        {airports.map((a) => {
          const p = projectToSvg(a.lat, a.lng);
          const isActive = active === a.slug;
          const isClosest = a.slug === resolvedClosest;
          const band = bandFor(a);
          return (
            <line
              key={`line-${a.slug}`}
              x1={vila.x}
              y1={vila.y}
              x2={p.x}
              y2={p.y}
              stroke={isActive || isClosest ? band.ring : "rgba(234,217,168,0.14)"}
              strokeWidth={isActive ? 2.4 : isClosest ? 1.6 : 0.6}
              strokeDasharray="4 5"
              style={{ pointerEvents: "none" }}
            />
          );
        })}

        {/* ─── Airport pins ─── */}
        {airports.map((a) => {
          const p = projectToSvg(a.lat, a.lng);
          const isActive = active === a.slug;
          const isClosest = a.slug === resolvedClosest;
          const band = bandFor(a);
          const r = isActive ? 13 : isClosest ? 11 : 7;
          return (
            <g
              key={`pin-${a.slug}`}
              onMouseEnter={() => setActive(a.slug)}
              onMouseLeave={() => setActive((s) => (s === a.slug ? null : s))}
              onClick={() => onSelect?.(a.slug)}
              className={onSelect ? "cursor-pointer" : undefined}
            >
              {isClosest && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r + 6}
                  fill="none"
                  stroke={band.ring}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}
              <circle cx={p.x} cy={p.y} r={r} fill={band.fill} stroke="#0f1a13" strokeWidth="2" />
              <text
                x={p.x}
                y={p.y + 3.5}
                fontSize="9"
                fontWeight="800"
                textAnchor="middle"
                fill="#0f1a13"
                style={{ pointerEvents: "none" }}
              >
                {a.iata}
              </text>

              <text
                x={p.x}
                y={p.y + (isClosest ? r + 16 : r + 13)}
                fontSize={isActive ? 14 : 11}
                fontWeight={isActive || isClosest ? 700 : 500}
                textAnchor="middle"
                fill={isActive ? "#faf6e9" : "rgba(250,246,233,0.78)"}
                style={{ pointerEvents: "none" }}
              >
                {a.shortName}
              </text>
              <text
                x={p.x}
                y={p.y + (isClosest ? r + 30 : r + 26)}
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                fill={band.ring}
                style={{ pointerEvents: "none" }}
              >
                {a.distanceKm} km
              </text>
              {isClosest && (
                <text
                  x={p.x}
                  y={p.y - r - 8}
                  fontSize="9.5"
                  fontWeight="800"
                  letterSpacing="1.5"
                  textAnchor="middle"
                  fill={band.fill}
                  style={{ pointerEvents: "none" }}
                >
                  ★ CEL MAI APROPIAT
                </text>
              )}
            </g>
          );
        })}

        {/* ─── Vila Vaias marker — pulsing dot with house icon ─── */}
        <g style={{ pointerEvents: "none" }}>
          <circle cx={vila.x} cy={vila.y} r="15" fill="none" stroke="rgba(52,211,153,0.7)" strokeWidth="2">
            <animate attributeName="r" values="15;38" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={vila.x} cy={vila.y} r="15" fill="none" stroke="rgba(52,211,153,0.55)" strokeWidth="2">
            <animate attributeName="r" values="15;38" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
          </circle>
          <circle cx={vila.x} cy={vila.y} r="16" fill="#a96f3e" stroke="#faf6e9" strokeWidth="2.5" />
          {/* house icon */}
          <path
            d={`M ${vila.x - 9} ${vila.y + 1} L ${vila.x} ${vila.y - 8} L ${vila.x + 9} ${vila.y + 1} Z`}
            fill="#faf6e9"
          />
          <rect x={vila.x - 6.5} y={vila.y + 1} width="13" height="8" fill="#faf6e9" />
          <rect x={vila.x - 2} y={vila.y + 4} width="4" height="5" fill="#a96f3e" />
          <text x={vila.x} y={vila.y - 26} fontSize="14" fontWeight="700" textAnchor="middle" fill="#faf6e9">
            Vila Vaias Aparts
          </text>
          <text x={vila.x} y={vila.y - 12} fontSize="10" textAnchor="middle" fill="rgba(52,211,153,0.95)">
            Târgu Neamț
          </text>
        </g>
      </svg>

      {showLegend && (
        <div className="px-4 md:px-6 py-4 bg-forest-900/80 border-t border-forest-800 text-xs text-cream-100/75">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {Object.values(BANDS).map((b) => (
              <span key={b.key} className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: b.fill }} />
                {b.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-5 shrink-0 border-t-2 border-dashed" style={{ borderColor: "#84cc16" }} />
              Autostrada A7
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-dashed border-cream-200/40 shrink-0" />
              Cercuri: 60 · 150 · 250 · 400 km
            </span>
          </div>
          <p className="mt-3 text-cream-200/60 leading-relaxed">
            Autostrada A7 în construcție — va conecta București cu Suceava via Bacău. Secțiunea
            Bacău–Vânători-Neamț în lucru.
            {!compact && " Click pe pin pentru detalii. Hover pentru distanță."}
          </p>
        </div>
      )}
    </div>
  );
}
