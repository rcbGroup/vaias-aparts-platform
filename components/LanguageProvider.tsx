"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LANG, Lang, translations } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<Ctx | null>(null);

function getLangCookie(): Lang | null {
  try {
    const match = document.cookie.split("; ").find((r) => r.startsWith("lang="));
    const val = match?.split("=")?.[1] as Lang | undefined;
    if (val && translations[val]) return val;
  } catch {}
  return null;
}

// initialLang comes from server (set by middleware via RootLayout)
export function LanguageProvider({
  children,
  initialLang
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? DEFAULT_LANG);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      // Priority: ?lang= query param > cookie (set by middleware) > localStorage > server prop
      const q = url.searchParams.get("lang") as Lang | null;
      const cookie = getLangCookie();
      const stored = (typeof localStorage !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null);
      const resolved =
        (q && translations[q] ? q : null) ??
        (cookie && translations[cookie] ? cookie : null) ??
        (stored && translations[stored] ? stored : null);
      if (resolved && resolved !== lang) {
        setLangState(resolved);
        document.documentElement.lang = resolved;
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
      document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      document.documentElement.lang = l;
      // Mirror in URL for shareable links
      const url = new URL(window.location.href);
      url.searchParams.set("lang", l);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = translations[lang] || translations[DEFAULT_LANG];
      let s = dict[key] ?? translations[DEFAULT_LANG][key] ?? key;
      if (vars) {
        for (const k of Object.keys(vars)) {
          s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(vars[k]));
        }
      }
      return s;
    },
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) {
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (k: string) => translations[DEFAULT_LANG][k] ?? k
    };
  }
  return c;
}

// Alias used by app/page.tsx and app/recenzii/page.tsx (build fix 27-09-2026)
export const useLanguage = useLang;
