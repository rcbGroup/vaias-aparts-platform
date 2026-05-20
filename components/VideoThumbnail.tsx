"use client";

import { useEffect, useState } from "react";
import { youtubeThumb, videoEmbedUrl } from "@/lib/videos";

export default function VideoThumbnail({
  youtubeId,
  title,
  label = "Video",
}: {
  youtubeId: string;
  title: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState(youtubeThumb(youtubeId, "maxresdefault"));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Redă videoclipul: ${title}`}
        className="absolute inset-0 h-full w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          onError={() => setThumb(youtubeThumb(youtubeId, "hqdefault"))}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-forest-950/25" />
        {/* play button */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid place-items-center h-14 w-14 rounded-full bg-cream-50/90 text-walnut-700 shadow-card transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        <span className="absolute top-2 left-2 rounded-full bg-walnut-500/95 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cream-50">
          ▶ {label}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-forest-950/95 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Închide videoclipul"
            className="absolute top-6 right-6 grid h-12 w-12 place-items-center rounded-full text-3xl text-cream-50 hover:bg-cream-50/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            ×
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={videoEmbedUrl(youtubeId, true)}
              title={title}
              className="absolute inset-0 h-full w-full rounded-2xl border-0 shadow-card"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-cream-100/85 px-4">
            {title}
          </div>
        </div>
      )}
    </>
  );
}
