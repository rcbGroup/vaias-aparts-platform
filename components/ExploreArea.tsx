"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import ScrollFade from "@/components/ScrollFade";
import { useLang } from "@/components/LanguageProvider";
import { whatsappLink } from "@/lib/site";
import {
  exploreCrossLinks,
  exploreCta,
  exploreHero,
  exploreIntro,
  exploreItineraries,
  explorePractical,
  exploreSections,
  exploreSource,
  exploreUi,
  type ExploreLang,
  type L
} from "@/lib/explore-area";

/** Bilingual page body: Romanian for RO, English for every other site language. */
export default function ExploreArea() {
  const { lang } = useLang();
  const l: ExploreLang = lang === "ro" ? "ro" : "en";
  const tx = (s: L) => s[l];

  const waText =
    l === "ro"
      ? "Bună! Am văzut pagina Descoperă zona și aș vrea câteva recomandări pentru sejurul nostru."
      : "Hi! I saw the Explore the area page and would like a few recommendations for our stay.";

  return (
    <>
      <PageHero
        eyebrow={tx(exploreHero.eyebrow)}
        title={tx(exploreHero.title)}
        subtitle={tx(exploreHero.subtitle)}
        image={exploreHero.image}
      />

      {/* INTRO */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <SectionHeader eyebrow={tx(exploreIntro.eyebrow)} title={tx(exploreIntro.title)} />
          <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
            {exploreIntro.body.map((p, i) => (
              <p key={i}>{tx(p)}</p>
            ))}
          </div>

          {/* Section jump strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {exploreSections.map((s) => (
              <a
                key={s.key}
                href={`#${s.key}`}
                className="rounded-2xl border border-stone-100 bg-white px-4 py-5 text-center card-lift"
              >
                <div className="text-2xl" aria-hidden>
                  {s.icon}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-walnut-500 font-semibold">
                  {tx(s.eyebrow)}
                </div>
                <div className="mt-1 text-xs text-stone-500">
                  {s.places.length} {l === "ro" ? "locuri" : "places"}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {exploreSections.map((s, idx) => (
        <section
          key={s.key}
          id={s.key}
          className={`section scroll-mt-28 ${idx % 2 === 0 ? "bg-stone-50" : "bg-cream-50"}`}
        >
          <div className="container-x">
            <SectionHeader eyebrow={`${s.icon} ${tx(s.eyebrow)}`} title={tx(s.title)} subtitle={tx(s.intro)} />

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {s.places.map((p, i) => {
                const body = (
                  <>
                    {p.featured && (
                      <div className="eyebrow text-[10px] mb-3">{tx(exploreUi.ourPick)}</div>
                    )}
                    <h3 className="font-display text-xl md:text-2xl text-forest-900 text-balance">
                      {tx(p.name)}
                    </h3>
                    <p className="mt-3 text-sm text-stone-600 leading-relaxed flex-1">{tx(p.note)}</p>
                    {(p.distance || p.drivingTime) && (
                      <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-500">
                        {p.distance && (
                          <span className="rounded-full bg-stone-100 px-3 py-1">
                            {p.distance} {tx(exploreUi.from)}
                          </span>
                        )}
                        {p.drivingTime && (
                          <span className="rounded-full bg-stone-100 px-3 py-1">
                            {p.drivingTime} {tx(exploreUi.withCar)}
                          </span>
                        )}
                      </div>
                    )}
                    {p.href && (
                      <div className="mt-5 text-xs uppercase tracking-[0.2em] text-walnut-600 font-semibold">
                        {l === "ro" ? "Vezi pagina →" : "View page →"}
                      </div>
                    )}
                  </>
                );
                const cls = `card-lift h-full rounded-2xl border p-6 md:p-7 flex flex-col ${
                  p.featured
                    ? "bg-forest-900 text-cream-50 border-forest-800 [&_h3]:text-cream-50 [&_p]:text-cream-100/85 [&_span]:bg-forest-800 [&_span]:text-cream-100"
                    : "bg-white border-stone-100"
                }`;
                return (
                  <ScrollFade key={`${s.key}-${i}`} delay={i * 70} className="h-full">
                    {p.href ? (
                      <Link href={p.href} className={cls}>
                        {body}
                      </Link>
                    ) : (
                      <article className={cls}>{body}</article>
                    )}
                  </ScrollFade>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ITINERARIES */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-4">{tx(exploreItineraries.eyebrow)}</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              {tx(exploreItineraries.title)}
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg text-cream-100/80">
              {tx(exploreItineraries.subtitle)}{" "}
              <Link href="/zone-turistice" className="underline underline-offset-4 hover:text-cream-50">
                {l === "ro" ? "Zone turistice" : "Attractions"}
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {exploreItineraries.items.map((day) => (
              <div key={day.title.ro} className="rounded-2xl bg-forest-800/40 border border-cream-200/15 p-7">
                <div className="eyebrow-light text-[10px] mb-2">{tx(day.duration)}</div>
                <h3 className="font-display text-xl text-cream-50 mb-5">{tx(day.title)}</h3>
                <ul className="space-y-3 text-cream-100/85">
                  {day.steps.map((st, i) => (
                    <li key={st.ro} className="flex items-start gap-3">
                      <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-walnut-500 text-[10px] font-medium text-cream-50 shrink-0">
                        {i + 1}
                      </span>
                      <span>{tx(st)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICAL */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader eyebrow={tx(explorePractical.eyebrow)} title={tx(explorePractical.title)} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {explorePractical.items.map((it) => {
              const inner = (
                <>
                  <div className="text-xs uppercase tracking-[0.22em] text-walnut-500 font-semibold">
                    {tx(it.label)}
                  </div>
                  <div className="mt-2 text-forest-900 leading-relaxed">{tx(it.value)}</div>
                </>
              );
              const cls = "block rounded-2xl border border-stone-100 bg-white p-6 h-full";
              return it.href ? (
                it.href.startsWith("/") ? (
                  <Link key={it.label.ro} href={it.href} className={`${cls} card-lift`}>
                    {inner}
                  </Link>
                ) : (
                  <a key={it.label.ro} href={it.href} className={`${cls} card-lift`}>
                    {inner}
                  </a>
                )
              ) : (
                <div key={it.label.ro} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-xs text-stone-500 max-w-3xl mx-auto text-center leading-relaxed">
            <span className="font-semibold uppercase tracking-[0.18em]">{tx(exploreUi.sourceLabel)}:</span>{" "}
            {tx(exploreSource)}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {exploreCrossLinks.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-forest-700/30 px-5 py-2 text-xs uppercase tracking-[0.18em] text-forest-800 hover:bg-forest-700 hover:text-cream-50 transition"
              >
                {tx(c.label)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">{tx(exploreCta.title)}</h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">{tx(exploreCta.subtitle)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
            >
              {tx(exploreCta.primary)}
            </a>
            <Link href="/apartments" className="btn-outline-light">
              {tx(exploreCta.secondary)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
