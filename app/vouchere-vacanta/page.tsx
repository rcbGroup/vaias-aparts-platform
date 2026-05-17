import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vouchere de Vacanță — Plătește cu Edenred, Up, Benefit Online | Vaias Aparts",
  description:
    "Acceptăm vouchere de vacanță Edenred, Up România și Benefit Online la Vila Vaias Aparts Târgu Neamț. 800 lei/angajat/an — folosiți-le pentru sejurul perfect în Moldova.",
  keywords: [
    "vouchere de vacanță Târgu Neamț",
    "Edenred cazare",
    "Up România vouchere",
    "Benefit Online vacanță",
    "tichete vacanță Moldova",
    "cazare cu vouchere mănăstiri",
  ],
};

const providers = [
  {
    name: "Edenred",
    logo: "💳",
    description:
      "Cel mai utilizat sistem de vouchere de vacanță din România — acceptat fără probleme la rezervare directă.",
    site: "https://www.edenred.ro",
  },
  {
    name: "Up România",
    logo: "🎫",
    description:
      "Operator partener pentru voucherele angajaților din sectorul public și privat. Acceptăm pe loc.",
    site: "https://www.upromania.ro",
  },
  {
    name: "Benefit Online",
    logo: "🪪",
    description:
      "Voucherele platformei Benefit Online sunt acceptate la rezervare directă pe WhatsApp sau telefon.",
    site: "https://benefit-online.ro",
  },
  {
    name: "Sodexo Pass România",
    logo: "🎟️",
    description:
      "Acceptăm și voucherele Sodexo / Pluxee — confirmați la rezervare ca să verificăm valabilitatea.",
    site: "https://www.pluxee.ro",
  },
];

const packages = [
  {
    title: "Pachet 2 nopți · 1 voucher",
    nights: 2,
    fromRON: 594,
    note: "Apartament standard (1, 2, 5, 6 sau 7) — perfect pentru un weekend la mănăstiri.",
  },
  {
    title: "Pachet 3 nopți · 1 voucher",
    nights: 3,
    fromRON: 800,
    note: "Întreaga sumă de 800 lei alocată anual pentru un sejur scurt, dar relaxant.",
  },
  {
    title: "Pachet familie 3 nopți · 2 vouchere",
    nights: 3,
    fromRON: 1641,
    note: "Apartament cu 2 dormitoare (3 sau 4) — folosiți voucherele de la doi angajați.",
  },
  {
    title: "Pachet diasporă · 5 nopți",
    nights: 5,
    fromRON: 1262,
    note: "Sejur lung cu discount 15% — combinabil cu vouchere.",
  },
];

const steps = [
  {
    n: 1,
    title: "Verificați valoarea voucherelor",
    detail:
      "Conform legii, fiecare angajat primește 800 lei/an în vouchere de vacanță. Puteți cumula vouchere de la mai mulți membri ai familiei.",
  },
  {
    n: 2,
    title: "Contactați-ne pe WhatsApp",
    detail:
      "Spuneți-ne ce voucher folosiți (Edenred, Up, Benefit Online) și datele dorite. Confirmăm disponibilitatea și pregătim oferta.",
  },
  {
    n: 3,
    title: "Trimiteți voucherele",
    detail:
      "Plata se face direct cu voucherul — fie fizic, fie din contul Edenred / Up / Benefit Online. Vă emitem factură fiscală.",
  },
  {
    n: 4,
    title: "Vă așteptăm la Vaias Aparts",
    detail:
      "Check-in flexibil, parcare gratuită, concierge WhatsApp. Toate avantajele unei rezervări directe.",
  },
];

export default function VouchereVacantaPage() {
  return (
    <>
      <section className="bg-forest-950 pt-32 pb-16 text-cream-50">
        <div className="container-x">
          <div className="eyebrow-light mb-4">Beneficii angajați · Vouchere vacanță</div>
          <h1 className="font-display text-5xl md:text-6xl text-balance leading-tight">
            Plătește sejurul cu voucherul de vacanță
          </h1>
          <p className="mt-6 font-serif text-xl text-cream-100/85 max-w-3xl leading-relaxed">
            Vila Vaias Aparts acceptă voucherele de vacanță Edenred, Up România, Benefit Online și Pluxee.
            800 lei/angajat/an — transformați beneficiul în două sau trei zile de liniște la poalele Cetății Neamțului.
          </p>
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="eyebrow text-center mb-3">Furnizori acceptați</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-10">
            Acceptăm toate platformele majore
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{p.logo}</div>
                <div className="font-display text-xl text-forest-900 mb-2">{p.name}</div>
                <p className="text-sm text-stone-600">{p.description}</p>
                <a
                  href={p.site}
                  className="text-gold-600 text-sm mt-3 inline-block"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vizitează site →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white border-y border-stone-100">
        <div className="container-x">
          <div className="eyebrow text-center mb-3">Pachete pregătite pentru vouchere</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-10">
            Calibrate pentru 800 lei / 1600 lei / 2400 lei
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pk) => (
              <div key={pk.title} className="rounded-2xl border border-stone-200 p-6 bg-cream-50">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-display text-xl text-forest-900">{pk.title}</div>
                  <div className="text-gold-700 font-semibold">de la {pk.fromRON} lei</div>
                </div>
                <p className="text-sm text-stone-600">{pk.note}</p>
                <Link
                  href="https://wa.me/40743456789"
                  className="btn-primary mt-4 inline-block"
                >
                  Solicită ofertă WhatsApp
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="eyebrow text-center mb-3">Cum funcționează</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-10">
            4 pași simpli — fără birocrație
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="text-gold-600 font-display text-3xl mb-2">{s.n}</div>
                <div className="font-display text-lg text-forest-900 mb-2">{s.title}</div>
                <p className="text-sm text-stone-600">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest-950 text-cream-50">
        <div className="container-x text-center">
          <h2 className="font-display text-3xl md:text-4xl text-balance mb-4">
            Aveți întrebări despre vouchere?
          </h2>
          <p className="font-serif text-lg text-cream-100/80 max-w-2xl mx-auto">
            Scrieți-ne pe WhatsApp — verificăm rapid valoarea, disponibilitatea și pregătim factura fiscală
            conformă cu cerințele departamentului de resurse umane.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/40743456789" className="btn-primary">
              WhatsApp 0743 456 789
            </a>
            <Link href="/contact" className="btn-outline-light">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
