// build-trigger: 2026-09-29T18:30:00Z — deploy fix
type LangContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: { icon: string; title: string; text: string }[];
};

const USP_CONTENT: Record<string, LangContent> = {
  ro: {
    eyebrow: "De ce să alegeți Vaias Aparts",
    title: "Experiența perfectă de vacanță",
    subtitle: "Apartamente premium în inima Moldovei",
    items: [
      { icon: "🎯", title: "Activități & Divertisment", text: "Acces la activități sportive, muzică live și entertainment exclusiv" },
      { icon: "⭐", title: "Servicii Premium", text: "Servicii de concierge, mic dejun și transfer aeroport disponibile" },
      { icon: "📍", title: "Locație Ideală", text: "Situat în centrul Târgu Neamțului, aproape de toate atracțiile locale" },
    ],
  },
  en: {
    eyebrow: "Why Choose Vaias Aparts",
    title: "The Perfect Holiday Experience",
    subtitle: "Premium apartments in the heart of Moldova",
    items: [
      { icon: "🎯", title: "Activities & Entertainment", text: "Access to sports activities, live music and exclusive entertainment" },
      { icon: "⭐", title: "Premium Services", text: "Concierge, breakfast and airport transfer services available" },
      { icon: "📍", title: "Ideal Location", text: "Located in the centre of Târgu Neamț, close to all local attractions" },
    ],
  },
  fr: {
    eyebrow: "Pourquoi choisir Vaias Aparts",
    title: "L'expérience de vacances parfaite",
    subtitle: "Appartements premium au cœur de la Moldavie",
    items: [
      { icon: "🎯", title: "Activités & Divertissement", text: "Accès aux activités sportives, musique live et divertissements exclusifs" },
      { icon: "⭐", title: "Services Premium", text: "Services de conciergerie, petit-déjeuner et transfert aéroport disponibles" },
      { icon: "📍", title: "Emplacement Idéal", text: "Situé au centre de Târgu Neamț, proche de toutes les attractions locales" },
    ],
  },
  de: {
    eyebrow: "Warum Vaias Aparts wählen",
    title: "Das perfekte Urlaubserlebnis",
    subtitle: "Premium-Apartments im Herzen der Moldau",
    items: [
      { icon: "🎯", title: "Aktivitäten & Unterhaltung", text: "Zugang zu Sportaktivitäten, Live-Musik und exklusiver Unterhaltung" },
      { icon: "⭐", title: "Premium-Services", text: "Concierge-, Frühstücks- und Flughafentransferservices verfügbar" },
      { icon: "📍", title: "Ideale Lage", text: "Im Zentrum von Târgu Neamț gelegen, nahe aller lokalen Sehenswürdigkeiten" },
    ],
  },
  it: {
    eyebrow: "Perché scegliere Vaias Aparts",
    title: "L'esperienza vacanza perfetta",
    subtitle: "Appartamenti premium nel cuore della Moldavia",
    items: [
      { icon: "🎯", title: "Attività & Intrattenimento", text: "Accesso ad attività sportive, musica dal vivo e intrattenimento esclusivo" },
      { icon: "⭐", title: "Servizi Premium", text: "Servizi di concierge, colazione e transfer aeroportuale disponibili" },
      { icon: "📍", title: "Posizione Ideale", text: "Situato nel centro di Târgu Neamț, vicino a tutte le attrazioni locali" },
    ],
  },
  es: {
    eyebrow: "Por qué elegir Vaias Aparts",
    title: "La experiencia de vacaciones perfecta",
    subtitle: "Apartamentos premium en el corazón de Moldavia",
    items: [
      { icon: "🎯", title: "Actividades y Entretenimiento", text: "Acceso a actividades deportivas, música en vivo y entretenimiento exclusivo" },
      { icon: "⭐", title: "Servicios Premium", text: "Servicios de conserjería, desayuno y traslado al aeropuerto disponibles" },
      { icon: "📍", title: "Ubicación Ideal", text: "Ubicado en el centro de Târgu Neamț, cerca de todas las atracciones locales" },
    ],
  },
};

/**
 * USP highlight band — hardcoded content, NO i18n dependency.
 * Accepts lang prop and looks up from USP_CONTENT directly.
 */
export default function UspBanner({
  className = "",
  lang = "ro",
}: {
  className?: string;
  lang?: string;
}) {
  const content: LangContent = USP_CONTENT[lang] ?? USP_CONTENT["ro"];

  return (
    <section className={`bg-forest-950 text-cream-50 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
      <div className="container-x relative py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow-light mb-4">{content.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-5xl text-cream-50 text-balance">
            {content.title}
          </h2>
          <div className="divider-gold my-7" />
          <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
            {content.subtitle}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-7 text-left"
            >
              <div className="text-3xl mb-4" aria-hidden>
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-cream-50 mb-2">{item.title}</h3>
              <p className="text-sm text-cream-100/75 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
