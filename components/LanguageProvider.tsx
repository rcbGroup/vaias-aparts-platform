"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LANG, Lang, translations } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("lang") as Lang | null;
      const stored = (typeof localStorage !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null);
      const resolved = (q && translations[q] ? q : stored && translations[stored] ? stored : null);
      if (resolved) {
        setLangState(resolved);
        document.documentElement.lang = resolved;
      }
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
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
