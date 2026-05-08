export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center"
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest-900 text-balance">
        {title}
      </h2>
      {align === "center" && <div className="divider-gold my-7" />}
      {subtitle && (
        <p className={`font-serif text-lg md:text-xl text-stone-500 leading-relaxed ${align === "left" ? "mt-5" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
