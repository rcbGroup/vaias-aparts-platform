import type { Metadata } from "next";
import Link from "next/link";
import { WELLNESS_PROGRAMS, getUpcomingSessions } from "@/src/lib/agents/wellnessRetreat";
import WellnessApplyForm from "./WellnessApplyForm";

export const metadata: Metadata = {
  title: "Programe Wellness — Slăbire, Detox, Pelerinaj, Retragere | Vaias Aparts Târgu Neamț",
  description:
    "8 programe wellness la Vila Vaias Aparts în Târgu Neamț — slăbire sănătoasă, control diabet, detoxifiere, pelerinaj ortodox, retragere femei/bărbați/cupluri/corporate. Aproape de Oglinzi, Bălțătești, mănăstirile Neamț.",
  keywords: [
    "wellness Târgu Neamț",
    "slăbire sănătoasă Moldova",
    "retragere ortodoxă mănăstiri",
    "detoxifiere Neamț",
    "tratament Oglinzi cazare",
    "tratament Bălțătești cazare",
    "retragere femei",
    "retragere cupluri Moldova",
  ],
};

export default function WellnessPage() {
  return (
    <>
      <section className="bg-forest-950 pt-32 pb-20 text-cream-50">
        <div className="container-x">
          <div className="eyebrow-light mb-4">Programe Wellness · 8 retrageri</div>
          <h1 className="font-display text-5xl md:text-6xl text-balance leading-tight">
            Vino la Vaias Aparts. Pleci alt om.
          </h1>
          <p className="mt-6 font-serif text-xl text-cream-100/85 max-w-3xl leading-relaxed">
            Opt programe complete în natura Moldovei — slăbire sănătoasă, control diabet, detoxifiere, pelerinaj
            ortodox, retrageri pentru femei, bărbați, cupluri și companii. Construite în jurul mănăstirilor și
            stațiunilor balneare din zona Neamț.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#programe" className="btn-primary">
              Vezi programele
            </Link>
            <a href="https://wa.me/40743456789" className="btn-outline-light">
              WhatsApp 0743 456 789
            </a>
          </div>
        </div>
      </section>

      <section id="programe" className="section bg-cream-50">
        <div className="container-x">
          <div className="eyebrow text-center mb-3">8 programe disponibile</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-12">
            Alege ce ai nevoie acum
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WELLNESS_PROGRAMS.map((p) => (
              <article
                key={p.slug}
                id={p.slug}
                className="rounded-2xl border border-stone-200 bg-white p-7 hover:shadow-lg transition"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-2xl text-forest-900">{p.nameRO}</h3>
                  <div className="text-gold-700 font-semibold whitespace-nowrap">{p.priceRON} lei</div>
                </div>
                <p className="text-stone-500 italic mb-3">{p.tagline}</p>
                <div className="text-sm text-stone-500 mb-4 flex flex-wrap gap-x-4 gap-y-1">
                  <span>⏱ {p.durationDays} zile</span>
                  <span>👥 {p.groupSize}</span>
                  <span>🎯 {p.audience}</span>
                </div>
                <p className="text-stone-700 mb-4 text-sm leading-relaxed">{p.descriptionRO}</p>
                <details className="text-sm text-stone-700">
                  <summary className="cursor-pointer text-gold-700 font-medium">Ce este inclus</summary>
                  <ul className="mt-3 space-y-1 list-disc pl-5">
                    {p.inclusions.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </details>

                <div className="mt-5 pt-4 border-t border-stone-100">
                  <div className="text-xs uppercase tracking-wide text-stone-500 mb-2">Sesiuni viitoare:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {getUpcomingSessions(p.slug).map((s, idx) => (
                      <div key={idx} className="bg-stone-50 rounded px-2 py-1">
                        {s.start} → {s.end} · {s.remainingSpots} locuri
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <WellnessApplyForm programSlug={p.slug} programName={p.nameRO} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white border-t border-stone-100">
        <div className="container-x max-w-4xl">
          <div className="eyebrow text-center mb-3">Întrebări frecvente</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            <details className="rounded-xl border border-stone-200 p-5">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Programele includ mâncare?
              </summary>
              <p className="mt-3 text-stone-700 text-sm">
                Da. Toate programele au meniu inclus, calibrat de un nutriționist (pentru slăbire/diabet/detox)
                sau cu opțiuni tradiționale (pentru pelerinaj/femei/bărbați/cupluri). Pachetul Corporate include
                catering personalizat.
              </p>
            </details>
            <details className="rounded-xl border border-stone-200 p-5">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Pot veni la mai multe programe pe an?
              </summary>
              <p className="mt-3 text-stone-700 text-sm">
                Bineînțeles — mulți participanți vin la 2-3 programe pe an. Pentru fidelitate, oferim 10%
                discount la al doilea program în decurs de 12 luni.
              </p>
            </details>
            <details className="rounded-xl border border-stone-200 p-5">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Cum se face plata?
              </summary>
              <p className="mt-3 text-stone-700 text-sm">
                Avans 30% la rezervare prin card sau transfer bancar. Restul la sosire. Acceptăm și
                vouchere de vacanță (Edenred, Up, Benefit Online) — vezi pagina{" "}
                <Link href="/vouchere-vacanta" className="text-gold-700 underline">
                  Vouchere de Vacanță
                </Link>
                .
              </p>
            </details>
            <details className="rounded-xl border border-stone-200 p-5">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Pot anula o rezervare?
              </summary>
              <p className="mt-3 text-stone-700 text-sm">
                Da. Cu mai mult de 14 zile înainte — restituire integrală. Cu 7-14 zile — restituire 50%. Sub 7 zile —
                nerestituibil, dar puteți transmuta voucherul către o altă perioadă în decurs de 6 luni.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
