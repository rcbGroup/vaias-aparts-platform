import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";

const PAGE_URL = "https://www.vaiasaparts.ro/istoria-orasului";

export const metadata: Metadata = {
  title: "Istoria orașului Târgu Neamț — cetate, târg și mănăstiri",
  description:
    "Povestea Târgu Neamțului: numele venit din „târg” și din germanicul „Német”, cetatea ridicată în secolul XIV și întărită de Ștefan cel Mare, târgul multietnic de negustori, cea mai mare densitate de mănăstiri ortodoxe din România, satul lui Ion Creangă și rezervația de zimbri din Vânători-Neamț.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    locale: "ro_RO",
    url: PAGE_URL,
    siteName: "Vila Vaias Aparts",
    title: "Istoria orașului Târgu Neamț",
    description:
      "Cetate, târg multietnic, țara mănăstirilor și satul lui Creangă — povestea unui loc care răsplătește pe cei care ascultă.",
    images: [{ url: "/attractions/cetatea-neamt.jpg", width: 1200, height: 630, alt: "Cetatea Neamț" }]
  }
};

const SECTIONS: { eyebrow: string; title: string; paragraphs: string[] }[] = [
  {
    eyebrow: "Numele",
    title: "Târg și „Neamț”",
    paragraphs: [
      "„Târgu” înseamnă, simplu, loc de târg — locul unde oamenii se adunau să cumpere și să vândă. Acesta a fost dintotdeauna sufletul așezării: un punct de schimb la întâlnirea drumurilor din nordul Moldovei.",
      "Partea a doua a numelui, „Neamț”, vine cel mai probabil din germanicul „Német” — denumirea dată coloniștilor germani, asociată în tradiția locală și cu cavalerii teutoni. Astfel, chiar în numele orașului se citește o întâlnire de lumi: negoțul românesc și prezența străină, târgul și cetatea."
    ]
  },
  {
    eyebrow: "Cetatea",
    title: "Orașul crescut la umbra cetății",
    paragraphs: [
      "Târgu Neamț s-a dezvoltat în jurul Cetății Neamț, ridicată în secolul al XIV-lea și întărită apoi de Ștefan cel Mare, care i-a adăugat zidul de incintă și bastioanele. De pe culmea ei, cetatea veghea valea Ozanei și drumurile spre munte — un avanpost al Moldovei medievale.",
      "La poalele cetății, târgul a devenit un nod comercial pestriț, unde negustori români, armeni și greci își țineau prăvăliile cot la cot. Această diversitate a lăsat urme până azi: case vechi din secolele XVIII–XIX, o sinagogă din 1870, un centru istoric care încă păstrează ritmul vechiului târg."
    ]
  },
  {
    eyebrow: "Spiritualitate",
    title: "Țara mănăstirilor",
    paragraphs: [
      "Ținutul Neamțului are cea mai mare concentrare de mănăstiri ortodoxe din România. La numai câțiva kilometri unele de altele se află Mănăstirea Neamț — cea mai veche și mai importantă vatră monahală a Moldovei, leagăn al tiparului și al culturii medievale —, apoi Agapia, Văratec, Secu, Sihăstria și Bistrița.",
      "Pentru pelerini și pentru cei care caută doar liniște, zona este un fel de Athos românesc: păduri de fag, schituri ascunse, izvoare și clopote care marchează ceasurile zilei. Vila Vaias Aparts stă chiar în mijlocul acestui ținut."
    ]
  },
  {
    eyebrow: "Ion Creangă",
    title: "Satul marelui povestitor",
    paragraphs: [
      "În Humulești — astăzi parte din Târgu Neamț — s-a născut Ion Creangă, cel mai îndrăgit povestitor al românilor. Aici a trăit copilăria pe care avea s-o așeze în „Amintiri din copilărie”, cartea pe care generații întregi au citit-o la școală.",
      "Casa lui memorială, joasă, cu prispă albă, a rămas aproape neschimbată. O vizită aici e o întoarcere în lumea lui Nică a lui Ștefan a Petrei — vatra, leagănul, vișinul din curte și aerul unui sat de altădată."
    ]
  },
  {
    eyebrow: "Natură",
    title: "Zimbrii s-au întors acasă",
    paragraphs: [
      "În Parcul Natural Vânători-Neamț trăiește, din 2012, o turmă de zimbri europeni — simbolul Moldovei medievale, readus aici după ce specia dispăruse din sălbăticie. Rezervația „Dragoș Vodă” oferă una dintre puținele șanse din țară de a vedea de aproape acest animal impunător.",
      "Pădurea, observatoarele și traseele fac din vizită o experiență minunată pentru familii și copii — și încheie firesc povestea unui loc unde istoria, credința și natura se țin de mână."
    ]
  }
];

export default function IstoriaOrasuluiPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Istoria orașului Târgu Neamț",
    about: {
      "@type": "Place",
      name: "Târgu Neamț",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Târgu Neamț",
        addressRegion: "Neamț",
        addressCountry: "RO"
      }
    },
    author: { "@type": "Organization", name: "Vila Vaias Aparts" },
    publisher: {
      "@type": "Organization",
      name: "Vila Vaias Aparts",
      url: "https://www.vaiasaparts.ro"
    },
    mainEntityOfPage: PAGE_URL
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Acasă", href: "/" }, { label: "Istoria orașului" }]} />

      <PageHero
        eyebrow="Istoria orașului"
        title="Târgu Neamț — cetate, târg și mănăstiri."
        subtitle="O așezare crescută la umbra unei cetăți medievale, în cel mai bogat ținut monahal al României."
        image="/attractions/cetatea-neamt.jpg"
      />

      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="space-y-16">
            {SECTIONS.map((s) => (
              <article key={s.title}>
                <div className="eyebrow mb-3">{s.eyebrow}</div>
                <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-balance mb-5">
                  {s.title}
                </h2>
                <div className="space-y-4 font-serif text-lg text-forest-800/90 leading-relaxed">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Pull quote */}
          <blockquote className="mt-16 rounded-3xl bg-forest-900 text-cream-50 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
            <p className="relative font-display text-2xl md:text-4xl leading-snug text-balance">
              „Târgu Neamț nu este un loc zgomotos. Este un loc care răsplătește pe cei care ascultă.”
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Vino să asculți povestea pe viu.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            Cazare boutique ultracentrală, la câțiva pași de centrul vechi și la zece minute de cetate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/ce-poti-face" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              Ce poți face aici
            </Link>
            <Link href="/rezervare" className="btn-outline-light">
              Rezervă apartament
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  );
}
