"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "./LanguageProvider";

type Slide = {
  src: string;
  alt: string;
  captionRO: string;
  captionEN: string;
};

const SLIDES: Slide[] = [
  {
    src: "/slideshow/01-drone-overview.jpg",
    alt: "Vila Vaias Aparts — vedere aeriană panoramică",
    captionRO: "Vila Vaias Aparts — vedere aeriană",
    captionEN: "Vila Vaias Aparts — aerial view",
  },
  {
    src: "/slideshow/02-drone-courtyard.jpg",
    alt: "Curte privată și grădină — vedere de sus",
    captionRO: "Curte privată și grădină",
    captionEN: "Private courtyard and garden",
  },
  {
    src: "/slideshow/05-interior-living.jpg",
    alt: "Living spațios apartament Vaias",
    captionRO: "Living spațios — boutique design",
    captionEN: "Spacious living — boutique design",
  },
  {
    src: "/slideshow/06-interior-bedroom.jpg",
    alt: "Dormitor cu lenjerie premium",
    captionRO: "Dormitor — lenjerie de bumbac premium",
    captionEN: "Bedroom — premium cotton linens",
  },
  {
    src: "/slideshow/03-drone-side.jpg",
    alt: "Vila Vaias — vedere laterală cu munții",
    captionRO: "Cadrul Subcarpaților Moldovei",
    captionEN: "Framed by the Moldavian Subcarpathians",
  },
  {
    src: "/slideshow/07-interior-kitchen.jpg",
    alt: "Bucătărie complet utilată",
    captionRO: "Bucătărie complet utilată în fiecare apartament",
    captionEN: "Fully equipped kitchen in every apartment",
  },
  {
    src: "/slideshow/08-interior-twobed.jpg",
    alt: "Apartament cu 2 dormitoare — living",
    captionRO: "Apartament cu 2 dormitoare — living",
    captionEN: "Two-bedroom apartment — living room",
  },
  {
    src: "/slideshow/09-interior-bath.jpg",
    alt: "Baie privată modernă",
    captionRO: "Baie privată în fiecare apartament",
    captionEN: "Private bathroom in each apartment",
  },
  {
    src: "/slideshow/04-drone-roof.jpg",
    alt: "Vila Vaias — acoperiș și curte",
    captionRO: "7 apartamente sub același acoperiș",
    captionEN: "7 apartments under one roof",
  },
  {
    src: "/slideshow/10-interior-detail.jpg",
    alt: "Detaliu interior apartament",
    captionRO: "Detalii de design — confort boutique",
    captionEN: "Design details — boutique comfort",
  },
  {
    src: "/slideshow/11-drone-night-1.jpg",
    alt: "Vila Vaias Aparts noaptea — Târgu Neamț",
    captionRO: "Vedere nocturnă — Târgu Neamț",
    captionEN: "Night view — Târgu Neamț",
  },
  {
    src: "/slideshow/12-drone-night-2.jpg",
    alt: "Vila Vaias Aparts — luminile nopții",
    captionRO: "Vaias Aparts după apus",
    captionEN: "Vaias Aparts at dusk",
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlideshow() {
  const { lang, t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) go(index - 1);
    else if (dx < -40) go(index + 1);
    touchStartX.current = null;
  };

  return (
    <section
      className="relative h-screen min-h-[640px] max-h-[920px] w-full overflow-hidden bg-forest-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Vila Vaias Aparts — galerie"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className="object-cover kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-forest-950/40 to-forest-950/85" />
          <div className="absolute inset-0 pattern-moldavian-dark opacity-30 mix-blend-overlay" />
        </div>
      ))}

      {/* Hero content overlay */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="container-x">
          <div className="max-w-3xl text-cream-50 animate-slide-up pointer-events-auto">
            <div className="eyebrow-light mb-6">{t("hero.eyebrow")}</div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-tight text-cream-50 text-balance">
              {t("hero.title1")}
              <br className="hidden md:block" /> {t("hero.title2")}
            </h1>
            <p className="mt-7 font-serif text-xl md:text-2xl text-cream-100/95 max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <p className="mt-3 italic font-serif text-lg text-cream-100/70">
              {t("hero.subtitleEn")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/apartments" className="btn-primary">
                {t("hero.cta1")}
              </Link>
              <Link href="/rezervare" className="btn-outline-light">
                {t("hero.cta2")}
              </Link>
              <Link
                href="/vila-completa"
                className="btn-outline-light border-walnut-300/80 text-walnut-100 hover:bg-walnut-500 hover:border-walnut-500 hover:text-cream-50"
              >
                🏡 Rezervă toată vila
              </Link>
            </div>
            <p className="mt-4 text-sm text-cream-100/80">
              Prețuri de la <strong className="text-cream-50">295 RON/noapte</strong> · Toată vila — de la{" "}
              <strong className="text-cream-50">2.065 RON/noapte</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Caption pill — bottom-right above arrows */}
      <div className="pointer-events-none absolute bottom-24 right-4 md:right-10 max-w-[80vw] md:max-w-md">
        <div className="rounded-full bg-forest-950/60 backdrop-blur px-4 py-2 text-xs md:text-sm text-cream-50/90 border border-cream-50/15">
          <span className="font-medium">
            {lang === "ro" ? SLIDES[index].captionRO : SLIDES[index].captionEN}
          </span>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        aria-label="Slide anterior"
        onClick={() => go(index - 1)}
        className="group absolute left-2 md:left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 hover:bg-cream-50/20 backdrop-blur text-cream-50 border border-cream-50/20 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Slide următor"
        onClick={() => go(index + 1)}
        className="group absolute right-2 md:right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 hover:bg-cream-50/20 backdrop-blur text-cream-50 border border-cream-50/20 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1} din ${SLIDES.length}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-cream-50" : "w-2 bg-cream-50/40 hover:bg-cream-50/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
