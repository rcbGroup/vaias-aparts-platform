import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import StarRating from "@/components/StarRating";
import { reviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Recenzii — ce spun oaspeții despre Vaias Aparts",
  description:
    "Peste 300 de recenzii pe Google, TripAdvisor și Booking — cu un rating mediu de 4.9. Citește cuvintele oaspeților noștri."
};

export default function ReviewsPage() {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      <PageHero
        eyebrow="Recenzii"
        title="Cuvintele oaspeților noștri."
        subtitle={`Rating mediu ${avg} din 5, peste 300 de recenzii pe platforme externe — povești adevărate, scrise de oameni care au revenit.`}
        image="https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_12.jpg"
      />

      <section className="bg-stone-50 py-14 border-b border-stone-100">
        <div className="container-x grid gap-6 md:grid-cols-4 text-center">
          {[
            { v: avg, l: "Rating mediu" },
            { v: "300+", l: "Recenzii totale" },
            { v: "98%", l: "Recomandări" },
            { v: "32%", l: "Oaspeți care revin" }
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl text-walnut-500">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Toate", "Google", "TripAdvisor", "Booking", "Direct"].map((s) => (
              <button
                key={s}
                className="px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] bg-stone-100 text-forest-800 hover:bg-stone-200 transition"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <article
                key={i}
                className="rounded-2xl bg-stone-50 border border-stone-100 p-7 shadow-soft flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <StarRating value={r.rating} />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-walnut-500">
                    {r.source}
                  </span>
                </div>
                <p className="mt-5 font-serif text-base md:text-lg text-forest-800 leading-relaxed flex-1 italic">
                  „{r.text}"
                </p>
                <div className="mt-6 pt-5 border-t border-stone-200">
                  <div className="font-display text-lg text-forest-900">{r.name}</div>
                  <div className="text-xs text-stone-500 mt-1">
                    {r.city} · {r.date} · {r.apartment}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM LINKS */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Pe platforme externe</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-balance">
              Citește mai multe sau lasă o recenzie.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { name: "Google Reviews", count: "187 recenzii", url: "https://google.com" },
              { name: "TripAdvisor", count: "94 recenzii", url: "https://tripadvisor.com" },
              { name: "Booking.com", count: "73 recenzii", url: "https://booking.com" }
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-cream-50 border border-stone-200 p-7 text-center hover:shadow-card transition"
              >
                <div className="font-display text-2xl text-forest-900 mb-2">{p.name}</div>
                <StarRating value={5} />
                <div className="text-sm text-stone-500 mt-3">{p.count}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INCENTIVE */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <div className="eyebrow-light mb-4">Un mic dar de la noi</div>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Lasă o recenzie, primești 25% reducere la următorul sejur.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            După plecare, trimite-ne link-ul recenziei pe email și îți rezervăm un cod
            valabil un an.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:contact@VaiasAparts.ro" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              Trimite recenzia
            </a>
            <Link href="/apartments" className="btn-outline-light">
              Apartamente
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
