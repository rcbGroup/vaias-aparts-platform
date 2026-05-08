"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/apartments", label: t("nav.apartments") },
    { href: "/zone-turistice", label: t("nav.attractions") },
    { href: "/galerie", label: t("nav.gallery") },
    { href: "/recenzii", label: t("nav.reviews") },
    { href: "/despre-noi", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") }
  ];

  const dark = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        dark
          ? "glass border-b border-walnut-200/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3">
          <div
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500 ${
              dark
                ? "border-forest-700/30 bg-forest-700 text-cream-50"
                : "border-cream-50/60 bg-cream-50/10 text-cream-50"
            }`}
          >
            <span className="font-display text-lg leading-none">V</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`font-display text-lg tracking-tight transition-colors ${
                dark ? "text-forest-900" : "text-cream-50"
              }`}
            >
              Vaias Aparts
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.32em] transition-colors ${
                dark ? "text-walnut-500" : "text-cream-100/80"
              }`}
            >
              Boutique · Târgu Neamț
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                dark
                  ? "text-forest-800 hover:text-walnut-600"
                  : "text-cream-50 hover:text-cream-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher tone={dark ? "dark" : "light"} />
          <Link
            href="/rezervare"
            className={dark ? "btn-primary" : "btn-outline-light"}
          >
            {t("nav.bookNow")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher tone={dark ? "dark" : "light"} />
          <button
            aria-label={t("nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 -mr-2"
          >
            <span className="sr-only">{t("nav.menu")}</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 transition-all ${
                  dark ? "bg-forest-900" : "bg-cream-50"
                } ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all ${
                  dark ? "bg-forest-900" : "bg-cream-50"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all ${
                  dark ? "bg-forest-900" : "bg-cream-50"
                } ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-walnut-200/40 bg-cream-50/95 backdrop-blur-md">
          <div className="container-x py-6 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-base text-forest-900 hover:bg-cream-100 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/rezervare"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 w-full"
            >
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
