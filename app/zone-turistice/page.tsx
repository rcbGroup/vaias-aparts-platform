import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { attractions } from "@/lib/attractions";

export const metadata: Metadata = {
  title: "Zone turistice — atracții la o oră de Vaias Aparts",
  description:
    "Cetatea Neamț, mănăstirile Agapia și Văratec, Masivul Ceahlău, Cheile Bicazului, casa lui Creangă — toate la mai puțin de o oră de noi."
};

export default function AttractionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Zone turistice"
        title="Țara de Sus, deschisă de la poarta noastră."
        subtitle="Mănăstiri pictate, cetăți medievale, munți cu legende — Moldova autentică, la o oră distanță."
        image="/attractions/cheile-bicazului.jpg"
      />

      {/* CATEGORY STRIP */}
      <section className="bg-stone-50 border-b border-stone-100 py-10">
        <div className="container-x grid grid-cols-3 md:grid-cols-5 gap-3 text-center">
          {[
            { l: "Mănăstiri", n: "3" },
            { l: "Cetăți", n: "2" },
            { l: "Munți", n: "1" },
            { l: "Natură", n: "1" },
            { l: "Oraș", n: "2" }
          ].map((c) => (
            <div key={c.l} className="px-3">
              <div className="font-display text-3xl text-walnut-500">{c.n}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">{c.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ATTRACTIONS LIST */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader
            eyebrow="Ce să vizitezi"
            title="Opt locuri care merită ocolite cu drumul."
            subtitle="Recomandările noastre — testate, povestite, predate ca pe niște obiecte de familie."
          />

          <div className="mt-16 space-y-8">
            {attractions.map((a, i) => (
              <article
                key={a.slug}
                className={`grid gap-8 md:grid-cols-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                <div className="md:col-span-6 [direction:ltr]">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-card">
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-5 left-5 rounded-full bg-cream-50/95 backdrop-blur px-3 py-1 text-xs font-medium text-forest-900 uppercase tracking-wider">
                      {a.distance} · {a.drivingTime}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-6 [direction:ltr]">
                  <div className="eyebrow mb-3">{a.category}</div>
                  <h3 className="font-display text-3xl md:text-4xl text-forest-900 text-balance">
                    {a.name}
                  </h3>
                  <p className="mt-4 font-serif text-lg text-forest-700/80 italic">
                    {a.shortDescription}
                  </p>
                  <p className="mt-5 text-stone-600 leading-relaxed">{a.longDescription}</p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-stone-500">
                    <span className="rounded-full bg-stone-100 px-3 py-1">
                      Distanță: {a.distance}
                    </span>
                    <span className="rounded-full bg-stone-100 px-3 py-1">
                      {a.drivingTime} cu mașina
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DAY ITINERARIES */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-4">Itinerarii sugerate</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              Trei zile, trei povești.
            </h2>
            <div className="divider-gold my-7" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Ziua 1 — Mănăstiri și liniște",
                items: ["Cafea la Vaias Aparts", "Mănăstirea Agapia", "Mănăstirea Văratec", "Prânz la Hanul Ancuței", "Plimbare la mormântul Veronicăi Micle"]
              },
              {
                title: "Ziua 2 — Munte și legendă",
                items: ["Mic dejun moldovenesc", "Drum spre Durău", "Trasee pe Ceahlău (Piatra Lăcrimată)", "Apus la Cabana Dochia", "Cină acasă, la șemineu"]
              },
              {
                title: "Ziua 3 — Istorie și ape",
                items: ["Vizită la Cetatea Neamț", "Casa Memorială Ion Creangă", "Drum prin Cheile Bicazului", "Lacul Roșu", "Întoarcere la apus"]
              }
            ].map((day) => (
              <div
                key={day.title}
                className="rounded-2xl bg-forest-800/40 border border-cream-200/15 p-7"
              >
                <h3 className="font-display text-xl text-cream-50 mb-5">{day.title}</h3>
                <ul className="space-y-3 text-cream-100/85">
                  {day.items.map((it, i) => (
                    <li key={it} className="flex items-start gap-3">
                      <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-walnut-500 text-[10px] font-medium text-cream-50 shrink-0">
                        {i + 1}
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Vrei un itinerar pe măsura ta?
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            Spune-ne ce te atrage — îți facem un plan pentru zilele tale aici.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              Cere recomandări
            </Link>
            <Link href="/apartments" className="btn-outline-light">
              Apartamente
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
