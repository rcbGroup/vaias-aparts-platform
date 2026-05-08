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
  return {
    title: `${a.name} — ${a.tagline}`,
    description: a.shortDescription,
    openGraph: {
      title: `${a.name} | Vaias Aparts`,
      description: a.shortDescription,
      images: [a.heroImage]
    }
  };
}

export default function ApartmentPage({ params }: { params: { slug: string } }) {
  const apartment = getApartmentBySlug(params.slug);
  if (!apartment) notFound();

  const related = getRelatedApartments(apartment.slug, 3);
  const apartmentReviews = reviews.filter((r) => r.apartment === apartment.name).slice(0, 3);

  return (
    <>
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
                €{apartment.pricePerNightEUR}
                <span className="text-base text-stone-500 font-sans">/noapte</span>
              </div>
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
            <p className="mt-6 font-serif text-lg text-forest-800/90 leading-relaxed">
              {apartment.description}
            </p>
          </div>

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
                src="https://www.openstreetmap.org/export/embed.html?bbox=26.30%2C47.16%2C26.42%2C47.24&amp;layer=mapnik&amp;marker=47.20%2C26.36"
                className="w-full h-full border-0"
                loading="lazy"
                title="Hartă Vaias Aparts"
              />
            </div>
            <div className="mt-4 text-sm text-stone-500">
              Strada Boureni nr. 12, Târgu Neamț, jud. Neamț, România · 5 min de Cetatea Neamț
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
              <span className="font-display text-4xl text-walnut-600">€{apartment.pricePerNightEUR}</span>
              <span className="text-stone-500">/noapte</span>
            </div>
            <div className="text-sm text-stone-500 mb-6">{apartment.pricePerNightRON} RON · weekend €{apartment.weekendPriceEUR}</div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 mb-5">
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mb-3">Tarif</div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-forest-800">Pe noapte</span><span className="font-medium">€{apartment.pricePerNightEUR}</span></li>
                <li className="flex justify-between"><span className="text-forest-800">Weekend (vineri-sâmbătă)</span><span className="font-medium">€{apartment.weekendPriceEUR}</span></li>
                <li className="flex justify-between"><span className="text-forest-800">Reducere săptămânală</span><span className="font-medium">−{apartment.weeklyDiscountPct}%</span></li>
              </ul>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 mb-6">
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mb-3">Disponibilitate</div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 28 }).map((_, i) => {
                  const occupied = [3, 4, 11, 17, 18, 19, 25].includes(i);
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded grid place-items-center text-[10px] ${
                        occupied
                          ? "bg-stone-200 text-stone-400 line-through"
                          : "bg-forest-100 text-forest-800"
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-3 text-center">
                Calendar orientativ — confirmă disponibilitatea
              </div>
            </div>

            <Link href={`/rezervare?apartament=${apartment.slug}`} className="btn-primary w-full">
              Rezervă acest apartament
            </Link>
            <a
              href={`https://wa.me/40740000000?text=${encodeURIComponent(`Bună ziua! Sunt interesat(ă) de ${apartment.name}.`)}`}
              className="btn-secondary w-full mt-3"
            >
              WhatsApp
            </a>
            <div className="mt-5 text-center text-xs text-stone-500">
              Check-in 15:00 · Check-out 11:00<br />
              Booking direct = 5% reducere
            </div>
          </div>
        </aside>
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
    </>
  );
}
