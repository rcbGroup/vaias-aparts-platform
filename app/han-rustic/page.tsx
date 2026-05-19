import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HanRusticForm from "@/components/HanRusticForm";

export const metadata: Metadata = {
  title: "Han Rustic — Gastronomia Moldovei Autentice | Vânători-Neamț",
  description:
    "Han Rustic în Sat Braniște, Com. Vânători-Neamț — bucătărie tradițională moldovenească autentică: sarmale, mămăligă, tocăniță, plăcinte și vinuri de podgorie. În curând — relansat.",
  openGraph: {
    title: "Han Rustic — Gastronomia Moldovei Autentice",
    description:
      "Restaurant tradițional moldovenesc în Sat Braniște, Vânători-Neamț. Sarmale, mămăligă, ciorbe, plăcinte și vinuri locale. Relansat în curând.",
    images: [
      {
        url: "/unsplash/experience-hanrustic.jpg",
        width: 1200,
        height: 630,
        alt: "Han Rustic — gastronomie moldovenească",
      },
    ],
  },
};

const menuItems = [
  {
    name: "Sarmale moldovenești",
    description: "Rulouri de varză murată cu carne de porc și orez, fierbe lent în zeamă de varză și smântână.",
    icon: "🥬",
  },
  {
    name: "Mămăligă cu brânză",
    description: "Mălai din boabe de porumb moldovenesc, servit cu brânză de oaie și smântână de sat.",
    icon: "🌽",
  },
  {
    name: "Tocăniță de porc",
    description: "Carne fragedă, sos de roșii cu cimbru și usturoi, gătită la foc mic după rețeta bunicii.",
    icon: "🍲",
  },
  {
    name: "Ciorbă de burtă",
    description: "Ciorbă consistentă acreată cu borș, smântânită, cu usturoi și ardei iute — o tradiție veche.",
    icon: "🫕",
  },
  {
    name: "Plăcintă poale-n brâu",
    description: "Plăcinta îndoită cu brânză dulce și stafide, coaptă în cuptor cu lemne — dulceața Moldovei.",
    icon: "🥐",
  },
  {
    name: "Vin local de podgorie",
    description: "Selecție de vinuri moldovenești din podgoriile locale — alb, roșu și roze din recoltele anului.",
    icon: "🍷",
  },
];

const amenities = [
  { label: "Program zilnic", value: "9:00 – 22:00" },
  { label: "Loc", value: "Sat Braniște, Com. Vânători-Neamț" },
  { label: "Telefon", value: "+40 752 388 388" },
  { label: "Terasă exterioară", value: "Da" },
  { label: "Card bancar", value: "Acceptat" },
  { label: "Acces persoane cu dizabilități", value: "Da" },
  { label: "Comenzi la pachet", value: "Disponibile" },
];

