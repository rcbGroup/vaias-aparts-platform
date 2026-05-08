import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Rezervare — alege apartamentul și datele",
  description:
    "Trimite-ne datele de cazare pentru rezervare. Confirmăm prin WhatsApp sau telefon, cu cel mai bun preț — direct."
};

export default function ReservationPage() {
  return (
    <>
      <PageHero
        eyebrow="Rezervare"
        title="Începe-ți povestea aici."
        subtitle="Completează datele și revenim cu confirmarea în câteva ore — direct de la noi, cu cel mai bun preț."
        image="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BookingForm />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl bg-walnut-50 border border-walnut-200 p-7">
                <div className="eyebrow mb-3">Booking direct</div>
                <h3 className="font-display text-2xl text-forest-900 mb-3">
                  De ce să rezervi aici?
                </h3>
                <ul className="space-y-3 text-sm text-forest-800">
                  <li className="flex gap-3">
                    <span className="text-walnut-500">✓</span>
                    Cu 5% mai ieftin decât pe orice altă platformă
                  </li>
                  <li className="flex gap-3">
                    <span className="text-walnut-500">✓</span>
                    Late check-out gratuit (în limita disponibilității)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-walnut-500">✓</span>
                    Mic dejun cadou la sejururi de 4 nopți+
                  </li>
                  <li className="flex gap-3">
                    <span className="text-walnut-500">✓</span>
                    Anulare gratuită până cu 7 zile înainte
                  </li>
                  <li className="flex gap-3">
                    <span className="text-walnut-500">✓</span>
                    Discuți direct cu gazda, nu cu un call center
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-7">
                <div className="eyebrow mb-3">Cum confirmăm?</div>
                <ol className="space-y-3 text-sm text-stone-600">
                  <li>1. Primești un mesaj de la noi în 2-4 ore.</li>
                  <li>2. Confirmăm prețul și disponibilitatea.</li>
                  <li>3. Plată acont 30% la confirmare; restul la check-in.</li>
                  <li>4. Trimitem instrucțiunile de check-in cu o zi înainte.</li>
                </ol>
                <div className="mt-5 pt-5 border-t border-stone-200 text-xs text-stone-500">
                  Pentru moment, rezervările sunt confirmate <strong>prin WhatsApp sau apel</strong>.
                  Plata online va fi disponibilă în curând.
                </div>
              </div>

              <div className="rounded-2xl bg-forest-900 text-cream-100 p-7">
                <div className="eyebrow-light mb-3">Preferi să vorbim?</div>
                <a href="tel:+40740000000" className="font-display text-2xl text-cream-50 block mb-1">
                  +40 740 000 000
                </a>
                <a href="https://wa.me/40740000000" className="text-walnut-300 hover:text-cream-50 text-sm">
                  WhatsApp →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* TERMS */}
      <section className="bg-stone-50 py-16">
        <div className="container-narrow text-sm text-stone-500 leading-relaxed">
          <h2 className="font-display text-2xl text-forest-900 mb-4">Condiții generale</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Check-in: 15:00 — Check-out: 11:00. Late check-out la 13:00 disponibil contra cost (€20) sau gratuit pentru rezervări directe.</li>
            <li>Anulare gratuită cu cel puțin 7 zile înainte de sosire. După acest interval, acontul devine ne-rambursabil.</li>
            <li>Sezon mare (15 iulie – 31 august, 1 decembrie – 7 ianuarie) — minim 3 nopți.</li>
            <li>Animalele de companie sunt acceptate la cerere, în Apartamentele Ceahlău și Moldova.</li>
            <li>Fumatul este interzis în interior. Permis pe terase și în curte.</li>
            <li>Plata în RON sau EUR, prin transfer bancar, card sau cash.</li>
          </ul>
          <p className="mt-6">
            Vezi <Link href="/termeni-conditii" className="text-walnut-600 underline">termenii și condițiile</Link> complete.
          </p>
        </div>
      </section>
    </>
  );
}
