"use client";

import Image from "next/image";
import Link from "next/link";
import { apartments, VILLA_PROPERTY_PHOTOS } from "@/lib/apartments";
import { attractions } from "@/lib/attractions";
import { reviews } from "@/lib/reviews";
import ApartmentCard from "@/components/ApartmentCard";
import SectionHeader from "@/components/SectionHeader";
import StarRating from "@/components/StarRating";
import ScrollFade from "@/components/ScrollFade";
import { useLang } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t } = useLang();
  const featured = apartments.slice(0, 6);
  const featuredAttractions = attractions.slice(0, 6);
  const homeReviews = reviews.slice(0, 3);

  const whyItems = [
    { icon: "📍", k: "1" },
    { icon: "🔑", k: "2" },
    { icon: "✨", k: "3" },
    { icon: "💶", k: "4" }
  ];

  const foodItems = ["1", "2", "3", "4"];
  const foodImages = [
    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80"
  ];

  const transportItems = [
    { icon: "🚗", k: "1" },
    { icon: "🚆", k: "2" },
    { icon: "✈️", k: "3" },
    { icon: "🚌", k: "4" }
  ];

  return (
    <>
      {/* HERO — full viewport, parallax-style background */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-forest-950">
        <Image
          src="https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_16.jpg"
          alt="Vila Vaias Aparts — Târgu Neamț, Moldova, România"
          fill
          priority
          sizes="100vw"
          className="object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-forest-950/40 to-forest-950/85" />
        <div className="absolute inset-0 pattern-moldavian-dark opacity-40 mix-blend-overlay" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-x">
            <div className="max-w-3xl text-cream-50 animate-slide-up">
              <div className="eyebrow-light mb-6">{t("hero.eyebrow")}</div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[92px] leading-[0.98] tracking-tight text-cream-50 text-balance">
                {t("hero.title1")}
                <br className="hidden md:block" /> {t("hero.title2")}
              </h1>
              <p className="mt-7 font-serif text-xl md:text-2xl text-cream-100/95 max-w-2xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <p className="mt-3 italic font-serif text-lg text-cream-100/70">
                {t("hero.subtitleEn")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/apartments" className="btn-primary">
                  {t("hero.cta1")}
                </Link>
                <Link href="/rezervare" className="btn-outline-light">
                  {t("hero.cta2")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-50/70 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.32em]">{t("common.scroll")}</span>
            <span className="block h-10 w-px bg-cream-100/50" />
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="bg-cream-50 py-14 border-b border-stone-100 relative">
        <div className="container-x grid gap-8 md:grid-cols-4 text-center">
          {[
            { v: "7", l: t("stats.apartments") },
            { v: "9.4", l: "Booking.com" },
            { v: "97", l: "Recenzii Google 5★" },
            { v: "5.0", l: t("stats.rating") }
          ].map((s, i) => (
            <ScrollFade key={s.l} delay={i * 80}>
              <div className="font-display text-4xl text-walnut-500 mb-1">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500">{s.l}</div>
            </ScrollFade>
          ))}
        </div>
      </section>

      {/* FEATURED APARTMENTS */}
      <section id="apartamente" className="section bg-stone-50 relative">
        <div className="absolute inset-0 pattern-moldavian opacity-50 pointer-events-none" />
        <div className="container-x relative">
          <ScrollFade>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <SectionHeader
                align="left"
                eyebrow={t("featured.eyebrow")}
                title={t("featured.title")}
                subtitle={t("featured.subtitle")}
              />
              <Link href="/apartments" className="btn-secondary self-start md:self-end shrink-0">
                {t("common.viewAll")}
              </Link>
            </div>
          </ScrollFade>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((a, i) => (
              <ScrollFade key={a.slug} delay={i * 100}>
                <ApartmentCard apartment={a} priority={i < 2} />
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VAIAS APARTS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow={t("why.eyebrow")}
              title={t("why.title")}
              subtitle={t("why.subtitle")}
            />
          </ScrollFade>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((it, i) => (
              <ScrollFade key={it.k} delay={i * 90}>
                <div className="card-lift h-full rounded-2xl bg-stone-50 border border-stone-100 p-7">
                  <div className="text-3xl mb-5" aria-hidden>{it.icon}</div>
                  <h3 className="font-display text-2xl text-forest-900 mb-3">
                    {t(`why.${it.k}.title`)}
                  </h3>
                  <p className="text-forest-700/85 leading-relaxed">
                    {t(`why.${it.k}.text`)}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian opacity-40 pointer-events-none" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-20 items-center">
          <ScrollFade className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
              <Image
                src="https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_12.jpg"
                alt="Vila Vaias Aparts — curte și exterior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 hidden md:block w-56 aspect-square rounded-2xl overflow-hidden shadow-card border-8 border-cream-50">
              <Image
                src="https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Apartament1_VaiasaAparts_01.webp"
                alt="Interior apartament Vaias Aparts"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </ScrollFade>

          <ScrollFade className="lg:col-span-7" delay={120}>
            <div className="eyebrow mb-4">{t("story.eyebrow")}</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              {t("story.title")}
            </h2>
            <div className="mt-7 space-y-5 font-serif text-lg text-forest-800/90 leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p className="italic text-forest-700">{t("story.quote")}</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/despre-noi" className="btn-secondary">
                {t("common.readMore")}
              </Link>
              <Link href="/contact" className="btn-primary">
                {t("common.contactUs")}
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* AREA HIGHLIGHTS */}
      <section className="section bg-forest-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_7.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 pattern-moldavian-dark opacity-40 pointer-events-none" />
        <div className="container-x relative">
          <ScrollFade>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="eyebrow-light mb-4">{t("area.eyebrow")}</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
                {t("area.title")}
              </h2>
              <div className="divider-gold my-7" />
              <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
                {t("area.subtitle")}
              </p>
            </div>
          </ScrollFade>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredAttractions.map((a, i) => (
              <ScrollFade key={a.slug} delay={i * 80}>
                <Link
                  href="/zone-turistice"
                  className="group block h-full rounded-2xl overflow-hidden bg-forest-800/40 border border-cream-200/10 hover:border-cream-200/30 transition-all duration-500 card-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-cream-50/95 px-3 py-1 text-xs text-forest-900 font-medium">
                      {a.distance} · {a.drivingTime}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-[0.28em] text-walnut-300 mb-2">
                      {a.category}
                    </div>
                    <h3 className="font-display text-2xl text-cream-50 mb-2">{a.name}</h3>
                    <p className="text-cream-100/75 text-sm leading-relaxed">
                      {a.shortDescription}
                    </p>
                  </div>
                </Link>
              </ScrollFade>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/zone-turistice" className="btn-outline-light">
              {t("area.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS ECOSYSTEM */}
      <section className="section bg-forest-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
        <div className="container-x relative">
          <ScrollFade>
            <div className="text-center mb-16">
              <div className="eyebrow-light mb-4">Ecosistemul Vaias</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
                Trei experiențe. O singură destinație.
              </h2>
              <div className="divider-gold my-7" />
              <p className="font-serif text-lg text-cream-100/80 max-w-2xl mx-auto">
                Vila, lacul secret și restaurantul — trei lumi care se completează perfect pentru un sejur cu suflet în Moldova.
              </p>
            </div>
          </ScrollFade>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Vila Vaias Aparts",
                subtitle: "7 apartamente boutique",
                desc: "Cea mai bine notată cazare din Târgu Neamț. 97 de recenzii Google la 5.0 stele. Booking.com 9.4. Fiecare apartament — un spațiu al tău.",
                cta: "Alege apartamentul",
                href: "/apartments",
                photo: "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_11.jpg"
              },
              {
                num: "02",
                title: "Lacul Privat Nemțișor",
                subtitle: "Refugiul Secret al Oaspeților Vaias",
                desc: "Un lac privat în sat Nemțișor, la 10 minute. Pescuit, grătar, natură în liniște deplină. Exclusiv pentru oaspeții noștri — la cerere.",
                cta: "Descoperă lacul",
                href: "/experiente",
                photo: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1600&q=80"
              },
              {
                num: "03",
                title: "Han Rustic",
                subtitle: "Gastronomie moldovenească autentică",
                desc: "Sarmale, mămăligă, tocăniță, plăcintă poale-n brâu, vin local. O experiență culinară care definește Moldova. În curând.",
                cta: "Află mai mult",
                href: "/han-rustic",
                photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
              }
            ].map((p, i) => (
              <ScrollFade key={p.num} delay={i * 120}>
                <article className="group relative rounded-2xl overflow-hidden bg-forest-900 border border-cream-200/10 hover:border-cream-200/30 transition-all duration-500 card-lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.photo}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 font-display text-6xl text-cream-50/10">{p.num}</div>
                  </div>
                  <div className="p-7">
                    <div className="text-xs uppercase tracking-[0.28em] text-walnut-300 mb-2">{p.subtitle}</div>
                    <h3 className="font-display text-2xl text-cream-50 mb-3">{p.title}</h3>
                    <p className="text-cream-100/75 text-sm leading-relaxed mb-6">{p.desc}</p>
                    <Link href={p.href} className="btn-outline-light text-sm py-2 px-5">
                      {p.cta} →
                    </Link>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL FOOD */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow={t("food.eyebrow")}
              title={t("food.title")}
              subtitle={t("food.subtitle")}
            />
          </ScrollFade>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {foodItems.map((k, i) => (
              <ScrollFade key={k} delay={i * 80}>
                <article className="card-lift h-full rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={foodImages[i]}
                      alt={t(`food.${k}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-forest-900 mb-2">
                      {t(`food.${k}.title`)}
                    </h3>
                    <p className="text-sm text-forest-700/80 leading-relaxed">
                      {t(`food.${k}.text`)}
                    </p>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPORT / HOW TO GET HERE */}
      <section className="section bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian opacity-40 pointer-events-none" />
        <div className="container-x relative">
          <ScrollFade>
            <SectionHeader
              eyebrow={t("transport.eyebrow")}
              title={t("transport.title")}
              subtitle={t("transport.subtitle")}
            />
          </ScrollFade>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {transportItems.map((it, i) => (
              <ScrollFade key={it.k} delay={i * 80}>
                <div className="card-lift h-full rounded-2xl bg-cream-50 border border-stone-100 p-7">
                  <div className="text-3xl mb-5" aria-hidden>{it.icon}</div>
                  <h3 className="font-display text-2xl text-forest-900 mb-3">
                    {t(`transport.${it.k}.title`)}
                  </h3>
                  <p className="text-forest-700/85 leading-relaxed text-sm">
                    {t(`transport.${it.k}.text`)}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow={t("reviews.eyebrow")}
              title={t("reviews.title")}
              subtitle={t("reviews.subtitle")}
            />
          </ScrollFade>

          <div className="mt-16 grid gap-7 md:grid-cols-3">
            {homeReviews.map((r, i) => (
              <ScrollFade key={i} delay={i * 100}>
                <article className="card-lift h-full rounded-2xl bg-stone-50 border border-stone-100 p-8 shadow-soft flex flex-col">
                  <StarRating value={r.rating} />
                  <p className="mt-5 font-serif text-lg text-forest-800 leading-relaxed flex-1">
                    „{r.text}"
                  </p>
                  <div className="mt-7 pt-6 border-t border-stone-200">
                    <div className="font-display text-lg text-forest-900">{r.name}</div>
                    <div className="text-xs uppercase tracking-wider text-stone-500 mt-1">
                      {r.city} · {r.date}
                    </div>
                    <div className="text-xs text-walnut-500 mt-1">{r.apartment} · {r.source}</div>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/recenzii" className="btn-secondary">
              {t("reviews.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-walnut-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=2400&q=85"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 pattern-moldavian-dark opacity-50 pointer-events-none" />
        <div className="container-narrow relative text-center text-cream-50">
          <ScrollFade>
            <div className="eyebrow-light mb-4">{t("cta.eyebrow")}</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance">
              {t("cta.title")}
            </h2>
            <p className="mt-6 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/40738345330" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                WhatsApp
              </a>
              <a href="tel:+40738345330" className="btn-outline-light">
                +40 738 345 330
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
