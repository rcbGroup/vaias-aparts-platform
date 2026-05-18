"use client";

import Image from "next/image";
import Link from "next/link";
import { apartments } from "@/lib/apartments";
import { attractions } from "@/lib/attractions";
import { platformBadges, guestHighlights } from "@/lib/reviews";
import { guestAvatars } from "@/lib/guest-avatars";
import { getActiveOffers } from "@/lib/seasonal-offers";
import ApartmentCard from "@/components/ApartmentCard";
import SectionHeader from "@/components/SectionHeader";
import ScrollFade from "@/components/ScrollFade";
import { useLang } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t } = useLang();
  const featured = apartments;
  const featuredAttractions = attractions.slice(0, 6);
  const highlights = guestHighlights.slice(0, 6);
  const activeOffers = getActiveOffers().slice(0, 6);

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
          src="https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg"
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
                <Link
                  href="/vila-completa"
                  className="btn-outline-light border-walnut-300/80 text-walnut-100 hover:bg-walnut-500 hover:border-walnut-500 hover:text-cream-50"
                >
                  🏡 Rezervă toată vila
                </Link>
              </div>
              <p className="mt-4 text-sm text-cream-100/80">
                Prețuri de la <strong className="text-cream-50">295 RON/noapte</strong> · Toată vila — de la{" "}
                <strong className="text-cream-50">2.665 RON/noapte</strong>
              </p>
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
            { v: "99", l: "Recenzii Google 5★" },
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

      {/* SEASONAL OFFERS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="Oferte directe"
              title="Oferte și pachete speciale"
              subtitle="Contactați-ne direct pe WhatsApp pentru cele mai bune tarife disponibile."
            />
          </ScrollFade>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeOffers.map((offer, i) => (
              <ScrollFade key={offer.id} delay={i * 60}>
                <div className="card-lift rounded-2xl border border-stone-200 bg-stone-50 p-6 flex flex-col h-full">
                  <h3 className="font-display text-xl text-forest-900 mb-2">{offer.titleRO}</h3>
                  {offer.season && (
                    <div className="text-xs uppercase tracking-wider text-walnut-500 mb-3">
                      {offer.season}{offer.minNights ? ` · min. ${offer.minNights} nopți` : ""}
                    </div>
                  )}
                  <p className="text-sm text-stone-600 leading-relaxed flex-1 mb-5">{offer.descriptionRO}</p>
                  <a
                    href={`https://wa.me/40752388388?text=${encodeURIComponent(offer.whatsappMessageRO)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm text-center"
                  >
                    💬 {offer.ctaTextRO}
                  </a>
                </div>
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

      {/* GUEST AVATARS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="Vila Vaias Aparts este perfectă pentru"
              title="Cine sunt oaspeții noștri"
              subtitle="Familii, cupluri, pelerini, diaspora, grupuri și călători de afaceri — fiecare găsește la noi confortul potrivit."
            />
          </ScrollFade>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guestAvatars.map((avatar, i) => (
              <ScrollFade key={avatar.id} delay={i * 60}>
                <a
                  href={`https://wa.me/40752388388?text=${encodeURIComponent(avatar.whatsappMessageRO)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift group block rounded-2xl bg-stone-50 border border-stone-100 p-6 h-full hover:border-walnut-300 transition"
                >
                  <div className="text-4xl mb-4" aria-hidden>{avatar.icon}</div>
                  <h3 className="font-display text-xl text-forest-900 mb-2 group-hover:text-walnut-700 transition">{avatar.titleRO}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{avatar.descriptionRO}</p>
                  <span className="text-xs font-medium text-walnut-600 uppercase tracking-wider">
                    {avatar.ctaTextRO} →
                  </span>
                </a>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT BOOKING */}
      <section className="section bg-forest-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
        <div className="container-x relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollFade>
              <div className="eyebrow-light mb-6">Rezervare directă</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 mb-6">
                Cel mai bun preț — direct la noi.
              </h2>
              <p className="font-serif text-xl text-cream-100/80 leading-relaxed mb-8">
                Rezervând direct pe WhatsApp sau telefon, eviți comisionul platformelor de rezervare (15–25%).
                Comunicare directă cu familia care gestionează Vila Vaias Aparts, flexibilitate pentru cereri speciale
                și confirmare rapidă.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
                {[
                  { icon: "💚", title: "Cel mai bun preț direct", desc: "Fără comision OTA de 15–25%. Prețul pe care îl plătești vine în întregime la noi." },
                  { icon: "⚡", title: "Confirmare rapidă", desc: "Răspundem în WhatsApp de regulă în câteva ore, între 08:00 și 22:00." },
                  { icon: "🤝", title: "Comunicare directă", desc: "Vorbești direct cu familia care gestionează vila — nu cu un call center." }
                ].map(item => (
                  <div key={item.title} className="rounded-xl border border-cream-50/10 bg-cream-50/5 p-5">
                    <div className="text-2xl mb-3" aria-hidden>{item.icon}</div>
                    <h3 className="font-display text-lg text-cream-50 mb-2">{item.title}</h3>
                    <p className="text-sm text-cream-100/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/40752388388?text=Bun%C4%83%20ziua!%20Doresc%20s%C4%83%20rezerv%20un%20apartament%20la%20Vila%20Vaias%20Aparts.%20V%C4%83%20rog%20s%C4%83%20%C3%AEmi%20comunica%C8%9Bi%20disponibilitatea%20pentru%20datele%3A%20%5BDATA%20CHECK-IN%5D%20%E2%80%93%20%5BDATA%20CHECK-OUT%5D%2C%20%5BNR%5D%20persoane."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  💬 Rezervă pe WhatsApp
                </a>
                <a href="tel:+40752388388" className="btn-outline-light">
                  📞 +40 752 388 388
                </a>
                <a
                  href="https://www.5stardesk.net/b/vaias-aparts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-light"
                >
                  Verifică disponibilitate
                </a>
              </div>
            </ScrollFade>
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

      {/* GUEST HIGHLIGHTS */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="De ce ne aleg oaspeții"
              title="Experiența Vila Vaias Aparts"
              subtitle="99 recenzii Google cu 5.0 stele. Iată ce apreciază cel mai mult oaspeții noștri."
            />
          </ScrollFade>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <ScrollFade key={h.theme} delay={i * 80}>
                <div className="card-lift rounded-2xl bg-cream-50 border border-stone-100 p-7 h-full">
                  <div className="text-3xl mb-4" aria-hidden>{h.icon}</div>
                  <h3 className="font-display text-xl text-forest-900 mb-2">{h.titleRO}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{h.descriptionRO}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            {platformBadges.map(b => (
              <a
                key={b.platform}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-stone-200 bg-cream-50 px-5 py-3 shadow-soft hover:shadow-md transition"
              >
                <span className="font-display text-2xl text-walnut-500">{b.score}</span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500">{b.platform}</div>
                  <div className="text-xs text-stone-600">{b.label}</div>
                </div>
              </a>
            ))}
          </div>
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
                desc: "Cea mai bine notată cazare din Târgu Neamț. 99 de recenzii Google la 5.0 stele. Booking.com 9.4. Fiecare apartament — un spațiu al tău.",
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

      {/* GROUP / FULL VILLA */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="rounded-3xl bg-forest-900 text-cream-50 p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 pattern-moldavian-dark opacity-20 pointer-events-none" />
            <div className="relative max-w-3xl">
              <ScrollFade>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="eyebrow-light">Grupuri &amp; Vila Întreagă</div>
                  <span className="rounded-full bg-walnut-500 px-3 py-1 text-[10px] uppercase tracking-wider text-cream-50 font-medium">
                    Nou · Calculator preț
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-cream-50 mb-5">
                  Rezervă toată Vila Vaias — pentru 18 până la 28 de persoane.
                </h2>
                <p className="font-serif text-lg text-cream-100/80 leading-relaxed mb-6">
                  Toate cele 7 apartamente, o singură rezervare. Reduceri progresive pentru sejururi
                  mai lungi — de la <strong className="text-cream-50">2.665 RON/noapte</strong> direct.
                  Perfect pentru reuniuni de familie, retreaturi, team building.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-cream-100/80">
                  <li>✓ 7 apartamente independente · 18–28 persoane</li>
                  <li>✓ Reducere progresivă: 5% la 2 nopți → 17.5% la 7+ nopți</li>
                  <li>✓ Calculator preț pe site — vezi tariful tău imediat</li>
                  <li>✓ Cel mai bun preț — direct la noi, fără markup OTA</li>
                  <li>✓ Bucătăria pentru Toți + parcare gratuită CCTV 24/7</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/vila-completa" className="btn-primary">
                    🏡 Vezi pagina Vila Completă
                  </Link>
                  <a
                    href="https://wa.me/40752388388?text=Bun%C4%83%20ziua!%20Suntem%20interesa%C8%9Bi%20s%C4%83%20rezerv%C4%83m%20%C3%AEntreaga%20vil%C4%83%20Vaias%20Aparts.%20Datele%3A%20%5BDATA%20CHECK-IN%5D%20%E2%80%93%20%5BDATA%20CHECK-OUT%5D.%20Total%20adul%C8%9Bi%3A%20%5BNR%5D.%20Total%20copii%3A%20%5BNR%5D.%20V%C4%83%20rog%20s%C4%83%20ne%20comunica%C8%9Bi%20disponibilitatea%20%C8%99i%20pre%C8%9Bul%20total."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-light"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* CAZARE DESTINATIONS — internal linking for SEO */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="Cazare în zona Neamț"
              title="Pentru ce ești la noi?"
              subtitle="Alege motivul vizitei tale — îți pregătim o experiență potrivită."
            />
          </ScrollFade>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/cazare/cazare-cetatea-neamtului", title: "Cetatea Neamțului", text: "5 km · Cetatea lui Ștefan cel Mare", icon: "🏰" },
              { href: "/cazare/cazare-manastirea-agapia", title: "Mănăstirea Agapia", text: "30 min · Picturile lui Grigorescu", icon: "⛪" },
              { href: "/cazare/cazare-manastirea-varatec", title: "Mănăstirea Văratec", text: "35 min · Cea mai mare mănăstire de maici", icon: "🕊️" },
              { href: "/cazare/cazare-manastirea-neamt", title: "Mănăstirea Neamț", text: "15 min · Ierusalimul ortodoxiei", icon: "📜" },
              { href: "/cazare/cazare-ceahlau", title: "Masivul Ceahlău", text: "45 min · Muntele dacilor", icon: "⛰️" },
              { href: "/cazare/cazare-grup-targu-neamt", title: "Grupuri · Vila întreagă", text: "22-28 persoane · Familie, parohie, corporate", icon: "👨‍👩‍👧‍👦" },
              { href: "/cazare/cazare-diaspora-targu-neamt", title: "Diaspora", text: "Acasă în Moldova · Multilingv", icon: "🌍" },
              { href: "/cazare/cazare-targu-neamt", title: "Ghidul complet", text: "Toate motivele · Toate detaliile", icon: "📖" }
            ].map((d, i) => (
              <ScrollFade key={d.href} delay={i * 60}>
                <Link
                  href={d.href}
                  className="card-lift block h-full rounded-2xl bg-cream-50 border border-stone-100 p-6 hover:border-walnut-300 transition"
                >
                  <div className="text-3xl mb-3" aria-hidden>{d.icon}</div>
                  <h3 className="font-display text-lg text-forest-900 mb-1">{d.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{d.text}</p>
                  <span className="mt-3 inline-block text-xs uppercase tracking-wider text-walnut-600">Vezi cazare →</span>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">Întrebări frecvente</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10">
            Ce întreabă oaspeții cel mai des
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Care este cea mai bună cazare din Târgu Neamț?",
                a: "Vila Vaias Aparts este cea mai bine notată cazare din Târgu Neamț — Booking.com 9.4 și 99 de recenzii Google la 5.0 stele. 7 apartamente boutique independente, fiecare cu baie privată și (cu o singură excepție) bucătărie proprie. Clasificare 4 stele, certificat 35332."
              },
              {
                q: "Cât costă o noapte la Vila Vaias Aparts?",
                a: "Apartamentele single (1 dormitor) pornesc de la 295 RON/noapte, cele cu 2 dormitoare de la 595 RON. Aplicăm 10% reducere pentru 2-3 nopți, 15% pentru 4-6 nopți, 25% pentru 7+ nopți. Toată vila — de la 2.665 RON/noapte. Cel mai bun preț — direct pe WhatsApp."
              },
              {
                q: "La ce distanță sunteți de Cetatea Neamțului?",
                a: "Doar 5 km (10 min cu mașina) de Cetatea Neamțului. Suntem și la 12 km de Mănăstirea Neamț, 14 km de Agapia, 18 km de Văratec și aproximativ 60 km de masivul Ceahlău."
              },
              {
                q: "Acceptați animale de companie?",
                a: "Da, animalele de companie sunt bine venite la cerere prealabilă, fără cost suplimentar. Vă rugăm să ne spuneți la rezervare ce animal aduceți."
              },
              {
                q: "Există parcare?",
                a: "Da, parcarea este gratuită în curtea vilei pentru toți oaspeții (primul venit, primul servit). Curtea este monitorizată CCTV 24/7."
              },
              {
                q: "Putem rezerva întreaga vilă pentru un eveniment?",
                a: "Da, vila întreagă (toate cele 7 apartamente) poate fi rezervată pentru grupuri de 22 până la 28 de persoane — reuniuni de familie, nunți, retrageri parohiale, team-building corporate. Tariful este personalizat — contactați-ne pe WhatsApp."
              },
              {
                q: "Cum funcționează check-in-ul?",
                a: "Check-in este după ora 14:00, check-out până la 11:00. Self check-in cu ghidaj — vă întâmpinăm sau vă transmitem instrucțiunile, cum vă este mai comod. Pentru zboruri târzii sau cazuri speciale, suntem flexibili."
              },
              {
                q: "Care este avansul la rezervare?",
                a: "Avansul este 30% din valoarea rezervării, plătibil prin transfer bancar sau card. Restul se achită la check-in. Emitem factură fiscală pentru orice rezervare."
              }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Care este cea mai bună cazare din Târgu Neamț?",
                  acceptedAnswer: { "@type": "Answer", text: "Vila Vaias Aparts este cea mai bine notată cazare din Târgu Neamț — Booking.com 9.4 și 99 de recenzii Google la 5.0 stele. 7 apartamente boutique independente, clasificare 4 stele, certificat 35332." }
                },
                {
                  "@type": "Question",
                  name: "Cât costă o noapte la Vila Vaias Aparts?",
                  acceptedAnswer: { "@type": "Answer", text: "Apartamentele single pornesc de la 295 RON/noapte, cele cu 2 dormitoare de la 595 RON. Toată vila — de la 2.665 RON/noapte. Reduceri: 10% pentru 2-3 nopți, 15% pentru 4-6 nopți, 25% pentru 7+ nopți. Cel mai bun preț direct pe WhatsApp." }
                },
                {
                  "@type": "Question",
                  name: "La ce distanță sunteți de Cetatea Neamțului?",
                  acceptedAnswer: { "@type": "Answer", text: "5 km (10 min cu mașina) de Cetatea Neamțului. 12 km Mănăstirea Neamț, 14 km Agapia, 18 km Văratec, 60 km Ceahlău." }
                },
                {
                  "@type": "Question",
                  name: "Acceptați animale de companie?",
                  acceptedAnswer: { "@type": "Answer", text: "Da, animalele de companie sunt bine venite la cerere prealabilă, fără cost suplimentar." }
                },
                {
                  "@type": "Question",
                  name: "Există parcare?",
                  acceptedAnswer: { "@type": "Answer", text: "Da, parcarea este gratuită în curtea vilei pentru toți oaspeții. Curtea este monitorizată CCTV 24/7." }
                },
                {
                  "@type": "Question",
                  name: "Putem rezerva întreaga vilă pentru un eveniment?",
                  acceptedAnswer: { "@type": "Answer", text: "Da, vila întreagă (7 apartamente) poate fi rezervată pentru grupuri de 22-28 persoane. Tariful este personalizat." }
                },
                {
                  "@type": "Question",
                  name: "Cum funcționează check-in-ul?",
                  acceptedAnswer: { "@type": "Answer", text: "Check-in după 14:00, check-out până la 11:00. Self check-in cu ghidaj — vă întâmpinăm sau vă transmitem instrucțiunile." }
                },
                {
                  "@type": "Question",
                  name: "Care este avansul la rezervare?",
                  acceptedAnswer: { "@type": "Answer", text: "Avansul este 30% din valoarea rezervării. Restul se achită la check-in. Emitem factură fiscală." }
                }
              ]
            })
          }}
        />
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-walnut-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg"
            alt="Vila Vaias Aparts exterior"
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
              <a href="https://wa.me/40752388388" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                WhatsApp
              </a>
              <a href="tel:+40752388388" className="btn-outline-light">
                +40 752 388 388
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
