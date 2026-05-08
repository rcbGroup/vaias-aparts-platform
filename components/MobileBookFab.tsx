"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";

export default function MobileBookFab() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/rezervare"
      aria-label={t("nav.bookNow")}
      className={`lg:hidden fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-walnut-500 px-5 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-cream-50 shadow-card transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      } hover:bg-walnut-600 active:scale-95`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
      {t("fab.book")}
    </Link>
  );
}
