import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[64vh] min-h-[520px] w-full overflow-hidden bg-forest-950">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-forest-950/40 to-forest-950/85" />
      <div className="absolute inset-0 pattern-moldavian-dark opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 flex items-end pb-20">
        <div className="container-x text-cream-50 animate-slide-up">
          <div className="eyebrow-light mb-5">{eyebrow}</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-cream-50 max-w-3xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 font-serif text-xl md:text-2xl text-cream-100/90 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
