import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trei experiențe unice | Vila Vaias Aparts",
  description:
    "Vila Vaias Aparts, Lacul Privat Nemțișor și Han Rustic — trei experiențe unice pentru o singură destinație în inima Moldovei. Descoperă-le pe toate.",
  openGraph: {
    title: "Trei experiențe unice. O singură destinație. — Vaias Aparts",
    description:
      "Vila boutique, lac privat de pescuit și restaurant tradițional moldovenesc — toate în zona Târgu Neamț, România.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Lacul privat Nemțișor — Vaias Aparts",
      },
    ],
  },
};

export default function ExperientsePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-forest-950">
        <Image
          src="https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=2400&q=80"
          alt="Moldova — peisaj de excepție"
          fill
          className="object-cover kenburns opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/50 to-forest-950" />

        <div className="relative container-x text-center pt-32 pb-24">
          <div className="eyebrow-light mb-6">Vila Vaias Aparts · Ecosistem</div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-50 text-balance max-w-4xl mx-auto leading-[1.0]">
            Trei experiențe unice.
            <span className="block font-display italic text-walnut-300 mt-2">
              O singură destinație.
            </span>
          </h1>

          <div className="divider-gold mt-10 mb-10" />

          <p className="font-serif text-xl md:text-2xl text-cream-100/80 max-w-2xl mx-auto leading-relaxed">
            O vilă boutique cu suflet moldovenesc, un lac privat ascuns în
            Nemțișor și un han cu gastronomie autentică. Toate la câteva minute
            distanță. Toate pentru dvs.
          </p>

          {/* Three pillar chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { label: "Vila Vaias Aparts", anchor: "#vila" },
              { label: "Lacul Privat Nemțișor", anchor: "#lac" },
              { label: "Han Rustic", anchor: "#han" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.anchor}
                className="rounded-full border border-cream-50/25 bg-forest-900/50 px-6 py-3 text-sm font-medium text-cream-100 hover:bg-walnut-700/80 hover:border-walnut-400/50 transition backdrop-blur-sm"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PILLAR 1: VILA ───────────────────────────────────────────── */}
      <section id="vila" className="section bg-cream-50">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
                  alt="Vila Vaias Aparts — exterior"
                  fill
                  className="object-cover card-lift"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
              </div>
              {/* Rating badge */}
              <div className="absolute -right-4 -bottom-4 hidden sm:flex flex-col items-center justify-center h-24 w-24 rounded-full bg-walnut-500 text-cream-50 shadow-card-hover">
                <span className="font-display text-2xl font-bold leading-none">4★</span>
                <span className="text-[10px] uppercase tracking-wider mt-1 text-cream-100/80">Boutique</span>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow text-walnut-500">Experiența 01</span>
                <span className="h-px flex-1 bg-walnut-300/30" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance mb-6">
                Vila Vaias Aparts
              </h2>
              <div className="divider-gold ml-0 mb-8" />
              <div className="space-y-5 text-stone-600 leading-relaxed">
                <p className="font-serif text-xl text-forest-800/80 leading-relaxed">
                  Șapte apartamente boutique cu personalitate proprie, fiecare
                  decorat cu grijă și materiale locale. Cazare de 4 stele la
                  marginea Târgu Neamț.
                </p>
                <p>
                  Aproape de Cetatea Neamț, de Mănăstirile Agapia, Văratec și
                  Neamț, dar și de Cheile Bicazului și Parcul Național Ceahlău.
                  Un punct de pornire perfect pentru orice drumeție spirituală
                  sau montană în Moldova.
                </p>
                <p>
                  Wi-Fi rapid, parcare privată, curte comună, lenjerie premium
                  și o echipă care cunoaște fiecare potecă din Neamț.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { n: "7", label: "Apartamente" },
                  { n: "4★", label: "Confort boutique" },
                  { n: "15 min", label: "până la Agapia" },
                  { n: "Targu Neamț", label: "margine de oraș" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-stone-100 px-5 py-4">
                    <div className="font-display text-xl text-forest-900">{s.n}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/apartments" className="btn-primary">
                  Vezi apartamentele
                </Link>
                <Link href="/rezervare" className="btn-secondary">
                  Verifică disponibilitatea
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ──────────────────────────────────────────────────── */}
      <div className="bg-cream-50 py-4">
        <div className="container-x">
          <div className="h-px bg-stone-200" />
        </div>
      </div>

      {/* ─── PILLAR 2: LAC ────────────────────────────────────────────── */}
      <section id="lac" className="section bg-forest-950 pattern-moldavian-dark overflow-hidden">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Text — left on large screens */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow-light text-walnut-400">Experiența 02</span>
                <span className="h-px flex-1 bg-walnut-500/20" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance mb-2">
                Lacul Privat Nemțișor
              </h2>
              <p className="font-display italic text-2xl text-walnut-300 mb-6">
                Refugiul Secret al Oaspeților Vaias
              </p>
              <div className="divider-gold ml-0 mb-8" />

              <div className="space-y-5">
                <p className="font-serif text-xl text-cream-100/80 leading-relaxed">
                  La 10 minute cu mașina de vilă, ascuns în satul Nemțișor,
                  există un lac privat la care nu ajunge nimeni altcineva. Nici
                  un alt competitor din regiune nu poate oferi asta.
                </p>
                <p className="text-cream-100/65 leading-relaxed">
                  Exclusiv pentru oaspeții Vaias Aparts, la cerere ca add-on.
                  Pescuit privat — crap, caras și alte specii. Spațiu de
                  grătar, peluză mare, intimitate completă. Nicio altă
                  prezență, nicio agitație — doar natura, lacul și liniștea.
                </p>
              </div>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Pescuit privat (crap, caras)",
                  "Facilități BBQ",
                  "Peluză mare",
                  "Intimitate completă",
                  "10 min de vilă",
                  "Exclusiv oaspeți Vaias",
                ].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-walnut-500/30 bg-forest-900/60 px-4 py-1.5 text-xs text-cream-100/75"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Exclusivity callout */}
              <div className="mt-10 rounded-2xl border border-walnut-500/30 bg-walnut-900/40 p-6">
                <div className="eyebrow text-walnut-400 mb-3">Avantaj exclusiv</div>
                <p className="text-sm text-cream-100/70 leading-relaxed">
                  Niciun alt operator din zona Neamțului nu oferă acces la un
                  lac privat ca add-on pentru oaspeți. Este unul dintre motivele
                  pentru care Vaias Aparts este o destinație unică în regiune.
                </p>
              </div>

              {/* Pricing + CTA */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <div>
                  <div className="eyebrow-light text-[10px] mb-1">Preț</div>
                  <div className="font-display text-lg text-cream-50">La cerere · Add-on</div>
                </div>
                <a
                  href="https://wa.me/40738345330?text=Bună%20ziua!%20Aș%20dori%20informații%20despre%20accesul%20la%20lacul%20privat%20Nemțișor."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Solicită accesul la lac
                </a>
              </div>
            </div>

            {/* Image — right on large screens */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1600&q=80"
                  alt="Lacul privat Nemțișor — liniște și natură"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />

                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl bg-forest-950/70 backdrop-blur-sm border border-cream-50/10 p-4">
                    <div className="eyebrow-light text-[10px] mb-1">Localizare</div>
                    <p className="font-display text-base text-cream-50">
                      Sat Nemțișor · 10 min de vilă
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-walnut-500/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-forest-700/10 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PILLAR 3: HAN RUSTIC ─────────────────────────────────────── */}
      <section id="han" className="section bg-walnut-900">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85"
                  alt="Han Rustic — gastronomie moldovenească"
                  fill
                  className="object-cover card-lift"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />

                {/* Coming soon badge over image */}
                <div className="absolute top-5 left-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cream-100/30 bg-forest-950/60 px-4 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-walnut-400 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cream-100/90 font-semibold">În curând</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow text-walnut-300">Experiența 03</span>
                <span className="h-px flex-1 bg-walnut-500/30" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance mb-2">
                Han Rustic
              </h2>
              <p className="font-display italic text-2xl text-walnut-300 mb-6">
                Gastronomia Moldovei Autentice
              </p>
              <div className="divider-gold ml-0 mb-8" />

              <div className="space-y-5">
                <p className="font-serif text-xl text-cream-100/80 leading-relaxed">
                  La 1km de centrul Târgu Neamț, în Sat Braniște, Han Rustic
                  este restaurantul tradițional cu care completăm tabloul.
                </p>
                <p className="text-cream-100/65 leading-relaxed">
                  Sarmale moldovenești, mămăligă cu brânză, tocăniță fragedă,
                  plăcintă poale-n brâu și vinuri de podgorie — rețete
                  transmise din generație în generație, gătite cu răbdare.
                </p>
                <p className="text-cream-100/65 leading-relaxed">
                  Hanul trece printr-un rebranding complet și se va relansa în
                  curând cu o față nouă, dar cu aceeași inimă moldovenească.
                </p>
              </div>

              {/* Quick facts */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Localizare", value: "Sat Braniște, Vânători-Neamț" },
                  { label: "Program", value: "Zilnic 9:00 – 22:00" },
                  { label: "Prețuri (est.)", value: "44 – 110 RON / pers." },
                  { label: "Telefon", value: "+40 752 388 388" },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl bg-forest-950/30 border border-cream-50/10 px-5 py-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-walnut-400/70 mb-1">{f.label}</div>
                    <div className="text-sm text-cream-100 font-medium">{f.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/han-rustic" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                  Descoperă Han Rustic
                </Link>
                <a href="/han-rustic#rezervare" className="btn-outline-light">
                  Faceți o rezervare
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="section bg-forest-950 pattern-moldavian-dark text-center">
        <div className="container-narrow">
          <div className="eyebrow-light mb-6">O destinație completă</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance mb-6">
            Rezervă și bucură-te de tot.
          </h2>
          <div className="divider-gold mb-8" />
          <p className="font-serif text-xl md:text-2xl text-cream-100/75 max-w-2xl mx-auto leading-relaxed mb-10">
            Un singur loc de cazare. Lac privat la 10 minute. Restaurant
            tradițional la 1km. Moldova — la pachet.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/rezervare" className="btn-primary text-base px-9 py-4">
              Rezervă acum
            </Link>
            <a
              href="https://wa.me/40738345330?text=Bună%20ziua!%20Aș%20dori%20informații%20despre%20un%20sejur%20la%20Vaias%20Aparts."
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light text-base px-9 py-4"
            >
              Întreabă pe WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
