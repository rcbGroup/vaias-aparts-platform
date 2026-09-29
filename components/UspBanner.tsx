import { getDict, DEFAULT_LANG, Lang } from "@/lib/i18n";

/**
 * USP highlight band – server-safe, works in both server and client pages.
 * Receives `lang` from the parent so it never depends on React context.
 */
export default function UspBanner({
  className = "",
  lang = DEFAULT_LANG,
}: {
  className?: string;
  lang?: Lang;
}) {
  const dict = getDict(lang);
  const t = (key: string) => dict[key] ?? getDict(DEFAULT_LANG)[key] ?? key;

  const POINTS = [
    {
      icon: "🎯",
      titleKey: "usp.1.title",
      textKey: "usp.1.text",
    },
    {
      icon: "⭐",
      titleKey: "usp.2.title",
      textKey: "usp.2.text",
    },
    {
      icon: "📍",
      titleKey: "usp.3.title",
      textKey: "usp.3.text",
    },
  ];

  return (
    <section className={`bg-forest-950 text-cream-50 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pattern-moldavian-dark opacity-30 pointer-events-none" />
      <div className="container-x relative py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow-light mb-4">{t("usp.eyebrow")}</div>
          <h2 className="font-display text-3xl md:text-5xl text-cream-50 text-balance">
            {t("usp.title")}
          </h2>
          <div className="divider-gold my-7" />
          <p className="font-serif text-lg md:text-xl text-cream-100/85 leading-relaxed">
            {t("usp.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {POINTS.map((p) => (
            <div
              key={p.titleKey}
              className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-7 text-left"
            >
              <div className="text-3xl mb-4" aria-hidden>
                {p.icon}
              </div>
              <h3 className="font-display text-xl text-cream-50 mb-2">{t(p.titleKey)}</h3>
              <p className="text-sm text-cream-100/75 leading-relaxed">{t(p.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
