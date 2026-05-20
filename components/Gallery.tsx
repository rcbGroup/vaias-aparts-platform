"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE_URL } from "@/lib/videos";
import VideoThumbnail from "./VideoThumbnail";
import MediaActions from "./MediaActions";

type Cell =
  | { type: "photo"; src: string; idx: number }
  | { type: "video" };

export default function Gallery({
  images,
  alt,
  video,
  apartmentName,
  apartmentSlug,
}: {
  images: string[];
  alt: string;
  video?: { youtubeId: string; title: string };
  apartmentName?: string;
  apartmentSlug?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i! - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, images.length]);

  const pageUrl = apartmentSlug ? `${SITE_URL}/apartments/${apartmentSlug}` : SITE_URL;
  const subject = apartmentName ?? alt;
  const enquiry = `Bună ziua! Sunt interesat(ă) de ${subject} la Vila Vaias Aparts! 🏡`;

  // Video card sits as the SECOND tile — right after the hero photo.
  const cells: Cell[] = [];
  images.forEach((src, idx) => {
    cells.push({ type: "photo", src, idx });
    if (idx === 0 && video) cells.push({ type: "video" });
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {cells.map((cell, i) => {
          if (cell.type === "video" && video) {
            return (
              <div
                key={`video-${video.youtubeId}`}
                className="group relative aspect-square overflow-hidden rounded-lg bg-forest-950"
              >
                <VideoThumbnail youtubeId={video.youtubeId} title={video.title} label="Tur video" />
                <MediaActions
                  mediaKey={`video:${video.youtubeId}`}
                  shareUrl={pageUrl}
                  title={`${video.title} — Vila Vaias Aparts`}
                  enquiryText={enquiry}
                />
              </div>
            );
          }
          if (cell.type !== "photo") return null;
          const isHero = cell.idx === 0;
          return (
            <div
              key={cell.src + i}
              className={`group relative overflow-hidden rounded-lg ${
                isHero ? "col-span-2 row-span-2 aspect-square md:aspect-[4/3]" : "aspect-square"
              }`}
            >
              <button
                onClick={() => setActive(cell.idx)}
                aria-label={`${alt} — fotografie ${cell.idx + 1}`}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={cell.src}
                  alt={`${alt} — fotografie ${cell.idx + 1}`}
                  fill
                  sizes={isHero ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/15 transition" />
              </button>
              <MediaActions
                mediaKey={cell.src}
                shareUrl={pageUrl}
                title={`${subject} — Vila Vaias Aparts`}
                enquiryText={enquiry}
              />
            </div>
          );
        })}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-forest-950/97 backdrop-blur-sm flex items-center justify-center p-4 lb-fade-enter lb-fade-enter-active"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-cream-50 text-3xl rounded-full h-12 w-12 grid place-items-center hover:bg-cream-50/10 transition"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 md:left-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="absolute right-4 md:right-8 text-cream-50 text-4xl px-4 py-2 rounded-full hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! + 1) % images.length);
            }}
          >
            ›
          </button>
          <div
            key={active}
            className="relative w-full max-w-5xl aspect-[3/2] img-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${alt} ${active + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-cream-100/80 text-sm">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
