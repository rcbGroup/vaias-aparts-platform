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
    { href: "/packages", label: "Pachete" },
    { href: "/wellness", label: "Wellness" },
    { href: "/zone-turistice", label: t("nav.attractions") },
    { href: "/galerie", label: t("nav.gallery") },
    { href: "/recenzii", label: t("nav.reviews") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") }
  ];

  const dark = scrolled || open;

  return (
    <>
      {/* Contact bar — single line on all sizes */}
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center xl:justify-end gap-3 xl:gap-6 bg-forest-900/95 backdrop-blur px-4 xl:px-8 py-1.5 text-xs text-cream-100/80">
        {/* Primary always visible */}
        <a
          href="tel:+40752388388"
          className="flex items-center gap-1.5 hover:text-cream-50 transition"
        >
          <PhoneIcon />
          +40 752 388 388
        </a>
        <a
          href="https://wa.me/40752388388"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-green-300 transition"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>

        {/* Secondary + email — desktop only */}
        <span className="hidden xl:block text-cream-100/40">|</span>
        <a
          href="tel:+40738345330"
          className="hidden xl:flex items-center gap-1.5 hover:text-cream-50 transition"
        >
          <PhoneIcon />
          +40 738 345 330
        </a>
        <a
          href="https://wa.me/40738345330"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:flex items-center gap-1.5 hover:text-green-300 transition"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a
          href="mailto:contact@vaiasaparts.ro"
          className="hidden xl:flex items-center gap-1.5 hover:text-cream-50 transition"
        >
          contact@vaiasaparts.ro
        </a>
      </div>

      {/* FIX 4: top-[28px] on mobile (contact bar height), lg:top-[30px] on desktop */}
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          dark
            ? "glass border-b border-walnut-200/40 py-3 top-[28px] lg:top-[30px]"
            : "bg-transparent py-5 top-[28px] lg:top-[30px]"
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

          <nav className="hidden xl:flex items-center gap-6">
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

          <div className="hidden xl:flex items-center gap-3">
            <LanguageSwitcher tone={dark ? "dark" : "light"} />
            <div className="relative">
              <Link
                href="/rezervare"
                className={dark ? "btn-primary" : "btn-outline-light"}
              >
                {t("nav.bookNow")}
              </Link>
              <span className="absolute -top-2 -right-2 rounded-full bg-walnut-500 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-cream-50 font-medium whitespace-nowrap">
                Cel mai mic preț
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
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
          <div className="xl:hidden border-t border-walnut-200/40 bg-cream-50/95 backdrop-blur-md">
            <div className="container-x py-4 flex flex-col gap-1">
              {/* FIX 5: 752 first, then 738, both with WhatsApp links */}
              {/* Primary: +40 752 388 388 (Anca) */}
              <a href="tel:+40752388388" className="flex items-center gap-2 py-2 px-2 text-sm text-forest-700 font-medium">
                <PhoneIcon /> +40 752 388 388
              </a>
              <a href="https://wa.me/40752388388" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-2 text-sm text-green-700 font-medium">
                <WhatsAppIcon /> WhatsApp (+40 752 388 388)
              </a>
              {/* Secondary: +40 738 345 330 (Vasi) */}
              <a href="tel:+40738345330" className="flex items-center gap-2 py-2 px-2 text-sm text-forest-700 font-medium">
                <PhoneIcon /> +40 738 345 330
              </a>
              <a href="https://wa.me/40738345330" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-2 text-sm text-green-700 font-medium">
                <WhatsAppIcon /> WhatsApp (+40 738 345 330)
              </a>
              <div className="h-px bg-walnut-200/40 my-1" />
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
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 10.6a19.79 19.79 0 01-3-8.58A2 2 0 013.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
