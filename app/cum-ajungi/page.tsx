import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  airports,
  cityBreakOrigins,
  closestAirports,
  internationalAirports,
  romanianAirports
} from "@/lib/airports";
import AirportExplorer from "./AirportExplorer";

const PAGE_URL = "https://www.vaiasaparts.ro/cum-ajungi";
const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Targu_Neamt%2C_foto_Curcan_Ionel_%281%29.jpg/1920px-Targu_Neamt%2C_foto_Curcan_Ionel_%281%29.jpg";

export const metadata: Metadata = {
  title:
    "Cum ajungi la Târgu Neamț — toate aeroporturile din România | Vaias Aparts",
  description:
    "Ghid complet 2026: cele 15 aeroporturi din România + 7 aeroporturi din țările vecine, distanțe față de Târgu Neamț, companii aeriene Wizz / Ryanair / TAROM, transport spre Vila Vaias Aparts. Cel mai apropiat: Bacău (BCM), doar 75 km.",
  keywords: [
    "cum ajung la Târgu Neamț",
    "aeroport Târgu Neamț",
    "zbor spre Neamț",
    "aeroport Bacău Vila Vaias",
    "Bacău BCM Târgu Neamț distanță",
    "aeroport Iași Târgu Neamț",
    "aeroport Suceava Vila Vaias",
    "zboruri Londra Bacău",
    "Wizz Air Bacău",
    "Ryanair Bacău",
    "TAROM Iași",
    "cazare Târgu Neamț aeroport",
    "transfer aeroport Vaias Aparts",
    "city break Moldova",
    "diaspora Italia Bacău",
    "diaspora UK Bacău",
    "vacanță Moldova zbor"
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "ro_RO",
    url: PAGE_URL,
    siteName: "Vila Vaias Aparts",
    title:
      "Cum ajungi la Târgu Neamț — toate aeroporturile din România și țările vecine",
    description:
      "Ghid complet: 22 de aeroporturi, distanțe, companii aeriene, rute Wizz/Ryanair/TAROM și transport spre Vila Vaias Aparts. Cel mai apropiat: Bacău, 75 km.",
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: "Cum ajungi la Târgu Neamț" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cum ajungi la Târgu Neamț — ghid aeroporturi",
    description:
      "22 aeroporturi, distanțe, companii aeriene, transport spre Vaias Aparts."
  }
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "Care este cel mai apropiat aeroport de Târgu Neamț?",
    a: "Cel mai apropiat aeroport de Vila Vaias Aparts din Târgu Neamț este Aeroportul Internațional „George Enescu” Bacău (BCM) — la doar 75 km, aproximativ 1h 15min cu mașina pe DN15D. Bacău este hub Wizz Air și Ryanair, cu zboruri directe din Londra, Dublin, Roma, Milano, Madrid, Bruxelles, Köln și Tel Aviv (sezonier)."
  },
  {
    q: "Câte aeroporturi sunt în județul Neamț?",
    a: "În județul Neamț nu există aeroport propriu cu trafic comercial. Cele mai apropiate aeroporturi pentru zboruri internaționale sunt Bacău (BCM) la 75 km, Iași (IAS) la 130 km și Suceava — Ștefan cel Mare (SCV) la 120 km."
  },
  {
    q: "Există zboruri directe din Londra spre Bacău?",
    a: "Da. Wizz Air operează zboruri Londra Luton → Bacău cu mai multe frecvențe pe săptămână. Durata zborului este de aproximativ 3h. Vaias Aparts este la 75 km de aeroport, accesibil cu rent-a-car (Avis, Hertz, Autonom) sau transfer privat."
  },
  {
    q: "Cum ajung de la aeroportul Iași la Târgu Neamț?",
    a: "Distanța este de 130 km. Cele 3 opțiuni: (1) rent-a-car din terminal — Autonom, Avis, Hertz, Sixt — drum 2h 15min pe DN28 + DN15B prin Pașcani; (2) transfer privat aranjat de Vaias Aparts — tarif fix, cere pe WhatsApp +40 752 388 388; (3) tren Iași → Pașcani + microbuz Pașcani → Târgu Neamț, ~3h 30min total."
  },
  {
    q: "Care este cel mai bun aeroport pentru diaspora din Italia?",
    a: "Pentru diaspora italiană, recomandăm aeroportul Bacău (BCM). Wizz Air și Ryanair operează zboruri zilnice din Roma Fiumicino, Milano Bergamo, Milano Malpensa, Bologna, Torino și Veneția. Bacău este la 75 km de Vila Vaias — drumul durează 1h 15min."
  },
  {
    q: "Pot închiria mașină direct din aeroport?",
    a: "Da, la toate aeroporturile principale (Bacău, Iași, Suceava, București Otopeni, Cluj-Napoca, Timișoara, Sibiu). Companiile disponibile: Autonom, Avis, Hertz, Sixt, Europcar, Klass Wagen. Pentru aeroporturi mici (Satu Mare, Baia Mare, Tulcea) vă recomandăm transferul privat — putem aranja noi."
  },
  {
    q: "Vaias Aparts oferă transfer de la aeroport?",
    a: "Da, oferim transfer privat de la oricare dintre aeroporturile Moldovei (Bacău, Iași, Suceava). Tarif fix, fără surprize, șofer vorbitor de engleză/franceză/italiană. Cere ofertă fermă pe WhatsApp: +40 752 388 388. Pentru transferuri din alte aeroporturi (Otopeni, Cluj), recomandăm rent-a-car sau zbor de conexiune."
  },
  {
    q: "Care e cea mai rapidă cale spre Vila Vaias dacă aterizez la Otopeni?",
    a: "De la București Otopeni există 2 opțiuni: (1) zbor intern TAROM sau Wizz Otopeni → Bacău (50 min) + transfer 75 km — total ~3h cu așteptări; (2) rent-a-car cu drum direct prin Buzău-Focșani-Bacău, ~5h 30min pe DN2 + DN15D. Recomandăm zborul intern dacă diferența de preț nu e semnificativă."
  },
  {
    q: "Care sunt distanțele față de Vila Vaias Aparts pentru fiecare aeroport principal?",
    a: "Bacău (BCM) 75 km · Suceava (SCV) 120 km · Iași (IAS) 130 km · Târgu Mureș (TGM) 260 km · Cluj-Napoca (CLJ) 305 km · Sibiu (SBZ) 330 km · București Otopeni (OTP) 370 km · Tulcea (TCE) 390 km · Baia Mare (BAY) 440 km · Constanța (CND) 480 km · Craiova (CRA) 510 km · Satu Mare (SUJ) 520 km · Oradea (OMR) 590 km · Arad (ARW) 610 km · Timișoara (TSR) 620 km."
  },
  {
    q: "Pot zbura direct la Vila Vaias dintr-un alt oraș european?",
    a: "Vila Vaias Aparts nu are aeroport propriu. Cel mai aproape de noi se zboară prin Bacău (BCM), Iași (IAS) sau Suceava (SCV) — toate la 1–2h 15min cu mașina. Avem și un partener care vă poate trimite la aeroport sau prelua de la sosire — întrebați pe WhatsApp."
  }
];

