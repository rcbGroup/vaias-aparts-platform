import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Program afiliere | Câștigă comision | Vaias Aparts",
  description: "Devino afiliat Vaias Aparts și câștigă comision pentru fiecare rezervare adusă. 3 niveluri, comisioane de până la 8%, plăți lunare."
};

const tiers = [
  {
    name: "Standard",
    commission: "5%",
    threshold: "0–10 rezervări/an",
    color: "bg-stone-100 border-stone-200",
    textColor: "text-forest-900",
    badgeColor: "bg-stone-200 text-stone-700",
    benefits: [
      "5% comision din valoarea rezervării",
      "Link de urmărire personalizat",
      "Dashboard cu statistici",
      "Plată lunară prin transfer bancar",
      "Materiale promoționale digitale"
    ]
  },
  {
    name: "Partner",
    commission: "6.5%",
    threshold: "11–30 rezervări/an",
    color: "bg-walnut-50 border-walnut-300",
    textColor: "text-walnut-900",
    badgeColor: "bg-walnut-500 text-cream-50",
    featured: true,
    benefits: [
      "6.5% comision din valoarea rezervării",
      "Prioritate la disponibilitate",
      "Newsletter exclusiv cu oferte",
      "Plată lunară sau trimestrială",
      "Bannere și materiale printate",
      "Acces la pachetele sezoniere"
    ]
  },
  {
    name: "Premium",
    commission: "8%",
    threshold: "31+ rezervări/an",
    color: "bg-forest-900 border-forest-700",
    textColor: "text-cream-50",
    badgeColor: "bg-walnut-400 text-cream-50",
    benefits: [
      "8% comision din valoarea rezervării",
      "Acces VIP la toate apartamentele",
      "Rezervare prioritară fără disponibilitate publică",
      "Manager de cont dedicat",
      "Plată la alegere (lunar/trimestrial/anual)",
      "Co-brandare materiale",
      "Invitație la sejur de familiarizare gratuit"
    ]
  }
];

