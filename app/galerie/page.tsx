"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { apartments } from "@/lib/apartments";

const exteriorImages = [
  "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1502780402662-acc01917ddc5?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1600&q=80"
];

const natureImages = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1600&q=80"
];

const attractionsImages = [
  "https://images.unsplash.com/photo-1583425423320-d40d80d12af9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1600&q=80"
];

const tabs = [
  { id: "all", label: "Tot" },
  { id: "apartments", label: "Apartamente" },
  { id: "exterior", label: "Exterior" },
  { id: "nature", label: "Natură" },
  { id: "attractions", label: "Atracții" }
];

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const apartmentImages = apartments.flatMap((a) =>
    a.gallery.map((src) => ({ src, label: a.name }))
  );

  const datasets = {
    apartments: apartmentImages,
    exterior: exteriorImages.map((src) => ({ src, label: "Exterior" })),
    nature: natureImages.map((src) => ({ src, label: "Natură" })),
    attractions: attractionsImages.map((src) => ({ src, label: "Atracții" }))
  };

  const all = [
    ...datasets.apartments,
    ...datasets.exterior,
    ...datasets.nature,
    ...datasets.attractions
  ];

  const images = active === "all" ? all : datasets[active as keyof typeof datasets];

  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="O privire peste casele noastre."
        subtitle="Apartamente, peisaje, locuri vechi. Din cadrele acestea s-a țesut Vaias Aparts."
        image="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] transition ${
                  active === t.id
                    ? "bg-forest-700 text-cream-50"
                    : "bg-stone-100 text-forest-800 hover:bg-stone-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                onClick={() => setLightbox(i)}
                className="relative aspect-square overflow-hidden rounded-lg bg-stone-100 group"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-forest-950/70 to-transparent translate-y-full group-hover:translate-y-0 transition">
                  <span className="text-xs uppercase tracking-wider text-cream-50">
                    {img.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-forest-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Închide"
            className="absolute top-6 right-6 text-cream-50 text-3xl"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            aria-label="Anterior"
            className="absolute left-4 md:left-8 text-cream-50 text-4xl px-4 py-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Următor"
            className="absolute right-4 md:right-8 text-cream-50 text-4xl px-4 py-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % images.length);
            }}
          >
            ›
          </button>
          <div
            className="relative w-full max-w-5xl aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].label}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-cream-100/80 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
