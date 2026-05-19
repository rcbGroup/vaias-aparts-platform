import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Termeni și Condiții | Vila Vaias Aparts",
  description: "Termeni și condiții de rezervare și cazare la Vila Vaias Aparts Târgu Neamț. VAIA RUSTIC SRL, CUI 36258605."
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Termeni și condiții"
        subtitle="Reguli simple, scrise pe înțelesul tuturor — pentru ca sejurul tău să fie liniștit pentru toată lumea."
        image="/attractions/muntele-ceahlau.jpg"
      />

      <section className="section bg-cream-50">
        <div className="container-narrow">
          <article className="space-y-8 text-forest-800 leading-relaxed">
            <p className="text-sm text-stone-500">
              Ultima actualizare: <strong>1 mai 2026</strong>
            </p>

            <Section title="1. Definiții">
              <p>
                <strong>Vila Vaias Aparts</strong> — VAIA RUSTIC SRL, Str. Sfântul Lazăr nr. 1, Târgu Neamț, România, 615200.{" "}
                <strong>Oaspete</strong> — persoana fizică sau
                juridică care rezervă sau ocupă o unitate de cazare.
              </p>
            </Section>

            <Section title="2. Rezervare">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Rezervarea se face online, telefonic sau prin WhatsApp.</li>
                <li>Confirmarea oficială apare la primirea acontului de 30%.</li>
                <li>Acontul se plătește prin transfer bancar sau card în maxim 48h de la cererea de rezervare.</li>
                <li>Lipsa acontului în termen anulează automat cererea.</li>
              </ul>
            </Section>

            <Section title="3. Plată">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Acont 30% la confirmare; restul la check-in.</li>
                <li>Plata se efectuează în lei (RON). Factura fiscală se emite în RON.</li>
                <li>Acceptăm card (Visa, Mastercard), transfer bancar, numerar și tichete de vacanță (Pluxee, Up Romania, Edenred).</li>
                <li>Factura fiscală se emite la check-out, la cerere.</li>
              </ul>
            </Section>

            <Section title="4. Anulare și modificare">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Anulare gratuită cu min. 7 zile înainte de check-in — acont integral rambursat.</li>
                <li>Anulare cu 3-7 zile înainte — acont reținut.</li>
                <li>Anulare cu mai puțin de 3 zile sau no-show — se plătește integral prima noapte.</li>
                <li>Modificările datelor sunt gratuite cu min. 7 zile înainte, sub rezerva disponibilității.</li>
              </ul>
            </Section>

            <Section title="5. Check-in și check-out">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Check-in: după ora 14:00. Check-out: până la 11:00.</li>
                <li>Late check-out la 13:00: gratuit pentru rezervări directe (sub rezerva disponibilității).</li>
                <li>Self check-in disponibil 24/7 cu instrucțiuni primite cu o zi înainte.</li>
                <li>La check-in, oaspetele majorează prezintă un act de identitate valabil.</li>
              </ul>
            </Section>

            <Section title="6. Reguli de casă">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Liniște după ora 22:00.</li>
                <li>Fumatul este interzis în interior; permis pe terase și în curte.</li>
                <li>Animalele de companie sunt acceptate la cerere prealabilă, fără cost suplimentar, în toate apartamentele.</li>
                <li>Nu sunt permise petreceri sau evenimente fără acord scris.</li>
                <li>Numărul de oaspeți nu poate depăși capacitatea declarată în rezervare.</li>
              </ul>
            </Section>

            <Section title="7. Daune și siguranță">
              <p>
                Oaspeții sunt responsabili pentru daunele produse din neglijență sau folosire
                inadecvată. Costul reparațiilor poate fi reținut din garanție sau facturat
                separat. Vila Vaias Aparts nu este responsabilă pentru obiectele personale
                pierdute, dar oferă suport în recuperarea lor.
              </p>
            </Section>

            <Section title="8. Garanție">
              <p>
                Pentru sejururi de 7+ nopți sau grupuri mari, putem solicita o garanție
                rambursabilă, blocată pe card la check-in și deblocată la
                check-out, dacă nu apar daune. Valoarea garanției se stabilește de comun acord
                la momentul confirmării rezervării.
              </p>
            </Section>

            <Section title="9. Forță majoră">
              <p>
                În caz de forță majoră (calamități, restricții guvernamentale), oferim
                voucher integral valabil 12 luni sau rambursare, la alegerea oaspetelui.
              </p>
            </Section>

            <Section title="10. Reclamații">
              <p>
                Orice reclamație se poate face în timpul sejurului către gazdă sau, ulterior,
                la <strong>contact@vaiasaparts.ro</strong>. Răspundem în maxim 14 zile. ANPC: anpc.ro.
              </p>
            </Section>

            <Section title="11. Lege aplicabilă">
              <p>
                Acești termeni sunt guvernați de legea română. Litigiile se soluționează
                amiabil sau, în caz contrar, de către instanțele din Piatra Neamț.
              </p>
            </Section>
          </article>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-forest-900 mb-3">{title}</h2>
      <div className="text-forest-800/90">{children}</div>
    </div>
  );
}
