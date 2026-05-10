"use client";

import { apartments } from "@/lib/apartments";
import ApartmentCard from "@/components/ApartmentCard";
import PageHero from "@/components/PageHero";
import ScrollFade from "@/components/ScrollFade";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function ApartmentsPage() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t("apartments.heroEyebrow")}
        title={t("apartments.heroTitle")}
        subtitle={t("apartments.heroSubtitle")}
        image="https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg"
      />

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="grid gap-7 md:grid-cols-2">
            {apartments.map((a, i) => (
              <ScrollFade key={a.slug} delay={i * 90}>
                <ApartmentCard apartment={a} priority={i < 2} />
              </ScrollFade>
            ))}
          </div>

          <ScrollFade>
            <div className="mt-20 rounded-2xl bg-forest-900 text-cream-50 p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 pattern-moldavian-dark opacity-50 pointer-events-none" />
              <div className="relative">
                <div className="eyebrow-light mb-4">{t("apartments.unsureTitle")}</div>
                <h2 className="font-display text-3xl md:text-4xl text-cream-50">
                  {t("apartments.unsureSubtitle")}
                </h2>
                <p className="mt-4 font-serif text-lg text-cream-100/85 max-w-2xl mx-auto">
                  {t("apartments.unsureText")}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href="https://wa.me/40738345330" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                    WhatsApp
                  </a>
                  <Link href="/contact" className="btn-outline-light">
                    {t("nav.contact")}
                  </Link>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
