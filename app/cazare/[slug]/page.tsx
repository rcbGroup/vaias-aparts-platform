import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  landingPages,
  getLandingPageBySlug
} from "@/lib/landing-pages";
import { apartments } from "@/lib/apartments";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getLandingPageBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.meta.title,
    description: p.meta.description,
    keywords: p.meta.keywords,
    alternates: {
      canonical: `https://www.vaiasaparts.ro/cazare/${params.slug}`
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      url: `https://www.vaiasaparts.ro/cazare/${params.slug}`,
      siteName: "Vila Vaias Aparts",
      title: p.meta.title,
      description: p.meta.description,
      images: [{ url: p.hero.image, width: 1200, height: 630, alt: p.hero.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: p.meta.title,
      description: p.meta.description,
      images: [p.hero.image]
    }
  };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingPageBySlug(params.slug);
  if (!page) notFound();

  const whatsappUrl = `https://wa.me/40752388388?text=${encodeURIComponent(page.whatsappMessage)}`;
  const sampleApartments = apartments.slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.meta.title,
    description: page.meta.description,
    image: page.hero.image,
    author: { "@type": "Organization", name: "Vila Vaias Aparts" },
    publisher: {
      "@type": "Organization",
      name: "Vila Vaias Aparts",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_11.jpg"
      }
    },
    mainEntityOfPage: `https://www.vaiasaparts.ro/cazare/${params.slug}`
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Acasă", href: "/" },
          { label: "Cazare", href: "/cazare" },
          { label: page.hero.eyebrow }
        ]}
      />

      {/* HERO */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-forest-950 pt-8 pb-16">
        <Image
          src={page.hero.image}
          alt={page.hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-forest-950/55 to-forest-950/90" />
        <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
        <div className="relative container-x text-cream-50">
          <div className="eyebrow-light mb-4">{page.hero.eyebrow}</div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-cream-50 max-w-4xl text-balance">
            {page.hero.title}
          </h1>
          <p className="mt-6 font-serif text-xl md:text-2xl text-cream-100/95 max-w-3xl leading-relaxed">
            {page.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 items-center text-sm text-cream-100/80">
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1">⭐ 9.4 Booking.com</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1">⭐ 5.0 · 99 Google</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1">🏛 4 stele · Cert. 35332</span>
            {page.distance !== "—" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/10 border border-cream-50/20 px-3 py-1">📍 {page.distance} · {page.drivingTime}</span>
            )}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              💬 {page.primaryCTA}
            </a>
            <a href="tel:+40752388388" className="btn-outline-light">
              📞 +40 752 388 388
            </a>
            <Link href="/apartments" className="btn-outline-light">
              Vezi cele 7 apartamente
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-5xl text-forest-900 text-balance">
            {page.intro.heading}
          </h2>
          <div className="mt-8 space-y-5 font-serif text-lg text-forest-800/90 leading-relaxed">
            {page.intro.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">Ce găsești la Vila Vaias Aparts</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900">
              Confortul gândit pentru oaspeții tăi
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl bg-cream-50 border border-stone-100 p-6 card-lift"
              >
                <div className="text-3xl mb-4" aria-hidden>{h.icon}</div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{h.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">De ce să alegi rezervare directă</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10">
            Avantajele rezervării directe la Vaias Aparts
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {page.whyChoose.map((w) => (
              <div key={w.title} className="rounded-2xl border border-stone-200 p-6 bg-stone-50/60">
                <h3 className="font-display text-xl text-forest-900 mb-2">{w.title}</h3>
                <p className="text-forest-700/85 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-forest-900 text-cream-50 p-8 text-center">
            <p className="font-serif text-lg text-cream-100/90 max-w-2xl mx-auto">
              {page.bookingPitch}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                💬 WhatsApp +40 752 388 388
              </a>
              <a href="tel:+40752388388" className="btn-outline-light">
                📞 Sună acum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENT TEASER */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="eyebrow mb-3">Apartamentele</div>
              <h2 className="font-display text-3xl md:text-4xl text-forest-900">
                7 apartamente boutique — alege-l pe al tău
              </h2>
            </div>
            <Link href="/apartments" className="btn-secondary shrink-0 self-start md:self-end">
              Vezi toate cele 7 apartamente
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {sampleApartments.map((a) => (
              <Link
                key={a.slug}
                href={`/apartments/${a.slug}`}
                className="group block rounded-2xl overflow-hidden bg-cream-50 border border-stone-100 card-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={a.heroImage}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.28em] text-walnut-500 mb-2">{a.view}</div>
                  <h3 className="font-display text-xl text-forest-900 mb-1">{a.name}</h3>
                  <p className="text-sm text-stone-600 mb-3">{a.tagline}</p>
                  <div className="text-walnut-600 font-display text-lg">
                    de la {a.pricePerNightRON} RON
                    <span className="text-sm text-stone-500 font-sans">/noapte</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">În apropiere</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-8">
            Ce vizitezi de la Vila Vaias Aparts
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {page.nearby.map((n) => (
              <li
                key={n}
                className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-4"
              >
                <span className="text-walnut-500 mt-1">📍</span>
                <span className="text-forest-800">{n}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/zone-turistice" className="btn-secondary">
              Explorează toate atracțiile din zonă
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-stone-50">
        <div className="container-narrow">
          <div className="eyebrow mb-3">Întrebări frecvente</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10">
            Ce întreabă oaspeții noștri
          </h2>
          <div className="space-y-4">
            {page.faqs.map((f, i) => (
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
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-walnut-900">
        <div className="absolute inset-0 opacity-30">
          <Image src={page.hero.image} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 pattern-moldavian-dark opacity-50 pointer-events-none" />
        <div className="container-narrow relative text-center text-cream-50">
          <div className="eyebrow-light mb-4">Rezervare directă</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance">
            Apartamentele se ocupă rapid — rezervă acum.
          </h2>
          <p className="mt-6 font-serif text-xl text-cream-100/90 max-w-2xl mx-auto">
            Confirmare în câteva ore între 08:00 și 22:00. Avans 30%, rest la check-in. Animale acceptate, parcare gratuită.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              💬 {page.primaryCTA}
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
              Verifică disponibilitate live
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
