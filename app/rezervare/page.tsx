import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Rezervare | Vila Vaias Aparts Târgu Neamț — Prețuri și Disponibilitate",
  description:
    "Rezervați direct la Vila Vaias Aparts — 7 apartamente boutique în Târgu Neamț. WhatsApp: +40 752 388 388. Cel mai bun preț direct, fără comision OTA."
};

const faqItems = [
  {
    q: "Cum funcționează rezervarea?",
    a: "Completați formularul sau scrieți pe WhatsApp. Echipa verifică disponibilitatea și revine cu confirmarea. Rezervarea devine fermă după achitarea avansului de 30%."
  },
  {
    q: "Care este politica de avans?",
    a: "La confirmare se achită un avans de 30% din valoarea totală. Restul se achită la check-in."
  },
  {
    q: "Ce metode de plată acceptați?",
    a: "Transfer bancar, numerar la check-in și tichete de vacanță (Pluxee, Up Romania, Edenred) — unde este cazul. Factură fiscală disponibilă la cerere."
  },
  {
    q: "Acceptați animale de companie?",
    a: "Da, animalele de companie sunt acceptate la cerere în toate apartamentele, fără cost suplimentar."
  },
  {
    q: "Care este ora de check-in și check-out?",
    a: "Check-in de la 14:00. Check-out până la 11:00. Self check-in disponibil cu ghidaj complet de la echipa noastră."
  },
  {
    q: "Există parcare?",
    a: "Da, parcare gratuită în curtea vilei — primul venit, primul servit."
  },
  {
    q: "Puteți emite factură fiscală?",
    a: "Da, factură fiscală disponibilă la cerere pentru toate tipurile de rezervări."
  },
  {
    q: "Acceptați tichete de vacanță?",
    a: "Da, acceptăm tichete de vacanță Pluxee, Up Romania și Edenred — vă rugăm să menționați la rezervare."
  },
  {
    q: "Ce include prețul?",
    a: "Prețul include lenjerie de pat, prosoape, WiFi de mare viteză, parcare și acces la facilitățile comune. Bucătăria pentru Toți este accesibilă tuturor oaspeților."
  }
];

