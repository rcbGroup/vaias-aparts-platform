import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — vorbește direct cu noi",
  description:
    "Telefon, WhatsApp, email și un formular simplu. Răspundem la toate mesajele în maxim 4 ore."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Vorbește direct cu noi."
        subtitle="Răspundem la toate mesajele în maxim 4 ore — și mai repede dacă scrii pe WhatsApp."
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="eyebrow mb-3">Telefon & WhatsApp</div>
              <a href="tel:+40740000000" className="font-display text-3xl text-forest-900 hover:text-walnut-600 block">
                +40 738 345 330
              </a>
              <a
                href="https://wa.me/40738345330"
                className="text-walnut-600 hover:text-walnut-700 inline-flex items-center gap-2 mt-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/></svg>
                Scrie pe WhatsApp
              </a>
            </div>

            <div>
              <div className="eyebrow mb-3">Email</div>
              <a href="mailto:contact@VaiasAparts.ro" className="font-display text-2xl text-forest-900 hover:text-walnut-600">
                contact@VaiasAparts.ro
              </a>
              <p className="text-sm text-stone-500 mt-1">
                Răspundem în 4 ore lucrătoare.
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">Adresă</div>
              <p className="text-forest-800 leading-relaxed">
                Vaias Aparts<br />
                Strada Sfântul Lazăr Nr. 1<br />
                Târgu Neamț, jud. Neamț<br />
                România, 615200
              </p>
              <p className="text-sm text-stone-500 mt-2">
                5 minute de Cetatea Neamț · 15 minute de Mănăstirea Agapia
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">Social</div>
              <div className="flex flex-wrap gap-3">
                <a href="https://facebook.com" className="btn-secondary">Facebook</a>
                <a href="https://instagram.com" className="btn-secondary">Instagram</a>
                <a href="https://tripadvisor.com" className="btn-secondary">TripAdvisor</a>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-3">Program</div>
              <p className="text-forest-800 leading-relaxed">
                Răspundem la mesaje în fiecare zi între 08:00 și 22:00.<br />
                Check-in self-service disponibil 24/7.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-8 md:p-10 shadow-soft">
              <h2 className="font-display text-3xl text-forest-900 mb-2">Trimite-ne un mesaj</h2>
              <p className="text-stone-500 mb-7">
                Răspundem cu o ofertă personalizată în câteva ore.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-stone-50 pb-20">
        <div className="container-x">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] shadow-soft">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=26.30%2C47.16%2C26.42%2C47.24&amp;layer=mapnik&amp;marker=47.20%2C26.36"
              className="w-full h-full border-0"
              loading="lazy"
              title="Hartă Vaias Aparts"
            />
          </div>
        </div>
      </section>
    </>
  );
}
