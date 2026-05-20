import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { apartments } from "@/lib/apartments";
import { siteVideos, videoObjectLd, VILLA_VIDEO_ID, KITCHEN_VIDEO_ID } from "@/lib/videos";

// Whole-villa pricing — flat weekday/weekend rates
const PRICE_WEEKDAY = 2065;
const PRICE_WEEKEND = 2450;
const EXTRA_PERSON_RON = 50;
const CITY_TAX_RON = 5; // per adult / per night
const DEPOSIT_PCT = 30;
const CAPACITY_MIN = 22;
const CAPACITY_MAX = 28;
const APARTMENTS_COUNT = 7;
const BEDROOMS_COUNT = 9; // 5 × 1-bed + 2 × 2-bed
const BATHROOMS_COUNT = 7;

const HERO_IMAGE = "/villa-hero/villa-hero.jpg";
const AERIAL_IMAGE = "/villa-hero/villa-aerial.jpg";

const WA_NUMBER = "40752388388";
const WA_NUMBER_DISPLAY = "+40 752 388 388";
const PHONE_SECONDARY = "+40 738 345 330";
const PHONE_SECONDARY_DIGITS = "+40738345330";
const EMAIL = "contact@vaiasaparts.ro";

const WA_MESSAGE = encodeURIComponent(
  "Bună ziua! Doresc o ofertă pentru rezervarea ÎNTREGII Vile Vaias Aparts. Datele: [CHECK-IN] – [CHECK-OUT], grup [NR] persoane. Tip eveniment: [nuntă/petrecere/team building/reuniune familie/altele]."
);

export const metadata: Metadata = {
  title: "Închiriază Întreaga Vilă | Vila Vaias Aparts — Târgu Neamț",
  description: `Închiriază întreaga Vilă Vaias Aparts — 7 apartamente, ${CAPACITY_MIN}–${CAPACITY_MAX} persoane. De la ${PRICE_WEEKDAY.toLocaleString("ro-RO")} RON/noapte (luni–joi), ${PRICE_WEEKEND.toLocaleString("ro-RO")} RON/noapte (weekend). Perfect pentru nunți, petreceri, team building și reuniuni de familie.`,
  keywords: [
    "închiriază întreaga vilă",
    "toată vila Târgu Neamț",
    "vilă pentru nuntă Neamț",
    "vilă pentru petrecere Moldova",
    "team building Târgu Neamț",
    "reuniune familie vilă",
    "vilă grupuri 28 persoane",
    "vilă evenimente private",
    "Vila Vaias Aparts întreagă",
    "cazare grup mare Moldova",
  ],
  alternates: { canonical: "https://www.vaiasaparts.ro/vila-completa" },
  openGraph: {
    title: "Închiriază Întreaga Vilă | Vila Vaias Aparts",
    description: `7 apartamente · ${CAPACITY_MIN}–${CAPACITY_MAX} persoane · de la ${PRICE_WEEKDAY.toLocaleString("ro-RO")} RON/noapte. Locația perfectă pentru petreceri, nunți, team building-uri și evenimente de grup.`,
    type: "website",
    url: "https://www.vaiasaparts.ro/vila-completa",
    images: [{ url: `https://www.vaiasaparts.ro${HERO_IMAGE}`, width: 2400, height: 1600 }],
  },
};

const audiences = [
  { icon: "💍", title: "Nunți și petreceri", text: "Familia și prietenii cazați împreună — sub același acoperiș cu mirii, gata de ziua cea mare." },
  { icon: "💼", title: "Team building-uri corporate", text: "Echipe de 20+ persoane care vor liniște, natură și o experiență autentică în Moldova." },
  { icon: "👨‍👩‍👧‍👦", title: "Reuniuni de familie", text: "Trei generații, șapte apartamente — fiecare cu intimitatea lui, toți într-o curte privată." },
  { icon: "🥂", title: "Grupuri de prieteni", text: "Un weekend lung sau o săptămână întreagă — fără să vă mai despărțiți de la birou la cazare." },
  { icon: "🌿", title: "Vacanțe extinse", text: "Zece zile · două săptămâni · o lună. Cu cât stați mai mult, cu atât plătiți mai puțin pe noapte." },
  { icon: "🎉", title: "Evenimente private", text: "Aniversări mari, botezuri, retreaturi spirituale, workshops — vila rezervată exclusiv pentru voi." },
];

