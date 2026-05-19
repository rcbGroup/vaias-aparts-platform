"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ScrollFade from "@/components/ScrollFade";
import {
  APT1_PHOTOS,
  APT2_PHOTOS,
  APT3_PHOTOS,
  APT4_PHOTOS,
  APT5_PHOTOS,
  APT6_PHOTOS,
  APT7_PHOTOS,
  EXTERIOR_PHOTOS,
  DRONE_DAY_PHOTOS,
  DRONE_NIGHT_PHOTOS,
  HERO_EXTERIOR_PRIMARY,
} from "@/lib/photos";

type GalleryImage = { src: string; alt: string; category: string };

const galleryCategories = [
  { id: "all", label: "Toate fotografiile" },
  { id: "apt1", label: "Apartament 1" },
  { id: "apt2", label: "Apartament 2" },
  { id: "apt3", label: "Apartament 3" },
  { id: "apt4", label: "Apartament 4" },
  { id: "apt5", label: "Apartament 5" },
  { id: "apt6", label: "Apartament 6" },
  { id: "apt7", label: "Apartament 7 — parter, fără trepte" },
  { id: "exterior", label: "Exterior și curte" },
  { id: "drone", label: "Vedere aeriană (dronă)" },
];

const galleryImages: GalleryImage[] = [
  ...APT1_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 1 Vila Vaias Aparts Târgu Neamț — fotografie ${i + 1}`,
    category: "apt1",
  })),
  ...APT2_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 2 Vila Vaias Aparts Târgu Neamț — fotografie ${i + 1}`,
    category: "apt2",
  })),
  ...APT3_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 3 Vila Vaias Aparts Târgu Neamț — cel mai mare apartament — fotografie ${i + 1}`,
    category: "apt3",
  })),
  ...APT4_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 4 Vila Vaias Aparts Târgu Neamț — 2 dormitoare cu patio — fotografie ${i + 1}`,
    category: "apt4",
  })),
  ...APT5_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 5 Vila Vaias Aparts Târgu Neamț — aer condiționat, etaj 2 — exterior ${i + 1}`,
    category: "apt5",
  })),
  ...APT6_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 6 Vila Vaias Aparts Târgu Neamț — aer condiționat, etaj 2 — exterior ${i + 1}`,
    category: "apt6",
  })),
  ...APT7_PHOTOS.map((src, i) => ({
    src,
    alt: `Apartament 7 Vila Vaias Aparts — parter fără trepte — exterior ${i + 1}`,
    category: "apt7",
  })),
  ...EXTERIOR_PHOTOS.map((src, i) => ({
    src,
    alt: `Vila Vaias Aparts — fațadă boutique, Str. Sfântul Lazăr nr. 1, Târgu Neamț — fotografie ${i + 1}`,
    category: "exterior",
  })),
  ...DRONE_DAY_PHOTOS.map((src, i) => ({
    src,
    alt: `Vila Vaias Aparts — vedere aeriană dronă în Târgu Neamț, la poalele Cetății Neamțului — fotografie ${i + 1}`,
    category: "drone",
  })),
  ...DRONE_NIGHT_PHOTOS.map((src, i) => ({
    src,
    alt: `Vila Vaias Aparts — vedere aeriană pe timp de noapte, Târgu Neamț — fotografie ${i + 1}`,
    category: "drone",
  })),
];

export default function GalleryClient() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const images =
    active === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i! + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, images.length]);

  const apt567Active = active === "apt5" || active === "apt6" || active === "apt7";

  return (
    <>
      <PageHero
        eyebrow="Galerie foto"
        title="O privire peste casele noastre."
        subtitle="Apartamente, exterior, curte și împrejurimi — Vila Vaias Aparts în imagini."
        image={HERO_EXTERIOR_PRIMARY}
      />

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActive(tab.id);
                  setLightbox(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                  active === tab.id
                    ? "bg-forest-700 text-cream-50 shadow-soft"
                    : "bg-stone-100 text-forest-800 hover:bg-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {apt567Active && (
            <div className="mb-8 rounded-2xl border border-walnut-200 bg-walnut-50 p-5 max-w-3xl mx-auto text-center">
              <div className="font-display text-lg text-walnut-700 mb-1">
                📸 Fotografii interior noi în curând
              </div>
              <p className="text-sm text-forest-800/85">
                Apartamentele 5, 6 și 7 sunt în programul nostru de fotografie profesională.
                Până atunci, vedeți aici exteriorul și amplasarea pe vilă.{" "}
                {active === "apt5" && "Pentru Apartament 5 aveți disponibil un tur virtual 3D pe pagina dedicată."}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <ScrollFade key={img.src + i} delay={Math.min(i * 30, 400)}>
                <button
                  onClick={() => setLightbox(i)}
                  className="relative aspect-square overflow-hidden rounded-lg bg-stone-100 group block w-full"
                  aria-label={img.alt}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/15 transition-colors duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-forest-950/85 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs uppercase tracking-wider text-cream-50">
                      {galleryCategories.find((c) => c.id === img.category)?.label}
                    </span>
                  </div>
                </button>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-forest-950/97 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vizualizare fotografie"
        >
          <button
            aria-label="Închide galeria"
            className="absolute top-6 right-6 text-cream-50 text-3xl rounded-full h-12 w-12 grid place-items-center hover:bg-cream-50/10 transition"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            aria-label="Fotografie anterioară"
            className="absolute left-4 md:left-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Fotografie următoare"
            className="absolute right-4 md:right-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % images.length);
            }}
          >
            ›
          </button>
          <div
            className="relative w-full max-w-5xl aspect-[3/2]"
            key={lightbox}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-cream-100/80 text-sm">
            {lightbox + 1} / {images.length} &middot;{" "}
            {galleryCategories.find((c) => c.id === images[lightbox].category)?.label}
          </div>
        </div>
      )}
    </>
  );
}
