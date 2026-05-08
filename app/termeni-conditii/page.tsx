import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Condițiile de rezervare și utilizare ale serviciilor Vaias Aparts."
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Termeni și condiții"
        subtitle="Reguli simple, scrise pe înțelesul tuturor — pentru ca sejurul tău să fie liniștit pentru toată lumea."
        image="https://images.unsplash.com/photo-1502780402662-acc01917ddc5?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-narrow">
          <article className="space-y-8 text-forest-800 leading-relaxed">
            <p className="text-sm text-stone-500">
              Ultima actualizare: <strong>1 mai 2026</strong>
            </p>

            <Section title="1. Definiții">
              <p>
                <strong>Vaias Aparts</strong> — Vaias Aparts SRL, Strada Boureni nr. 12,
                Târgu Neamț, jud. Neamț. <strong>Oaspete</strong> — persoana fizică sau
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
                <li>Plată în RON sau EUR la cursul BNR + 1%.</li>
                <li>Acceptăm card (Visa, Mastercard), transfer bancar și numerar.</li>
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
                <li>Check-in: după ora 15:00. Check-out: până la 11:00.</li>
                <li>Late check-out la 13:00: gratuit pentru rezervări directe (sub rezerva disponibilității).</li>
                <li>Self check-in disponibil 24/7 cu instrucțiuni primite cu o zi înainte.</li>
                <li>La check-in, oaspetele majorează prezintă un act de identitate valabil.</li>
              </ul>
            </Section>

            <Section title="6. Reguli de casă">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Liniște după ora 22:00.</li>
                <li>Fumatul este interzis în interior; permis pe terase și în curte.</li>
                <li>Animalele de companie sunt acceptate doar la cerere prealabilă (€10/noapte).</li>
                <li>Nu sunt permise petreceri sau evenimente fără acord scris.</li>
                <li>Numărul de oaspeți nu poate depăși capacitatea declarată în rezervare.</li>
              </ul>
            </Section>

            <Section title="7. Daune și siguranță">
              <p>
                Oaspeții sunt responsabili pentru daunele produse din neglijență sau folosire
                inadecvată. Costul reparațiilor poate fi reținut din garanție sau facturat
                separat. Vaias Aparts nu este responsabil pentru obiectele personale
                pierdute, dar oferă suport în recuperarea lor.
              </p>
            </Section>

            <Section title="8. Garanție">
              <p>
                Pentru sejururi de 7+ nopți sau grupuri mari, putem solicita o garanție
                rambursabilă de 100-300 EUR, blocată pe card la check-in și deblocată la
                check-out, dacă nu apar daune.
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
                la <strong>contact@VaiasAparts.ro</strong>. Răspundem în maxim 14 zile. ANPC: anpc.ro.
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
