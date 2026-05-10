import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Despre noi | Vila Vaias Aparts — Cazare Boutique în Târgu Neamț",
  description:
    "Vila Vaias Aparts — 7 apartamente boutique ultracentral în Târgu Neamț, clasificare 4 stele, certificat nr. 35332. Ospitalitate autentică moldovenească."
};

const values = [
  {
    title: "Ospitalitate autentică",
    text: "Nu suntem un hotel cu recepție — suntem o casă deschisă. Self check-in, comunicare directă pe WhatsApp și libertatea unui apartament propriu, cu toate avantajele unui sejur de calitate."
  },
  {
    title: "Detalii care contează",
    text: "Pat Emperor 2m×2m cu lenjerie moale, Smart TV, WiFi rapid, prosoave curate, CCTV 24/7 — fiecare detaliu gândit pentru confortul și liniștea dvs."
  },
  {
    title: "Locație rară în Târgu Neamț",
    text: "Ultracentral în Târgu Neamț, la poalele Cetății Neamțului. La câteva minute de Agapia și Văratec, la o oră de Ceahlău. Parcare gratuită în curtea vilei."
  },
  {
    title: "Transparență și corectitudine",
    text: "Clasificare oficială 4 stele, certificat nr. 35332. Factură fiscală disponibilă. Comunicare directă — fără intermediari."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Cine suntem"
        title="Vila Vaias Aparts — o casă deschisă în inima Moldovei."
        subtitle="7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Clasificare oficială 4 stele."
        image="https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg"
      />

      {/* STORY */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow text-center mb-4">Povestea noastră</div>
          <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-center text-balance">
            Ce este Vila Vaias Aparts?
          </h2>
          <div className="divider-gold my-7" />
          <div className="space-y-6 font-serif text-lg md:text-xl text-forest-800/90 leading-relaxed">
            <p>
              Vila Vaias Aparts este o proprietate de apartamente boutique situată ultracentral în
              Târgu Neamț, la Str. Sfântul Lazăr nr. 1 — în inima orașului, la poalele pădurii de
              sub Cetatea Neamțului. Suntem la câteva minute de Agapia și Văratec, la o oră de
              Ceahlău și în mijlocul uneia dintre cele mai frumoase zone istorice și naturale din
              Moldova.
            </p>
            <p>
              Vila noastră cuprinde 7 apartamente boutique independente, amenajate cu atenție pentru
              confort, liniște și ospitalitate autentică. Fiecare apartament are pat Emperor de
              2m×2m, Smart TV, WiFi gratuit de mare viteză, baie privată, lenjerie și prosoave de
              calitate și terasă privată. Toate apartamentele sunt dotate cu bucătărie proprie
              complet utilată — cu excepția Apartamentului 7, care beneficiază de acces direct la
              Bucătăria pentru Toți, bucătăria comună a vilei.
            </p>
            <p>
              CCTV 24/7 în zonele comune, parcare gratuită în curtea vilei, self check-in cu ghidaj
              complet, animale de companie acceptate la cerere fără cost suplimentar, factură fiscală
              disponibilă la cerere — toate gândite pentru confortul și liniștea oaspeților noștri.
            </p>
          </div>
        </div>
      </section>

      {/* CLASSIFICATION */}
      <section className="section bg-stone-50">
        <div className="container-narrow">
          <div className="rounded-2xl border border-walnut-200 bg-walnut-50 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-walnut-100 text-walnut-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2l2.5 5.5L20 9l-4 4 1 6.5L12 16l-5 3.5L8 13 4 9l5.5-1.5L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-2xl text-forest-900">Clasificare oficială</h3>
                <p className="text-walnut-600 mt-1">Recunoscuți de Ministerul Turismului din România</p>
              </div>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">Tip unitate</dt>
                <dd className="font-medium text-forest-900">Apartamente de Închiriat, 4 stele</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">Certificat</dt>
                <dd className="font-medium text-forest-900">Nr. 35332, emis la data de 20.07.2023</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">Societate</dt>
                <dd className="font-medium text-forest-900">VAIA RUSTIC SRL · CUI 36258605 · J27/603/2016</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">Sediu înregistrat</dt>
                <dd className="font-medium text-forest-900">
                  Str. Ștefan cel Mare Nr. 46, sat Nemțișor, Com. Vânători-Neamț, Jud. Neamț
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader
            eyebrow="Valorile noastre"
            title="Ce ne definește ca proprietate boutique."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-8"
              >
                <div className="font-display text-5xl text-walnut-500/40 mb-3">{`0${i + 1}`}</div>
                <h3 className="font-display text-2xl text-forest-900 mb-3">{v.title}</h3>
                <p className="text-stone-600 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50">
            Rezervă direct, fără intermediari.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            Rezervă direct pe WhatsApp: +40 752 388 388
          </p>
          <p className="mt-2 font-serif text-lg text-cream-100/80">
            Sau verifică disponibilitatea live pe 5StarDesk
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="https://wa.me/40752388388"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
            >
              WhatsApp
            </Link>
            <Link
              href="https://www.5stardesk.net/b/vaias-aparts"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              Verifică disponibilitatea
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
