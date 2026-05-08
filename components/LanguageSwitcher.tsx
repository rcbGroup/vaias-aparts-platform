"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, Lang } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";

export default function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  const triggerCls =
    tone === "light"
      ? "border-cream-50/40 text-cream-50 hover:bg-cream-50/10"
      : "border-forest-700/30 text-forest-800 hover:bg-forest-50/60";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${triggerCls}`}
      >
        <span aria-hidden className="text-base leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-xl border border-stone-200 bg-cream-50 shadow-card overflow-hidden z-50"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code as Lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm text-left transition ${
                  l.code === lang
                    ? "bg-walnut-50 text-walnut-700"
                    : "text-forest-800 hover:bg-stone-100"
                }`}
              >
                <span aria-hidden className="text-base">{l.flag}</span>
                <span className="font-medium">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
