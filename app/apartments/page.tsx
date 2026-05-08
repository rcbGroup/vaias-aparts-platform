import type { Metadata } from "next";
import { apartments } from "@/lib/apartments";
import ApartmentCard from "@/components/ApartmentCard";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apartamente — toate spațiile noastre boutique",
  description:
    "Patru apartamente boutique la marginea Târgu Neamț, fiecare cu personalitate proprie. Vezi prețurile, detaliile și disponibilitatea."
};

export default function ApartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Apartamentele noastre"
        title="Patru spații, patru povești."
        subtitle="De la garsoniera cochetă cu vedere la cetate, până la suita generoasă pentru reuniuni de familie."
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="grid gap-7 md:grid-cols-2">
            {apartments.map((a, i) => (
              <ApartmentCard key={a.slug} apartment={a} priority={i < 2} />
            ))}
          </div>

          <div className="mt-20 rounded-2xl bg-forest-900 text-cream-50 p-10 md:p-14 text-center">
            <div className="eyebrow-light mb-4">Nu ești sigur ce să alegi?</div>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50">
              Sună-ne — te ajutăm să găsești apartamentul potrivit.
            </h2>
            <p className="mt-4 font-serif text-lg text-cream-100/85 max-w-2xl mx-auto">
              Spune-ne câți oaspeți sunteți, ce căutați și pentru ce date — îți facem o
              recomandare personalizată în mai puțin de 30 de minute.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/40740000000" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                WhatsApp
              </a>
              <Link href="/contact" className="btn-outline-light">
                Trimite mesaj
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
