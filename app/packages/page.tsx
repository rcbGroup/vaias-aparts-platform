import type { Metadata } from "next";
import Link from "next/link";
import { CURATED_PACKAGES } from "@/src/lib/packages";

export const metadata: Metadata = {
  title: "Pachete Curatate — Pelerinaj, Familie, Diaspora, Corporate | Vaias Aparts",
  description:
    "9 pachete curatate la Vila Vaias Aparts Târgu Neamț: Pelerinaj Neamț, Familie Completă, Diaspora Acasă, Gastronomic Moldova, Corporate Teambuilding, Digital Nomad, Pescuit, Crăciun Moldovenesc. Rezervare directă, cel mai bun preț.",
  keywords: [
    "pachete cazare Târgu Neamț",
    "pelerinaj Neamț pachet",
    "vacanță familie Moldova",
    "Crăciun la mănăstire",
    "teambuilding Moldova",
    "digital nomad România",
  ],
};

const FILTER_TABS = [
  { key: "all", label: "Toate" },
  { key: "pilgrims", label: "Pelerinaj" },
  { key: "families", label: "Familie" },
  { key: "diaspora", label: "Diaspora" },
  { key: "corporate", label: "Corporate" },
  { key: "couple", label: "Cupluri" },
  { key: "outdoors", label: "Natură" },
];

export default function PackagesPage() {
  return (
    <>
      <section className="bg-forest-950 pt-32 pb-20 text-cream-50">
        <div className="container-x">
          <div className="eyebrow-light mb-4">9 pachete curatate</div>
          <h1 className="font-display text-5xl md:text-6xl text-balance leading-tight">
            Pachete pregătite cu grijă pentru fiecare drum
          </h1>
          <p className="mt-6 font-serif text-xl text-cream-100/85 max-w-3xl leading-relaxed">
            De la pelerinaj la mănăstirile Neamț până la digital nomad pe 14+ nopți — am pregătit pachete cu
            traseu, inclusion-uri și prețuri clare. Rezervare directă pe WhatsApp sau site.
          </p>
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURATED_PACKAGES.map((pk) => (
              <article
                key={pk.slug}
                className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-lg transition flex flex-col"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-display text-2xl text-forest-900">{pk.nameRO}</h3>
                  <div className="text-gold-700 font-semibold whitespace-nowrap text-sm">
                    de la {pk.fromPricePerPersonRON} lei
                  </div>
                </div>
                <p className="text-stone-500 italic text-sm mb-3">{pk.tagline}</p>
                <div className="text-xs text-stone-500 mb-3 flex gap-3">
                  <span>
                    🌙{" "}
                    {pk.durationNights.max
                      ? `${pk.durationNights.min}–${pk.durationNights.max} nopți`
                      : `${pk.durationNights.min}+ nopți`}
                  </span>
                  <span>🎯 {pk.bestFor}</span>
                </div>
                <p className="text-sm text-stone-700 mb-4 flex-1">{pk.descriptionRO}</p>
                <details className="text-sm mb-4">
                  <summary className="cursor-pointer text-gold-700 font-medium">Ce este inclus</summary>
                  <ul className="mt-2 space-y-1 list-disc pl-5 text-stone-700">
                    {pk.inclusions.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </details>
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`https://wa.me/40743456789?text=${encodeURIComponent(
                      `Bună ziua! Sunt interesat de pachetul "${pk.nameRO}". Pot primi mai multe detalii?`
                    )}`}
                    className="btn-primary flex-1 text-center text-sm"
                  >
                    WhatsApp
                  </Link>
                  <Link href="/rezervare" className="btn-outline text-sm flex-1 text-center">
                    Rezervare
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x text-center max-w-3xl">
          <div className="eyebrow mb-3">Nu găsești ce cauți?</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-4">
            Construim pachetul după nevoia ta
          </h2>
          <p className="font-serif text-lg text-stone-700 mb-6">
            Dacă vii cu un grup, ai o ocazie aniversară, vrei o combinație neobișnuită — scrie-ne pe WhatsApp și
            facem pachetul împreună.
          </p>
          <Link href="https://wa.me/40743456789" className="btn-primary">
            WhatsApp 0743 456 789
          </Link>
        </div>
      </section>
    </>
  );
}