const includes = [
  "7 apartamente complet mobilate și echipate",
  `${BEDROOMS_COUNT} dormitoare · ${BATHROOMS_COUNT} băi complet echipate`,
  "Bucătărie comună + bucătărie privată în fiecare apartament",
  "Curte privată cu grădină și loc de relaxare",
  "Parcare privată cu CCTV 24/7",
  "WiFi gratuit de mare viteză în tot complexul",
  "Lenjerie de bumbac premium și prosoape incluse",
  "Smart TV în fiecare apartament",
  "Aer condiționat în apartamentele cu acest dotare",
  "Self check-in cu ghidaj · animale de companie bine venite",
];

export default function VillaCompletaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "Vila Vaias Aparts — Întreaga Vilă",
            description: `Închiriază întreaga Vilă Vaias Aparts — toate cele ${APARTMENTS_COUNT} apartamentele pentru grupul tău (${CAPACITY_MIN}–${CAPACITY_MAX} persoane). Perfect pentru nunți, petreceri, team building.`,
            url: "https://www.vaiasaparts.ro/vila-completa",
            image: [
              `https://www.vaiasaparts.ro${HERO_IMAGE}`,
              `https://www.vaiasaparts.ro${AERIAL_IMAGE}`,
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Str. Sfântul Lazăr nr. 1",
              addressLocality: "Târgu Neamț",
              addressRegion: "Neamț",
              postalCode: "615200",
              addressCountry: "RO",
            },
            telephone: WA_NUMBER_DISPLAY,
            email: EMAIL,
            checkinTime: "14:00",
            checkoutTime: "11:00",
            numberOfRooms: APARTMENTS_COUNT,
            occupancy: {
              "@type": "QuantitativeValue",
              minValue: CAPACITY_MIN,
              maxValue: CAPACITY_MAX,
            },
            amenityFeature: [
              { "@type": "LocationFeatureSpecification", name: "Bucătărie comună" },
              { "@type": "LocationFeatureSpecification", name: "Bucătărie privată per apartament" },
              { "@type": "LocationFeatureSpecification", name: "WiFi gratuit" },
              { "@type": "LocationFeatureSpecification", name: "Parcare privată" },
              { "@type": "LocationFeatureSpecification", name: "Curte privată cu grădină" },
              { "@type": "LocationFeatureSpecification", name: "Lenjerie premium" },
            ],
            makesOffer: [
              {
                "@type": "Offer",
                name: "Întreaga vilă — luni–joi",
                priceCurrency: "RON",
                price: PRICE_WEEKDAY,
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: PRICE_WEEKDAY,
                  priceCurrency: "RON",
                  unitCode: "DAY",
                },
                availability: "https://schema.org/InStock",
                url: "https://www.vaiasaparts.ro/vila-completa",
              },
              {
                "@type": "Offer",
                name: "Întreaga vilă — weekend",
                priceCurrency: "RON",
                price: PRICE_WEEKEND,
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: PRICE_WEEKEND,
                  priceCurrency: "RON",
                  unitCode: "DAY",
                },
                availability: "https://schema.org/InStock",
                url: "https://www.vaiasaparts.ro/vila-completa",
              },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section className="relative h-[80vh] min-h-[640px] w-full overflow-hidden bg-forest-950">
        <Image
          src={HERO_IMAGE}
          alt="Vila Vaias Aparts — vedere aeriană"
          fill
          priority
          sizes="100vw"
          className="object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-forest-950/50 to-forest-950/90" />
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 mix-blend-overlay" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-x">
            <div className="max-w-3xl text-cream-50 animate-slide-up">
              <div className="eyebrow-light mb-5">Toată Vila · O singură rezervare</div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tight text-cream-50 text-balance">
                Închiriază Întreaga Vilă
              </h1>
              <p className="mt-6 font-serif text-xl md:text-2xl text-cream-100/95 max-w-2xl leading-relaxed">
                Locația perfectă pentru petreceri, nunți, team building-uri și evenimente de grup.
              </p>
              <p className="mt-3 text-base text-cream-100/80 max-w-2xl">
                {CAPACITY_MIN}–{CAPACITY_MAX} persoane · {APARTMENTS_COUNT} apartamente complet echipate ·
                de la <strong className="text-cream-50">{PRICE_WEEKDAY.toLocaleString("ro-RO")} RON/noapte</strong>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  💬 Cere ofertă pe WhatsApp
                </a>
                <a href={`tel:${WA_NUMBER_DISPLAY.replace(/\s/g, "")}`} className="btn-outline-light">
                  📞 {WA_NUMBER_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-cream-50 py-10 border-b border-stone-100">
        <div className="container-x grid gap-6 md:grid-cols-4 text-center">
          {[
            { v: APARTMENTS_COUNT, l: "Apartamente complet echipate" },
            { v: `${CAPACITY_MIN}–${CAPACITY_MAX}`, l: "Persoane" },
            { v: BEDROOMS_COUNT, l: "Dormitoare" },
            { v: BATHROOMS_COUNT, l: "Băi private" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-4xl text-walnut-500 mb-1">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO TOUR */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Tur video</div>
            <h2 className="font-display text-3xl md:text-5xl text-forest-900 mb-4 text-balance">
              Vila Vaias Aparts în mișcare
            </h2>
            <p className="font-serif text-lg text-forest-800/85">
              Confort de hotel, libertatea de acasă, liniște și priveliști ca în Elveția —
              vezi întreaga vilă și bucătăria comună complet utilată.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card bg-forest-950">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/KnEAUHQFEvY?rel=0"
                  title="Vila Vaias Aparts — tur video întreaga vilă"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-sm text-stone-500 text-center">Tur complet al vilei</p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card bg-forest-950">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/xnxi4jQYKaU?rel=0"
                  title="Bucătăria comună modernă — Vila Vaias Aparts"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-sm text-stone-500 text-center">Bucătăria comună complet utilată</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.youtube.com/@VaiasAparts/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-walnut-600 hover:text-walnut-700"
            >
              ▶️ Vezi toate filmările pe canalul YouTube Vaias Aparts
            </a>
          </div>
        </div>
      </section>

      {/* PRICING CARD */}
      <section id="tarife" className="section bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian opacity-40 pointer-events-none" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Tarife clare · Fără surprize</div>
            <h2 className="font-display text-3xl md:text-5xl text-forest-900 mb-5 text-balance">
              Un singur preț pentru toată vila.
            </h2>
            <p className="font-serif text-lg text-forest-800/85 leading-relaxed mb-6">
              Rezervarea include toate cele {APARTMENTS_COUNT} apartamente, curtea privată, parcarea,
              bucătăria comună și WiFi-ul de mare viteză în întreg complexul. Tariful este același,
              indiferent câte persoane aduceți (până la capacitatea standard).
            </p>
            <div className="rounded-2xl bg-walnut-50 border border-walnut-200 p-6">
              <div className="text-xs uppercase tracking-wider text-walnut-700 mb-2 font-semibold">
                💡 Reducere directă · WhatsApp
              </div>
              <p className="text-sm text-walnut-900 leading-relaxed">
                Rezervând direct cu noi pe WhatsApp sau pe site, eviți comisionul platformelor OTA
                (15–25%) și plătești cel mai bun preț disponibil. Avans 30% — restul la check-in.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-cream-50 p-7 shadow-soft">
                <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Luni – Joi</div>
                <div className="font-display text-4xl md:text-5xl text-forest-900 mb-1">
                  {PRICE_WEEKDAY.toLocaleString("ro-RO")} <span className="text-xl text-stone-500">RON</span>
                </div>
                <div className="text-sm text-stone-600 mb-4">/ noapte · toată vila</div>
                <ul className="text-sm text-forest-800 space-y-1.5">
                  <li>✓ Toate cele {APARTMENTS_COUNT} apartamente</li>
                  <li>✓ Capacitate standard {CAPACITY_MIN}–{CAPACITY_MAX} persoane</li>
                  <li>✓ Curte și parcare incluse</li>
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-walnut-400 bg-cream-50 p-7 shadow-card relative">
                <div className="absolute -top-3 left-6 rounded-full bg-walnut-500 text-cream-50 px-3 py-1 text-[10px] uppercase tracking-wider font-medium">
                  Vineri – Duminică
                </div>
                <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">Weekend</div>
                <div className="font-display text-4xl md:text-5xl text-walnut-700 mb-1">
                  {PRICE_WEEKEND.toLocaleString("ro-RO")} <span className="text-xl text-stone-500">RON</span>
                </div>
                <div className="text-sm text-stone-600 mb-4">/ noapte · toată vila</div>
                <ul className="text-sm text-forest-800 space-y-1.5">
                  <li>✓ Toate cele {APARTMENTS_COUNT} apartamente</li>
                  <li>✓ Ideal pentru nunți și petreceri</li>
                  <li>✓ Minim 2 nopți recomandat</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-stone-200 bg-cream-50 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="px-5 py-3 text-stone-600">Persoană suplimentară (peste {CAPACITY_MIN})</td>
                    <td className="px-5 py-3 text-right text-forest-900 font-medium">
                      {EXTRA_PERSON_RON} RON / noapte / persoană
                    </td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-5 py-3 text-stone-600">Taxă oraș</td>
                    <td className="px-5 py-3 text-right text-forest-900 font-medium">
                      {CITY_TAX_RON} lei / adult / noapte (separat)
                    </td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-5 py-3 text-stone-600">Avans rezervare directă</td>
                    <td className="px-5 py-3 text-right text-forest-900 font-medium">
                      {DEPOSIT_PCT}% din valoarea totală
                    </td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="px-5 py-3 text-stone-600">Check-in</td>
                    <td className="px-5 py-3 text-right text-forest-900 font-medium">de la 14:00</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-stone-600">Check-out</td>
                    <td className="px-5 py-3 text-right text-forest-900 font-medium">până la 11:00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-stone-500 leading-relaxed">
              Tarifele afișate sunt pentru rezervare directă (site / WhatsApp / telefon). Avans 30%
              plătibil prin transfer bancar sau card; restul la check-in. Emitem factură fiscală
              pentru orice rezervare.
            </p>
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="section bg-forest-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
        <div className="container-x relative">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-3">Perfectă pentru</div>
            <h2 className="font-display text-3xl md:text-5xl text-cream-50 mb-5 text-balance">
              Ocazia ta. Vila noastră.
            </h2>
            <p className="font-serif text-lg text-cream-100/80">
              Locația perfectă pentru petreceri, nunți, team building-uri și evenimente de grup —
              cu intimitatea fiecărui apartament și apropierea unei singure curți.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-cream-200/10 bg-forest-900/40 p-7 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4" aria-hidden>{a.icon}</div>
                <h3 className="font-display text-xl text-cream-50 mb-2">{a.title}</h3>
                <p className="text-sm text-cream-100/80 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Ce este inclus</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-5 text-balance">
              Tot ce ai nevoie pentru un eveniment fără griji.
            </h2>
            <p className="font-serif text-lg text-forest-800/85 leading-relaxed mb-6">
              Toate cele {APARTMENTS_COUNT} apartamente sunt complet mobilate și echipate.
              {BEDROOMS_COUNT} dormitoare, {BATHROOMS_COUNT} băi, două bucătării (una comună + cele
              private ale apartamentelor) și o curte privată — totul într-o singură rezervare.
            </p>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
              <Image
                src={AERIAL_IMAGE}
                alt="Vila Vaias Aparts — vedere aeriană cu curte"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-forest-800">
              {includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-walnut-500 mt-1 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-walnut-200 bg-walnut-50 p-6">
              <div className="text-xs uppercase tracking-wider text-walnut-700 font-semibold mb-2">
                🎉 Pentru nunți și evenimente
              </div>
              <p className="text-sm text-walnut-900 leading-relaxed">
                Acceptăm petreceri liniștite — fără muzică tare după ora 22:00 (avem vecini).
                Pentru nunți, vă putem recomanda parteneri locali pentru catering, fotograf,
                florist și transport. Catering și mâncare gătită sunt bine venite — bucătăriile
                sunt complet utilate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENT LIST */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-3">Cele {APARTMENTS_COUNT} apartamente</div>
            <h2 className="font-display text-3xl md:text-5xl text-forest-900 mb-5 text-balance">
              Fiecare cu personalitatea lui. Toate ale tale.
            </h2>
            <p className="font-serif text-lg text-forest-800/85">
              5 apartamente cu 1 dormitor + 2 apartamente cu 2 dormitoare. Toate cu baie privată,
              Smart TV, lenjerie de bumbac premium și terasă proprie.
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

      {/* FAQ */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">Întrebări frecvente · Vila întreagă</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10 text-balance">
            Ce vor să știe oaspeții înainte să rezerve.
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Cât costă să închiriez întreaga vilă?",
                a: `Tariful este de ${PRICE_WEEKDAY.toLocaleString("ro-RO")} RON/noapte de luni până joi și ${PRICE_WEEKEND.toLocaleString("ro-RO")} RON/noapte vineri-duminică, pentru toate cele ${APARTMENTS_COUNT} apartamentele. Capacitate standard ${CAPACITY_MIN}-${CAPACITY_MAX} persoane. Avans ${DEPOSIT_PCT}%, restul la check-in.`,
              },
              {
                q: "Câte persoane încap în toată vila?",
                a: `Capacitatea standard este de ${CAPACITY_MIN} persoane, cu posibilitatea de a găzdui până la ${CAPACITY_MAX} persoane folosind canapelele extensibile și paturile suplimentare. Pentru fiecare persoană suplimentară peste capacitatea standard se aplică un supliment de ${EXTRA_PERSON_RON} RON/noapte.`,
              },
              {
                q: "Care este avansul pentru rezervare?",
                a: `Pentru rezervări directe (pe site, WhatsApp sau telefon), avansul este de ${DEPOSIT_PCT}% din valoarea totală a sejurului. Restul se achită la check-in. Acceptăm transfer bancar sau plată cu cardul. Emitem factură fiscală.`,
              },
              {
                q: "Ce ore au check-in-ul și check-out-ul?",
                a: "Check-in de la ora 14:00, check-out până la ora 11:00. Self check-in cu ghidaj — vă întâmpinăm personal sau vă trimitem instrucțiunile în avans. Pentru sosiri târzii sau plecări speciale, suntem flexibili — anunțați-ne din timp.",
              },
              {
                q: "Există taxa de oraș?",
                a: `Da, taxa de oraș este de ${CITY_TAX_RON} lei/adult/noapte și se achită separat de tariful cazării. Această taxă este obligatorie conform legislației locale și se colectează la check-in.`,
              },
              {
                q: "Ce evenimente acceptați?",
                a: "Nunți, petreceri private, team building-uri, reuniuni de familie, aniversări mari (60, 70, 80 de ani), botezuri, retrageri spirituale și workshops. Acceptăm petreceri liniștite — fără muzică tare după ora 22:00 (avem vecini). Pentru evenimente cu mai mult zgomot, vă putem recomanda locații partener.",
              },
              {
                q: "Putem aduce catering sau mâncare gătită?",
                a: "Cu plăcere — catering și mâncare gătită sunt bine venite. Bucătăria comună plus bucătăriile private ale apartamentelor sunt complet echipate (frigider, aragaz, cuptor, microunde, veselă). Avem și parteneri locali pentru catering tradițional moldovenesc — ne puteți întreba.",
              },
              {
                q: "Există spațiu pentru evenimente?",
                a: "Da — curtea privată cu grădina este perfectă pentru ceremonii sau cocktail-uri în aer liber (până la ~80 invitați). Bucătăria comună de la parter funcționează ca spațiu de adunare pentru mese sau seri lungi. Pentru receptii mai mari, vă putem recomanda săli de evenimente partenere în zonă.",
              },
              {
                q: "Pot rezerva doar o parte din vilă?",
                a: "Da, fiecare apartament poate fi rezervat individual. Tariful individual: de la 295 RON/noapte (1 dormitor) sau 595 RON/noapte (2 dormitoare). Pentru grupuri de peste 15 persoane, pachetul Toată Vila este aproape întotdeauna mai avantajos.",
              },
              {
                q: "Cum rezerv întreaga vilă?",
                a: `Cea mai rapidă metodă este pe WhatsApp la ${WA_NUMBER_DISPLAY} — vă răspundem cu o ofertă personalizată în câteva ore. Alternativ, sunați-ne la ${WA_NUMBER_DISPLAY} sau ${PHONE_SECONDARY}, sau scrieți-ne la ${EMAIL}.`,
              },
            ].map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 open:shadow-soft"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Cât costă să închiriez întreaga vilă?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Tariful este de ${PRICE_WEEKDAY} RON/noapte de luni până joi și ${PRICE_WEEKEND} RON/noapte vineri-duminică, pentru toate cele ${APARTMENTS_COUNT} apartamentele.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "Câte persoane încap în toată vila?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Capacitatea standard este de ${CAPACITY_MIN} persoane, până la ${CAPACITY_MAX} persoane cu paturi suplimentare. Supliment ${EXTRA_PERSON_RON} RON/persoană/noapte peste capacitatea standard.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "Care este avansul pentru rezervare?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Avans ${DEPOSIT_PCT}% din valoarea totală pentru rezervări directe. Restul la check-in. Emitem factură fiscală.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "Ce ore au check-in-ul și check-out-ul?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Check-in de la 14:00, check-out până la 11:00. Self check-in cu ghidaj.",
                  },
                },
              ],
            }),
          }}
        />
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-walnut-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={HERO_IMAGE}
            alt="Vila Vaias Aparts exterior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 pattern-moldavian-dark opacity-50 pointer-events-none" />
        <div className="container-narrow relative text-center text-cream-50">
          <div className="eyebrow-light mb-4">Întreaga Vilă · Rezervă acum</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance">
            Vorbim despre evenimentul tău?
          </h2>
          <p className="mt-6 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
            Confirmare rapidă pe WhatsApp · Avans 30%, restul la check-in · Cel mai bun preț — direct la noi.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
            >
              💬 WhatsApp {WA_NUMBER_DISPLAY}
            </a>
            <a href={`tel:${PHONE_SECONDARY_DIGITS}`} className="btn-outline-light">
              📞 {PHONE_SECONDARY}
            </a>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Rezervare întreaga vilă")}`} className="btn-outline-light">
              ✉️ {EMAIL}
            </a>
          </div>
          <p className="mt-8 text-xs text-cream-100/60">
            Str. Sfântul Lazăr nr. 1 · Târgu Neamț · jud. Neamț · Răspuns rapid 24/7
          </p>
        </div>
      </section>

      {siteVideos
        .filter((v) => v.youtubeId === VILLA_VIDEO_ID || v.youtubeId === KITCHEN_VIDEO_ID)
        .map((v) => (
          <script
            key={v.youtubeId}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectLd(v)) }}
          />
        ))}
    </>
  );
}
