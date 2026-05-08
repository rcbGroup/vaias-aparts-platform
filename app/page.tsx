import Image from "next/image";
import Link from "next/link";
import { apartments } from "@/lib/apartments";
import { attractions } from "@/lib/attractions";
import { reviews } from "@/lib/reviews";
import ApartmentCard from "@/components/ApartmentCard";
import SectionHeader from "@/components/SectionHeader";
import StarRating from "@/components/StarRating";

export default function HomePage() {
  const featured = apartments.slice(0, 4);
  const featuredAttractions = attractions.slice(0, 6);
  const homeReviews = reviews.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-forest-950">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
          alt="Vedere către dealurile Moldovei la apusul soarelui"
          fill
          priority
          sizes="100vw"
          className="object-cover kenburns"
        />
        <div className="absolute inset-0 bg-hero-grad" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-x">
            <div className="max-w-3xl text-cream-50 animate-slide-up">
              <div className="eyebrow-light mb-6">Boutique · 4 stele · Țara de Sus</div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] text-cream-50 text-balance">
                Apartamente cu suflet,<br className="hidden md:block" /> la marginea poveștii.
              </h1>
              <p className="mt-7 font-serif text-xl md:text-2xl text-cream-100/90 max-w-2xl leading-relaxed">
                Vaias Aparts — patru apartamente boutique între dealurile Moldovei,
                la doi pași de mănăstirile Agapia și Văratec, Cetatea Neamț și Masivul Ceahlău.
              </p>
              <p className="mt-3 italic font-serif text-lg text-cream-100/70">
                Boutique apartments with genuine Moldavian soul, near Târgu Neamț.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/apartments" className="btn-primary">
                  Descoperă apartamentele
                </Link>
                <Link href="/rezervare" className="btn-outline-light">
                  Rezervă acum
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-50/70 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
            <span className="block h-10 w-px bg-cream-100/50" />
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="bg-cream-50 py-14 border-b border-stone-100">
        <div className="container-x grid gap-8 md:grid-cols-4 text-center">
          {[
            { v: "4", l: "Apartamente boutique" },
            { v: "4★", l: "Standard rafinat" },
            { v: "8+", l: "Atracții la 1 oră" },
            { v: "4.9", l: "Rating mediu oaspeți" }
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl text-walnut-500 mb-1">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED APARTMENTS */}
      <section id="apartamente" className="section bg-stone-50">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeader
              align="left"
              eyebrow="Apartamentele noastre"
              title="Patru spații, o singură promisiune."
              subtitle="Fiecare apartament poartă numele unui loc drag al Moldovei și păstrează povestea lui în texturi, lumină și detalii."
            />
            <Link href="/apartments" className="btn-secondary self-start md:self-end shrink-0">
              Vezi toate
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-2">
            {featured.map((a, i) => (
              <ApartmentCard key={a.slug} apartment={a} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=1200&q=85"
                alt="Curtea de la Mănăstirea Agapia"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 hidden md:block w-56 aspect-square rounded-2xl overflow-hidden shadow-card border-8 border-cream-50">
              <Image
                src="https://images.unsplash.com/photo-1502780402662-acc01917ddc5?auto=format&fit=crop&w=600&q=85"
                alt="Detaliu de țesătură moldovenească"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">Povestea noastră</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              O casă deschisă, între munte și mănăstiri.
            </h2>
            <div className="mt-7 space-y-5 font-serif text-lg text-forest-800/90 leading-relaxed">
              <p>
                Vaias Aparts s-a născut din dorul de a împărți cu cei dragi un colț de lume
                care ne-a crescut. Aici, lângă Târgu Neamț, dealurile coboară încet către
                Ozana — râul lui Creangă — iar clopotele de la Agapia și Văratec se aud
                seara peste livezi.
              </p>
              <p>
                Am amenajat patru apartamente boutique cu lemn cald de nuc, var natural,
                lenjerii moi și cu fiecare detaliu gândit pentru a vă face să rămâneți
                puțin mai mult — cu încă o cafea, încă o seară, încă un drum până la
                cetate.
              </p>
              <p className="italic text-forest-700">
                „Genul de loc unde te miri cum de timpul s-a oprit pentru tine."
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/despre-noi" className="btn-secondary">
                Citește mai mult
              </Link>
              <Link href="/contact" className="btn-primary">
                Vorbește cu noi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AREA HIGHLIGHTS */}
      <section className="section bg-forest-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=85"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container-x relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="eyebrow-light mb-4">Țara de Sus</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              O lume întreagă, la o oră de mașină.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
              Mănăstirile pictate, cetățile lui Ștefan, munții cu legende și cheile sculptate
              de ape — totul vă așteaptă chiar de la poarta noastră.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredAttractions.map((a) => (
              <Link
                key={a.slug}
                href="/zone-turistice"
                className="group block rounded-2xl overflow-hidden bg-forest-800/40 border border-cream-200/10 hover:border-cream-200/30 transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/zone-turistice" className="btn-outline-light">
              Toate atracțiile zonei
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader
            eyebrow="Cuvinte ale oaspeților noștri"
            title="O casă pe care o lași cu greu."
            subtitle="Recenzii reale de pe Google, TripAdvisor și Booking — sau direct de la oamenii care au revenit."
          />

          <div className="mt-16 grid gap-7 md:grid-cols-3">
            {homeReviews.map((r, i) => (
              <article
                key={i}
                className="rounded-2xl bg-stone-50 border border-stone-100 p-8 shadow-soft flex flex-col"
              >
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
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/recenzii" className="btn-secondary">
              Toate recenziile
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
        <div className="container-narrow relative text-center text-cream-50">
          <div className="eyebrow-light mb-4">Booking direct</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance">
            Cel mai bun preț — direct de la noi.
          </h2>
          <p className="mt-6 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
            Rezervă direct prin telefon sau WhatsApp și primești 5% reducere față de orice
            altă platformă, plus opțiunea de check-out târziu — gratuit, în limita
            disponibilității.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/40740000000" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              WhatsApp
            </a>
            <a href="tel:+40740000000" className="btn-outline-light">
              +40 740 000 000
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
