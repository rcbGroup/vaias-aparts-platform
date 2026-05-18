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
                <div className="font-display text-2xl text-cream-50">Vila Vaias Aparts</div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-cream-200/70">
                  Boutique · Târgu Neamț
                </div>
              </div>
            </div>
            <p className="font-serif text-lg leading-relaxed text-cream-100/80 max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 flex gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/vaiasaparts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-cream-200/60 hover:bg-cream-200/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              {/* WhatsApp — primary number */}
              <a
                href="https://wa.me/40752388388"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-green-400/60 hover:bg-green-400/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@vaiasaparts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200/20 hover:border-red-400/60 hover:bg-red-400/5 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
              <li><Link href="/cum-ajungi" className="text-cream-100/80 hover:text-cream-50 transition">Cum ajungi · Aeroporturi</Link></li>
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
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider">Vila Vaias Aparts</span>
                Str. Sfântul Lazăr nr. 1<br />
                Târgu Neamț, jud. Neamț<br />
                România, 615200
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">{t("footer.phone")}</span>
                <div className="flex items-center gap-2">
                  <span>+40 752 388 388</span>
                  <a href="tel:+40752388388" aria-label="Sună +40 752 388 388" className="hover:text-cream-50 transition" title="Sună">📞</a>
                  <a href="https://wa.me/40752388388" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +40 752 388 388" className="hover:text-green-400 transition" title="WhatsApp">💬</a>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span>+40 738 345 330</span>
                  <a href="tel:+40738345330" aria-label="Sună +40 738 345 330" className="hover:text-cream-50 transition" title="Sună">📞</a>
                  <a href="https://wa.me/40738345330" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +40 738 345 330" className="hover:text-green-400 transition" title="WhatsApp">💬</a>
                </div>
              </li>
              <li>
                <span className="block text-cream-200/60 text-xs uppercase tracking-wider mt-2">{t("footer.email")}</span>
                <a href="mailto:contact@vaiasaparts.ro" className="hover:text-cream-50 block">contact@vaiasaparts.ro</a>
                <a href="mailto:vaiasaparts@gmail.com" className="hover:text-cream-50 block">vaiasaparts@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.32em] text-walnut-300 mb-4">Rezervă direct</div>
            <p className="text-cream-100/70 text-sm leading-relaxed mb-4">
              Rezervând direct, beneficiezi de cel mai bun preț disponibil — fără comisionul platformelor OTA.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.5stardesk.net/b/vaias-aparts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-walnut-500 px-5 py-2.5 text-sm uppercase tracking-wider text-cream-50 hover:bg-walnut-600 transition w-fit"
              >
                Verifică disponibilitate
              </a>
              <a
                href="http://www.airbnb.com/p/vaiasaparts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream-100/70 hover:text-cream-50 transition"
              >
                Airbnb
              </a>
              <a
                href="https://travelminit.ro/apartamentele-vaias-targu-neamt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream-100/70 hover:text-cream-50 transition"
              >
                Travelminit
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-forest-900/60">
              <div className="text-xs uppercase tracking-[0.28em] text-walnut-300 mb-3">Recenzii verificate</div>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">Booking.com</a>
                <a href="https://www.tripadvisor.com/Profile/VaiasAparts" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">TripAdvisor</a>
                <a href="https://share.google/iFsW4iUjwIDgkgwZm" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">Google</a>
                <a href="https://www.youtube.com/@vaiasaparts" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-100/60 hover:text-cream-50 border border-forest-800 rounded px-2 py-1 transition">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-forest-900 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-cream-100/60">
          <div>
            © {new Date().getFullYear()} Vila Vaias Aparts · Vaia Rustic SRL · CUI 36258605 · J27/603/2016 · Clasificare: 4 stele · Certificat nr. 35332/20.07.2023 · {t("footer.rights")}
          </div>
          <div className="flex gap-6">
            <Link href="/politica-confidentialitate" className="hover:text-cream-50">{t("footer.privacy")}</Link>
            <Link href="/termeni-conditii" className="hover:text-cream-50">{t("footer.terms")}</Link>
            <Link href="/politica-cookies" className="hover:text-cream-50">Politică Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
