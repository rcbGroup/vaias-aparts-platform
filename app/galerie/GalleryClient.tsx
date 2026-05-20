"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ScrollFade from "@/components/ScrollFade";
import VideoThumbnail from "@/components/VideoThumbnail";
import MediaActions from "@/components/MediaActions";
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
import {
  SITE_URL,
  VILLA_VIDEO_ID,
  KITCHEN_VIDEO_ID,
  getVideoByApartment,
} from "@/lib/videos";

type Item =
  | {
      kind: "photo";
      src: string;
      alt: string;
      label: string;
      tags: string[];
      shareUrl: string;
      enquiry: string;
    }
  | {
      kind: "video";
      youtubeId: string;
      title: string;
      label: string;
      tags: string[];
      shareUrl: string;
      enquiry: string;
    };

const galleryCategories = [
  { id: "all", label: "Toate fotografiile" },
  { id: "apt1", label: "Apartament 1" },
  { id: "apt2", label: "Apartament 2" },
  { id: "apt3", label: "Apartament 3" },
  { id: "apt4", label: "Apartament 4" },
  { id: "apt5", label: "Apartament 5" },
  { id: "apt6", label: "Apartament 6" },
  { id: "apt7", label: "Apartament 7 — parter, fără trepte" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior și curte" },
  { id: "drone", label: "Vedere aeriană (dronă)" },
  { id: "baie", label: "Băi" },
  { id: "video", label: "Videouri" },
];

const APTS = [
  { id: "apt1", slug: "apartament-1", label: "Apartament 1", photos: APT1_PHOTOS },
  { id: "apt2", slug: "apartament-2", label: "Apartament 2", photos: APT2_PHOTOS },
  { id: "apt3", slug: "apartament-3", label: "Apartament 3", photos: APT3_PHOTOS },
  { id: "apt4", slug: "apartament-4", label: "Apartament 4", photos: APT4_PHOTOS },
  { id: "apt5", slug: "apartament-5", label: "Apartament 5", photos: APT5_PHOTOS },
  { id: "apt6", slug: "apartament-6", label: "Apartament 6", photos: APT6_PHOTOS },
  { id: "apt7", slug: "apartament-7", label: "Apartament 7", photos: APT7_PHOTOS },
];

const genericEnquiry = "Bună ziua! Sunt interesat(ă) de Vila Vaias Aparts! 🏡";

function buildItems(): Item[] {
  const items: Item[] = [];

  // Whole-villa video leads the gallery.
  items.push({
    kind: "video",
    youtubeId: VILLA_VIDEO_ID,
    title: "Vila Vaias Aparts — tur complet",
    label: "Vila — tur video",
    tags: ["video"],
    shareUrl: `${SITE_URL}/vila-completa`,
    enquiry: genericEnquiry,
  });

  for (const apt of APTS) {
    const shareUrl = `${SITE_URL}/apartments/${apt.slug}`;
    const enquiry = `Bună ziua! Sunt interesat(ă) de ${apt.label} la Vila Vaias Aparts! 🏡`;
    const video = getVideoByApartment(apt.slug);
    apt.photos.forEach((src, i) => {
      const isBath = /-baie/.test(src);
      const tags = [apt.id, "interior"];
      if (isBath) tags.push("baie");
      items.push({
        kind: "photo",
        src,
        alt: `${apt.label} Vila Vaias Aparts Târgu Neamț — ${isBath ? "baie renovată" : "interior"} ${i + 1}`,
        label: apt.label,
        tags,
        shareUrl,
        enquiry,
      });
      // Video card second — right after the first (hero) photo.
      if (i === 0 && video) {
        items.push({
          kind: "video",
          youtubeId: video.youtubeId,
          title: `${apt.label} — tur video`,
          label: apt.label,
          tags: [apt.id, "video"],
          shareUrl,
          enquiry,
        });
      }
    });
  }

  EXTERIOR_PHOTOS.forEach((src, i) => {
    items.push({
      kind: "photo",
      src,
      alt: `Vila Vaias Aparts — fațadă boutique, Str. Sfântul Lazăr nr. 1, Târgu Neamț — fotografie ${i + 1}`,
      label: "Exterior și curte",
      tags: ["exterior"],
      shareUrl: `${SITE_URL}/galerie`,
      enquiry: genericEnquiry,
    });
  });

  [...DRONE_DAY_PHOTOS, ...DRONE_NIGHT_PHOTOS].forEach((src, i) => {
    items.push({
      kind: "photo",
      src,
      alt: `Vila Vaias Aparts — vedere aeriană dronă în Târgu Neamț, la poalele Cetății Neamțului — fotografie ${i + 1}`,
      label: "Vedere aeriană (dronă)",
      tags: ["drone"],
      shareUrl: `${SITE_URL}/galerie`,
      enquiry: genericEnquiry,
    });
  });

  // Shared-kitchen video closes the set.
  items.push({
    kind: "video",
    youtubeId: KITCHEN_VIDEO_ID,
    title: "Bucătăria pentru Toți",
    label: "Bucătărie — video",
    tags: ["video"],
    shareUrl: `${SITE_URL}/vila-completa`,
    enquiry: genericEnquiry,
  });

  return items;
}

const allItems = buildItems();

export default function GalleryClient() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (active === "all" ? allItems : allItems.filter((it) => it.tags.includes(active))),
    [active]
  );
  const photos = useMemo(() => items.filter((i) => i.kind === "photo") as Extract<Item, { kind: "photo" }>[], [items]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % photos.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, photos.length]);

  return (
    <>
      <PageHero
        eyebrow="Galerie foto & video"
        title="O privire peste casele noastre."
        subtitle="Apartamente, exterior, curte, împrejurimi — și tururi video — Vila Vaias Aparts în imagini."
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item, i) => {
              if (item.kind === "video") {
                return (
                  <ScrollFade key={`v-${item.youtubeId}-${i}`} delay={Math.min(i * 30, 400)}>
                    <div className="group relative aspect-square overflow-hidden rounded-lg bg-forest-950">
                      <VideoThumbnail youtubeId={item.youtubeId} title={item.title} label="Video" />
                      <MediaActions
                        mediaKey={`video:${item.youtubeId}`}
                        shareUrl={item.shareUrl}
                        title={`${item.title} — Vila Vaias Aparts`}
                        enquiryText={item.enquiry}
                      />
                    </div>
                  </ScrollFade>
                );
              }
              const photoIndex = photos.indexOf(item);
              return (
                <ScrollFade key={item.src + i} delay={Math.min(i * 30, 400)}>
                  <div className="group relative aspect-square overflow-hidden rounded-lg bg-stone-100">
                    <button
                      onClick={() => setLightbox(photoIndex)}
                      className="absolute inset-0 h-full w-full"
                      aria-label={item.alt}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/15 transition-colors duration-500" />
                    </button>
                    <MediaActions
                      mediaKey={item.src}
                      shareUrl={item.shareUrl}
                      title={`${item.label} — Vila Vaias Aparts`}
                      enquiryText={item.enquiry}
                    />
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {lightbox !== null && photos[lightbox] && (
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
              setLightbox((i) => (i! - 1 + photos.length) % photos.length);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Fotografie următoare"
            className="absolute right-4 md:right-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % photos.length);
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
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-cream-100/80 text-sm">
            {lightbox + 1} / {photos.length} &middot; {photos[lightbox].label}
          </div>
        </div>
      )}
    </>
  );
}
