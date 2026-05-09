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
                href="https://www.facebook.com/VaiasAparts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-cream-200/60 hover:bg-cream-200/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/VaiasAparts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-cream-200/60 hover:bg-cream-200/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/40738345330"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-green-400/60 hover:bg-green-400/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
              <li><Link href="/blog" className="text-cream-100/80 hover:text-cream-50 transition">Blog</Link></li>
              <li><Link href="/experiente" className="text-cream-100/80 hover:text-cream-50 transition">Experiențe</Link></li>
              <li><Link href="/afiliati" className="text-cream-100/80 hover:text-cream-50 transition">Afiliere</Link></li>
              <li><Link href="/rezervare" className="text-cream-100/80 hover:text-cream-50 transition">{t("nav.bookNow")}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.32em] text-walnut-300 mb-4">{t("footer.contact")}</div>
            <ul className="space-y-3 text-cream-100/80">
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider">{t("footer.address")}</span>
                Strada Sfântul Lazăr Nr. 1<br />
                Târgu Neamț, jud. Neamț<br />
                România, 615200
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">{t("footer.phone")}</span>
                <a href="tel:+40738345330" className="hover:text-cream-50 block">+40 738 345 330</a>
                <a href="tel:+40752388388" className="hover:text-cream-50 block">+40 752 388 388</a>
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">{t("footer.email")}</span>
                <a href="mailto:contact@VaiasAparts.ro" className="hover:text-cream-50">contact@VaiasAparts.ro</a>
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">WhatsApp</span>
                <a href="https://wa.me/40738345330" target="_blank" rel="noopener noreferrer" className="hover:text-cream-50 block">+40 738 345 330</a>
                <a href="https://wa.me/40752388388" target="_blank" rel="noopener noreferrer" className="hover:text-cream-50 block">+40 752 388 388</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.32em] text-walnut-300 mb-4">{t("footer.newsletter")}</div>
            <p className="text-cream-100/70 text-sm leading-relaxed mb-4">
              {t("footer.newsletterText")}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
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
            <div className="mt-6 text-xs text-cream-200/60 leading-relaxed">
              {t("footer.discount")}
            </div>
            <div className="mt-6 pt-6 border-t border-forest-900/60">
              <div className="text-xs uppercase tracking-[0.28em] text-walnut-300 mb-3">Recenzii verificate</div>
              <div className="flex gap-3">
                <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">Booking.com</a>
                <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">TripAdvisor</a>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">Google</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-forest-900 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-cream-100/60">
          <div>
            © {new Date().getFullYear()} Vaias Aparts · Vaia Rustic SRL · CUI 36258605 · {t("footer.rights")}
          </div>
          <div className="flex gap-6">
            <Link href="/politica-confidentialitate" className="hover:text-cream-50">{t("footer.privacy")}</Link>
            <Link href="/termeni-conditii" className="hover:text-cream-50">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
