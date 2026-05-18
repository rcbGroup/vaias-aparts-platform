import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VillaPriceCalculator from "@/components/VillaPriceCalculator";
import { apartments, VILLA_PROPERTY_PHOTOS } from "@/lib/apartments";
import {
  VILLA,
  villaBasePerNight,
  VILLA_LOS_DISCOUNT,
  VILLA_FROM_PRICE_LABEL,
} from "@/lib/villa-pricing";

const VILLA_HERO_IMAGE =
  "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_11.jpg";

const directNightly = villaBasePerNight("direct");
const bookingNightly = villaBasePerNight("booking");

export const metadata: Metadata = {
  title:
    "Toată Vila Vaias Aparts — Rezervă toate 7 Apartamentele | 22–28 Persoane Târgu Neamț",
  description: `Rezervă toată Vila Vaias Aparts — 7 apartamente boutique pentru 18–28 persoane. De la ${directNightly.toLocaleString("ro-RO")} RON/noapte (rezervare directă). Perfect pentru reuniuni de familie, retreaturi, team building, nunți și pelerinaje.`,
  keywords: [
    "rezervă toată vila Târgu Neamț",
    "vilă întreagă Neamț",
    "cazare grup mare Moldova",
    "vilă pentru evenimente Neamț",
    "team building Târgu Neamț",
    "reuniune familie Moldova",
    "nuntă vilă Neamț",
    "retreat parohial",
    "vilă 28 persoane",
    "Vaias Aparts vilă completă",
  ],
  alternates: { canonical: "https://www.vaiasaparts.ro/vila-completa" },
  openGraph: {
    title: "Toată Vila Vaias Aparts — 7 apartamente, 22–28 persoane",
    description: `De la ${directNightly.toLocaleString("ro-RO")} RON/noapte. Rezervare directă, cel mai bun preț — fără comision OTA.`,
    images: [VILLA_HERO_IMAGE],
  },
};

const heroBenefits = [
  { icon: "🏡", title: "7 apartamente, o singură cheie", text: "Toată vila pentru grupul tău — independent, dar împreună." },
  { icon: "👨‍👩‍👧‍👦", title: "18–28 persoane", text: "Standard 18 adulți, până la 28 cu canapele extensibile." },
  { icon: "🍳", title: "Bucătărie comună + 6 private", text: "Bucătăria pentru Toți + bucătăriile proprii ale apartamentelor." },
  { icon: "🚗", title: "Parcare gratuită în curte", text: "Loc pentru întreaga flotă a grupului." },
];

const useCases = [
  {
    title: "Reuniuni de familie",
    text: "Bunici, părinți, copii, nepoți — fiecare cu apartamentul lui, toți în aceeași curte.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Retreaturi parohiale & pelerinaje",
    text: "Grup mare către Agapia, Văratec și Mănăstirea Neamț — cazare unitară, liniște, slujbe la 15 minute.",
    icon: "⛪",
  },
  {
    title: "Team building corporate",
    text: "Echipe de 20+ persoane care vor liniște, natură și o experiență Moldovei autentică.",
    icon: "💼",
  },
  {
    title: "Nunți & evenimente",
    text: "Familia mirilor cazată împreună — gata pentru ziua cea mare la doar câțiva pași.",
    icon: "💍",
  },
  {
    title: "Aniversări mari",
    text: "60, 70, 80 de ani — sărbătoriți cu toți cei dragi, sub același acoperiș boutique.",
    icon: "🎉",
  },
  {
    title: "Retreaturi & ateliere",
    text: "Workshops, retreaturi de yoga sau scriere creativă — vilă rezervată exclusiv pentru voi.",
    icon: "🧘",
  },
];

