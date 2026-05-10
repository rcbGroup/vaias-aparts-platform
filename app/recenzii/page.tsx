import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import StarRating from "@/components/StarRating";
import { platformBadges, guestHighlights } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Recenzii | Vila Vaias Aparts Târgu Neamț — Google 5.0 · Booking.com 9.4",
  description:
    "Vila Vaias Aparts — 99 recenzii Google cu 5.0 stele și scor 9.4 pe Booking.com. Citește ce spun oaspeții sau lasă propria ta recenzie."
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Recenzii"
        title="Ce spun oaspeții noștri."
        subtitle="99 recenzii Google cu 5.0 stele. Scor 9.4 pe Booking.com. Iată de ce ne aleg din nou și din nou."
        image="https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg"
      />

      {/* VERIFIED PLATFORM BADGES */}
      <section className="bg-stone-50 py-14 border-b border-stone-100">
        <div className="container-x grid gap-6 md:grid-cols-2 max-w-2xl mx-auto text-center">
          {platformBadges.map((b) => (
            <a
              key={b.platform}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-stone-200 bg-cream-50 p-8 hover:shadow-card transition block"
            >
              <div className="font-display text-5xl text-walnut-500 mb-2">{b.score}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mb-1">{b.platform}</div>
              <div className="text-sm text-stone-600">{b.label}</div>
              <StarRating value={b.platform === "Google" ? 5.0 : 4.7} size="lg" />
            </a>
          ))}
        </div>
      </section>

      {/* GUEST HIGHLIGHTS — benefit cards, not invented reviews */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Ce apreciază oaspeții noștri</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-balance">
              Experiența Vila Vaias Aparts — prin ochii oaspeților.
            </h2>
            <p className="mt-4 text-stone-500">
              Aceste teme apar constant în recenziile verificate de pe Google și Booking.com.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guestHighlights.map((h, i) => (
              <div
                key={h.theme}
                className="rounded-2xl bg-stone-50 border border-stone-100 p-7 shadow-soft"
              >
                <div className="text-3xl mb-4" aria-hidden>{h.icon}</div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{h.titleRO}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{h.descriptionRO}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM LINKS — to real property pages */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Pe platforme externe</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-balance">
              Citește recenzii sau lasă propria ta recenzie.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Google Reviews",
                detail: "99 recenzii · 5.0 ★",
                url: "https://share.google/iFsW4iUjwIDgkgwZm",
                score: 5.0
              },
              {
                name: "Booking.com",
                detail: "Scor 9.4 / 10",
                url: "https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html",
                score: 4.7
              },
              {
                name: "TripAdvisor",
                detail: "Profil verificat",
                url: "https://www.tripadvisor.com/Profile/VaiasAparts",
                score: 5.0
              },
              {
                name: "Travelminit",
                detail: "Cazare verificată",
                url: "https://travelminit.ro/apartamentele-vaias-targu-neamt",
                score: 5.0
              }
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-cream-50 border border-stone-200 p-7 text-center hover:shadow-card transition block"
              >
                <div className="font-display text-xl text-forest-900 mb-2">{p.name}</div>
                <StarRating value={p.score} />
                <div className="text-sm text-stone-500 mt-3">{p.detail}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WRITE A REVIEW CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <div className="eyebrow-light mb-4">Ajută alți călători</div>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Ai stat la Vaias Aparts? Lasă o recenzie.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
            Recenziile autentice ajută alți oaspeți să ia decizia corectă și ne motivează să
            îmbunătățim în continuare fiecare detaliu.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://share.google/iFsW4iUjwIDgkgwZm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
            >
              Recenzie Google
            </a>
            <a
              href="https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              Recenzie Booking.com
            </a>
            <Link href="/apartments" className="btn-outline-light">
              Alege apartamentul
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
