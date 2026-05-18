import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  apartments,
  getApartmentBySlug,
  getRelatedApartments
} from "@/lib/apartments";
import { reviews } from "@/lib/reviews";
import Gallery from "@/components/Gallery";
import StarRating from "@/components/StarRating";
import ApartmentCard from "@/components/ApartmentCard";
import { AmenityIcon } from "@/components/AmenityIcon";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const a = getApartmentBySlug(params.slug);
  if (!a) return {};
  const title = `${a.name} Târgu Neamț — ${a.guests} oaspeți, ${a.bedrooms || 0} dormitor${(a.bedrooms || 0) === 1 ? "" : "e"} | Vila Vaias Aparts`;
  const description = `${a.shortDescription} De la ${a.pricePerNightRON} RON/noapte. Booking 9.4, 99 recenzii Google 5.0. Rezervare directă WhatsApp +40 752 388 388.`;
  return {
    title,
    description,
    keywords: [
      `cazare ${a.name} Târgu Neamț`,
      `apartament ${a.bedrooms || 1} dormitor Târgu Neamț`,
      `${a.name} Vaias Aparts`,
      "cazare Târgu Neamț",
      "apartamente Neamț",
      a.accessible ? "cazare accesibilă Neamț" : "apartament boutique Neamț",
      a.hasAC ? "apartament cu aer condiționat Târgu Neamț" : "apartament Târgu Neamț"
    ],
    alternates: {
      canonical: `https://www.vaiasaparts.ro/apartments/${params.slug}`
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      url: `https://www.vaiasaparts.ro/apartments/${params.slug}`,
      siteName: "Vila Vaias Aparts",
      title,
      description,
      images: [{ url: a.heroImage, width: 1200, height: 630, alt: a.name }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [a.heroImage]
    }
  };
}

