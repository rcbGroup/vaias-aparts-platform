import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = "https://www.vaiasaparts.ro";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${base}${c.href}` : undefined
    }))
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="container-x pt-6 text-xs uppercase tracking-[0.18em] text-stone-500"
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-walnut-600 transition">
                  {c.label}
                </Link>
              ) : (
                <span className="text-forest-800">{c.label}</span>
              )}
              {i < items.length - 1 && <span aria-hidden>›</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
