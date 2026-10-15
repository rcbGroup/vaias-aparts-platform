"use client";
// WO4 WP4: Cookie consent banner
// Law 506/2004 (Romania) + GDPR: no tracking scripts before consent.
// Google Consent Mode v2: default=denied; update on accept.
// Equal prominence: Respinge toate / Acceptă toate.

import { useEffect, useState } from "react";

type ConsentChoice = "accepted" | "rejected" | null;

const STORAGE_KEY = "vaias_cookie_consent";

function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined" || !("gtag" in window)) return;
  const state = granted ? "granted" : "denied";
  // @ts-expect-error gtag global
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | "loading">("loading");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
    setChoice(stored);
    if (stored === "accepted") updateGoogleConsent(true);
  }, []);

  if (choice !== null) return null; // already decided or still loading

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setChoice("accepted");
    updateGoogleConsent(true);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setChoice("rejected");
    updateGoogleConsent(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consimțământ cookie-uri"
      className="fixed bottom-0 inset-x-0 z-[9999] bg-forest-950 text-cream-100 shadow-2xl border-t border-forest-800"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="flex-1 text-sm leading-relaxed">
          Folosim cookie-uri pentru analiză și marketing. Cookie-urile necesare sunt întotdeauna active.{" "}
          <a href="/politica-cookies" className="underline hover:text-cream-50">
            Politica cookies
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm rounded-lg border border-cream-100/40 text-cream-100 hover:bg-forest-800 transition"
          >
            Respinge toate
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-forest-500 text-white hover:bg-forest-400 transition font-medium"
          >
            Acceptă toate
          </button>
        </div>
      </div>
    </div>
  );
}
