import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refugiul Vaias — Lacul Nostru Privat | Pescuit, BBQ, Teambuilding | Vaias Aparts",
  description:
    "Refugiul Vaias — proprietatea noastră la lac, la 30 minute de Vila Vaias Aparts. Pescuit, BBQ, foc de tabără, teambuilding. Ziua întreagă în natură pentru oaspeții Vaias.",
  keywords: [
    "lac privat Neamț",
    "pescuit Târgu Neamț",
    "BBQ Moldova",
    "teambuilding lac",
    "Refugiul Vaias",
    "Moldova natură",
  ],
};

const activities = [
  {
    title: "Pescuit recreativ",
    detail: "Lacul nostru e populat cu crap, șalău, biban. Echipament inclus — undițe, momeli, plase mici.",
    icon: "🎣",
  },
  {
    title: "BBQ și foc de tabără",
    detail: "Pavilion acoperit cu grătar mare, lemne uscate, mese rustice. Carne și legume marinate disponibile.",
    icon: "🔥",
  },
  {
    title: "Drumeție prin pădure",
    detail: "Traseu marcat de 2 km prin pădurea Văratec — aer curat, ciuperci toamna, flori primăvara.",
    icon: "🥾",
  },
  {
    title: "Teambuilding corporate",
    detail: "Spațiu pentru 22-28 persoane — workshop-uri outdoor, jocuri de echipă, foc seara.",
    icon: "🤝",
  },
];

const pricing = [
  { title: "Familie (până la 6 pers)", priceFromRON: 200, note: "Ziua întreagă, echipament inclus" },
  { title: "Grup pescuit", priceFromRON: 150, note: "Per persoană, minim 4 persoane" },
  { title: "Pachet BBQ + foc", priceFromRON: 280, note: "Per persoană, mâncare inclusă" },
  { title: "Teambuilding (vila întreagă)", priceFromRON: 1900, note: "Grup întreg, ziua întreagă" },
];

export default function RefugiulVaiasPage() {
  return (
    <>
      <section className="relative bg-forest-950 pt-32 pb-20 text-cream-50">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/unsplash/experience-lake.jpg"
            alt="Lac în pădure"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/40 to-forest-950" />
        <div className="relative container-x">
          <div className="eyebrow-light mb-4">A doua proprietate Vaias · La 30 minute de vilă</div>
          <h1 className="font-display text-5xl md:text-6xl text-balance leading-tight max-w-4xl">
            Refugiul Vaias — lacul nostru privat
          </h1>
          <p className="mt-6 font-serif text-xl text-cream-100/85 max-w-3xl leading-relaxed">
            Un colț de Moldovă numai al vostru — lac, pădure, foc de tabără. Pentru oaspeții Vila Vaias Aparts,
            o zi întreagă la natură, organizată de echipa noastră.
          </p>
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow mb-3">Cum este Refugiul</div>
              <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-5">
                Sălbăticie cu confort — la 30 min de vilă
              </h2>
              <p className="text-stone-700 mb-4 leading-relaxed">
                Refugiul Vaias este proprietatea noastră de la pădure — un lac de cca. 4 hectare, înconjurat de
                vegetație matură, cu pavilion acoperit pentru BBQ, foc de tabără, vatră de gătit tradițional.
                Locul este ascuns suficient cât să auzi numai vântul și apa, dar accesibil cu mașina.
              </p>
              <p className="text-stone-700 mb-4 leading-relaxed">
                Pentru oaspeții Vila Vaias Aparts, ziua la Refugiu este o experiență care nu se uită — pescuit,
                masă caldă la grătar, copii care aleargă, adulți care respiră.
              </p>
              <p className="text-stone-700 leading-relaxed">
                Nu este o destinație publică. Este pentru voi, pentru o zi.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/unsplash/experience-mountain-cabin.jpg"
                alt="Pădure cu lac"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white border-t border-stone-100">
        <div className="container-x">
          <div className="eyebrow text-center mb-3">Ce poți face acolo</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-12">
            Pescuit. Mâncare. Tăcere. Râs.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((a) => (
              <div key={a.title} className="rounded-2xl border border-stone-200 p-6 bg-cream-50">
                <div className="text-4xl mb-3">{a.icon}</div>
                <h3 className="font-display text-lg text-forest-900 mb-2">{a.title}</h3>
                <p className="text-sm text-stone-700">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="eyebrow text-center mb-3">Prețuri orientative</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-12">
            Doar pentru oaspeții Vila Vaias Aparts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {pricing.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="font-display text-lg text-forest-900 mb-1">{p.title}</div>
                <div className="text-gold-700 font-bold mb-2 text-xl">de la {p.priceFromRON} lei</div>
                <p className="text-xs text-stone-500">{p.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-stone-500 text-sm mt-8">
            Transportul vilă ↔ refugiu este organizat de echipa noastră (inclus în pachetele cu „transfer inclus").
          </p>
        </div>
      </section>

      <section className="section bg-forest-950 text-cream-50">
        <div className="container-x text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Adăugați Refugiul la sejurul vostru
          </h2>
          <p className="font-serif text-lg text-cream-100/80 max-w-2xl mx-auto mb-8">
            Spuneți-ne la rezervare sau pe WhatsApp ce vă interesează — pescuit, BBQ, teambuilding — și
            organizăm ziua perfectă pentru voi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/40743456789" className="btn-primary">
              WhatsApp 0743 456 789
            </a>
            <Link href="/packages" className="btn-outline-light">
              Vezi pachetul „Pescuit și Natură"
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
