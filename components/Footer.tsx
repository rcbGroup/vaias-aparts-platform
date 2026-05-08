"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-forest-950 text-cream-100 relative overflow-hidden">
      <div className="absolute inset-0 pattern-moldavian-dark opacity-60 pointer-events-none" />
      <div className="container-x py-20 relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-cream-200/30 bg-cream-50/10">
                <span className="font-display text-xl text-cream-50">V</span>
              </div>
              <div>
                <div className="font-display text-2xl text-cream-50">Vaias Aparts</div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-cream-200/70">
                  Boutique · Târgu Neamț
                </div>
              </div>
            </div>
            <p className="font-serif text-lg leading-relaxed text-cream-100/80 max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-cream-200/60 hover:bg-cream-200/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-cream-200/60 hover:bg-cream-200/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://tripadvisor.com"
                aria-label="TripAdvisor"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-cream-200/60 hover:bg-cream-200/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
                  <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm-3 5a3 3 0 116 0 3 3 0 01-6 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.32em] text-walnut-300 mb-4">{t("footer.pages")}</div>
            <ul className="space-y-3">
              <li><Link href="/" className="text-cream-100/80 hover:text-cream-50 transition">{t("common.home")}</Link></li>
              <li><Link href="/apartments" className="text-cream-100/80 hover:text-cream-50 transition">{t("nav.apartments")}</Link></li>
              <li><Link href="/zone-turistice" className="text-cream-100/80 hover:text-cream-50 transition">{t("nav.attractions")}</Link></li>
              <li><Link href="/galerie" className="text-cream-100/80 hover:text-cream-50 transition">{t("nav.gallery")}</Link></li>
              <li><Link href="/recenzii" className="text-cream-100/80 hover:text-cream-50 transition">{t("nav.reviews")}</Link></li>
              <li><Link href="/despre-noi" className="text-cream-100/80 hover:text-cream-50 transition">{t("nav.about")}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.32em] text-walnut-300 mb-4">{t("footer.contact")}</div>
            <ul className="space-y-3 text-cream-100/80">
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider">{t("footer.address")}</span>
                Strada Boureni nr. 12<br />
                Târgu Neamț, jud. Neamț<br />
                România, 615200
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">{t("footer.phone")}</span>
                <a href="tel:+40740000000" className="hover:text-cream-50">+40 740 000 000</a>
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">{t("footer.email")}</span>
                <a href="mailto:contact@VaiasAparts.ro" className="hover:text-cream-50">contact@VaiasAparts.ro</a>
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">WhatsApp</span>
                <a href="https://wa.me/40740000000" className="hover:text-cream-50">+40 740 000 000</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.32em] text-walnut-300 mb-4">{t("footer.newsletter")}</div>
            <p className="text-cream-100/70 text-sm leading-relaxed mb-4">
              {t("footer.newsletterText")}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                required
                placeholder="adresa@email.ro"
                className="flex-1 rounded-full bg-forest-900 border border-forest-800 px-4 py-2.5 text-sm text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-walnut-400"
              />
              <button
                type="submit"
                className="rounded-full bg-walnut-500 px-5 py-2.5 text-sm uppercase tracking-wider text-cream-50 hover:bg-walnut-600 transition"
              >
                OK
              </button>
            </form>
            <div className="mt-8 text-xs text-cream-200/60 leading-relaxed">
              {t("footer.discount")}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-forest-900 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-cream-100/60">
          <div>© {new Date().getFullYear()} Vaias Aparts. {t("footer.rights")}</div>
          <div className="flex gap-6">
            <Link href="/politica-confidentialitate" className="hover:text-cream-50">{t("footer.privacy")}</Link>
            <Link href="/termeni-conditii" className="hover:text-cream-50">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
