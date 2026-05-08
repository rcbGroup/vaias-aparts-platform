"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={`relative overflow-hidden rounded-lg group ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-[4/3]" : "aspect-square"
            }`}
          >
            <Image
              src={src}
              alt={`${alt} — fotografie ${i + 1}`}
              fill
              sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/15 transition" />
          </button>
        ))}
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