export default function CumAjungiPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  const tripActionJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Cum ajungi la Vila Vaias Aparts din orice aeroport",
    description:
      "Ghid complet de transport: 22 de aeroporturi din România și țările vecine, cu distanțe, companii aeriene și opțiuni de transfer spre Vila Vaias Aparts din Târgu Neamț.",
    touristType: ["Diaspora", "Pelerini", "Familii", "Cuplu", "Business"],
    itinerary: airports.map((a, i) => ({
      "@type": "Place",
      position: i + 1,
      name: `${a.name} (${a.iata})`,
      address: {
        "@type": "PostalAddress",
        addressLocality: a.city,
        addressCountry: a.country === "Romania" ? "RO" : a.country
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: a.lat,
        longitude: a.lng
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Distanță până la Vila Vaias Aparts",
          value: `${a.distanceKm} km`
        },
        {
          "@type": "PropertyValue",
          name: "Timp estimativ de drum",
          value: a.driveTime
        }
      ]
    })),
    provider: {
      "@type": "LodgingBusiness",
      name: "Vila Vaias Aparts",
      url: "https://www.vaiasaparts.ro",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Strada Sfântul Lazăr Nr. 1",
        addressLocality: "Târgu Neamț",
        addressRegion: "Neamț",
        postalCode: "615200",
        addressCountry: "RO"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.2014,
        longitude: 26.3656
      }
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Acasă", href: "/" },
          { label: "Cum ajungi" }
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[68vh] flex items-end overflow-hidden bg-forest-950 pt-12 pb-16">
        <Image
          src={HERO_IMAGE}
          alt="Aeroport, ghid de transport spre Târgu Neamț"
          fill
          priority
          sizes="100vw"
          className="object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/55 via-forest-950/65 to-forest-950/95" />
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 mix-blend-overlay" />
        <div className="relative container-x text-cream-50">
          <div className="eyebrow-light mb-4">Ghid complet de transport · 2026</div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-cream-50 max-w-4xl text-balance">
            Cum ajungi la Târgu Neamț — fiecare aeroport, fiecare zbor, fiecare drum.
          </h1>
          <p className="mt-6 font-serif text-xl md:text-2xl text-cream-100/95 max-w-3xl leading-relaxed">
            22 de aeroporturi cartografiate, distanțe reale, companii aeriene, transferuri.
            Indiferent unde ești în Europa — la noi e mai aproape decât crezi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 items-center text-sm text-cream-100/85">
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1.5">⭐ Booking.com 9.4</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1.5">⭐ 5.0 · 99 Google</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1.5">🏛 4 stele · Cert. 35332</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-walnut-500/90 border border-walnut-500 text-cream-50 px-3 py-1.5 font-semibold">✈ Cel mai apropiat: Bacău 75 km</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#aeroporturi" className="btn-primary text-base">
              Vezi toate aeroporturile
            </Link>
            <Link href="/rezervare" className="btn-outline-light text-base">
              Rezervă acum — cel mai mic preț
            </Link>
          </div>
        </div>
      </section>

      {/* ─── QUICK SUMMARY STRIP ─── */}
      <section className="bg-stone-50 border-b border-stone-100 py-10">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-display text-4xl text-walnut-500">{airports.length}</div>
            <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">aeroporturi</div>
          </div>
          <div>
            <div className="font-display text-4xl text-walnut-500">75 km</div>
            <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">cel mai apropiat</div>
          </div>
          <div>
            <div className="font-display text-4xl text-walnut-500">{cityBreakOrigins.length}</div>
            <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">orașe de plecare</div>
          </div>
          <div>
            <div className="font-display text-4xl text-walnut-500">€60+</div>
            <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">city break / noapte</div>
          </div>
        </div>
      </section>

      {/* ─── CLOSEST AIRPORTS ─── */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-4">Cele mai apropiate aeroporturi</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Trei aeroporturi, până la 2 ore distanță.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg md:text-xl text-stone-500 leading-relaxed">
              Vila Vaias Aparts e poziționată strategic în mijlocul triunghiului Bacău — Suceava — Iași.
              Indiferent unde aterizezi, ești la noi într-o singură călătorie.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {closestAirports.map((a) => (
              <Link
                key={a.slug}
                href={`#airport-${a.slug}`}
                className="group rounded-3xl bg-forest-900 text-cream-50 p-7 hover:bg-forest-800 transition shadow-card-hover relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-walnut-500/20 group-hover:bg-walnut-500/30 transition" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.28em] text-walnut-300 font-semibold mb-3">
                    ★ Featured
                  </div>
                  <div className="flex items-baseline gap-3">
                    <div className="font-display text-3xl">{a.iata}</div>
                    <div className="text-sm text-cream-200/70">{a.city}</div>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mt-3 text-cream-50 leading-tight">
                    {a.shortName}
                  </h3>
                  <p className="mt-3 font-serif text-base text-cream-100/85 leading-relaxed line-clamp-3">
                    {a.summary}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-sm">
                    <div className="rounded-full bg-walnut-500 px-3 py-1.5 font-semibold">
                      {a.distanceKm} km
                    </div>
                    <div className="text-cream-100/80">{a.driveTime} cu mașina</div>
                  </div>
                  <div className="mt-5 text-xs text-cream-100/65">
                    {a.carriers.slice(0, 3).join(" · ")}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* sticky accommodation banner */}
          <div className="mt-12 rounded-2xl bg-walnut-50 border border-walnut-200 p-6 md:p-7 flex flex-col md:flex-row items-center gap-5">
            <div className="text-4xl">🏨</div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-[0.28em] text-walnut-600 font-semibold">
                Cazare 4★ · 5.0 stele Google
              </div>
              <div className="font-display text-xl md:text-2xl text-forest-900 mt-1">
                Vila Vaias Aparts — de la 297 lei / noapte
              </div>
              <div className="text-sm text-stone-600 mt-1">
                7 apartamente boutique, pat Emperor 2×2m, parcare gratuită, ultracentral. Reducere 25% la 7+ nopți.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/apartments" className="btn-secondary text-xs">
                Vezi apartamente
              </Link>
              <Link href="/rezervare" className="btn-primary text-xs">
                Rezervă direct
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE MAP + AIRPORT EXPLORER ─── */}
      <section id="aeroporturi" className="section bg-stone-50 border-y border-stone-100">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-4">Hartă interactivă</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Toate aeroporturile, o singură hartă.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg md:text-xl text-stone-500 leading-relaxed">
              {romanianAirports.length} aeroporturi din România + {internationalAirports.length} aeroporturi internaționale din țările vecine.
              Click pe pin pentru detalii. Caută după companie aeriană, oraș sau cod IATA.
            </p>
          </div>

          <AirportExplorer />
        </div>
      </section>

      {/* ─── CITY BREAK PACKAGES BY ORIGIN ─── */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-4">City breaks pentru diaspora</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              Zbori din Londra? Dublin? Milano? Avem un pachet pentru tine.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
              Pachete city break 3–7 nopți la Vila Vaias Aparts, corelate cu zborurile low-cost și legacy din 13 orașe europene.
              Rezervând direct cu noi, economisești 5% față de Booking.com.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cityBreakOrigins.map((o) => (
              <div
                key={o.city}
                className="rounded-2xl bg-cream-50/5 border border-cream-50/15 p-6 hover:bg-cream-50/10 transition flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-3xl">{o.flag}</div>
                    <div className="font-display text-xl text-cream-50 mt-2">
                      {o.city}
                    </div>
                    <div className="text-xs text-cream-200/65 uppercase tracking-[0.2em]">
                      {o.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-cream-200/65">aterizezi</div>
                    <Link
                      href={`#airport-${o.airport.slug}`}
                      className="font-display text-lg text-walnut-300 hover:text-walnut-200 transition"
                    >
                      {o.airport.iata}
                    </Link>
                    <div className="text-xs text-cream-200/65">
                      {o.airport.name}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-cream-100/80 leading-relaxed flex-1">
                  {o.pitch}
                </p>
                <div className="mt-5 pt-4 border-t border-cream-50/10 flex items-center justify-between text-sm">
                  <div>
                    <div className="text-xs text-cream-200/65 uppercase tracking-[0.18em]">
                      {o.nights}
                    </div>
                    <div className="font-display text-lg text-walnut-300">
                      de la €{o.fromPriceEUR}/noapte
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/40752388388?text=${encodeURIComponent(o.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-walnut-500 text-cream-50 text-xs uppercase tracking-[0.18em] font-semibold px-4 py-2.5 hover:bg-walnut-600 transition"
                  >
                    Cere ofertă
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/rezervare" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900 text-base px-8 py-4">
              Rezervă acum — cel mai mic preț garantat
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DRIVING DISTANCE TABLE ─── */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-4">Tabel rapid de distanțe</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Câți kilometri de la fiecare aeroport.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg text-stone-500 leading-relaxed">
              Toate distanțele rutiere până la Vila Vaias Aparts, Str. Sfântul Lazăr Nr. 1, Târgu Neamț. Sortate de la cel mai apropiat la cel mai îndepărtat.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-forest-900 text-cream-50">
                <tr>
                  <th className="px-4 py-4 text-left font-display text-base font-semibold">Aeroport</th>
                  <th className="px-4 py-4 text-left text-xs uppercase tracking-[0.18em]">IATA</th>
                  <th className="px-4 py-4 text-left text-xs uppercase tracking-[0.18em]">Țară / Regiune</th>
                  <th className="px-4 py-4 text-right text-xs uppercase tracking-[0.18em]">Distanță</th>
                  <th className="px-4 py-4 text-right text-xs uppercase tracking-[0.18em]">Timp</th>
                </tr>
              </thead>
              <tbody>
                {[...airports]
                  .sort((a, b) => a.distanceKm - b.distanceKm)
                  .map((a, idx) => (
                    <tr
                      key={a.slug}
                      className={`${idx % 2 === 0 ? "bg-stone-50" : "bg-white"} ${a.closest ? "ring-1 ring-walnut-300" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-forest-900">
                        <Link
                          href={`#airport-${a.slug}`}
                          className="hover:text-walnut-600 transition"
                        >
                          {a.closest && "★ "}
                          {a.shortName}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-walnut-600">
                        {a.iata}
                      </td>
                      <td className="px-4 py-3 text-stone-600">
                        {a.country === "Romania" ? `RO · ${a.region}` : a.country}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-forest-900">
                        {a.distanceKm} km
                      </td>
                      <td className="px-4 py-3 text-right text-stone-600">
                        {a.driveTime}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section bg-stone-50 border-y border-stone-100">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-4">Întrebări frecvente</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Ce vor să știe oaspeții înainte să rezerve.
            </h2>
            <div className="divider-gold my-7" />
          </div>

          <div className="space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-cream-50 border border-stone-200 p-6 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-start justify-between gap-4 list-none">
                  <span className="font-display text-lg md:text-xl text-forest-900 group-open:text-walnut-600 transition">
                    {f.q}
                  </span>
                  <span className="text-walnut-500 text-2xl leading-none shrink-0 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-stone-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <div className="eyebrow-light mb-4">Ești gata?</div>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Rezervă acum — și ne vedem la aeroport.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
            7 apartamente boutique. Pat Emperor 2×2m. Ultracentral în Târgu Neamț, la poalele Cetății Neamțului.
            Reduceri până la 25% — rezervând direct economisești și cele 5% comision OTA.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/rezervare" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900 text-lg px-8 py-4">
              Rezervă apartament
            </Link>
            <Link href="/apartments" className="btn-outline-light text-lg px-8 py-4">
              Alege apartamentul
            </Link>
            <a
              href="https://wa.me/40752388388"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light text-lg px-8 py-4"
            >
              💬 WhatsApp ofertă
            </a>
          </div>
          <div className="mt-8 text-sm text-cream-100/70">
            📞 +40 752 388 388 · +40 738 345 330 · 📧 contact@vaiasaparts.ro
          </div>
        </div>
      </section>

      {/* ─── JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripActionJsonLd) }}
      />
    </>
  );
}
