"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apartments } from "@/lib/apartments";
import { attractions } from "@/lib/attractions";
import { airports, closestAirports } from "@/lib/airports";
import { platformBadges, guestHighlights } from "@/lib/reviews";
import { guestAvatars } from "@/lib/guest-avatars";
import { getActiveOffers } from "@/lib/seasonal-offers";
import { siteVideos, videoObjectLd, VILLA_VIDEO_ID } from "@/lib/videos";
import ApartmentCard from "@/components/ApartmentCard";
import AirportMap from "@/components/AirportMap";
import SectionHeader from "@/components/SectionHeader";
import UspBanner from "@/components/UspBanner";
import ScrollFade from "@/components/ScrollFade";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useLang, useLanguage } from "@/components/LanguageProvider";

// One representative airport per distance band for the homepage preview.
const PREVIEW_AIRPORT_SLUGS = [
  "suceava-scv",
  "bacau-bcm",
  "iasi-ias",
  "targu-mures-tgm",
  "cluj-napoca-clj",
  "chisinau-kiv",
  "bucuresti-otopeni-otp"
];
const previewAirports = airports
  .filter((a) => PREVIEW_AIRPORT_SLUGS.includes(a.slug))
  .sort((a, b) => a.distanceKm - b.distanceKm);
const CLOSEST_SLUG = closestAirports[0]?.slug;

