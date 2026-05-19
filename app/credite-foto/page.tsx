import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { attractionImageCredits, attractions } from "@/lib/attractions";

export const metadata: Metadata = {
  title: "Credite foto — Vila Vaias Aparts",
  description:
    "Atribuții pentru fotografiile zonelor turistice afișate pe site — surse Wikimedia Commons, licențe Creative Commons.",
  alternates: { canonical: "https://www.vaiasaparts.ro/credite-foto" }
};

const attractionByslug = Object.fromEntries(
  attractions.map((a) => [a.slug, a])
);

export default function CrediteFotoPage() {
  return (
    <>
      <PageHero
        eyebrow="Credite foto"
        title="Mulțumim autorilor fotografiilor"
        subtitle="Fotografiile zonelor turistice afișate pe acest site provin de pe Wikimedia Commons, sub licențe Creative Commons. Aici sunt atribuțiile complete."
        image="/attractions/manastirea-neamt.jpg"
      />

      <section className="section bg-cream-50">
        <div className="container-narrow">
          <div className="prose prose-stone max-w-none">
            <p className="text-stone-700 leading-relaxed">
              Toate fotografiile cu mănăstiri, cetăți, munți și locuri din județul Neamț afișate
              pe acest site sunt opera unor fotografi independenți și sunt distribuite gratuit
              pe <a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> sub
              licențe Creative Commons. Mai jos găsiți autorul, licența și sursa pentru fiecare imagine.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Fotografiile interioare și exterioare ale Vila Vaias Aparts sunt proprietatea noastră
              și nu sunt incluse în această listă.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {attractionImageCredits.map((c) => {
              const a = attractionByslug[c.slug];
              return (
                <div
                  key={c.slug}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div className="font-display text-xl text-forest-900 mb-2">
                    {a?.name ?? c.slug}
                  </div>
                  <ul className="text-sm text-stone-700 space-y-1">
                    <li>
                      <span className="text-stone-500">Autor:</span> {c.author}
                    </li>
                    <li>
                      <span className="text-stone-500">Licență:</span>{" "}
                      <span className="font-mono text-xs">{c.license}</span>
                    </li>
                    <li>
                      <span className="text-stone-500">Sursă:</span>{" "}
                      <a
                        href={c.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-walnut-600 hover:text-walnut-700 underline break-all"
                      >
                        {c.source}
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-sm text-stone-500 leading-relaxed">
            <p>
              Detalii despre licențele Creative Commons:{" "}
              <a
                href="https://creativecommons.org/licenses/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                creativecommons.org/licenses
              </a>
              .
            </p>
            <p className="mt-4">
              Dacă sunteți autorul uneia dintre aceste fotografii și doriți o corecție a atribuției
              sau eliminarea imaginii, vă rugăm să ne contactați la{" "}
              <a href="mailto:contact@vaiasaparts.ro" className="underline">
                contact@vaiasaparts.ro
              </a>
              .
            </p>
            <p className="mt-8">
              <Link href="/" className="text-walnut-600 hover:text-walnut-700 underline">
                ← Înapoi la pagina principală
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
