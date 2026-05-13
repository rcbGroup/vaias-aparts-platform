import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { landingPages } from "@/lib/landing-pages";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cazare în Târgu Neamț — Vila Vaias Aparts | Toate destinațiile",
  description:
    "Cazare în Târgu Neamț la Vila Vaias Aparts — bază pentru Cetatea Neamțului, mănăstirile Agapia, Văratec, Neamț, masivul Ceahlău. Pelerinaj, diaspora, grupuri, vila întreagă.",
  keywords: [
    "cazare Targu Neamt",
    "cazare Neamt",
    "cazare manastiri Moldova",
    "cazare Cetatea Neamtului",
    "cazare Agapia Varatec"
  ],
  alternates: { canonical: "https://www.vaiasaparts.ro/cazare" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://www.vaiasaparts.ro/cazare",
    title: "Cazare în Târgu Neamț — Vila Vaias Aparts",
    description:
      "Bază confortabilă pentru Cetatea Neamțului, mănăstiri (Agapia, Văratec, Neamț), Ceahlău. Pelerinaj, diaspora, grupuri."
  }
};

export default function CazareIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Acasă", href: "/" }, { label: "Cazare" }]} />

      <section className="section bg-cream-50 pt-16">
        <div className="container-narrow text-center">
          <div className="eyebrow mb-4">Cazare în zona Neamț</div>
          <h1 className="font-display text-4xl md:text-6xl text-forest-900 text-balance">
            Cazare în Târgu Neamț — alege destinația ta
          </h1>
          <p className="mt-6 font-serif text-xl text-forest-800/85 max-w-2xl mx-auto leading-relaxed">
            Vila Vaias Aparts este baza ideală pentru a explora zona — Cetatea Neamțului, mănăstirile,
            Ceahlăul. Mai jos găsești ghidul nostru pe destinații, plus tipurile de oaspeți cu care lucrăm cel mai des.
          </p>
        </div>
      </section>

      <section className="section bg-stone-50 pt-0">
        <div className="container-x">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {landingPages.map((p) => (
              <Link
                key={p.slug}
                href={`/cazare/${p.slug}`}
                className="group block rounded-2xl overflow-hidden bg-cream-50 border border-stone-100 card-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.hero.image}
                    alt={p.hero.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.distance !== "—" && (
                    <div className="absolute top-4 left-4 rounded-full bg-cream-50/95 px-3 py-1 text-xs text-forest-900 font-medium">
                      {p.distance} · {p.drivingTime}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.28em] text-walnut-500 mb-2">
                    {p.hero.eyebrow}
                  </div>
                  <h2 className="font-display text-xl text-forest-900 mb-2 group-hover:text-walnut-700 transition">
                    {p.hero.title}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">{p.hero.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-forest-900 text-cream-50 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-moldavian-dark opacity-40 pointer-events-none" />
            <div className="relative">
              <div className="eyebrow-light mb-4">Direct la noi — cel mai bun preț</div>
              <h2 className="font-display text-3xl md:text-4xl text-cream-50 mb-4">
                Rezervă pe WhatsApp, fără comision OTA
              </h2>
              <p className="font-serif text-lg text-cream-100/85 max-w-2xl mx-auto mb-8">
                Vorbiți direct cu familia care gestionează vila. Confirmare în câteva ore între 08:00 și 22:00.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/40752388388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
                >
                  💬 WhatsApp +40 752 388 388
                </a>
                <a href="tel:+40752388388" className="btn-outline-light">
                  📞 Sună acum
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
