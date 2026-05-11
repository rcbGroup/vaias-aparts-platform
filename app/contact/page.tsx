import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact și Rezervare | Vila Vaias Aparts Târgu Neamț — +40 752 388 388",
  description:
    "Contactați Vila Vaias Aparts direct pe WhatsApp sau telefon: +40 752 388 388. Rezervări, disponibilitate și oferte personalizate. Str. Sfântul Lazăr nr. 1, Târgu Neamț."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Vorbește direct cu noi."
        subtitle="Răspundem la toate mesajele în maxim 4 ore — și mai repede dacă scrii pe WhatsApp."
        image="https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg"
      />

      <section className="section bg-cream-50">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="eyebrow mb-3">Telefon & WhatsApp</div>
              <div className="space-y-3">
                <div>
                  <a href="tel:+40752388388" className="font-display text-3xl text-forest-900 hover:text-walnut-600 block">
                    +40 752 388 388
                  </a>
                  <a href="https://wa.me/40752388388" target="_blank" rel="noopener noreferrer"
                     className="text-walnut-600 hover:text-walnut-700 inline-flex items-center gap-2 mt-1 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/></svg>
                    WhatsApp — +40 752 388 388
                  </a>
                </div>
                <div>
                  <a href="tel:+40738345330" className="font-display text-2xl text-forest-900 hover:text-walnut-600 block">
                    +40 738 345 330
                  </a>
                  <a href="https://wa.me/40738345330" target="_blank" rel="noopener noreferrer"
                     className="text-walnut-600 hover:text-walnut-700 inline-flex items-center gap-2 mt-1 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/></svg>
                    WhatsApp — +40 738 345 330
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-3">Email</div>
              <a href="mailto:contact@vaiasaparts.ro" className="font-display text-2xl text-forest-900 hover:text-walnut-600 block">
                contact@vaiasaparts.ro
              </a>
              <a href="mailto:vaiasaparts@gmail.com" className="font-display text-xl text-forest-900 hover:text-walnut-600 block">
                vaiasaparts@gmail.com
              </a>
              <p className="text-sm text-stone-500 mt-1">
                De regulă răspundem în câteva ore, între 08:00 și 22:00. WhatsApp este cel mai rapid.
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">Adresă</div>
              <p className="text-forest-800 leading-relaxed">
                Vaias Aparts<br />
                Str. Sfântul Lazăr nr. 1<br />
                Târgu Neamț, jud. Neamț<br />
                România, 615200
              </p>
              <p className="text-sm text-stone-500 mt-2">
                5 minute de Cetatea Neamț · 15 minute de Mănăstirea Agapia
              </p>
              <p className="text-sm text-stone-500 mt-4 flex items-center gap-2">
                🔒 CCTV 24/7 în zonele comune · Parcare gratuită în curte · Animale acceptate la cerere
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">Social și recenzii</div>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.facebook.com/vaiasaparts" target="_blank" rel="noopener noreferrer" className="btn-secondary">Facebook</a>
                <a href="https://www.youtube.com/@vaiasaparts" target="_blank" rel="noopener noreferrer" className="btn-secondary">YouTube</a>
                <a href="https://www.tripadvisor.com/Profile/VaiasAparts" target="_blank" rel="noopener noreferrer" className="btn-secondary">TripAdvisor</a>
                <a href="https://share.google/iFsW4iUjwIDgkgwZm" target="_blank" rel="noopener noreferrer" className="btn-secondary">Google Reviews</a>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-3">Facilități</div>
              <ul className="space-y-2 text-sm text-forest-800">
                <li>🔒 CCTV 24/7 în zonele comune — siguranță și liniște</li>
                <li>🍳 Bucătăria pentru Toți — bucătărie comună la parter, disponibilă tuturor oaspeților</li>
                <li>🚗 Parcare gratuită în curtea vilei</li>
                <li>🐾 Animale acceptate la cerere, fără cost suplimentar</li>
                <li>📄 Factură fiscală disponibilă la cerere</li>
              </ul>
            </div>

            <div>
              <div className="eyebrow mb-3">Program</div>
              <p className="text-forest-800 leading-relaxed">
                Răspundem la mesaje în fiecare zi între 08:00 și 22:00.<br />
                Check-in self-service disponibil 24/7.
              </p>
            </div>

            <div className="mt-6">
              <div className="eyebrow mb-3">Disponibilitate live</div>
              <a href="https://www.5stardesk.net/b/vaias-aparts" target="_blank" rel="noopener noreferrer"
                 className="btn-secondary w-full text-center block">
                Verifică disponibilitate
              </a>
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
              src="https://www.openstreetmap.org/export/embed.html?bbox=26.3543%2C47.2047%2C26.3646%2C47.2107&amp;layer=mapnik&amp;marker=47.2076828%2C26.3594528"
              className="w-full h-full border-0"
              loading="lazy"
              title="Hartă Vaias Aparts"
            />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Vila Vaias Aparts",
            telephone: ["+40752388388", "+40738345330"],
            email: "contact@vaiasaparts.ro",
            url: "https://www.vaiasaparts.ro",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Str. Sfântul Lazăr nr. 1",
              addressLocality: "Târgu Neamț",
              addressRegion: "Neamț",
              postalCode: "615200",
              addressCountry: "RO"
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              opens: "08:00",
              closes: "22:00"
            }
          })
        }}
      />
    </>
  );
}
