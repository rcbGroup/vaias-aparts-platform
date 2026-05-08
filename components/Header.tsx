"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/apartments", label: "Apartamente" },
  { href: "/zone-turistice", label: "Zone turistice" },
  { href: "/galerie", label: "Galerie" },
  { href: "/recenzii", label: "Recenzii" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "glass border-b border-walnut-200/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3">
          <div
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500 ${
              scrolled || open
                ? "border-forest-700/30 bg-forest-700 text-cream-50"
                : "border-cream-50/60 bg-cream-50/10 text-cream-50"
            }`}
          >
            <span className="font-display text-lg leading-none">V</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`font-display text-lg tracking-tight transition-colors ${
                scrolled || open ? "text-forest-900" : "text-cream-50"
              }`}
            >
              Vaias Aparts
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.32em] transition-colors ${
                scrolled || open ? "text-walnut-500" : "text-cream-100/80"
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
                scrolled || open
                  ? "text-forest-800 hover:text-walnut-600"
                  : "text-cream-50 hover:text-cream-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/rezervare"
            className={
              scrolled || open ? "btn-primary" : "btn-outline-light"
            }
          >
            Rezervă acum
          </Link>
        </div>

        <button
          aria-label="Meniu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2"
        >
          <span className="sr-only">Meniu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 transition-all ${
                scrolled || open ? "bg-forest-900" : "bg-cream-50"
              } ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all ${
                scrolled || open ? "bg-forest-900" : "bg-cream-50"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all ${
                scrolled || open ? "bg-forest-900" : "bg-cream-50"
              } ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
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
              Rezervă acum
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
