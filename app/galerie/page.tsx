"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ScrollFade from "@/components/ScrollFade";
import { apartments } from "@/lib/apartments";
import { useLang } from "@/components/LanguageProvider";

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

export default function GalleryPage() {
  const { t } = useLang();
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const tabs = [
    { id: "all", label: t("nav.gallery") },
    { id: "apartments", label: t("nav.apartments") },
    { id: "exterior", label: "Exterior" },
    { id: "nature", label: "Nature" },
    { id: "attractions", label: t("nav.attractions") }
  ];

  const apartmentImages = apartments.flatMap((a) =>
    a.gallery.map((src) => ({ src, label: a.name }))
  );

  const datasets = {
    apartments: apartmentImages,
    exterior: exteriorImages.map((src) => ({ src, label: "Exterior" })),
    nature: natureImages.map((src) => ({ src, label: "Nature" })),
    attractions: attractionsImages.map((src) => ({ src, label: t("nav.attractions") }))
  };

  const all = [
    ...datasets.apartments,
    ...datasets.exterior,
    ...datasets.nature,
    ...datasets.attractions
  ];

  const images = active === "all" ? all : datasets[active as keyof typeof datasets];

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, images.length]);

  return (
    <>
      <PageHero
        eyebrow={t("nav.gallery")}
        title="O privire peste casele noastre."
        subtitle="Apartamente, peisaje, locuri vechi."
        image="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <ScrollFade key={img.src + i} delay={Math.min(i * 30, 400)}>
                <button
                  onClick={() => setLightbox(i)}
                  className="relative aspect-square overflow-hidden rounded-lg bg-stone-100 group block w-full"
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/15 transition-colors duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-forest-950/85 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs uppercase tracking-wider text-cream-50">
                      {img.label}
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
          className="fixed inset-0 z-[100] bg-forest-950/97 flex items-center justify-center p-4 lb-fade-enter lb-fade-enter-active backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-cream-50 text-3xl rounded-full h-12 w-12 grid place-items-center hover:bg-cream-50/10 transition"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 md:left-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="absolute right-4 md:right-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % images.length);
            }}
          >
            ›
          </button>
          <div
            className="relative w-full max-w-5xl aspect-[3/2] img-fade-in"
            key={lightbox}
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
            {lightbox + 1} / {images.length} · {images[lightbox].label}
          </div>
        </div>
      )}
    </>
  );
}