export default function ReservationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map(item => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a }
            }))
          })
        }}
      />

      <PageHero
        eyebrow="Rezervare"
        title="Începe-ți povestea aici."
        subtitle="Completează datele și revenim cu confirmarea în câteva ore — direct de la noi, cu cel mai bun preț."
        image="/gallery/vila-vaias-aparts-targu-neamt-apartament-1-living-1.jpg"
      />

      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BookingForm />

            <p className="text-xs text-stone-500 mt-3">
              ⚠️ Cererea de rezervare nu reprezintă o confirmare definitivă. Rezervarea devine fermă numai după verificarea disponibilității și achitarea avansului de 30%.
            </p>

            <div className="mt-8 rounded-2xl bg-forest-900 text-cream-50 p-6 text-center">
              <p className="font-display text-xl mb-2">Preferi să rezervi pe WhatsApp?</p>
              <p className="text-cream-100/80 text-sm mb-4">Trimite-ne datele și confirmăm rapid — de regulă în câteva ore.</p>
              <a
                href="https://wa.me/40752388388?text=Bun%C4%83%20ziua!%20Doresc%20s%C4%83%20rezerv%20un%20apartament%20la%20Vila%20Vaias%20Aparts.%20V%C4%83%20rog%20s%C4%83%20%C3%AEmi%20comunica%C8%9Bi%20disponibilitatea%20pentru%20datele%3A%20%5BDATA%20CHECK-IN%5D%20%E2%80%93%20%5BDATA%20CHECK-OUT%5D%2C%20%5BNR%5D%20persoane."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                💬 Rezervă pe WhatsApp — +40 752 388 388
              </a>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl bg-walnut-50 border border-walnut-200 p-7">
                <div className="eyebrow mb-3">Booking direct</div>
                <h3 className="font-display text-2xl text-forest-900 mb-3">
                  De ce să rezervi aici?
                </h3>
                <ul className="space-y-3 text-sm text-forest-800">
                  <li className="flex gap-3"><span className="text-walnut-500">✓</span>Cel mai bun preț direct — eviți comisionul OTA de 15–25%</li>
                  <li className="flex gap-3"><span className="text-walnut-500">✓</span>Comunicare directă cu familia care gestionează vila</li>
                  <li className="flex gap-3"><span className="text-walnut-500">✓</span>Confirmare rapidă pe WhatsApp</li>
                  <li className="flex gap-3"><span className="text-walnut-500">✓</span>Flexibilitate pentru cereri speciale</li>
                  <li className="flex gap-3"><span className="text-walnut-500">✓</span>Factură fiscală disponibilă la cerere</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-7">
                <div className="eyebrow mb-3">Cum confirmăm?</div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Oaspeții completează cererea de rezervare, echipa verifică disponibilitatea și revine cu confirmarea. Pentru un răspuns mai rapid, WhatsApp este recomandat. De regulă răspundem între 08:00 și 22:00.
                </p>
                <ol className="mt-4 space-y-3 text-sm text-stone-600">
                  <li>1. Primești un mesaj de la noi în câteva ore.</li>
                  <li>2. Confirmăm prețul și disponibilitatea.</li>
                  <li>3. Plată avans 30% la confirmare; restul la check-in.</li>
                  <li>4. Trimitem instrucțiunile de check-in cu o zi înainte.</li>
                </ol>
              </div>

              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5">
                <div className="eyebrow mb-2">Check-in / Check-out</div>
                <p className="text-sm text-stone-600">
                  Check-in de la <strong>14:00</strong> &nbsp;·&nbsp; Check-out până la <strong>11:00</strong>
                </p>
              </div>

              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5">
                <div className="eyebrow mb-2">Disponibilitate live</div>
                <p className="text-sm text-stone-600 mb-3">Verificați disponibilitatea în timp real pe sistemul nostru de rezervări.</p>
                <a
                  href="https://www.5stardesk.net/b/vaias-aparts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm w-full text-center block"
                >
                  Verifică disponibilitate
                </a>
              </div>

              <div className="rounded-2xl bg-forest-900 text-cream-100 p-7">
                <div className="eyebrow-light mb-3">Preferi să vorbim?</div>
                <a href="tel:+40752388388" className="font-display text-2xl text-cream-50 block mb-1">
                  +40 752 388 388
                </a>
                <a href="https://wa.me/40752388388" className="text-walnut-300 hover:text-cream-50 text-sm">
                  WhatsApp →
                </a>
                <a href="tel:+40738345330" className="font-display text-lg text-cream-50 block mt-3 mb-1">
                  +40 738 345 330
                </a>
                <a href="https://wa.me/40738345330" className="text-walnut-300 hover:text-cream-50 text-sm">
                  WhatsApp →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <h2 className="font-display text-3xl text-forest-900 mb-10">Întrebări frecvente despre rezervare</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-2xl bg-cream-50 border border-stone-200 p-6">
                <h3 className="font-display text-lg text-forest-900 mb-2">{item.q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section className="bg-stone-50 py-16">
        <div className="container-narrow text-sm text-stone-500 leading-relaxed">
          <h2 className="font-display text-2xl text-forest-900 mb-4">Condiții generale</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Check-in: 14:00 — Check-out: 11:00.</li>
            <li>Sezon mare (15 iulie – 31 august, 1 decembrie – 7 ianuarie) — minim 3 nopți.</li>
            <li>Animalele de companie sunt acceptate la cerere în toate apartamentele, fără cost suplimentar.</li>
            <li>Fumatul este interzis în interior. Permis pe terase și în curte.</li>
            <li>Plata în RON, prin transfer bancar, card sau cash. Tichete de vacanță (Pluxee, Up Romania, Edenred) acceptate.</li>
            <li>Factură fiscală disponibilă la cerere.</li>
          </ul>
          <p className="mt-6">
            Vezi <Link href="/termeni-conditii" className="text-walnut-600 underline">termenii și condițiile</Link> complete.
          </p>
        </div>
      </section>
    </>
  );
}
