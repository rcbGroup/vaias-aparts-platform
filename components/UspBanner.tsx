import { DoorOpen, Car, MapPin, BedDouble } from "lucide-react";

type Item = { icon: "door" | "car" | "map" | "bed"; title: string; text: string };
type LangContent = { eyebrow: string; title: string; subtitle: string; items: Item[] };

const ICONS = { door: DoorOpen, car: Car, map: MapPin, bed: BedDouble } as const;

/**
 * USP band. Copy follows BRAND.md §10: specifics, not adjectives.
 * Facts: apartments are 46–67 m² (lib/apartments.ts); Emperor bed 2×2 m in every apartment and free
 * private parking in the courtyard (lib/reviews.ts guestHighlights); Apt 7 uses the shared kitchen.
 */
const USP_CONTENT: Record<string, LangContent> = {
  ro: {
    eyebrow: "De ce Vaias Aparts",
    title: "Un apartament întreg, la preț de cameră.",
    subtitle: "Ușa ta, cheia ta, bucătăria ta. Fără recepție, fără hol de hotel.",
    items: [
      { icon: "door", title: "46–67 m² numai ai tăi", text: "Dormitor, living, baie proprie și bucătărie utilată (Apartamentul 7 folosește bucătăria comună)." },
      { icon: "bed", title: "Pat Emperor 2 × 2 m", text: "În fiecare apartament. Lenjerie de bumbac, schimbată la fiecare oaspete." },
      { icon: "car", title: "Parcare în curte, gratuită", text: "Curte închisă, loc de parcare privat. Fără căutat loc pe stradă." },
      { icon: "map", title: "Ultracentral, sub Cetatea Neamțului", text: "În centrul Târgu Neamț. Agapia, Văratec și Neamț la câteva minute cu mașina." },
    ],
  },
  en: {
    eyebrow: "Why Vaias Aparts",
    title: "A whole apartment, for the price of a room.",
    subtitle: "Your door, your key, your kitchen. No reception desk, no hotel corridor.",
    items: [
      { icon: "door", title: "46–67 m², all yours", text: "Bedroom, living room, private bathroom and an equipped kitchen (Apartment 7 uses the shared kitchen)." },
      { icon: "bed", title: "Emperor bed, 2 × 2 m", text: "In every apartment. Cotton linen, changed for every guest." },
      { icon: "car", title: "Free parking in the courtyard", text: "Enclosed courtyard, private space. No hunting for a spot on the street." },
      { icon: "map", title: "Town centre, below Neamț Citadel", text: "Central Târgu Neamț. Agapia, Văratec and Neamț monasteries a few minutes by car." },
    ],
  },
  fr: {
    eyebrow: "Pourquoi Vaias Aparts",
    title: "Un appartement entier, au prix d'une chambre.",
    subtitle: "Votre porte, votre clé, votre cuisine. Sans réception, sans couloir d'hôtel.",
    items: [
      { icon: "door", title: "46–67 m² rien que pour vous", text: "Chambre, salon, salle de bain privée et cuisine équipée (l'appartement 7 utilise la cuisine commune)." },
      { icon: "bed", title: "Lit Emperor 2 × 2 m", text: "Dans chaque appartement. Linge en coton, changé pour chaque client." },
      { icon: "car", title: "Parking gratuit dans la cour", text: "Cour fermée, place privée. Plus besoin de chercher une place dans la rue." },
      { icon: "map", title: "Centre-ville, sous la citadelle de Neamț", text: "Au centre de Târgu Neamț. Agapia, Văratec et Neamț à quelques minutes en voiture." },
    ],
  },
  de: {
    eyebrow: "Warum Vaias Aparts",
    title: "Ein ganzes Apartment zum Preis eines Zimmers.",
    subtitle: "Ihre Tür, Ihr Schlüssel, Ihre Küche. Keine Rezeption, kein Hotelflur.",
    items: [
      { icon: "door", title: "46–67 m² nur für Sie", text: "Schlafzimmer, Wohnzimmer, eigenes Bad und ausgestattete Küche (Apartment 7 nutzt die Gemeinschaftsküche)." },
      { icon: "bed", title: "Emperor-Bett 2 × 2 m", text: "In jedem Apartment. Baumwollbettwäsche, für jeden Gast frisch." },
      { icon: "car", title: "Kostenloser Parkplatz im Hof", text: "Geschlossener Hof, privater Stellplatz. Keine Parkplatzsuche auf der Straße." },
      { icon: "map", title: "Zentral, unter der Burg Neamț", text: "Im Zentrum von Târgu Neamț. Agapia, Văratec und Neamț wenige Autominuten entfernt." },
    ],
  },
  it: {
    eyebrow: "Perché Vaias Aparts",
    title: "Un appartamento intero, al prezzo di una camera.",
    subtitle: "La tua porta, la tua chiave, la tua cucina. Senza reception, senza corridoio d'albergo.",
    items: [
      { icon: "door", title: "46–67 m² tutti per te", text: "Camera, soggiorno, bagno privato e cucina attrezzata (l'appartamento 7 usa la cucina comune)." },
      { icon: "bed", title: "Letto Emperor 2 × 2 m", text: "In ogni appartamento. Biancheria di cotone, cambiata per ogni ospite." },
      { icon: "car", title: "Parcheggio gratuito nel cortile", text: "Cortile chiuso, posto privato. Niente ricerca del parcheggio in strada." },
      { icon: "map", title: "In centro, sotto la cittadella di Neamț", text: "Nel centro di Târgu Neamț. Agapia, Văratec e Neamț a pochi minuti in auto." },
    ],
  },
  es: {
    eyebrow: "Por qué Vaias Aparts",
    title: "Un apartamento entero, al precio de una habitación.",
    subtitle: "Tu puerta, tu llave, tu cocina. Sin recepción, sin pasillo de hotel.",
    items: [
      { icon: "door", title: "46–67 m² solo para ti", text: "Dormitorio, salón, baño privado y cocina equipada (el apartamento 7 usa la cocina común)." },
      { icon: "bed", title: "Cama Emperor 2 × 2 m", text: "En cada apartamento. Ropa de cama de algodón, cambiada para cada huésped." },
      { icon: "car", title: "Aparcamiento gratuito en el patio", text: "Patio cerrado, plaza privada. Sin buscar sitio en la calle." },
      { icon: "map", title: "Centro, bajo la ciudadela de Neamț", text: "En el centro de Târgu Neamț. Agapia, Văratec y Neamț a pocos minutos en coche." },
    ],
  },
};

/** USP highlight band — hardcoded content, no i18n dependency. */
export default function UspBanner({ className = "", lang = "ro" }: { className?: string; lang?: string }) {
  const content: LangContent = USP_CONTENT[lang] ?? USP_CONTENT["ro"];

  return (
    <section className={`bg-forest-950 text-cream-50 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
      <div className="container-x relative py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow-light mb-4">{content.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-5xl text-cream-50 text-balance">{content.title}</h2>
          <div className="divider-gold my-7" />
          <p className="text-lg md:text-xl text-cream-100/85 leading-relaxed">{content.subtitle}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div key={item.title} className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-6 text-left">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-walnut-500/20 text-walnut-300" aria-hidden>
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-xl text-cream-50 mb-2">{item.title}</h3>
                <p className="text-sm text-cream-100/75 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
