"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "40752388388";

const REACTIONS = [
  { key: "heart", char: "❤️", label: "Îmi place" },
  { key: "love", char: "😍", label: "Ador" },
  { key: "smile", char: "😊", label: "Superb" },
] as const;

type Counts = Record<string, number>;

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Deterministic, organic-looking base counts so the gallery feels lively.
// User reactions (localStorage) are layered on top — no backend required.
function seedCounts(mediaKey: string): Counts {
  const h = hashString(mediaKey);
  return {
    heart: 7 + (h % 38),
    love: 2 + ((h >> 3) % 17),
    smile: 1 + ((h >> 6) % 11),
  };
}

export default function MediaActions({
  mediaKey,
  shareUrl,
  title,
  enquiryText,
  className = "",
}: {
  mediaKey: string;
  shareUrl: string;
  title: string;
  enquiryText: string;
  className?: string;
}) {
  const storageKey = `vaia:react:v1:${mediaKey}`;
  const [counts, setCounts] = useState<Counts>(() => seedCounts(mediaKey));
  const [mine, setMine] = useState<Record<string, boolean>>({});
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { mine?: Record<string, boolean> };
        const myReacts = parsed.mine ?? {};
        setMine(myReacts);
        const next = seedCounts(mediaKey);
        for (const k of Object.keys(myReacts)) if (myReacts[k]) next[k] = (next[k] || 0) + 1;
        setCounts(next);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
  };

  const stop = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const toggleReaction = (e: React.MouseEvent, key: string) => {
    stop(e);
    const isOn = !mine[key];
    const nextMine = { ...mine, [key]: isOn };
    setMine(nextMine);
    setCounts((c) => ({ ...c, [key]: Math.max(0, (c[key] || 0) + (isOn ? 1 : -1)) }));
    try {
      localStorage.setItem(storageKey, JSON.stringify({ mine: nextMine }));
    } catch {
      /* ignore */
    }
  };

  const enc = encodeURIComponent;
  const openWin = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const enquiryUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${enc(`${enquiryText}\n${shareUrl}`)}`;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${enc(`${title}\n${shareUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
    x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(shareUrl)}`,
  };

  const copyLink = async (e: React.MouseEvent) => {
    stop(e);
    try {
      await navigator.clipboard.writeText(shareUrl);
      flash("Link copiat!");
    } catch {
      flash(shareUrl);
    }
    setShareOpen(false);
  };

  const instagramShare = async (e: React.MouseEvent) => {
    stop(e);
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      /* ignore */
    }
    flash("Link copiat — lipește-l în Instagram");
    setShareOpen(false);
  };

  const nativeShare = async (e: React.MouseEvent) => {
    stop(e);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        setShareOpen(false);
        return;
      } catch {
        /* user cancelled — fall through to menu */
      }
    }
    setShareOpen((o) => !o);
  };

  const iconBtn =
    "grid place-items-center h-7 w-7 rounded-full bg-cream-50/90 text-forest-900 shadow-sm hover:bg-cream-50 hover:scale-110 transition";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-2 p-2 bg-gradient-to-t from-forest-950/75 via-forest-950/15 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${className}`}
    >
      {/* Reactions */}
      <div className="pointer-events-auto flex items-center gap-1">
        {REACTIONS.map((r) => {
          const active = !!mine[r.key];
          const n = counts[r.key] || 0;
          return (
            <button
              key={r.key}
              type="button"
              onClick={(e) => toggleReaction(e, r.key)}
              aria-label={r.label}
              title={r.label}
              className={`pointer-events-auto inline-flex items-center gap-0.5 rounded-full pl-1 pr-1.5 py-0.5 text-[11px] leading-none shadow-sm transition hover:scale-110 ${
                active ? "bg-walnut-500 text-cream-50" : "bg-cream-50/90 text-forest-900"
              }`}
            >
              <span className="text-[13px]">{r.char}</span>
              <span className="font-medium tabular-nums">{n}</span>
            </button>
          );
        })}
      </div>

      {/* Share + WhatsApp enquiry */}
      <div className="pointer-events-auto relative flex items-center gap-1.5">
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Distribuie"
          title="Distribuie"
          className={iconBtn}
        >
          {/* share icon */}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
            <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
          </svg>
        </button>
        <a
          href={enquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Întreabă pe WhatsApp"
          title="Întreabă pe WhatsApp"
          className="pointer-events-auto grid place-items-center h-7 w-7 rounded-full bg-[#25D366] text-white shadow-sm hover:scale-110 transition"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.738-.981a9.86 9.86 0 00.24.174zm5.244-6.81c-.165-.084-.967-.477-1.117-.532-.149-.055-.258-.083-.367.083-.109.165-.422.532-.518.642-.095.11-.19.124-.355.041-.165-.083-.696-.257-1.326-.818-.49-.437-.821-.976-.917-1.142-.096-.165-.01-.254.073-.336.074-.074.165-.193.248-.29.083-.097.11-.165.165-.275.055-.11.027-.207-.014-.29-.041-.083-.367-.884-.503-1.21-.133-.318-.267-.275-.367-.28l-.313-.005a.6.6 0 00-.434.204c-.149.165-.57.557-.57 1.358 0 .801.584 1.575.665 1.685.083.11 1.148 1.752 2.781 2.457.389.168.692.268.929.343.39.124.745.106 1.026.064.313-.047.967-.395 1.103-.777.136-.382.136-.71.095-.778-.04-.069-.149-.11-.314-.193z" />
          </svg>
        </a>

        {shareOpen && (
          <div
            className="absolute bottom-9 right-0 z-30 w-44 rounded-xl bg-cream-50 shadow-card border border-stone-200 p-1.5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={(e) => { stop(e); openWin(shareLinks.whatsapp); setShareOpen(false); }} className="w-full text-left rounded-lg px-3 py-2 text-sm text-forest-800 hover:bg-stone-100">💬 WhatsApp</button>
            <button type="button" onClick={(e) => { stop(e); openWin(shareLinks.facebook); setShareOpen(false); }} className="w-full text-left rounded-lg px-3 py-2 text-sm text-forest-800 hover:bg-stone-100">📘 Facebook</button>
            <button type="button" onClick={(e) => { stop(e); openWin(shareLinks.x); setShareOpen(false); }} className="w-full text-left rounded-lg px-3 py-2 text-sm text-forest-800 hover:bg-stone-100">✖ Twitter / X</button>
            <button type="button" onClick={instagramShare} className="w-full text-left rounded-lg px-3 py-2 text-sm text-forest-800 hover:bg-stone-100">📸 Instagram</button>
            <button type="button" onClick={copyLink} className="w-full text-left rounded-lg px-3 py-2 text-sm text-forest-800 hover:bg-stone-100">🔗 Copiază linkul</button>
          </div>
        )}
      </div>

      {toast && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-12 z-40 rounded-full bg-forest-950/90 px-3 py-1 text-xs text-cream-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