export default function HomePage() {
  const { t } = useLang();
  const { lang } = useLanguage();
  const router = useRouter();
  const featured = apartments;
  const featuredAttractions = attractions.slice(0, 6);
  const highlights = guestHighlights.slice(0, 6);
  const activeOffers = getActiveOffers().slice(0, 6);

  const whyItems = [
    { icon: "ð", k: "1" },
    { icon: "ð", k: "2" },
    { icon: "â¨", k: "3" },
    { icon: "ð¶", k: "4" }
  ];

  const foodItems = ["1", "2", "3", "4"];
  const foodImages = [
    "/unsplash/food-pelmeni.jpg",
    "/unsplash/food-soup.jpg",
    "/unsplash/food-traditional.jpg",
    "/unsplash/food-dessert.jpg"
  ];

  const transportItems = [
    { icon: "ð", k: "1" },
    { icon: "ð", k: "2" },
    { icon: "âï¸", k: "3" },
    { icon: "ð", k: "4" }
  ];

  return (
    <>
      {/* HERO â full viewport sliding photo gallery */}
      <HeroSlideshow />

      {/* INTRO STRIP */}
      <section className="bg-cream-50 py-14 border-b border-stone-100 relative">
        <div className="container-x grid gap-8 md:grid-cols-4 text-center">
          {[
            { v: "7", l: t("stats.apartments") },
            { v: "9.4", l: "Booking.com" },
            { v: "99", l: t("stats.reviews") },
            { v: "5.0", l: t("stats.rating") }
          ].map((s, i) => (
            <ScrollFade key={s.l} delay={i * 80}>
              <div className="font-display text-4xl text-walnut-500 mb-1">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500">{s.l}</div>
            </ScrollFade>
          ))}
        </div>
      </section>

      {/* USP â entire apartment at room price */}
      <UspBanner lang={lang} />

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
              title="Oferte Èi pachete speciale"
              subtitle="ContactaÈi-ne direct pe WhatsApp pentru cele mai bune tarife disponibile."
            />
          </ScrollFade>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeOffers.map((offer, i) => (
              <ScrollFade key={offer.id} delay={i * 60}>
                <div className="card-lift rounded-2xl border border-stone-200 bg-stone-50 p-6 flex flex-col h-full">
                  <h3 className="font-display text-xl text-forest-900 mb-2">{offer.titleRO}</h3>
                  {offer.season && (
                    <div className="text-xs uppercase tracking-wider text-walnut-500 mb-3">
                      {offer.season}{offer.minNights ? ` Â· min. ${offer.minNights} nopÈi` : ""}
                    </div>
                  )}
                  <p className="text-sm text-stone-600 leading-relaxed flex-1 mb-5">{offer.descriptionRO}</p>
                  <a
                    href={`https://wa.me/40752388388?text=${encodeURIComponent(offer.whatsappMessageRO)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm text-center"
                  >
                    ð¬ {offer.ctaTextRO}
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
              eyebrow="Vila Vaias Aparts este perfectÄ pentru"
              title="Cine sunt oaspeÈii noÈtri"
              subtitle="Familii, cupluri, pelerini, diaspora, grupuri Èi cÄlÄtori de afaceri â fiecare gÄseÈte la noi confortul potrivit."
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
                    {avatar.ctaTextRO} â
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
              <div className="eyebrow-light mb-6">Rezervare directÄ</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 mb-6">
                Cel mai bun preÈ â direct la noi.
              </h2>
              <p className="font-serif text-xl text-cream-100/80 leading-relaxed mb-8">
                RezervÃ¢nd direct pe WhatsApp sau telefon, eviÈi comisionul platformelor de rezervare (15â25%).
                Comunicare directÄ cu familia care gestioneazÄ Vila Vaias Aparts, flexibilitate pentru cereri speciale
                Èi confirmare rapidÄ.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
                {[
                  { icon: "ð", title: "Cel mai bun preÈ direct", desc: "FÄrÄ comision OTA de 15â25%. PreÈul pe care Ã®l plÄteÈti vine Ã®n Ã®ntregime la noi." },
                  { icon: "â¡", title: "Confirmare rapidÄ", desc: "RÄspundem Ã®n WhatsApp de regulÄ Ã®n cÃ¢teva ore, Ã®ntre 08:00 Èi 22:00." },
                  { icon: "ð¤", title: "Comunicare directÄ", desc: "VorbeÈti direct cu familia care gestioneazÄ vila â nu cu un call center." }
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
                  ð¬ RezervÄ pe WhatsApp
                </a>
                <a href="tel:+40752388388" className="btn-outline-light">
                  ð +40 752 388 388
                </a>
                <a
                  href="https://www.5stardesk.net/b/vaias-aparts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-light"
                >
                  VerificÄ disponibilitate
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
                src="/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-2.jpg"
                alt="Vila Vaias Aparts â curte Èi exterior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 hidden md:block w-56 aspect-square rounded-2xl overflow-hidden shadow-card border-8 border-cream-50">
              <Image
                src="/gallery/vila-vaias-aparts-targu-neamt-apartament-1-living-1.jpg"
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

      {/* VIDEO TOUR */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="Tur video"
              title="Vila Vaias Aparts Ã®n miÈcare"
              subtitle="Confort de hotel, libertatea de acasÄ, liniÈte Èi priveliÈti ca Ã®n ElveÈia â vezi vila Èi Ã®mprejurimile."
            />
          </ScrollFade>
          <ScrollFade delay={100}>
            <div className="mt-12 mx-auto max-w-4xl">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card bg-forest-950">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/KnEAUHQFEvY?rel=0"
                  title="Vila Vaias Aparts â tur video"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="mt-5 text-center">
                <a
                  href="https://www.youtube.com/@VaiasAparts/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  â¶ï¸ Vezi toate filmÄrile pe YouTube
                </a>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* GUEST HIGHLIGHTS */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="De ce ne aleg oaspeÈii"
              title="ExperienÈa Vila Vaias Aparts"
              subtitle="99 recenzii Google cu 5.0 stele. IatÄ ce apreciazÄ cel mai mult oaspeÈii noÈtri."
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

      {/* REVIEW QUOTES STRIP */}
      <section className="py-16 bg-white border-t border-b border-stone-100">
        <div className="container-x">
          <ScrollFade>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-amber-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="font-bold text-stone-900">5.0</span>
                  <span className="text-stone-400 text-sm">&middot;</span>
                  <span className="text-stone-500 text-sm">{lang !== "en" ? "99 recenzii Google" : "99 Google reviews"}</span>
                  <span className="text-stone-400 text-sm">&middot;</span>
                  <span className="font-semibold text-sky-700 text-sm">9.4 Booking.com</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-stone-900">
                  {lang !== "en" ? "Ce spun oaspeÅ£ii noÅtri." : "What our guests say."}
                </h2>
              </div>
              <Link href="/recenzii" className="text-walnut-600 text-sm font-medium hover:text-walnut-800 transition-colors whitespace-nowrap">
                {lang !== "en" ? "Toate recenziile" : "All reviews"} â
              </Link>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Andrei & Raluca", loc: "BucureÅti", platform: "Booking", qRo: "PreÅ£ul direct a fost cu 20% mai mic faÅ£Ä de Booking. Apartament privat, pat Emperor de 2mÃ2m, Åi Anca ne-a recomandat restaurante pe care nu le-am fi gÄsit singuri.", qEn: "The direct price was 20% cheaper than Booking. Private apartment, 2mÃ2m Emperor bed, and Anca recommended restaurants weâd never have found alone." },
              { name: "Daniela M.", loc: "IaÅi", platform: "Google", qRo: "Gazde minunate, comunicare rapidÄ pe WhatsApp, totul perfect pregÄtit. Apartamentul aratÄ exact ca Ã®n poze, poate chiar mai frumos.", qEn: "Wonderful hosts, quick WhatsApp responses, everything perfectly prepared. The apartment looks exactly like the photos, maybe even more beautiful." },
              { name: "Alexandru V.", loc: "Suceava", platform: "Google", qRo: "Am venit cu cÃ¢inele (animale acceptate, fÄrÄ taxÄ suplimentarÄ!) Åi am avut o experienÅ£Ä perfectÄ. Vasi a dat sfaturi excelente pentru trasee.", qEn: "Came with my dog (pets accepted, no extra charge!) and had a perfect experience. Vasi gave excellent tips for local trails." },
              { name: "Familia Rusu", loc: "BacÄu", platform: "Google", qRo: "Locul perfect pentru o vacanÅ£Ä de familie. 2 dormitoare, 67mp â tot al tÄu. FÄrÄ recepÅ£ie, fÄrÄ alÅ£i turiÅti pe hol. Copiii au adorat.", qEn: "Perfect for a family holiday. 2 bedrooms, 67sqm â all yours. No reception, no other tourists in the hallway. The kids loved it." },
            ].map((q) => (
              <ScrollFade key={q.name}>
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    <span className="text-xs text-stone-400 bg-white px-1.5 py-0.5 rounded-full border border-stone-100">{q.platform}</span>
                  </div>
                  <blockquote className="text-stone-600 text-sm leading-relaxed flex-1 mb-4">&ldquo;{lang !== "en" ? q.qRo : q.qEn}&rdquo;</blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-walnut-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{q.name[0]}</div>
                    <div>
                      <div className="text-xs font-semibold text-stone-800">{q.name}</div>
                      <div className="text-xs text-stone-400">{q.loc}</div>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* AREA HIGHLIGHTS */}
      <section className="section bg-forest-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/gallery/vila-vaias-aparts-targu-neamt-vedere-aeriana-drona-1.jpg"
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
                      {a.distance} Â· {a.drivingTime}
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

      {/* STEPS AWAY â everything you need within walking distance */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="Ultracentral Â· TÃ¢rgu NeamÈ"
              title="Tot ce ai nevoie â la cÃ¢Èiva paÈi"
              subtitle="PiaÈÄ, magazine, restaurante, muzee, centrul vechi Èi parcul â aproape totul e la o plimbare scurtÄ de poarta noastrÄ."
            />
          </ScrollFade>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { icon: "ð§º", label: "PiaÈa agroalimentarÄ", time: "6 min pe jos" },
              { icon: "ð", label: "Magazine (Lidl, Profi)", time: "5 min pe jos" },
              { icon: "ð½ï¸", label: "Restaurante & cafenele", time: "4 min pe jos" },
              { icon: "ðï¸", label: "Muzeul de istorie", time: "7 min pe jos" },
              { icon: "ð°", label: "Cetatea NeamÈ", time: "10 min cu maÈina" },
              { icon: "ðï¸", label: "Centrul vechi", time: "5 min pe jos" },
              { icon: "ð³", label: "Parcul central", time: "9 min pe jos" }
            ].map((it, i) => (
              <ScrollFade key={it.label} delay={i * 60}>
                <div className="card-lift h-full rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center flex flex-col items-center">
                  <div className="text-3xl mb-3" aria-hidden>{it.icon}</div>
                  <div className="font-display text-base text-forest-900 leading-tight mb-2">{it.label}</div>
                  <div className="mt-auto text-[11px] uppercase tracking-[0.18em] text-walnut-600 font-semibold">{it.time}</div>
                </div>
              </ScrollFade>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/ce-poti-face" className="btn-secondary">
              Vezi tot ce poÈi face â
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
                Trei experienÈe. O singurÄ destinaÈie.
              </h2>
              <div className="divider-gold my-7" />
              <p className="font-serif text-lg text-cream-100/80 max-w-2xl mx-auto">
                Vila, lacul secret Èi restaurantul â trei lumi care se completeazÄ perfect pentru un sejur cu suflet Ã®n Moldova.
              </p>
            </div>
          </ScrollFade>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Vila Vaias Aparts",
                subtitle: "7 apartamente boutique",
                desc: "Cea mai bine notatÄ cazare din TÃ¢rgu NeamÈ. 99 de recenzii Google la 5.0 stele. Booking.com 9.4. Fiecare apartament â un spaÈiu al tÄu.",
                cta: "Alege apartamentul",
                href: "/apartments",
                photo: "/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg"
              },
              {
                num: "02",
                title: "Lacul Privat NemÈiÈor",
                subtitle: "Refugiul Secret al OaspeÈilor Vaias",
                desc: "Un lac privat Ã®n sat NemÈiÈor, la 10 minute. Pescuit, grÄtar, naturÄ Ã®n liniÈte deplinÄ. Exclusiv pentru oaspeÈii noÈtri â la cerere.",
                cta: "DescoperÄ lacul",
                href: "/experiente",
                photo: "/unsplash/experience-lake.jpg"
              },
              {
                num: "03",
                title: "Han Rustic",
                subtitle: "Gastronomie moldoveneascÄ autenticÄ",
                desc: "Sarmale, mÄmÄligÄ, tocÄniÈÄ, plÄcintÄ poale-n brÃ¢u, vin local. O experienÈÄ culinarÄ care defineÈte Moldova. Ãn curÃ¢nd.",
                cta: "AflÄ mai mult",
                href: "/han-rustic",
                photo: "/unsplash/experience-hanrustic.jpg"
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
                      {p.cta} â
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

      {/* AIRPORTS MAP PREVIEW */}
      <section className="section bg-forest-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
        <div className="container-x relative">
          <ScrollFade>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="eyebrow-light mb-4">Cum ajungi Â· aeroporturi</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
                La doar 60 km de cel mai apropiat aeroport.
              </h2>
              <div className="divider-gold my-7" />
              <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
                Suceava, BacÄu Èi IaÈi â trei aeroporturi internaÈionale la mai puÈin de 2 ore.
                Vezi distanÈele faÈÄ de Vila Vaias Aparts Èi autostrada A7 pe hartÄ.
              </p>
            </div>
          </ScrollFade>
          <ScrollFade delay={100}>
            <AirportMap
              airports={previewAirports}
              closestSlug={CLOSEST_SLUG}
              compact
              onSelect={(slug) => router.push(`/cum-ajungi#airport-${slug}`)}
            />
            <div className="mt-8 text-center">
              <Link
                href="/cum-ajungi"
                className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
              >
                Vezi toate aeroporturile â
              </Link>
            </div>
          </ScrollFade>
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
                  <div className="eyebrow-light">Grupuri &amp; Vila ÃntreagÄ</div>
                  <span className="rounded-full bg-walnut-500 px-3 py-1 text-[10px] uppercase tracking-wider text-cream-50 font-medium">
                    Nou Â· Calculator preÈ
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-cream-50 mb-5">
                  RezervÄ toatÄ Vila Vaias â pentru 22 pÃ¢nÄ la 28 de persoane.
                </h2>
                <p className="font-serif text-lg text-cream-100/80 leading-relaxed mb-6">
                  Toate cele 7 apartamente, o singurÄ rezervare. De la{" "}
                  <strong className="text-cream-50">2.065 RON/noapte</strong> (luniâjoi) Â·{" "}
                  <strong className="text-cream-50">2.450 RON/noapte</strong> (weekend).
                  Perfect pentru nunÈi, petreceri, team building Èi reuniuni de familie.
                </p>
                <ul className="space-y-2 mb-8 text-sm text-cream-100/80">
                  <li>â 7 apartamente independente Â· 22â28 persoane</li>
                  <li>â Reducere progresivÄ: 5% la 2 nopÈi â 17.5% la 7+ nopÈi</li>
                  <li>â Calculator preÈ pe site â vezi tariful tÄu imediat</li>
                  <li>â Cel mai bun preÈ â direct la noi, fÄrÄ markup OTA</li>
                  <li>â BucÄtÄria pentru ToÈi + parcare gratuitÄ CCTV 24/7</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/vila-completa" className="btn-primary">
                    ð¡ Vezi pagina Vila CompletÄ
                  </Link>
                  <a
                    href="https://wa.me/40752388388?text=Bun%C4%83%20ziua!%20Suntem%20interesa%C8%9Bi%20s%C4%83%20rezerv%C4%83m%20%C3%AEntreaga%20vil%C4%83%20Vaias%20Aparts.%20Datele%3A%20%5BDATA%20CHECK-IN%5D%20%E2%80%93%20%5BDATA%20CHECK-OUT%5D.%20Total%20adul%C8%9Bi%3A%20%5BNR%5D.%20Total%20copii%3A%20%5BNR%5D.%20V%C4%83%20rog%20s%C4%83%20ne%20comunica%C8%9Bi%20disponibilitatea%20%C8%99i%20pre%C8%9Bul%20total."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-light"
                  >
                    ð¬ WhatsApp
                  </a>
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* CAZARE DESTINATIONS â internal linking for SEO */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <ScrollFade>
            <SectionHeader
              eyebrow="Cazare Ã®n zona NeamÈ"
              title="Pentru ce eÈti la noi?"
              subtitle="Alege motivul vizitei tale â Ã®Èi pregÄtim o experienÈÄ potrivitÄ."
            />
          </ScrollFade>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/cazare/cazare-cetatea-neamtului", title: "Cetatea NeamÈului", text: "5 km Â· Cetatea lui Ètefan cel Mare", icon: "ð°" },
              { href: "/cazare/cazare-manastirea-agapia", title: "MÄnÄstirea Agapia", text: "30 min Â· Picturile lui Grigorescu", icon: "âª" },
              { href: "/cazare/cazare-manastirea-varatec", title: "MÄnÄstirea VÄratec", text: "35 min Â· Cea mai mare mÄnÄstire de maici", icon: "ðï¸" },
              { href: "/cazare/cazare-manastirea-neamt", title: "MÄnÄstirea NeamÈ", text: "15 min Â· Ierusalimul ortodoxiei", icon: "ð" },
              { href: "/cazare/cazare-ceahlau", title: "Masivul CeahlÄu", text: "45 min Â· Muntele dacilor", icon: "â°ï¸" },
              { href: "/cazare/cazare-grup-targu-neamt", title: "Grupuri Â· Vila Ã®ntreagÄ", text: "22-28 persoane Â· Familie, parohie, corporate", icon: "ð¨âð©âð§âð¦" },
              { href: "/cazare/cazare-diaspora-targu-neamt", title: "Diaspora", text: "AcasÄ Ã®n Moldova Â· Multilingv", icon: "ð" },
              { href: "/cazare/cazare-targu-neamt", title: "Ghidul complet", text: "Toate motivele Â· Toate detaliile", icon: "ð" }
            ].map((d, i) => (
              <ScrollFade key={d.href} delay={i * 60}>
                <Link
                  href={d.href}
                  className="card-lift block h-full rounded-2xl bg-cream-50 border border-stone-100 p-6 hover:border-walnut-300 transition"
                >
                  <div className="text-3xl mb-3" aria-hidden>{d.icon}</div>
                  <h3 className="font-display text-lg text-forest-900 mb-1">{d.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{d.text}</p>
                  <span className="mt-3 inline-block text-xs uppercase tracking-wider text-walnut-600">Vezi cazare â</span>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">ÃntrebÄri frecvente</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10">
            Ce Ã®ntreabÄ oaspeÈii cel mai des
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Care este cea mai bunÄ cazare din TÃ¢rgu NeamÈ?",
                a: "Vila Vaias Aparts este cea mai bine notatÄ cazare din TÃ¢rgu NeamÈ â Booking.com 9.4 Èi 99 de recenzii Google la 5.0 stele. 7 apartamente boutique independente, fiecare cu baie privatÄ Èi (cu o singurÄ excepÈie) bucÄtÄrie proprie. Clasificare 4 stele, certificat 35332."
              },
              {
                q: "CÃ¢t costÄ o noapte la Vila Vaias Aparts?",
                a: "Apartamentele single (1 dormitor) pornesc de la 295 RON/noapte, cele cu 2 dormitoare de la 595 RON. AplicÄm 10% reducere pentru 2-3 nopÈi, 15% pentru 4-6 nopÈi, 25% pentru 7+ nopÈi. ToatÄ vila â de la 2.065 RON/noapte (luniâjoi), 2.450 RON/noapte (weekend). Cel mai bun preÈ â direct pe WhatsApp."
              },
              {
                q: "La ce distanÈÄ sunteÈi de Cetatea NeamÈului?",
                a: "Doar 5 km (10 min cu maÈina) de Cetatea NeamÈului. Suntem Èi la 12 km de MÄnÄstirea NeamÈ, 14 km de Agapia, 18 km de VÄratec Èi aproximativ 60 km de masivul CeahlÄu."
              },
              {
                q: "AcceptaÈi animale de companie?",
                a: "Da, animalele de companie sunt bine venite la cerere prealabilÄ, fÄrÄ cost suplimentar. VÄ rugÄm sÄ ne spuneÈi la rezervare ce animal aduceÈi."
              },
              {
                q: "ExistÄ parcare?",
                a: "Da, parcarea este gratuitÄ Ã®n curtea vilei pentru toÈi oaspeÈii (primul venit, primul servit). Curtea este monitorizatÄ CCTV 24/7."
              },
              {
                q: "Putem rezerva Ã®ntreaga vilÄ pentru un eveniment?",
                a: "Da, vila Ã®ntreagÄ (toate cele 7 apartamente) poate fi rezervatÄ pentru grupuri de 22 pÃ¢nÄ la 28 de persoane â reuniuni de familie, nunÈi, retrageri parohiale, team-building corporate. Tariful este personalizat â contactaÈi-ne pe WhatsApp."
              },
              {
                q: "Cum funcÈioneazÄ check-in-ul?",
                a: "Check-in este dupÄ ora 14:00, check-out pÃ¢nÄ la 11:00. Self check-in cu ghidaj â vÄ Ã®ntÃ¢mpinÄm sau vÄ transmitem instrucÈiunile, cum vÄ este mai comod. Pentru zboruri tÃ¢rzii sau cazuri speciale, suntem flexibili."
              },
              {
                q: "Care este avansul la rezervare?",
                a: "Avansul este 30% din valoarea rezervÄrii, plÄtibil prin transfer bancar sau card. Restul se achitÄ la check-in. Emitem facturÄ fiscalÄ pentru orice rezervare."
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
                  name: "Care este cea mai bunÄ cazare din TÃ¢rgu NeamÈ?",
                  acceptedAnswer: { "@type": "Answer", text: "Vila Vaias Aparts este cea mai bine notatÄ cazare din TÃ¢rgu NeamÈ â Booking.com 9.4 Èi 99 de recenzii Google la 5.0 stele. 7 apartamente boutique independente, clasificare 4 stele, certificat 35332." }
                },
                {
                  "@type": "Question",
                  name: "CÃ¢t costÄ o noapte la Vila Vaias Aparts?",
                  acceptedAnswer: { "@type": "Answer", text: "Apartamentele single pornesc de la 295 RON/noapte, cele cu 2 dormitoare de la 595 RON. ToatÄ vila â de la 2.065 RON/noapte (luniâjoi), 2.450 RON/noapte (weekend). Reduceri: 10% pentru 2-3 nopÈi, 15% pentru 4-6 nopÈi, 25% pentru 7+ nopÈi. Cel mai bun preÈ direct pe WhatsApp." }
                },
                {
                  "@type": "Question",
                  name: "La ce distanÈÄ sunteÈi de Cetatea NeamÈului?",
                  acceptedAnswer: { "@type": "Answer", text: "5 km (10 min cu maÈina) de Cetatea NeamÈului. 12 km MÄnÄstirea NeamÈ, 14 km Agapia, 18 km VÄratec, 60 km CeahlÄu." }
                },
                {
                  "@type": "Question",
                  name: "AcceptaÈi animale de companie?",
                  acceptedAnswer: { "@type": "Answer", text: "Da, animalele de companie sunt bine venite la cerere prealabilÄ, fÄrÄ cost suplimentar." }
                },
                {
                  "@type": "Question",
                  name: "ExistÄ parcare?",
                  acceptedAnswer: { "@type": "Answer", text: "Da, parcarea este gratuitÄ Ã®n curtea vilei pentru toÈi oaspeÈii. Curtea este monitorizatÄ CCTV 24/7." }
                },
                {
                  "@type": "Question",
                  name: "Putem rezerva Ã®ntreaga vilÄ pentru un eveniment?",
                  acceptedAnswer: { "@type": "Answer", text: "Da, vila Ã®ntreagÄ (7 apartamente) poate fi rezervatÄ pentru grupuri de 22-28 persoane. Tariful este personalizat." }
                },
                {
                  "@type": "Question",
                  name: "Cum funcÈioneazÄ check-in-ul?",
                  acceptedAnswer: { "@type": "Answer", text: "Check-in dupÄ 14:00, check-out pÃ¢nÄ la 11:00. Self check-in cu ghidaj â vÄ Ã®ntÃ¢mpinÄm sau vÄ transmitem instrucÈiunile." }
                },
                {
                  "@type": "Question",
                  name: "Care este avansul la rezervare?",
                  acceptedAnswer: { "@type": "Answer", text: "Avansul este 30% din valoarea rezervÄrii. Restul se achitÄ la check-in. Emitem facturÄ fiscalÄ." }
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
            src="/gallery/vila-vaias-aparts-targu-neamt-vedere-aeriana-noapte-1.jpg"
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

      {siteVideos
        .filter((v) => v.youtubeId === VILLA_VIDEO_ID)
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
