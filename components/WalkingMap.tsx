"use client";

import { useState } from "react";
import { walkablePlaces, nearbyDrivePoints, type WalkPlace } from "@/lib/local-attractions";

const SVG_W = 920;
const SVG_H = 720;
const CX = SVG_W / 2;
const CY = SVG_H / 2;

// Walk rings at 5/10/15 minutes; drive markers sit on an outer band.
const PX_PER_WALK_MIN = 8.6;
const WALK_RINGS = [5, 10, 15];

function walkRadius(minutes: number) {
  return minutes * PX_PER_WALK_MIN;
}
function driveRadius(minutes: number) {
  return 178 + (minutes - 7) * 2.4;
}

function place(p: WalkPlace) {
  const r = p.mode === "walk" ? walkRadius(p.minutes) : driveRadius(p.minutes);
  const rad = (p.angle * Math.PI) / 180;
  return {
    x: Math.round(CX + r * Math.cos(rad)),
    y: Math.round(CY + r * Math.sin(rad))
  };
}

const WALK_FILL = "#34d399";
const DRIVE_FILL = "#60a5fa";

export default function WalkingMap() {
  const [active, setActive] = useState<string | null>(null);
  const points = [...walkablePlaces, ...nearbyDrivePoints];

  return (
    <div className="rounded-3xl bg-forest-950 overflow-hidden border border-forest-900 shadow-card relative">
      <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10 rounded-full bg-cream-50/95 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-forest-900">
        Vaias Aparts · în centru
      </div>
      <div className="absolute top-4 right-4 md:top-5 md:right-5 z-10 rounded-full bg-walnut-500/95 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-cream-50">
        {walkablePlaces.length} locuri pe jos
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Hartă cu locurile aflate la câțiva pași de Vila Vaias Aparts și timpii de mers pe jos"
      >
        <defs>
          <radialGradient id="walkmap-bg" cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#1f2e23" />
            <stop offset="100%" stopColor="#0f1a13" />
          </radialGradient>
          <pattern id="walkmap-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(234,217,168,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#walkmap-bg)" />
        <rect width={SVG_W} height={SVG_H} fill="url(#walkmap-grid)" />

        {/* Walking-time rings */}
        {WALK_RINGS.map((min) => {
          const r = walkRadius(min);
          return (
            <g key={`ring-${min}`} style={{ pointerEvents: "none" }}>
              <circle
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke="rgba(52,211,153,0.18)"
                strokeWidth="1"
                strokeDasharray="5 7"
              />
              <text x={CX} y={CY - r - 4} fontSize="12" textAnchor="middle" fill="rgba(52,211,153,0.5)">
                {min} min pe jos
              </text>
            </g>
          );
        })}
        {/* Outer drive band */}
        <circle
          cx={CX}
          cy={CY}
          r={driveRadius(18) + 10}
          fill="none"
          stroke="rgba(96,165,250,0.16)"
          strokeWidth="1"
          strokeDasharray="3 8"
          style={{ pointerEvents: "none" }}
        />
        <text
          x={CX}
          y={CY - (driveRadius(18) + 16)}
          fontSize="12"
          textAnchor="middle"
          fill="rgba(96,165,250,0.55)"
          style={{ pointerEvents: "none" }}
        >
          câteva minute cu mașina
        </text>

        {/* Connector lines */}
        {points.map((p) => {
          const pt = place(p);
          const isActive = active === p.slug;
          const fill = p.mode === "walk" ? WALK_FILL : DRIVE_FILL;
          return (
            <line
              key={`line-${p.slug}`}
              x1={CX}
              y1={CY}
              x2={pt.x}
              y2={pt.y}
              stroke={isActive ? fill : p.mode === "walk" ? "rgba(52,211,153,0.28)" : "rgba(96,165,250,0.25)"}
              strokeWidth={isActive ? 2.2 : 0.8}
              strokeDasharray="4 5"
              style={{ pointerEvents: "none" }}
            />
          );
        })}

        {/* Points */}
        {points.map((p) => {
          const pt = place(p);
          const isActive = active === p.slug;
          const fill = p.mode === "walk" ? WALK_FILL : DRIVE_FILL;
          const r = isActive ? 11 : 8;
          const labelBelow = pt.y >= CY;
          return (
            <g
              key={`pt-${p.slug}`}
              onMouseEnter={() => setActive(p.slug)}
              onMouseLeave={() => setActive((s) => (s === p.slug ? null : s))}
            >
              <circle cx={pt.x} cy={pt.y} r={r} fill={fill} stroke="#0f1a13" strokeWidth="2" />
              <text
                x={pt.x}
                y={pt.y + 4.5}
                fontSize="11"
                textAnchor="middle"
                style={{ pointerEvents: "none" }}
              >
                {p.icon}
              </text>
              <text
                x={pt.x}
                y={labelBelow ? pt.y + r + 15 : pt.y - r - 16}
                fontSize={isActive ? 13 : 11}
                fontWeight={isActive ? 700 : 500}
                textAnchor="middle"
                fill={isActive ? "#faf6e9" : "rgba(250,246,233,0.82)"}
                style={{ pointerEvents: "none" }}
              >
                {p.name.length > 26 ? p.name.slice(0, 24) + "…" : p.name}
              </text>
              <text
                x={pt.x}
                y={labelBelow ? pt.y + r + 29 : pt.y - r - 3}
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                fill={fill}
                style={{ pointerEvents: "none" }}
              >
                {p.time}
              </text>
            </g>
          );
        })}

        {/* Vila marker — pulsing house */}
        <g style={{ pointerEvents: "none" }}>
          <circle cx={CX} cy={CY} r="15" fill="none" stroke="rgba(52,211,153,0.7)" strokeWidth="2">
            <animate attributeName="r" values="15;40" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="15" fill="none" stroke="rgba(52,211,153,0.55)" strokeWidth="2">
            <animate attributeName="r" values="15;40" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="17" fill="#a96f3e" stroke="#faf6e9" strokeWidth="2.5" />
          <path d={`M ${CX - 9} ${CY + 1} L ${CX} ${CY - 8} L ${CX + 9} ${CY + 1} Z`} fill="#faf6e9" />
          <rect x={CX - 6.5} y={CY + 1} width="13" height="8" fill="#faf6e9" />
          <rect x={CX - 2} y={CY + 4} width="4" height="5" fill="#a96f3e" />
          <text x={CX} y={CY - 27} fontSize="14" fontWeight="700" textAnchor="middle" fill="#faf6e9">
            Vila Vaias Aparts
          </text>
        </g>
      </svg>

      <div className="px-4 md:px-6 py-4 bg-forest-900/80 border-t border-forest-800 text-xs text-cream-100/75">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: WALK_FILL }} />
            La câțiva pași — pe jos
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: DRIVE_FILL }} />
            Câteva minute cu mașina
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-dashed border-emerald-300/40 shrink-0" />
            Cercuri: 5 · 10 · 15 min pe jos
          </span>
        </div>
        <p className="mt-3 text-cream-200/60 leading-relaxed">
          Ultracentral în Târgu Neamț — aproape tot ce ai nevoie e la o plimbare de poarta noastră.
        </p>
      </div>
    </div>
  );
}
