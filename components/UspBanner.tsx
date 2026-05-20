const POINTS = [
  {
    icon: "🏠",
    title: "Un apartament întreg, nu o cameră",
    text: "Living, dormitor, bucătărie și baie — toate private, toate ale tale. Nu doar un pat într-o cameră de hotel.",
  },
  {
    icon: "⭐",
    title: "Confort de 4-5 stele la preț de 3 stele",
    text: "Spațiu, intimitate și dotări de apartament premium — la un tarif pe care alții îl cer pentru o simplă cameră.",
  },
  {
    icon: "🔑",
    title: "Ușa ta, cheia ta",
    text: "Fără recepție, fără holuri comune, fără vecini de cameră. La hotel, hostel sau pensiune primești o cameră — la noi, tot apartamentul.",
  },
];

/**
 * USP highlight band: "Entire apartment at room price".
 * Presentational + server-safe (no hooks) so it can be dropped into both
 * server and client pages. Dark band so it stands out from cream sections.
 */
export default function UspBanner({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-forest-950 text-cream-50 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
      <div className="container-x relative py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow-light mb-4">Avantajul Vaias Aparts</div>
          <h2 className="font-display text-3xl md:text-5xl text-cream-50 text-balance">
            Apartament complet la preț de cameră
          </h2>
          <div className="divider-gold my-7" />
          <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
            Nu doar un pat într-o cameră — un apartament întreg doar pentru tine. Living, dormitor,
            bucătărie și baie, toate private, toate ale tale.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-7 text-left"
            >
              <div className="text-3xl mb-4" aria-hidden>
                {p.icon}
              </div>
              <h3 className="font-display text-xl text-cream-50 mb-2">{p.title}</h3>
              <p className="text-sm text-cream-100/75 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