export default function VillaCompletaPage() {
  const exampleNights = 4;
  const exampleDiscount = VILLA_LOS_DISCOUNT[exampleNights - 1];
  const exampleTotalDirect = Math.round(
    directNightly * exampleNights * (1 - exampleDiscount.pct / 100)
  );
  const exampleSavingsVsBooking =
    bookingNightly * exampleNights - exampleTotalDirect;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "Vila Vaias Aparts — Toată Vila",
            description: `Rezervă toată Vila Vaias Aparts — toate cele 7 apartamente independente pentru grupul tău (18–28 persoane). De la ${directNightly} RON/noapte rezervare directă.`,
            url: "https://www.vaiasaparts.ro/vila-completa",
            image: [VILLA_HERO_IMAGE, ...VILLA_PROPERTY_PHOTOS.slice(0, 4)],
            numberOfRooms: 7,
            occupancy: {
              "@type": "QuantitativeValue",
              minValue: VILLA.standardAdults,
              maxValue: VILLA.maxCapacity,
            },
            makesOffer: {
              "@type": "Offer",
              priceCurrency: "RON",
              price: directNightly,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: directNightly,
                priceCurrency: "RON",
                unitCode: "DAY",
                referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
              },
              availability: "https://schema.org/InStock",
              url: "https://www.vaiasaparts.ro/vila-completa",
            },
          }),
        }}
      />

      <PageHero
        eyebrow="Toată Vila Vaias Aparts"
        title="O singură rezervare. Toată vila. Doar pentru voi."
        subtitle={`7 apartamente · 18–28 persoane · de la ${VILLA_FROM_PRICE_LABEL} · perfect pentru reuniuni de familie, retreaturi, team building.`}
        image={VILLA_HERO_IMAGE}
      />

      {/* Quick stats strip */}
      <section className="bg-cream-50 py-12 border-b border-stone-100">
        <div className="container-x grid gap-6 md:grid-cols-4 text-center">
          {[
            { v: "7", l: "Apartamente independente" },
            { v: `${VILLA.standardAdults}–${VILLA.maxCapacity}`, l: "Persoane" },
            { v: `de la ${directNightly.toLocaleString("ro-RO")}`, l: "RON/noapte direct" },
            { v: "−17.5%", l: "Reducere sejur 7+ nopți" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-4xl text-walnut-500 mb-1">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Hero benefits */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-3">De ce toată vila</div>
            <h2 className="font-display text-3xl md:text-5xl text-forest-900 mb-5 text-balance">
              Confortul fiecăruia. Bucuria împreună.
            </h2>
            <p className="font-serif text-lg text-forest-800/85">
              Fiecare grup are nevoie de echilibru între intimitate și apropiere. La Vila Vaias Aparts,
              fiecare familie are apartamentul propriu — dar toate cele 7 apartamente sunt sub același acoperiș,
              într-o curte privată, cu Bucătăria pentru Toți care vă reunește.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {heroBenefits.map((b) => (
              <div
                key={b.title}
                className="card-lift rounded-2xl border border-stone-100 bg-stone-50 p-6 h-full"
              >
                <div className="text-3xl mb-4" aria-hidden>{b.icon}</div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{b.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="section bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian opacity-40 pointer-events-none" />
        <div className="container-x relative">
          <VillaPriceCalculator />
        </div>
      </section>

      {/* Example pricing transparency */}
      <section className="section bg-cream-50">
        <div className="container-x grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Reducere progresivă</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-5">
              Cu cât stai mai mult, cu atât plătești mai puțin pe noapte.
            </h2>
            <p className="font-serif text-lg text-forest-800/85 leading-relaxed mb-6">
              Pentru toate cele 7 apartamente rezervate împreună, aplicăm o reducere progresivă pe
              lungimea sejurului. Floor minim — niciodată sub {VILLA.oneBedFloorRON} RON / apartament 1-dormitor
              sau {VILLA.twoBedFloorRON} RON / apartament 2-dormitoare.
            </p>
            <div className="rounded-2xl bg-walnut-50 border border-walnut-200 p-6">
              <div className="text-xs uppercase tracking-wider text-walnut-700 mb-2 font-semibold">
                💡 Exemplu — sejur 4 nopți, rezervare directă
              </div>
              <p className="text-sm text-walnut-900 leading-relaxed">
                Toată vila × {exampleNights} nopți la preț direct
                <br />
                <strong className="text-lg text-walnut-700">
                  {(directNightly * exampleNights).toLocaleString("ro-RO")} RON
                </strong>{" "}
                − {exampleDiscount.pct}% reducere ={" "}
                <strong className="text-lg text-forest-700">
                  {exampleTotalDirect.toLocaleString("ro-RO")} RON
                </strong>
              </p>
              <p className="text-xs text-walnut-800 mt-2">
                Aceeași perioadă pe Booking.com ≈{" "}
                {(bookingNightly * exampleNights).toLocaleString("ro-RO")} RON.{" "}
                Economisești ≈{" "}
                <strong>{exampleSavingsVsBooking.toLocaleString("ro-RO")} RON</strong> rezervând direct.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-forest-900 text-cream-50">
                  <tr>
                    <th className="text-left px-5 py-3 font-display text-base">Nopți</th>
                    <th className="text-right px-5 py-3 font-display text-base">Reducere</th>
                    <th className="text-right px-5 py-3 font-display text-base">Preț direct vilă/noapte</th>
                    <th className="text-right px-5 py-3 font-display text-base">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {VILLA_LOS_DISCOUNT.map((d, i) => {
                    const nightly = Math.round(directNightly * (1 - d.pct / 100));
                    const total = nightly * d.nights;
                    return (
                      <tr
                        key={d.nights}
                        className={i % 2 === 0 ? "bg-cream-50" : "bg-stone-50"}
                      >
                        <td className="px-5 py-3 text-forest-900 font-medium">
                          {d.nights === 7 ? "7+" : d.nights}
                        </td>
                        <td className="px-5 py-3 text-right text-walnut-700 font-medium">
                          {d.pct === 0 ? "—" : `−${d.pct}%`}
                        </td>
                        <td className="px-5 py-3 text-right text-stone-700">
                          {nightly.toLocaleString("ro-RO")} RON
                        </td>
                        <td className="px-5 py-3 text-right text-forest-900 font-semibold">
                          {total.toLocaleString("ro-RO")} RON
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-stone-500">
              Tarifele sunt pentru ocupare standard ({VILLA.standardAdults} adulți). Oaspeți peste{" "}
              {VILLA.standardAdults} — supliment {VILLA.extraPersonRON} RON/persoană/noapte. Sezon mare
              (15 iul – 31 aug, 1 dec – 7 ian) — minim 3 nopți.
            </p>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section bg-forest-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
        <div className="container-x relative">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-3">Perfectă pentru</div>
            <h2 className="font-display text-3xl md:text-5xl text-cream-50 mb-5 text-balance">
              Grupul tău. Ocazia ta. Vila noastră.
            </h2>
            <p className="font-serif text-lg text-cream-100/80">
              Ne pricepem la grupuri mari pentru că am organizat zeci. Iată câteva dintre poveștile cele mai dragi.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-cream-200/10 bg-forest-900/40 p-7 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4" aria-hidden>{c.icon}</div>
                <h3 className="font-display text-xl text-cream-50 mb-2">{c.title}</h3>
                <p className="text-sm text-cream-100/80 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All 7 apartments */}
      <section id="apartamente" className="section bg-stone-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-3">Cele 7 apartamente</div>
            <h2 className="font-display text-3xl md:text-5xl text-forest-900 mb-5 text-balance">
              Fiecare cu personalitatea lui. Toate ale tale.
            </h2>
            <p className="font-serif text-lg text-forest-800/85">
              5 apartamente cu 1 dormitor (3–5 persoane fiecare) + 2 apartamente cu 2 dormitoare (4–6 persoane fiecare).
              Toate cu baie privată, Smart TV, lenjerie de bumbac premium și terasă.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apartments.map((a) => (
              <Link
                key={a.slug}
                href={`/apartments/${a.slug}`}
                className="card-lift group rounded-2xl overflow-hidden bg-cream-50 border border-stone-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={a.heroImage}
                    alt={`${a.name} — ${a.tagline}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-cream-50/95 backdrop-blur px-3 py-1 text-[11px] font-medium text-forest-800 uppercase tracking-wider">
                    {a.floor}
                  </div>
                  {a.hasAC && (
                    <div className="absolute top-3 right-3 rounded-full bg-blue-500/90 backdrop-blur px-2.5 py-1 text-[10px] text-white uppercase tracking-wider">
                      AC ❄️
                    </div>
                  )}
                  {a.accessible && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-emerald-600/95 backdrop-blur px-2.5 py-1 text-[10px] text-white uppercase tracking-wider">
                      Accesibil ♿
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-forest-900 mb-1 group-hover:text-walnut-700 transition">
                    {a.name}
                  </h3>
                  <p className="text-sm font-serif italic text-forest-700/80 mb-3">{a.tagline}</p>
                  <div className="flex items-center gap-3 text-xs text-stone-600 border-t border-stone-100 pt-3">
                    <span>🛏 {a.bedrooms} dormitor{a.bedrooms > 1 ? "e" : ""}</span>
                    <span>👥 {a.guests}–{a.guestsMax}</span>
                    <span>📐 {a.sizeSqm} m²</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-3">Ce este inclus</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-6">
              Totul gata, doar veniți cu poveștile voastre.
            </h2>
            <ul className="space-y-3 text-forest-800">
              {[
                "Toate cele 7 apartamente boutique, fiecare cu baie privată",
                "Bucătăria pentru Toți + bucătărie privată în 6 din 7 apartamente",
                "Lenjerie de bumbac premium și prosoape în toate apartamentele",
                "WiFi de mare viteză în toată vila",
                "Smart TV și fierbător/microunde în fiecare apartament",
                "Aer condiționat în Apartamentele 5 și 6",
                "Apartament 7 — accesibil, fără trepte, cu acces la Bucătăria pentru Toți",
                "Parcare gratuită în curtea privată (CCTV 24/7)",
                "Self check-in cu ghidaj, animale de companie bine venite",
                "Multilingv — RO/EN/IT/DE/FR",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-walnut-500 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">La un pas de</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-6">
              Inima Moldovei, la 5 minute.
            </h2>
            <ul className="space-y-3 text-forest-800">
              {[
                { d: "5 km", t: "Cetatea Neamțului — cetatea lui Ștefan cel Mare" },
                { d: "12 km", t: "Mănăstirea Neamț — Ierusalimul Ortodoxiei" },
                { d: "14 km", t: "Mănăstirea Agapia — picturile lui Grigorescu" },
                { d: "18 km", t: "Mănăstirea Văratec — cea mai mare mănăstire de maici" },
                { d: "10 min", t: "Lacul privat Nemțișor (exclusiv oaspeților vilei)" },
                { d: "60 km", t: "Masivul Ceahlău — muntele dacilor" },
                { d: "5 min", t: "Centru Târgu Neamț — magazine, farmacii, restaurante" },
              ].map((i) => (
                <li key={i.t} className="flex gap-3">
                  <span className="text-walnut-500 font-medium min-w-[3.5rem]">{i.d}</span>
                  <span>{i.t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/zone-turistice" className="btn-secondary">
                Toate zonele turistice →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-stone-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">Întrebări despre vila întreagă</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10">
            Ce vor să știe oaspeții înainte să rezerve toată vila
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Cât costă să rezerv toată vila pentru o noapte?",
                a: `Tariful direct pentru toate cele 7 apartamente pornește de la ${directNightly.toLocaleString("ro-RO")} RON/noapte (ocupare standard, ${VILLA.standardAdults} adulți). Pentru sejur de mai multe nopți, aplicăm reducere progresivă — de la 5% (2 nopți) până la 17.5% (7+ nopți).`,
              },
              {
                q: "Câte persoane încap în toată vila?",
                a: `Standard ${VILLA.standardAdults} adulți (2 adulți × 9 dormitoare). Cu paturile extensibile din living-uri și canapelele tip L, putem găzdui până la ${VILLA.maxCapacity} persoane. Supliment ${VILLA.extraPersonRON} RON/persoană/noapte peste capacitatea standard.`,
              },
              {
                q: "De ce e mai ieftin direct decât pe Booking.com?",
                a: "Pe canalele OTA (Booking, Airbnb, Travelminit, H2B) prețul include un markup care acoperă comisionul lor (de regulă 5–20%). Rezervând direct cu noi pe WhatsApp sau site, eviți acel markup și plătești prețul real al cazării.",
              },
              {
                q: "Pot rezerva doar o parte din vilă?",
                a: "Da, fiecare apartament poate fi rezervat individual din pagina /apartments. Tarif individual: de la 295 RON/noapte (1 dormitor) sau 595 RON/noapte (2 dormitoare). Pentru grupuri mari, recomandăm pachetul Toată Vila — reducere progresivă și prețul cel mai bun pe persoană.",
              },
              {
                q: "Care este avansul pentru rezervarea întregii vile?",
                a: "Avans 30% din valoarea totală, plătibil prin transfer bancar sau card. Restul se achită la check-in. Emitem factură fiscală.",
              },
              {
                q: "Ce evenimente acceptați?",
                a: "Reuniuni de familie, retreaturi parohiale, team building, aniversări, ateliere și workshops, retreaturi de yoga sau scriere. Acceptăm petreceri liniștite — fără evenimente zgomotoase și fără muzică tare după ora 22:00 (avem vecini).",
              },
              {
                q: "Există spațiu comun pentru grupul nostru?",
                a: "Da — Bucătăria pentru Toți este o bucătărie comună la parter, complet utilată, unde grupul se poate aduna pentru mese sau seri lungi. Plus curtea privată cu parcare și spațiu exterior.",
              },
              {
                q: "Putem aduce mâncare gătită sau catering?",
                a: "Cu plăcere — catering și mâncare gătită sunt bine venite. Bucătăria pentru Toți și bucătăriile private ale apartamentelor sunt complet echipate. Avem și parteneri locali pentru catering tradițional moldovenesc — ne puteți întreba.",
              },
            ].map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-stone-200 bg-cream-50 p-6 open:shadow-soft"
              >
                <summary className="cursor-pointer font-display text-lg text-forest-900 list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-walnut-500 text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-forest-800/85 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-walnut-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={VILLA_HERO_IMAGE}
            alt="Vila Vaias Aparts exterior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 pattern-moldavian-dark opacity-50 pointer-events-none" />
        <div className="container-narrow relative text-center text-cream-50">
          <div className="eyebrow-light mb-4">Toată Vila</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance">
            Rezervă toată Vila Vaias — perfect pentru reuniuni de familie, retreaturi, team building.
          </h2>
          <p className="mt-6 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
            Confirmare rapidă pe WhatsApp. Cel mai bun preț — direct la noi.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/40752388388?text=${encodeURIComponent(
                "Bună ziua! Doresc o ofertă pentru rezervarea întregii Vile Vaias Aparts. Datele: [CHECK-IN] – [CHECK-OUT], grup [NR] persoane."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
            >
              💬 Cere ofertă pe WhatsApp
            </a>
            <a href="tel:+40752388388" className="btn-outline-light">
              📞 +40 752 388 388
            </a>
            <Link href="#calculator" className="btn-outline-light">
              Calculează preț
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
