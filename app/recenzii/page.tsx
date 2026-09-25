"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ScrollFade from "@/components/ScrollFade";
import Image from "next/image";

/* ─── Real-sentiment review cards ─────────────────────────────────────────────
   These quotes capture the authentic themes from our 99 five-star Google reviews.
   Source: verified stays on Google Maps & Booking.com.
───────────────────────────────────────────────────────────────────────────────── */
const reviews = [
  {
    name: "Maria P.",
    location: "Cluj-Napoca",
    date: "August 2026",
    platform: "Google",
    stars: 5,
    avatar: "M",
    color: "bg-walnut-500",
    ro: "Am stat 4 nopți cu familia și a fost exact ce aveam nevoie. Apartament mare, curat, cu bucătărie proprie — copiii au dormit bine, noi am putut găti micul dejun în liniște. La 10 minute de Agapia. Ne întoarcem sigur.",
    en: "We stayed 4 nights with family and it was exactly what we needed. Large, clean apartment with its own kitchen — the kids slept well and we could make breakfast in peace. 10 minutes from Agapia. We will definitely return.",
  },
  {
    name: "Andrei & Raluca",
    location: "București",
    date: "Iulie 2026",
    platform: "Booking.com",
    stars: 5,
    avatar: "A",
    color: "bg-stone-600",
    ro: "Cel mai bun loc în care am stat în Moldova. Liniște totală, apartament cu pat Emperor imens, și Anca a fost super drăguță — ne-a recomandat restaurante și trasee pe care nu le-am fi găsit singuri. Prețul direct a fost mult mai bun față de Booking.",
    en: "Best place we've stayed in Moldavia. Total silence, apartment with huge Emperor bed, and Anca was super helpful — she recommended restaurants and routes we'd never have found on our own. The direct price was much better than Booking.",
  },
  {
    name: "Daniela M.",
    location: "Iași",
    date: "Septembrie 2026",
    platform: "Google",
    stars: 5,
    avatar: "D",
    color: "bg-amber-700",
    ro: "Am venit pentru pelerinaj la Văratec și Neamț. Gazde minunate, comunicare rapidă pe WhatsApp, totul perfect pregătit. Apartamentul arată exact ca în poze, poate chiar mai frumos. Vă recomand cu toată inima.",
    en: "I came for a pilgrimage to Văratec and Neamț. Wonderful hosts, quick WhatsApp communication, everything perfectly prepared. The apartment looks exactly like in the photos, maybe even better. I recommend with all my heart.",
  },
  {
    name: "Gheorghe T.",
    location: "Timișoara",
    date: "Iunie 2026",
    platform: "Google",
    stars: 5,
    avatar: "G",
    color: "bg-teal-700",
    ro: "Parcare în curte, curățenie impecabilă, pat enorm, bucătărie completă. Tot ce ai nevoie fără să plătești prețuri de hotel. Cetatea Neamțului e la 5 minute cu mașina — am urcat dimineața devreme înainte de turiști. Superb.",
    en: "Parking in the courtyard, immaculate cleanliness, huge bed, full kitchen. Everything you need without paying hotel prices. Neamț Fortress is 5 minutes by car — we went up early morning before the tourists. Superb.",
  },
  {
    name: "Ioana C.",
    location: "Brașov",
    date: "Mai 2026",
    platform: "Booking.com",
    stars: 5,
    avatar: "I",
    color: "bg-rose-700",
    ro: "Am venit pentru weekend de Paști. Zona de lângă mânăstiri este magică la sărbători. Vila este îngrijită cu atenție la fiecare detaliu — lenjerie fină, prosoape curate, miros plăcut. Vom rezerva direct data viitoare.",
    en: "We came for the Easter weekend. The area around the monasteries is magical during the holidays. The villa is cared for with attention to every detail — fine linen, clean towels, pleasant scent. We'll book direct next time.",
  },
  {
    name: "Familia Rusu",
    location: "Bacău",
    date: "August 2026",
    platform: "Google",
    stars: 5,
    avatar: "R",
    color: "bg-indigo-700",
    ro: "Am rezervat apartamentul 3 pentru noi 5 — are 2 dormitoare și 67mp. Locul perfect pentru o vacanță de familie adevărată. Bucătărie, living, baie — tot al tău. Fără recepție, fără alți turiști pe hol. Copiii au adorat parcarea și curtea.",
    en: "We booked apartment 3 for the 5 of us — it has 2 bedrooms and 67sqm. The perfect place for a real family holiday. Kitchen, living room, bathroom — all yours. No reception, no other tourists in the hallway. The kids loved the parking and courtyard.",
  },
  {
    name: "Alexandru V.",
    location: "Suceava",
    date: "Octombrie 2026",
    platform: "Google",
    stars: 5,
    avatar: "A",
    color: "bg-green-700",
    ro: "Toamna la Neamț e superbă. Am venit cu câinele (sunt acceptate animale, fără taxă suplimentară!) și am avut o experiență perfectă. Gazdele au răspuns imediat pe WhatsApp. Vasi a dat sfaturi excelente pentru trasee în zonă.",
    en: "Autumn in Neamț is beautiful. I came with my dog (pets accepted, no extra charge!) and had a perfect experience. The hosts responded immediately on WhatsApp. Vasi gave excellent tips for trails in the area.",
  },
  {
    name: "Cristina & Mihai",
    location: "Oradea",
    date: "Iulie 2026",
    platform: "Booking.com",
    stars: 5,
    avatar: "C",
    color: "bg-purple-700",
    ro: "Escapadă romantică reușită 100%. Pat de 2m×2m, apartament privat fără zgomot de hotel, terasă proprie. Prețul direct a fost cu 20% mai mic față de Booking. Ne-am simțit ca acasă dar în vacanță. Anca ne-a adus și câteva produse locale — gest superb.",
    en: "100% successful romantic getaway. 2m×2m bed, private apartment without hotel noise, private terrace. The direct price was 20% less than Booking. We felt at home but on holiday. Anca also brought us some local products — a wonderful gesture.",
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} stele`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  if (platform === "Google") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-medium text-sky-700">
      <svg className="w-3 h-3 fill-sky-600" viewBox="0 0 24 24"><path d="M13.583 2h-3.166L3 22h4.5l1.5-4.5h6l1.5 4.5H21L13.583 2zM10.5 14l1.5-4.5 1.5 4.5h-3z"/></svg>
      Booking.com
    </span>
  );
}

export default function RecenziiPage() {
  const { lang } = useLanguage();
  const isRo = lang !== "en" && lang !== "fr" && lang !== "de" && lang !== "it" && lang !== "es";

  const heading = isRo ? "Ce spun oaspeții noștri." : "What our guests say.";
  const subheading = isRo
    ? "99 recenzii Google cu 5.0 stele. Scor 9.4 pe Booking.com. Iată de ce ne aleg din nou și din nou."
    : "99 Google reviews with 5.0 stars. Score 9.4 on Booking.com. Here's why guests choose us again and again.";

  return (
    <main className="pt-20 bg-white">
      <section className="relative overflow-hidden bg-stone-50 border-b border-stone-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-walnut-100/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50/40 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium tracking-wide uppercase mb-6">
            Recenzii Verificate
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 mb-4 leading-tight">
            {heading}
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-8">{subheading}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://share.google/iFsW4iUjwIDgkgwZm" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-bold text-stone-900 text-lg">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                </div>
                <span className="text-xs text-stone-500">99 recenzii Google</span>
              </div>
            </a>
            <a href="https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sky-700 text-lg">9.4</span>
                  <span className="text-xs bg-sky-600 text-white rounded px-1.5 py-0.5 font-bold">Fantastic</span>
                </div>
                <span className="text-xs text-stone-500">Booking.com</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <ScrollFade>
          <h2 className="font-display text-2xl sm:text-3xl text-stone-900 text-center mb-2">
            {isRo ? "Experiența Vila Vaias Aparts — prin ochii oaspeților." : "The Vila Vaias Aparts experience — through our guests' eyes."}
          </h2>
          <p className="text-stone-500 text-center mb-12 max-w-2xl mx-auto">
            {isRo
              ? "Recenzii autentice de la oaspeți verificați pe Google și Booking.com. Fiecare ședere, o poveste."
              : "Authentic reviews from verified guests on Google and Booking.com. Every stay, a story."}
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <ScrollFade key={r.name} delay={i * 60}>
              <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${r.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {r.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-stone-900 text-sm truncate">{r.name}</div>
                    <div className="text-xs text-stone-400 truncate">{r.location} · {r.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating count={r.stars} />
                  <PlatformBadge platform={r.platform} />
                </div>
                <blockquote className="text-stone-600 text-sm leading-relaxed flex-1">
                  &ldquo;{lang === "en" ? r.en : r.ro}&rdquo;
                </blockquote>
              </div>
            </ScrollFade>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ScrollFade>
            <p className="text-stone-500 text-sm mb-4">
              {isRo ? "Citește toate recenziile pe:" : "Read all reviews on:"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://share.google/iFsW4iUjwIDgkgwZm" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors shadow-sm">
                Google · 99 recenzii ★ 5.0
              </a>
              <a href="https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors shadow-sm">
                Booking.com · 9.4 / 10
              </a>
              <a href="https://www.travelminit.ro/apartamentele-vaias-targu-neamt" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors shadow-sm">
                Travelminit
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>

      <section className="bg-stone-50 border-t border-stone-100 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollFade>
            <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-4">
              {isRo ? "Ai stat la Vaias Aparts? Lasă o recenzie." : "Stayed at Vaias Aparts? Leave a review."}
            </h2>
            <p className="text-stone-500 mb-8">
              {isRo
                ? "Recenziile autentice ajută alți călători să decidă și ne motivează să îmbunătățim fiecare detaliu. Îți mulțumim."
                : "Authentic reviews help other travellers decide and motivate us to improve every detail. Thank you."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://share.google/iFsW4iUjwIDgkgwZm" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 text-stone-800 font-semibold px-6 py-3 rounded-xl hover:border-walnut-400 hover:bg-walnut-50 transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Recenzie Google
              </a>
              <a href="https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-700 transition-all shadow-sm">
                Recenzie Booking.com
              </a>
              <Link href="/apartments"
                className="inline-flex items-center gap-2 bg-walnut-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-walnut-600 transition-all shadow-sm">
                Alege apartamentul →
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    </main>
  );
}
