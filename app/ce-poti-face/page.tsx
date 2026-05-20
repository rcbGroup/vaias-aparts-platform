import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import WalkingMap from "@/components/WalkingMap";
import { attractions, type Attraction } from "@/lib/attractions";
import {
  walkablePlaces,
  DRIVE5_SLUGS,
  DRIVE15_SLUGS,
  DRIVE30_SLUGS
} from "@/lib/local-attractions";

const PAGE_URL = "https://www.vaiasaparts.ro/ce-poti-face";

export const metadata: Metadata = {
  title: "Ce poți face în Târgu Neamț — la câțiva pași de Vaias Aparts",
  description:
    "Centrul vechi, sinagoga din 1870, muzeul de istorie, casa Veronica Micle, piața și parcul — toate la sub 15 minute pe jos. Iar la câteva minute cu mașina: Cetatea Neamț, rezervația de zimbri, mănăstirile Neamț, Agapia și Văratec. Ghid complet al lucrurilor de făcut din Vila Vaias Aparts.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "ro_RO",
    url: PAGE_URL,
    siteName: "Vila Vaias Aparts",
    title: "Ce poți face în Târgu Neamț — la câțiva pași de Vaias Aparts",
    description:
      "Tot ce poți vizita din Vila Vaias Aparts — pe jos, la câteva minute cu mașina sau în excursii de o zi.",
    images: [{ url: "/attractions/targu-neamt.jpg", width: 1200, height: 630, alt: "Târgu Neamț" }]
  }
};

function bySlug(slugs: string[]): Attraction[] {
  return slugs
    .map((s) => attractions.find((a) => a.slug === s))
    .filter((a): a is Attraction => Boolean(a));
}

