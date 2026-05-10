"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ScrollFade from "@/components/ScrollFade";

const BASE = "https://www.vaiasaparts.ro/wp-content/uploads";

type GalleryImage = { src: string; alt: string; category: string };

const galleryCategories = [
  { id: "all", label: "Toate fotografiile" },
  { id: "apt1", label: "Apartament 1" },
  { id: "apt2", label: "Apartament 2" },
  { id: "apt3", label: "Apartament 3" },
  { id: "apt4", label: "Apartament 4" },
  { id: "apt5", label: "Apartament 5" },
  { id: "apt6", label: "Apartament 6" },
  { id: "apt7", label: "Apartament 7" },
  { id: "exterior", label: "Exterior și curte" },
];

const galleryImages: GalleryImage[] = [
  // Apartament 1 (19 images)
  ...Array.from({ length: 19 }, (_, i) => ({
    src: `${BASE}/2022/12/Apartament1_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Apartament 1 Vila Vaias Aparts Târgu Neamț — fotografie ${i + 1}`,
    category: "apt1",
  })),
  // Apartament 2 (14 images)
  ...Array.from({ length: 14 }, (_, i) => ({
    src: `${BASE}/2022/12/Apartament2_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Apartament 2 Vila Vaias Aparts Târgu Neamț — fotografie ${i + 1}`,
    category: "apt2",
  })),
  // Apartament 3 (17 images)
  ...Array.from({ length: 17 }, (_, i) => ({
    src: `${BASE}/2022/12/Apartament3_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Apartament 3 Vila Vaias Aparts Târgu Neamț — fotografie ${i + 1}`,
    category: "apt3",
  })),
  // Apartament 4 (10 images)
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `${BASE}/2022/12/Apartament4_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Apartament 4 Vila Vaias Aparts Târgu Neamț — fotografie ${i + 1}`,
    category: "apt4",
  })),
  // Apartament 5 (17 images)
  ...Array.from({ length: 17 }, (_, i) => ({
    src: `${BASE}/2022/12/Apartament5_VaiasaAparts_${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Apartament 5 Vila Vaias Aparts Târgu Neamț — aer condiționat — fotografie ${i + 1}`,
    category: "apt5",
  })),
  // Apartament 6 (11 images, starts at _02)
  ...Array.from({ length: 11 }, (_, i) => ({
    src: `${BASE}/2022/12/Apartament6_VaiasaAparts_${String(i + 2).padStart(2, "0")}.webp`,
    alt: `Apartament 6 Vila Vaias Aparts Târgu Neamț — aer condiționat — fotografie ${i + 2}`,
    category: "apt6",
  })),
  // Apartament 7 (6 images)
  { src: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/516492579_733556772950876_3694245894075396123_n.webp", alt: "Apartament 7 Vila Vaias Aparts — parter fără trepte — dormitor cu pat Emperor", category: "apt7" },
  { src: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518199043_733557542950799_1039072054897679506_n.webp", alt: "Apartament 7 Vila Vaias Aparts — living cu canapea extensibilă", category: "apt7" },
  { src: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518272256_733556742950879_6883338769382424532_n.webp", alt: "Apartament 7 Vila Vaias Aparts — baie privată", category: "apt7" },
  { src: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518277917_733556719617548_6039837942695933401_n.webp", alt: "Apartament 7 Vila Vaias Aparts — terasă privată", category: "apt7" },
  { src: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518333555_733556406284246_5206156284237423621_n.webp", alt: "Apartament 7 Vila Vaias Aparts — detaliu interior", category: "apt7" },
  { src: "https://www.vaiasaparts.ro/wp-content/uploads/2026/04/518335038_733557552950798_4553339340452107002_n.webp", alt: "Apartament 7 Vila Vaias Aparts — parter accesibil", category: "apt7" },
  // Exterior
  { src: `${BASE}/2022/12/Vaias_aparts_16.jpg`, alt: "Vila Vaias Aparts exterior — vedere față Târgu Neamț", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_11.jpg`, alt: "Vila Vaias Aparts curte interioară — parcare gratuită", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_12.jpg`, alt: "Vila Vaias Aparts exterior — intrare vilă Târgu Neamț", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_7.jpg`, alt: "Vila Vaias Aparts — vedere exterior seară", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_8.jpg`, alt: "Vila Vaias Aparts — exterior detaliu arhitectură", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_6.jpg`, alt: "Vila Vaias Aparts — curte și spații comune", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_5.jpg`, alt: "Vila Vaias Aparts Târgu Neamț — vedere generală", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias_aparts_4.jpg`, alt: "Vila Vaias Aparts — grădină și exterior", category: "exterior" },
  { src: `${BASE}/2022/12/Vaias-5.jpg`, alt: "Vila Vaias Aparts — fotografie exterior zi", category: "exterior" },
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

  return (
    <>
      <PageHero
        eyebrow="Galerie foto"
        title="O privire peste casele noastre."
        subtitle="Apartamente, exterior, curte și împrejurimi — Vila Vaias Aparts în imagini."
        image={`${BASE}/2022/12/Vaias_aparts_16.jpg`}
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