export default function HanRusticPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        {/* Background image */}
        <Image
          src="/unsplash/experience-hanrustic.jpg"
          alt="Han Rustic — gastronomie moldovenească"
          fill
          className="object-cover object-center kenburns"
          priority
          sizes="100vw"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/40 to-transparent" />

        {/* Content */}
        <div className="relative container-x pb-20 md:pb-28 lg:pb-36 pt-48">
          {/* Coming soon badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-cream-200/30 bg-forest-950/50 px-5 py-2 mb-8 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-walnut-400 animate-pulse" />
            <span className="eyebrow-light text-[11px]">În curând &mdash; Coming Soon</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-50 text-balance max-w-4xl leading-[1.0] mb-6">
            Han Rustic
          </h1>

          <div className="divider-gold mb-6 ml-0" />

          <p className="font-display italic text-2xl md:text-3xl text-cream-100/90 max-w-2xl leading-snug mb-4">
            Gastronomia Moldovei Autentice
          </p>

          <p className="font-serif text-lg md:text-xl text-cream-100/75 max-w-xl leading-relaxed">
            La 1km de centrul Târgu Neamț, unde dealurile verzi se întâlnesc cu
            aroma sarmălelor și vinul nou de podgorie.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#rezervare" className="btn-primary text-base px-8 py-4">
              Faceți o rezervare
            </a>
            <a href="#despre" className="btn-outline-light text-base px-8 py-4">
              Descoperă hanul
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-950 to-transparent" />
      </section>

      {/* ─── INTRO BAND ───────────────────────────────────────────────── */}
      <section className="bg-forest-950 py-14">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-3 text-center md:text-left">
            {[
              { label: "Localizare", value: "Sat Braniște, Vânători-Neamț" },
              { label: "Telefon", value: "+40 752 388 388" },
              { label: "Program (când e deschis)", value: "Zilnic 9:00 – 22:00" },
            ].map((item) => (
              <div key={item.label} className="border-l border-walnut-500/30 pl-5">
                <div className="eyebrow-light mb-1">{item.label}</div>
                <div className="font-display text-lg text-cream-100">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────────────── */}
      <section id="despre" className="section bg-forest-950 pattern-moldavian-dark">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Text */}
            <div>
              <div className="eyebrow-light mb-4">Despre han</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance mb-8">
                Locul unde Moldova&nbsp;se&nbsp;gustă,
                nu&nbsp;doar&nbsp;se&nbsp;vizitează.
              </h2>
              <div className="divider-gold ml-0 mb-8" />
              <div className="space-y-5 font-serif text-xl text-cream-100/80 leading-relaxed">
                <p>
                  La 1km de centrul Târgu Neamț, în Sat Braniște, acolo unde drumul
                  te poartă printre dealuri verzi, se înalță Han Rustic — un loc cu
                  rădăcini adânci în gastronomia Moldovei autentice.
                </p>
                <p>
                  Sarmale fierte lent, mămăligă din mălai de sat, tocăniță fragedă,
                  plăcintă poale-n brâu cu brânză dulce și stafide, ciorbe acrite
                  cu borș și vinuri de podgorie — fiecare fel de mâncare poartă în
                  el memoria unui sat, a unei gospodine, a unui anotimp.
                </p>
                <p>
                  Hanul trece printr-un proces de rebranding complet. Relansat în
                  curând, cu o față nouă, dar cu aceeași inimă moldovenească.
                </p>
              </div>

              {/* Sadoveanu quote */}
              <blockquote className="mt-10 border-l-2 border-walnut-500 pl-6">
                <p className="font-serif italic text-xl text-cream-100/70 leading-relaxed">
                  „Aproape de locul unde Mihail Sadoveanu poposea la han după
                  drumurile lungi prin Moldova — o moștenire de ospitalitate și gust
                  pe care o purtăm mai departe."
                </p>
                <footer className="mt-3 eyebrow-light text-walnut-400/80">
                  Tradiție locală · Sat Braniște, Vânători-Neamț
                </footer>
              </blockquote>
            </div>

            {/* Image stack */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/unsplash/experience-hanrustic.jpg"
                  alt="Bucătărie tradițională moldovenească"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
              </div>
              {/* Floating amenities card */}
              <div className="absolute -bottom-6 -left-6 hidden lg:block bg-walnut-900 rounded-2xl p-6 shadow-card max-w-[220px]">
                <div className="eyebrow text-walnut-300 mb-3">Facilități</div>
                <ul className="space-y-2">
                  {["Terasă exterioară", "Card acceptat", "Acces dizabilități", "Comenzi la pachet"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-cream-100">
                      <span className="text-walnut-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MENU PREVIEW ─────────────────────────────────────────────── */}
      <section className="section bg-walnut-900">
        <div className="container-x">
          <div className="text-center mb-14">
            <div className="eyebrow text-walnut-300 mb-4">Meniu · Previzualizare</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              Gusturile Moldovei, pe farfurie.
            </h2>
            <p className="mt-5 font-serif text-xl text-cream-100/70 max-w-2xl mx-auto leading-relaxed">
              Rețete transmise din generație în generație, ingrediente locale,
              gătit cu răbdare și dragoste. Meniu complet — în curând.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="card-lift rounded-2xl border border-cream-50/10 bg-forest-950/40 p-7 flex flex-col gap-4"
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="font-display text-xl text-cream-50 mb-2">{item.name}</h3>
                  <p className="text-sm text-cream-100/65 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 eyebrow text-walnut-400/70">
            Prețuri: 44 – 110 RON / persoană (estimativ la redeschidere)
          </p>
        </div>
      </section>

      {/* ─── LOCATION ─────────────────────────────────────────────────── */}
      <section className="section bg-forest-950">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center">
            <div className="eyebrow-light mb-4">Localizare</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance mb-8">
              La 1km de centrul Târgu Neamț.
            </h2>
            <div className="divider-gold mb-8" />
            <p className="font-serif text-xl text-cream-100/75 leading-relaxed mb-10">
              Sat Braniște, Com. Vânători-Neamț &mdash; pe drumul dintre Târgu Neamț
              și Mănăstirile Agapia și Văratec. Un popas firesc pe orice traseu
              moldovenesc.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-10">
              {[
                { from: "Centrul Târgu Neamț", distance: "~1 km" },
                { from: "Mănăstirea Neamț", distance: "~8 km" },
                { from: "Mănăstirea Agapia", distance: "~15 km" },
              ].map((d) => (
                <div key={d.from} className="rounded-xl border border-cream-50/10 bg-forest-900/40 p-5 text-center">
                  <div className="font-display text-2xl text-walnut-300 mb-1">{d.distance}</div>
                  <div className="text-sm text-cream-100/60">{d.from}</div>
                </div>
              ))}
            </div>
            <a
              href="https://maps.google.com/?q=Han+Rustic+Braniste+Vanatori+Neamt"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              Deschide în Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ─── RESERVATION FORM ─────────────────────────────────────────── */}
      <section id="rezervare" className="section bg-forest-900 pattern-moldavian-dark">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            {/* Left: intro */}
            <div className="lg:sticky lg:top-32">
              <div className="eyebrow-light mb-4">Rezervare</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance mb-6">
                Faceți o rezervare.
              </h2>
              <div className="divider-gold ml-0 mb-8" />
              <p className="font-serif text-xl text-cream-100/75 leading-relaxed mb-8">
                Trimiteți cererea de rezervare și vă confirmăm disponibilitatea
                în cel mai scurt timp. Grupuri mici și mari, evenimente private,
                mese festive.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-walnut-500/40 bg-walnut-900/50 text-walnut-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 12 19.79 19.79 0 01.22 3.18 2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="eyebrow-light text-[10px] mb-0.5">Telefon & WhatsApp</div>
                    <a href="tel:+40752388388" className="font-display text-lg text-cream-100 hover:text-walnut-300 transition">
                      +40 752 388 388
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-walnut-500/40 bg-walnut-900/50 text-walnut-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="eyebrow-light text-[10px] mb-0.5">Program zilnic</div>
                    <span className="font-display text-lg text-cream-100">9:00 – 22:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl border border-cream-50/10 bg-forest-950/60 p-8 md:p-10 backdrop-blur-sm">
              <HanRusticForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── VAIAS LINK ───────────────────────────────────────────────── */}
      <section className="bg-walnut-900 py-16">
        <div className="container-narrow text-center">
          <div className="eyebrow text-walnut-300 mb-4">Parte din ecosistemul Vaias</div>
          <h2 className="font-display text-3xl md:text-4xl text-cream-50 text-balance mb-5">
            Han Rustic este restaurantul oficial al Vila Vaias Aparts.
          </h2>
          <p className="font-serif text-xl text-cream-100/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Oaspeții vilei beneficiază de acces prioritar și mese la han. O destinație completă.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apartments" className="btn-primary">
              Vezi apartamentele
            </Link>
            <Link href="/experiente" className="btn-outline-light">
              Toate experiențele
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
