import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExploreArea from "@/components/ExploreArea";
import { EXPLORE_URL, exploreHero, exploreSections } from "@/lib/explore-area";

export const metadata: Metadata = {
  title: "Descoperă zona — Vânători-Neamț și Ținutul Zimbrului, lângă Vaias Aparts",
  description:
    "Ghid local bilingv (RO/EN): rezervația de zimbri Dragoș Vodă, Parcul Natural Vânători-Neamț, mănăstirile Neamț, Secu, Sihăstria, Agapia și Văratec, schiturile din pădure, Cetatea Neamț, casa lui Creangă, muzeele din Vovidenia, Lunca și Agapia, Han Rustic și informații practice — toate la câteva minute de Vaias Aparts, Târgu Neamț.",
  alternates: { canonical: EXPLORE_URL },
  openGraph: {
    type: "article",
    locale: "ro_RO",
    url: EXPLORE_URL,
    siteName: "Vila Vaias Aparts",
    title: "Descoperă zona — Ținutul Zimbrului, chiar lângă Vaias Aparts",
    description:
      "Zimbri, mănăstiri, schituri în pădure, cetate și muzee — ghidul nostru local pentru comuna Vânători-Neamț, din poarta vilei.",
    images: [{ url: exploreHero.image, width: 1200, height: 630, alt: "Parcul Natural Vânători-Neamț" }]
  }
};

export default function ExploreAreaPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Descoperă zona — Vânători-Neamț, lângă Vila Vaias Aparts",
    itemListElement: exploreSections
      .flatMap((s) => s.places)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name.ro,
        description: p.note.ro
      }))
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Acasă", href: "/" }, { label: "Descoperă zona" }]} />
      <ExploreArea />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </>
  );
}