export default function AfiliatiPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-forest-950 pt-32 pb-20">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow-light mb-4">Program de afiliere</div>
            <h1 className="font-display text-5xl md:text-6xl text-cream-50 text-balance">
              Câștigați comision pentru fiecare rezervare adusă.
            </h1>
            <p className="mt-6 font-serif text-xl text-cream-100/80 max-w-2xl leading-relaxed">
              Ești blogger de travel, ghid turistic, agenție de turism sau influencer? Parteneriatul cu Vaias Aparts îți aduce comisioane reale, lunar, fără bătăi de cap.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#aplica" className="btn-primary text-lg px-8 py-4">
                Aplică acum — gratuit
              </a>
              <a href="#niveluri" className="btn-outline-light text-lg px-8 py-4">
                Vezi comisioanele
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-4">Cum funcționează</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Simplu. Transparent. Profitabil.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "Aplici", desc: "Completezi formularul de mai jos. Îți activăm contul în 24h." },
              { step: "2", title: "Primești link-ul", desc: "Un URL unic de urmărire pentru tine. Orice rezervare prin el îți aparține." },
              { step: "3", title: "Promovezi", desc: "Blog, Instagram, YouTube, TikTok, newsletter, grupuri Facebook — cum vrei." },
              { step: "4", title: "Primești banii", desc: "Lunar, în contul tău. Fără prag minim pentru primele 3 luni." }
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-16 w-16 rounded-full bg-forest-700 text-cream-50 font-display text-3xl grid place-items-center mx-auto mb-5">
                  {s.step}
                </div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="niveluri" className="section bg-stone-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-4">Niveluri și comisioane</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Trei niveluri. Comisioane mai mari cu cât aduci mai mult.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 relative ${tier.color} ${tier.featured ? "ring-2 ring-walnut-400 shadow-card" : ""}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-walnut-500 text-cream-50 px-4 py-0.5 text-xs font-medium uppercase tracking-wider">
                    Popular
                  </div>
                )}
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider mb-4 ${tier.badgeColor}`}>
                  {tier.name}
                </div>
                <div className={`font-display text-5xl mb-1 ${tier.textColor}`}>{tier.commission}</div>
                <div className={`text-sm mb-6 ${tier.textColor === "text-cream-50" ? "text-cream-100/60" : "text-stone-500"}`}>
                  {tier.threshold}
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className={`flex items-start gap-2.5 text-sm ${tier.textColor === "text-cream-50" ? "text-cream-100/80" : "text-stone-600"}`}>
                      <span className="text-walnut-500 mt-0.5 shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone-500">
            Comisionul se calculează din prețul rezervării, exclusiv taxele locale. Plata se face până pe 15 ale lunii pentru rezervările confirmate din luna anterioară.
          </p>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-4">Pentru cine este</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900">
              Oricine iubește Moldova și are o audiență.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "✍️", type: "Bloggeri de travel", desc: "Scrie un articol, includă link-ul tău. Câștiguri pasive ani de zile." },
              { icon: "📱", type: "Influenceri social", desc: "Instagram, TikTok, YouTube. Linkul în bio sau stories." },
              { icon: "🗺", type: "Ghizi turistici", desc: "Recomandați cazarea grupului tău. Comision la fiecare rezervare." },
              { icon: "🏢", type: "Agenții de turism", desc: "Includeți Vaias Aparts în pachetele voastre. Deveniți Partner rapid." }
            ].map((w) => (
              <div key={w.type} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <div className="text-3xl mb-3">{w.icon}</div>
                <h3 className="font-display text-lg text-forest-900 mb-2">{w.type}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="aplica" className="section bg-forest-900 text-cream-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="eyebrow-light mb-4">Aplică acum</div>
            <h2 className="font-display text-4xl text-cream-50">
              Devino afiliat Vaias Aparts.
            </h2>
            <p className="mt-4 text-cream-100/70 font-serif text-lg">
              Activare în 24h. Fără costuri. Fără angajamente.
            </p>
          </div>
          <form className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/60 mb-1">Nume complet *</label>
              <input
                type="text"
                required
                placeholder="Numele tău"
                className="w-full rounded-xl bg-forest-800 border border-forest-700 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/30 focus:outline-none focus:border-walnut-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/60 mb-1">Email *</label>
              <input
                type="email"
                required
                placeholder="adresa@email.ro"
                className="w-full rounded-xl bg-forest-800 border border-forest-700 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/30 focus:outline-none focus:border-walnut-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/60 mb-1">Website / profil social</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full rounded-xl bg-forest-800 border border-forest-700 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/30 focus:outline-none focus:border-walnut-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/60 mb-1">Tip de promovare</label>
              <select className="w-full rounded-xl bg-forest-800 border border-forest-700 px-4 py-3 text-sm text-cream-50 focus:outline-none focus:border-walnut-400">
                <option>Blog / website</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Agenție turism / ghid</option>
                <option>Newsletter</option>
                <option>Altele</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-cream-200/60 mb-1">Cum vei promova Vaias Aparts?</label>
              <textarea
                rows={3}
                placeholder="Descrieți pe scurt audiența și planul de promovare..."
                className="w-full rounded-xl bg-forest-800 border border-forest-700 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/30 focus:outline-none focus:border-walnut-400 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary w-full text-center">
                Trimite aplicația — gratuit
              </button>
              <p className="mt-3 text-xs text-cream-100/50 text-center">
                Vă contactăm în 24h la adresa de email cu linkul de urmărire și materialele promoționale.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="eyebrow text-center mb-8">Întrebări frecvente</div>
          <div className="space-y-4">
            {[
              { q: "Cât durează să fiu activat?", a: "24 de ore lucrătoare după primirea aplicației. Veți primi pe email linkul personalizat și materialele promoționale." },
              { q: "Există un prag minim de plată?", a: "Nu în primele 3 luni. Ulterior, pragul este de 50 RON per plată lunară. Sumele sub prag se transferă în luna următoare." },
              { q: "Cât timp este valid cookie-ul de urmărire?", a: "30 de zile. Dacă vizitatorul rezervă în 30 de zile de la click-ul pe link-ul tău, comisionul îți aparține." },
              { q: "Pot promova pe mai multe canale?", a: "Da. Un singur link funcționează pe toate canalele. Statisticile arată sursa fiecărei conversii." },
              { q: "Cum se calculează comisionul?", a: "Din prețul total al rezervării (nopți × tarif), fără taxele locale și taxele de curățenie." }
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="font-display text-lg text-forest-900 mb-2">{item.q}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-stone-500 text-sm">Alte întrebări? <a href="mailto:contact@VaiasAparts.ro" className="text-walnut-600 hover:underline">contact@VaiasAparts.ro</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
