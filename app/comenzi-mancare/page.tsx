import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pre-comandă mâncare | Vaias Aparts Târgu Neamț",
  description: "Comandați mic dejun, cină sau coș de bun venit înainte de sosire. Pregătit de Maria, livrat direct în apartament."
};

const menuItems = [
  {
    category: "Mic dejun",
    items: [
      { name: "Platou moldovenesc", desc: "Ouă de casă, brânză de burduf, smântână, pâine de casă, miere", price: 45, currency: "RON" },
      { name: "Omletă cu legume", desc: "Ouă de casă, ardei, roșii, ceapă verde, pâine prăjită", price: 35, currency: "RON" },
      { name: "Iaurt cu fructe de pădure", desc: "Iaurt de casă, afine, zmeură, miere de tei, granola", price: 25, currency: "RON" },
      { name: "Cafea & croissante", desc: "Cafea espresso, 2 croissante cu unt și gem de prune", price: 30, currency: "RON" }
    ]
  },
  {
    category: "Cină",
    items: [
      { name: "Tocăniță moldovenească", desc: "Carne de porc cu sos de roșii și legume, mămăligă, smântână", price: 65, currency: "RON" },
      { name: "Plăcinte cu brânză (6 buc)", desc: "Rețeta Mariei — brânză dulce de casă, foaie subțire", price: 55, currency: "RON" },
      { name: "Ciorbă de fasole cu afumătură", desc: "Fasole bătută, ciolan afumat, tarhon, pâine caldă", price: 45, currency: "RON" },
      { name: "Pui la grătar cu salată", desc: "Pui de curte, salată de roșii cu ceapă roșie, mujdei", price: 60, currency: "RON" }
    ]
  },
  {
    category: "Coș de bun venit",
    items: [
      { name: "Coș standard", desc: "Vin de Cotnari, brânzeturi locale, pâine, fructe de sezon, miere", price: 120, currency: "RON" },
      { name: "Coș romantic", desc: "Șampanie, ciocolată belgiană, fructe exotice, trandafiri, lumânări", price: 180, currency: "RON" },
      { name: "Coș copii", desc: "Sucuri naturale, fructe, biscuiți, ciocolată cu lapte, jucărie surpriză", price: 85, currency: "RON" },
      { name: "Coș pelerinaj", desc: "Pâine de casă, miere, ceai de munte, dulceturi, salciu", price: 95, currency: "RON" }
    ]
  }
];

export default function ComenziMancarePage() {
  return (
    <>
      <section className="bg-forest-950 pt-32 pb-16">
        <div className="container-x">
          <div className="eyebrow-light mb-4">Pre-comandă</div>
          <h1 className="font-display text-5xl md:text-6xl text-cream-50 text-balance max-w-3xl">
            Mâncare de casă, gata la sosire.
          </h1>
          <p className="mt-5 font-serif text-xl text-cream-100/80 max-w-2xl">
            Maria pregătește tot cu o zi înainte. Comandați prin WhatsApp sau email, găsiți totul în apartament la check-in.
          </p>
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="rounded-2xl bg-walnut-50 border border-walnut-200 p-5 mb-10 flex items-start gap-4">
            <span className="text-2xl shrink-0">📝</span>
            <div>
              <div className="font-display text-lg text-walnut-800 mb-1">Cum funcționează pre-comanda</div>
              <p className="text-sm text-walnut-700 leading-relaxed">
                Contactați-ne cu <strong>minimum 24h înainte de check-in</strong> (48h pentru coșuri). Comanda se livrează direct în apartament până la ora check-in-ului (14:00).
                Plata se face la check-in sau prin transfer bancar în avans.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {menuItems.map((cat) => (
              <div key={cat.category}>
                <div className="eyebrow mb-6">{cat.category}</div>
                <div className="grid gap-4 md:grid-cols-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-6 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg text-forest-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-2xl text-walnut-600">{item.price}</div>
                        <div className="text-xs text-stone-400">{item.currency}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-cream-50 text-center">
        <div className="container-narrow">
          <h2 className="font-display text-4xl text-cream-50">Comandați prin WhatsApp.</h2>
          <p className="mt-4 font-serif text-lg text-cream-100/80">
            Trimiteți lista cu ce doriți și data sosirii. Maria confirmă în câteva ore.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/40738345330?text=Bună ziua! Vreau să fac o pre-comandă de mâncare pentru sejurul meu la Vaias Aparts."
              target="_blank"
              rel="noreferrer"
              className="btn-primary bg-green-600 hover:bg-green-700"
            >
              WhatsApp: +40 738 345 330
            </a>
            <a href="mailto:contact@VaiasAparts.ro?subject=Pre-comandă mâncare" className="btn-outline-light">
              Trimite email
            </a>
          </div>
          <p className="mt-6 text-xs text-cream-100/50">
            Alergii sau preferințe alimentare? Menționați în mesaj — adaptăm comanda.
          </p>
        </div>
      </section>
    </>
  );
}
