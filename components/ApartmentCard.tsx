"use client";

import Link from "next/link";
import Image from "next/image";
import type { Apartment } from "@/lib/apartments";
import StarRating from "./StarRating";
import { useLang } from "./LanguageProvider";

export default function ApartmentCard({
  apartment,
  priority = false
}: {
  apartment: Apartment;
  priority?: boolean;
}) {
  const { t } = useLang();
  return (
    <Link
      href={`/apartments/${apartment.slug}`}
      className="card-lift group block rounded-2xl overflow-hidden bg-cream-50 shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Image
          src={apartment.heroImage}
          alt={apartment.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-forest-950/0 to-transparent transition-opacity duration-500 group-hover:from-forest-950/65" />
        <div className="absolute top-4 left-4 rounded-full bg-cream-50/95 backdrop-blur px-3 py-1 text-xs font-medium text-forest-800 uppercase tracking-wider">
          {apartment.view}
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-walnut-500 px-4 py-1.5 text-xs font-medium text-cream-50 shadow-lg">
          {t("common.from")} €{apartment.pricePerNightEUR}{t("common.perNight")}
        </div>
      </div>
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display text-2xl text-forest-900 transition-colors group-hover:text-walnut-700">
            {apartment.name}
          </h3>
          <div className="flex flex-col items-end shrink-0 mt-1">
            <StarRating value={apartment.rating} size="sm" />
            <span className="text-xs text-stone-500 mt-1">
              {apartment.rating} · {apartment.reviewsCount}
            </span>
          </div>
        </div>
        <p className="font-serif text-lg text-forest-700/80 italic mb-4">
          {apartment.tagline}
        </p>
        <p className="text-sm text-stone-500 leading-relaxed mb-5 line-clamp-2">
          {apartment.shortDescription}
        </p>
        <div className="flex items-center gap-4 pt-4 border-t border-stone-200 text-sm text-forest-700">
          <span className="flex items-center gap-1.5">
            <BedIcon /> {apartment.beds} {apartment.beds === 1 ? t("common.bed") : t("common.beds")}
          </span>
          <span className="flex items-center gap-1.5">
            <BathIcon /> {apartment.bathrooms} {apartment.bathrooms === 1 ? t("common.bathroom") : t("common.bathrooms")}
          </span>
          <span className="flex items-center gap-1.5">
            <GuestsIcon /> {apartment.guests} {apartment.guests === 1 ? t("common.guest") : t("common.guests")}
          </span>
          <span className="flex items-center gap-1.5 ml-auto">{apartment.sizeSqm} m²</span>
        </div>
      </div>
    </Link>
  );
}

function BedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 17h20M2 12h20v5M2 12V8a2 2 0 012-2h16a2 2 0 012 2v4M7 12V9h4v3" />
    </svg>
  );
}
function BathIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 12h18v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3zM5 12V6a2 2 0 012-2h2v3" />
    </svg>
  );
}
function GuestsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
    </svg>
  );
}