export default function ApartmentPage({ params }: { params: { slug: string } }) {
  const apartment = getApartmentBySlug(params.slug);
  if (!apartment) notFound();

  const related = getRelatedApartments(apartment.slug, 3);
  const apartmentReviews = reviews.filter((r) => r.apartment === apartment.name).slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Bună ziua! Doresc să rezerv ${apartment.name} la Vila Vaias Aparts. Datele mele: Check-in: [DATA], Check-out: [DATA], [NR] adulți, [NR] copii. Vă rog să confirmați disponibilitatea și prețul.`
  );
  const whatsappUrl = `https://wa.me/40752388388?text=${whatsappMsg}`;

  const faqs = [
    {
      q: `Cât costă o noapte la ${apartment.name}?`,
      a: `Tariful de bază este ${apartment.pricePerNightRON} RON/noapte, iar weekendul (vineri-sâmbătă) ${apartment.weekendPriceRON} RON. Pentru 2-3 nopți aplicăm 10% reducere, pentru 4-6 nopți 15%, pentru 7+ nopți 25%. Cele mai bune tarife le obțineți direct pe WhatsApp.`
    },
    {
      q: `Câte persoane încap în ${apartment.name}?`,
      a: `Acesta este un APARTAMENT COMPLET PRIVAT de ${apartment.sizeSqm} mp — nu o cameră de hotel. ${apartment.name} are capacitate optimă pentru ${apartment.guests} oaspeți, maxim ${apartment.guestsMax} persoane folosind canapeaua extensibilă (+${apartment.extraPersonRON} RON/noapte persoana suplimentară). ${apartment.bedrooms} dormitor${apartment.bedrooms === 1 ? "" : "e"} cu pat dublu, living separat, ${apartment.hasPrivateKitchen ? "bucătărie proprie complet utilată" : "frigider + microunde în apartament + bucătărie mare alături"} și ${apartment.bathrooms} baie privată.`
    },
    {
      q: `Apartamentul are aer condiționat?`,
      a: apartment.hasAC
        ? `Da, ${apartment.name} are aer condiționat propriu — perfect pentru serile calde de vară.`
        : `Nu, ${apartment.name} nu are aer condiționat. Pentru aer condiționat, recomandăm Apartament 5 sau Apartament 6 (singurele cu AC). În rest, vila este răcoroasă natural prin pereții groși.`
    },
    {
      q: `Are bucătărie privată?`,
      a: apartment.hasPrivateKitchen
        ? `Da, ${apartment.name} are bucătărie proprie complet utilată — frigider mare, cuptor cu microunde, fierbător electric, prăjitor de pâine, veselă și tacâmuri pentru toți oaspeții.`
        : `${apartment.name} nu are bucătărie privată, dar are frigider propriu și acces la Bucătăria pentru Toți — bucătăria comună a vilei la parter, complet utilată.`
    },
    {
      q: `Acceptați animale de companie?`,
      a: `Da, animalele de companie sunt bine venite la cerere prealabilă, fără cost suplimentar. Vă rugăm să ne spuneți la rezervare ce animal aduceți, pentru a vă pregăti apartamentul.`
    },
    {
      q: `Cum se face check-in-ul?`,
      a: `Check-in-ul este după ora 14:00, check-out până la 11:00. Self check-in cu ghidaj de la echipa noastră — vă întâmpinăm sau vă transmitem instrucțiunile cum vă este mai comod.`
    }
  ];

  // Accommodation / Product JSON-LD with offers
  const accommodationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "@id": `https://www.vaiasaparts.ro/apartments/${apartment.slug}#accommodation`,
    name: `${apartment.name} — Vila Vaias Aparts`,
    description: apartment.description,
    image: apartment.gallery.slice(0, 6),
    url: `https://www.vaiasaparts.ro/apartments/${apartment.slug}`,
    occupancy: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: apartment.guestsMax,
      value: apartment.guests
    },
    numberOfBedrooms: apartment.bedrooms || 0,
    numberOfBathroomsTotal: apartment.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: apartment.sizeSqm,
      unitCode: "MTK"
    },
    amenityFeature: apartment.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true
    })),
    petsAllowed: true,
    smokingAllowed: false,
    starRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: apartment.rating.toFixed(1),
      reviewCount: apartment.reviewsCount,
      bestRating: "5",
      worstRating: "1"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Sfântul Lazăr Nr. 1",
      addressLocality: "Târgu Neamț",
      addressRegion: "Neamț",
      postalCode: "615200",
      addressCountry: "RO"
    },
    geo: { "@type": "GeoCoordinates", latitude: 47.2014, longitude: 26.3656 }
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.vaiasaparts.ro/apartments/${apartment.slug}#product`,
    name: `${apartment.name} la Vila Vaias Aparts — cazare boutique Târgu Neamț`,
    description: apartment.description,
    image: apartment.gallery.slice(0, 6),
    brand: { "@type": "Brand", name: "Vila Vaias Aparts" },
    sku: apartment.slug,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: apartment.rating.toFixed(1),
      reviewCount: apartment.reviewsCount
    },
    offers: {
      "@type": "Offer",
      url: `https://www.vaiasaparts.ro/apartments/${apartment.slug}`,
      priceCurrency: "RON",
      price: apartment.pricePerNightRON,
      availability: "https://schema.org/InStock",
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Acasă", href: "/" },
          { label: "Apartamente", href: "/apartments" },
          { label: apartment.name }
        ]}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-cream-50">
        <div className="container-x">
          <Link href="/apartments" className="text-sm text-walnut-600 hover:text-walnut-700 inline-flex items-center gap-1 mb-6">
            ← Toate apartamentele
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="eyebrow mb-3">{apartment.view}</div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-forest-900 leading-[1.05] text-balance">
                {apartment.name}
              </h1>
              <p className="mt-5 font-serif text-xl md:text-2xl text-forest-700/80 italic">
                {apartment.tagline}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <StarRating value={apartment.rating} size="lg" />
              <div className="text-sm text-stone-500">
                {apartment.rating} din 5 · {apartment.reviewsCount} recenzii
              </div>
              <div className="text-3xl font-display text-walnut-600 mt-2">
                de la {apartment.pricePerNightRON} RON
                <span className="text-base text-stone-500 font-sans">/noapte</span>
              </div>
              <div className="text-xs text-stone-400">* Prețul pentru o noapte. Tarife mai bune disponibile pentru 2+ nopți.</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-x mb-16">
        <Gallery images={apartment.gallery} alt={apartment.name} />
      </section>

      {/* DETAILS */}
      <section className="container-x grid gap-14 lg:grid-cols-12 mb-20">
        <div className="lg:col-span-8 space-y-14">
          {/* QUICK FACTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-stone-200">
            {[
              { label: "Oaspeți", value: apartment.guests },
              { label: "Dormitoare", value: apartment.bedrooms || "Studio" },
              { label: "Paturi", value: apartment.beds },
              { label: "Băi", value: apartment.bathrooms }
            ].map((f) => (
              <div key={f.label}>
                <div className="font-display text-3xl text-forest-900">{f.value}</div>
                <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">
                  {f.label}
                </div>
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div>
            <div className="eyebrow mb-3">Descriere</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900">
              Despre acest apartament
            </h2>

            {/* "Complete apartment" banner */}
            <div className="mt-6 rounded-2xl border-2 border-walnut-500 bg-walnut-50 p-5">
              <div className="font-display text-xl text-walnut-700 mb-1">
                🔑 Apartament COMPLET PRIVAT — nu o cameră de hotel
              </div>
              <p className="text-sm text-forest-800/90 leading-relaxed">
                Primești ușa ta, cheia ta și {apartment.sizeSqm} mp doar pentru tine:
                {" "}{apartment.bedrooms} dormitor{apartment.bedrooms === 1 ? "" : "e"} + living + {apartment.hasPrivateKitchen ? "bucătărie proprie" : "bucătărie alături"} + baie privată.
                Fără holuri comune, fără vecini de cameră, fără recepție.
              </p>
            </div>

            <p className="mt-6 font-serif text-lg text-forest-800/90 leading-relaxed">
              {apartment.description}
            </p>
          </div>

          {/* BUCĂTĂRIA PENTRU TOȚI — Apt 7 only */}
          {!apartment.hasPrivateKitchen && (
            <div className="rounded-xl bg-walnut-50 border border-walnut-200 p-4 mt-4">
              <h4 className="font-display text-lg text-forest-900 mb-1">🍳 Bucătăria pentru Toți</h4>
              <p className="text-sm text-stone-600">
                Apartamentul 7 nu are bucătărie privată, dar are acces direct la <strong>Bucătăria pentru Toți</strong> —
                bucătăria comună a vilei, situată la parter, complet utilată cu aragaz, cuptor, frigider mare,
                ustensile și tot ce aveți nevoie pentru a pregăti masa.
              </p>
            </div>
          )}

          {/* ROOMS */}
          <div>
            <div className="eyebrow mb-3">Spațiile</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-8">
              Camere și zone
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {apartment.rooms.map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl border border-stone-200 bg-cream-50 p-5"
                >
                  <div className="font-display text-lg text-forest-900">{r.name}</div>
                  <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AMENITIES */}
          <div>
            <div className="eyebrow mb-3">Dotări</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-8">
              Tot ce ai nevoie, totul gândit dinainte.
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {apartment.amenities.map((am) => (
                <div key={am} className="flex items-center gap-3 text-forest-800">
                  <span className="text-walnut-500"><AmenityIcon name={am} /></span>
                  <span className="text-sm">{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HOUSE RULES */}
          <div>
            <div className="eyebrow mb-3">Reguli de casă</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-8">
              Ce e bine să știi
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {apartment.rules.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-forest-800"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-walnut-500 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* LOCATION */}
          <div>
            <div className="eyebrow mb-3">Locația</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-6">
              Pe valea Ozanei
            </h2>
            <div className="rounded-2xl overflow-hidden bg-stone-100 aspect-[16/9] relative shadow-soft">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=26.3543%2C47.2047%2C26.3646%2C47.2107&amp;layer=mapnik&amp;marker=47.2076828%2C26.3594528"
                className="w-full h-full border-0"
                loading="lazy"
                title="Hartă Vaias Aparts"
              />
            </div>
            <div className="mt-4 text-sm text-stone-500">
              Str. Sfântul Lazăr nr. 1, Târgu Neamț, jud. Neamț, România · 5 min de Cetatea Neamț
            </div>
          </div>

          {/* APARTMENT REVIEWS */}
          {apartmentReviews.length > 0 && (
            <div>
              <div className="eyebrow mb-3">Recenzii</div>
              <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-8">
                Ce spun oaspeții despre {apartment.name}
              </h2>
              <div className="space-y-5">
                {apartmentReviews.map((r, i) => (
                  <div key={i} className="rounded-xl bg-cream-50 border border-stone-200 p-6">
                    <StarRating value={r.rating} />
                    <p className="mt-3 font-serif text-lg text-forest-800 italic">„{r.text}"</p>
                    <div className="mt-4 text-sm text-stone-500">
                      <span className="font-medium text-forest-900">{r.name}</span> · {r.city} · {r.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOOKING SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 rounded-2xl border border-stone-200 bg-cream-50 p-7 shadow-card">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-4xl text-walnut-600">de la {apartment.pricePerNightRON} RON</span>
              <span className="text-stone-500">/noapte</span>
            </div>
            <div className="text-xs text-stone-400 mb-4">* Prețul pentru o noapte. Tarife mai bune disponibile pentru 2+ nopți.</div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 mb-5">
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mb-3">Tarif</div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-forest-800">Pe noapte</span><span className="font-medium">{apartment.pricePerNightRON} RON</span></li>
                <li className="flex justify-between"><span className="text-forest-800">Weekend (vineri-sâmbătă)</span><span className="font-medium">{apartment.weekendPriceRON} RON</span></li>
                <li className="flex justify-between"><span className="text-forest-800">Persoană suplimentară (canapea)</span><span className="font-medium">+{apartment.extraPersonRON} RON/noapte</span></li>
                <li className="flex justify-between"><span className="text-forest-800">Reducere săptămânală</span><span className="font-medium">−{apartment.weeklyDiscountPct}%</span></li>
              </ul>
            </div>

            <div className="rounded-xl border border-forest-200 bg-forest-50/50 p-4 mb-6">
              <div className="text-xs uppercase tracking-[0.28em] text-forest-700 mb-2">Disponibilitate în timp real</div>
              <p className="text-sm text-forest-800 mb-3">
                Verifică datele disponibile direct pe sistemul nostru de rezervări — actualizat în timp real.
              </p>
              <a
                href="https://www.5stardesk.net/b/vaias-aparts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm w-full text-center block"
              >
                Verifică disponibilitate live
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center"
            >
              💬 Rezervă pe WhatsApp
            </a>

            {/* 5StarDesk availability */}
            <a
              href="https://www.5stardesk.net/b/vaias-aparts"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center mt-3"
            >
              Verifică disponibilitate live
            </a>

            {/* Phone CTAs */}
            <div className="mt-4 flex flex-col gap-2">
              <a href="tel:+40752388388" className="flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-walnut-600">
                📞 +40 752 388 388
              </a>
              <a href="tel:+40738345330" className="flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-walnut-600">
                📞 +40 738 345 330
              </a>
            </div>

            {/* Trust note */}
            <p className="text-xs text-stone-500 mt-2">🔒 CCTV 24/7 în zonele comune · Parcare gratuită · Animale acceptate la cerere</p>

            {/* Direct booking proposition */}
            <div className="rounded-xl bg-forest-50 border border-forest-200 p-4 mt-4">
              <p className="text-sm text-forest-800">
                <strong>💡 Rezervare directă:</strong> Rezervând direct pe WhatsApp, eviți comisionul platformelor (15–25%)
                și beneficiezi de cel mai bun preț disponibil.
              </p>
            </div>

            {/* Cancellation/payment summary */}
            <div className="mt-4 rounded-xl bg-stone-50 border border-stone-200 p-4 text-sm text-stone-600 space-y-1">
              <p>✓ <strong>Avans 30%</strong> la confirmare</p>
              <p>✓ <strong>Rest la check-in</strong></p>
              <p>✓ <strong>Check-in de la 14:00</strong> · Check-out până la 11:00</p>
              <p>✓ <strong>Animale acceptate</strong> la cerere, fără cost suplimentar</p>
              <p>✓ <strong>Factură fiscală</strong> disponibilă la cerere</p>
            </div>
          </div>
        </aside>
      </section>

      {/* FAQ */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">Întrebări frecvente</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10">
            Ce întreabă oaspeții despre {apartment.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
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

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section bg-stone-50">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <div className="eyebrow mb-3">Și mai aproape de poveste</div>
                <h2 className="font-display text-4xl text-forest-900">Alte apartamente</h2>
              </div>
              <Link href="/apartments" className="hidden md:inline-flex btn-secondary">
                Vezi toate
              </Link>
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ApartmentCard key={a.slug} apartment={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(accommodationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
