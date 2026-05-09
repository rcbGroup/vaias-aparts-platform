import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Restaurante partenere | Vaias Aparts Târgu Neamț",
  description: "Restaurantele noastre partenere din Târgu Neamț și împrejurimi — recomandate oaspeților Vaias Aparts cu reduceri exclusive."
};

const restaurants = [
  {
    name: "Hanul Ancuței",
    type: "Bucătărie moldovenească",
    distance: "35 km · 40 min",
    description: "Cel mai celebru han din Moldova, la malul Șiretului. Mâncare tradițională, cai, athmosferă de epocă. Rezervare obligatorie.",
    specialties: ["Tocăniță de porc", "Sarmale în frunze de viță", "Colivă cu vin"],
    discount: "10% pentru oaspeții Vaias",
    url: "#"
  },
  {
    name: "Casa Bunicilor",
    type: "Bucătărie de casă",
    distance: "2 km · 5 min",
    description: "Restaurant cu curte interioară, mâncare de casă autentică. Ingrediente din propria grădină. Perfect pentru familii.",
    specialties: ["Plăcinte cu brânză", "Ciorbă de perișoare", "Pui la ceaun"],
    discount: "5% la meniu principal",
    url: "#"
  },
  {
    name: "Cetatea Bistro",
    type: "Bistro & grătar",
    distance: "500m · 8 min pe jos",
    description: "Vedere spre Cetatea Neamț, grătar cu lemn de fag, bere artizanală locală. Terasa deschisă mai–octombrie.",
    specialties: ["Miel la grătar", "Cârnați de casă", "Salate proaspete"],
    discount: "O băutură gratuită la masă",
    url: "#"
  },
  {
    name: "Pizzeria da Marco",
    type: "Italiană & pizza",
    distance: "1.5 km · 3 min",
    description: "Pizza napoletană autentică, paste artizanale, bruschette. Cel mai bun loc pentru copii și familii cu gusturi variate.",
    specialties: ["Pizza Margherita autentică", "Carbonara", "Tiramisu"],
    discount: "Pizza mică gratuită la comandă de 2+",
    url: "#"
  }
];

export default function ParteneriRestaurantePage() {
  return (
    <>
      <section className="bg-forest-950 pt-32 pb-16">
        <div className="container-x">
          <div className="eyebrow-light mb-4">Restaurante partenere</div>
          <h1 className="font-display text-5xl md:text-6xl text-cream-50 text-balance max-w-3xl">
            Unde mâncăm bine în Neamț.
          </h1>
          <p className="mt-5 font-serif text-xl text-cream-100/80 max-w-2xl">
            Recomandările noastre testate — restaurante cu care lucrăm direct, cu reduceri pentru oaspeții Vaias Aparts.
          </p>
        </div>
      </section>

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="rounded-2xl bg-forest-50 border border-forest-200 p-5 mb-10">
            <p className="text-sm text-forest-700">
              <strong>Cum folosești reducerea:</strong> Menționează la comandă că ești oaspete Vaias Aparts. La unele restaurante vei primi un cod QR din partea noastră în mesajul de confirmare.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {restaurants.map((r) => (
              <div key={r.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-7">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-2xl text-forest-900">{r.name}</h3>
                    <div className="text-xs text-stone-500 mt-0.5">{r.type} · {r.distance}</div>
                  </div>
                  <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium whitespace-nowrap">
                    {r.discount}
                  </span>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{r.description}</p>
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-400 mb-2">Specialități</div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.specialties.map((s) => (
                      <span key={s} className="rounded-full bg-walnut-100 text-walnut-700 px-2.5 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-walnut-700 py-20 text-cream-50 text-center">
        <div className="container-narrow">
          <h2 className="font-display text-4xl text-cream-50">Ești proprietar de restaurant?</h2>
          <p className="mt-4 font-serif text-lg text-cream-100/85">
            Parteneriații cu Vaias Aparts aduc oaspeți constanți, cu putere de cumpărare. Comision 5–8% la rezervări generate prin noi.
          </p>
          <a href="mailto:contact@VaiasAparts.ro?subject=Parteneriat restaurant" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900 mt-8 inline-block">
            Propune un parteneriat
          </a>
        </div>
      </section>
    </>
  );
}
