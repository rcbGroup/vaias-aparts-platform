import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Despre noi — povestea Vaias Aparts",
  description:
    "Familia Vaia, o casă pe valea Ozanei, patru apartamente boutique. Citește povestea noastră, valorile și ce ne mână mai departe."
};

const values = [
  {
    title: "Ospitalitate adevărată",
    text:
      "Nu suntem o pensiune — suntem o casă. Vă întâmpinăm cu cafea, vă recomandăm trasee, vă lăsăm singuri când aveți nevoie. Totul natural."
  },
  {
    title: "Detalii care contează",
    text:
      "Lenjeria de bumbac fin, săpunurile de casă, cafeaua bună de dimineață, o sticlă de vin moldovenesc la sosire. Lucruri mici care fac diferența."
  },
  {
    title: "Local înainte de toate",
    text:
      "Mâncare cumpărată din târgul de sâmbătă, miere de la apicultorul din Pipirig, vin de Cotnari. Sprijinim oamenii care țin vie zona asta."
  },
  {
    title: "Liniște și intimitate",
    text:
      "Apartamente independente, fără recepție, fără zgomot. Veniți, vă instalați, redescoperiți timpul lent al Moldovei."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Cine suntem"
        title="O familie. O casă. Patru apartamente cu suflet."
        subtitle="Vaias Aparts a început ca un proiect de inimă — un loc în care să primim oamenii dragi, așa cum am dori să fim primiți noi."
        image="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=2400&q=85"
      />

      {/* STORY */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow text-center mb-4">Povestea noastră</div>
          <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-center text-balance">
            Pe valea Ozanei, între munte și mănăstiri.
          </h2>
          <div className="divider-gold my-7" />
          <div className="space-y-6 font-serif text-lg md:text-xl text-forest-800/90 leading-relaxed">
            <p>
              Suntem familia Vaia. Tata s-a născut într-un sat de la poalele Ceahlăului,
              mama în Târgu Neamț. Aici am crescut amândoi — printre livezi de meri,
              clopote de mănăstire și poteci de pădure. Când orașele mari ne-au absorbit,
              ne-am promis că într-o zi ne întoarcem.
            </p>
            <p>
              Ne-am întors în 2021. Am cumpărat o casă veche cu cărămidă aparentă pe
              strada Boureni, am renovat-o cu meșteri locali, am adăugat două corpuri noi
              cu apartamente independente. În 2023 am deschis primele uși — pentru
              prieteni. În 2024 am început să primim oaspeți de pretutindeni.
            </p>
            <p>
              Astăzi avem patru apartamente boutique, fiecare cu numele unui loc drag
              al Moldovei. Le-am amenajat cu lemn de la cherestegerul din Pipirig, cu
              țesături de la o cooperativă de femei din Văratec, cu porțelan de Cluj.
              Nimic nu e întâmplător.
            </p>
            <p className="text-walnut-600 italic">
              „Vrem să simțiți că, deși nu sunteți acasă, sunteți în casa cuiva care
              vă așteaptă cu drag."
            </p>
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="bg-stone-50 py-20">
        <div className="container-x grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {[
            "https://images.unsplash.com/photo-1502780402662-acc01917ddc5?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=85"
          ].map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-xl ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-[4/3]" : "aspect-[4/3]"
              }`}
            >
              <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader
            eyebrow="Valorile noastre"
            title="Patru lucruri pe care nu le facem altfel."
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

      {/* TEAM */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="eyebrow-light mb-4">Familia Vaia</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              Oamenii din spatele caselor.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg text-cream-100/80">
              Nu avem o echipă mare — suntem o familie. Și asta, credem noi, se simte
              de cum treci pragul.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Vasi Vaia",
                role: "Gazdă & co-fondator",
                bio: "Născut în Pipirig, fost arhitect la București. Astăzi împarte timpul între renovări, cafele lungi cu oaspeții și plimbări cu câinele Carol prin pădure.",
                img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=85"
              },
              {
                name: "Ioana Vaia",
                role: "Gazdă & curatoare estetică",
                bio: "Designer textil. Aleasă fiecare pernă, fiecare lampadar și fiecare carte din bibliotecile apartamentelor — toate au o poveste.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85"
              },
              {
                name: "Maria",
                role: "Bucătăreasă",
                bio: "Maria face cele mai bune plăcinte cu brânză din județ. Servim micul dejun de la ea la cerere — și ne lăudăm cu asta fără rușine.",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85"
              }
            ].map((p) => (
              <div key={p.name} className="text-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 mx-auto max-w-xs">
                  <Image src={p.img} alt={p.name} fill sizes="320px" className="object-cover" />
                </div>
                <h3 className="font-display text-2xl text-cream-50">{p.name}</h3>
                <div className="text-xs uppercase tracking-[0.28em] text-walnut-300 mt-1">
                  {p.role}
                </div>
                <p className="mt-4 text-cream-100/80 leading-relaxed text-sm">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <SectionHeader
            eyebrow="Certificări & recunoașteri"
            title="Standarde pe care le luăm în serios."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Clasificare 4 stele", text: "Acordată de Ministerul Turismului din România, 2024." },
              { title: "Travelers' Choice 2025", text: "Distincție TripAdvisor — top 10% al cazărilor mondiale." },
              { title: "Booking Award", text: "Note medii peste 9.5 timp de doi ani consecutivi." },
              { title: "Eco-friendly", text: "Cosmetice locale, energie verde, fără plastic de unică folosință." }
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-walnut-100 text-walnut-600 mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l2.5 5.5L20 9l-4 4 1 6.5L12 16l-5 3.5L8 13 4 9l5.5-1.5L12 2z" /></svg>
                </div>
                <div className="font-display text-lg text-forest-900">{c.title}</div>
                <p className="text-sm text-stone-500 mt-2 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50">
            Hai să ne cunoaștem.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            Cea mai bună parte a meseriei noastre — oaspeții care devin prieteni.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apartments" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              Vezi apartamentele
            </Link>
            <Link href="/contact" className="btn-outline-light">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