export default function CePotiFacePage() {
  const drive5 = bySlug(DRIVE5_SLUGS);
  const drive15 = bySlug(DRIVE15_SLUGS);
  const drive30 = bySlug(DRIVE30_SLUGS);

  const stats = [
    { v: String(walkablePlaces.length), l: "locuri pe jos" },
    { v: "15 min", l: "centrul vechi & muzee" },
    { v: "10 min", l: "Cetatea Neamț" },
    { v: "1 h", l: "munți & chei" }
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ce poți face lângă Vila Vaias Aparts, Târgu Neamț",
    itemListElement: [
      ...walkablePlaces.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        description: `${p.description} (${p.time})`
      })),
      ...[...drive5, ...drive15, ...drive30].map((a, i) => ({
        "@type": "ListItem",
        position: walkablePlaces.length + i + 1,
        name: a.name,
        description: `${a.shortDescription} (${a.distance} · ${a.drivingTime})`
      }))
    ]
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Acasă", href: "/" }, { label: "Ce poți face" }]} />

      <PageHero
        eyebrow="Ce poți face"
        title="Tot ce ai nevoie — la câțiva pași."
        subtitle="Ultracentral în Târgu Neamț: centrul vechi, muzeele, piața și parcul pe jos — iar cetatea, zimbrii și mănăstirile la câteva minute cu mașina."
        image="/attractions/targu-neamt.jpg"
      />

      {/* QUICK STAT STRIP */}
      <section className="bg-stone-50 border-b border-stone-100 py-10">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl text-walnut-500">{s.v}</div>
              <div className="text-xs uppercase tracking-[0.28em] text-stone-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WALKING MAP */}
      <section className="section bg-stone-50 border-b border-stone-100">
        <div className="container-x">
          <SectionHeader
            eyebrow="Harta plimbărilor"
            title="La câțiva pași de poarta noastră."
            subtitle="Vila Vaias Aparts e în inima Târgu Neamțului. Treci cu mouse-ul peste fiecare punct pentru detalii — totul e la o plimbare scurtă."
          />
          <div className="mt-12">
            <WalkingMap />
          </div>
        </div>
      </section>

      {/* WALKING DISTANCE */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader
            eyebrow="Sub 15 minute pe jos"
            title="Orașul, la pas."
            subtitle="Centrul vechi, monumente, muzee, piața și magazinele — toate la o plimbare de la vilă."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {walkablePlaces.map((p) => (
              <div
                key={p.slug}
                className="card-lift h-full rounded-2xl bg-stone-50 border border-stone-100 p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl" aria-hidden>
                    {p.icon}
                  </div>
                  <span className="rounded-full bg-forest-100 text-forest-800 text-xs font-semibold px-3 py-1">
                    {p.time}
                  </span>
                </div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{p.name}</h3>
                <p className="text-sm text-stone-600 leading-relaxed flex-1">{p.description}</p>
                {p.address && (
                  <div className="mt-3 text-xs text-stone-500 uppercase tracking-wider">📍 {p.address}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVE TIERS */}
      <DriveTier
        eyebrow="5–15 minute cu mașina"
        title="Cetatea, zimbrii și mănăstirea Neamț."
        subtitle="Atracțiile-emblemă ale zonei, la o scurtă plimbare cu mașina."
        items={drive5}
        bg="bg-stone-50"
      />
      <DriveTier
        eyebrow="15–30 minute cu mașina"
        title="Mănăstirile Moldovei."
        subtitle="Agapia cu frescele lui Grigorescu, Văratec, Secu și Sihăstria — inima monahală a țării."
        items={drive15}
        bg="bg-cream-50"
      />
      <DriveTier
        eyebrow="30–60 minute cu mașina"
        title="Munți, chei și excursii de o zi."
        subtitle="Ceahlăul, Cheile Bicazului, Lacul Roșu, Durău și Piatra Neamț — pentru o zi întreagă de aventură."
        items={drive30}
        bg="bg-stone-50"
      />

      {/* CROSS LINKS */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Link
            href="/zone-turistice"
            className="group rounded-3xl bg-forest-800/40 border border-cream-200/15 p-8 hover:border-cream-200/40 transition"
          >
            <div className="eyebrow-light mb-3">Ghidul complet</div>
            <h3 className="font-display text-2xl md:text-3xl text-cream-50 mb-3">
              Zone turistice — descrieri detaliate
            </h3>
            <p className="text-cream-100/80 leading-relaxed">
              Povestea fiecărei mănăstiri, cetăți și muntelui din zonă, plus itinerarii de 3 zile.
            </p>
            <span className="mt-5 inline-block text-walnut-300 group-hover:text-walnut-200 transition">
              Vezi toate atracțiile →
            </span>
          </Link>
          <Link
            href="/istoria-orasului"
            className="group rounded-3xl bg-forest-800/40 border border-cream-200/15 p-8 hover:border-cream-200/40 transition"
          >
            <div className="eyebrow-light mb-3">Context</div>
            <h3 className="font-display text-2xl md:text-3xl text-cream-50 mb-3">
              Istoria orașului Târgu Neamț
            </h3>
            <p className="text-cream-100/80 leading-relaxed">
              De la cetatea lui Ștefan cel Mare la târgul multietnic și satul lui Creangă — povestea locului.
            </p>
            <span className="mt-5 inline-block text-walnut-300 group-hover:text-walnut-200 transition">
              Citește istoria →
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Stai în mijlocul a tot.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            Rezervă un apartament boutique, ultracentral — și pornește la pas spre tot ce are de oferit Târgu Neamț.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/rezervare" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              Rezervă acum
            </Link>
            <Link href="/apartments" className="btn-outline-light">
              Vezi apartamentele
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}

function DriveTier({
  eyebrow,
  title,
  subtitle,
  items,
  bg
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Attraction[];
  bg: string;
}) {
  return (
    <section className={`section ${bg}`}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <article
              key={a.slug}
              className="card-lift h-full rounded-2xl overflow-hidden bg-cream-50 border border-stone-100 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 rounded-full bg-cream-50/95 backdrop-blur px-3 py-1 text-xs font-medium text-forest-900 uppercase tracking-wider">
                  {a.distance} · {a.drivingTime}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="eyebrow mb-2">{a.category}</div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{a.name}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a.shortDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
