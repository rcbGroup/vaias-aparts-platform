import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate | Vila Vaias Aparts",
  description: "Politica de confidențialitate a site-ului Vila Vaias Aparts. Operator: VAIA RUSTIC SRL, CUI 36258605."
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Politica de confidențialitate"
        subtitle="Cum colectăm, folosim și protejăm datele tale personale."
        image="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-narrow prose-content">
          <article className="space-y-8 text-forest-800 leading-relaxed">
            <p className="text-sm text-stone-500">
              Ultima actualizare: <strong>1 mai 2026</strong>
            </p>

            <Section title="1. Operator de date">
              <p>
                Operatorul datelor cu caracter personal colectate prin acest website este:
              </p>
              <p className="mt-2">
                <strong>VAIA RUSTIC SRL</strong><br />
                Sediu social: Str. Ștefan cel Mare Nr. 46, sat Nemțișor, Com. Vânători-Neamț, Jud. Neamț<br />
                CUI: 36258605 · Nr. înreg.: J27/603/2016<br />
                Proprietate turistică: Str. Sfântul Lazăr nr. 1, Târgu Neamț, România, 615200<br />
                Email: contact@vaiasaparts.ro<br />
                Telefon: +40 752 388 388
              </p>
            </Section>

            <Section title="2. Ce date colectăm">
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Nume, prenume, telefon, email — pentru rezervări și comunicare</li>
                <li>Adresă, CNP/CI — doar pentru oaspeții care se cazează (obligatoriu pentru registrul cazării)</li>
                <li>Detalii rezervare: date sosire/plecare, număr persoane, apartament ales</li>
                <li>Adresă IP, cookies tehnice — pentru funcționarea site-ului</li>
              </ul>
            </Section>

            <Section title="3. Scopul prelucrării">
              <p>Folosim datele tale exclusiv pentru:</p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Procesarea cererilor de rezervare și a sejururilor efective</li>
                <li>Comunicarea înainte, în timpul și după sejur</li>
                <li>Emiterea documentelor fiscale și păstrarea lor conform legii</li>
                <li>Respectarea obligațiilor legale (registru cazare, ANAF, ITM)</li>
                <li>Trimiterea de oferte sezoniere (doar cu acordul tău explicit)</li>
              </ul>
            </Section>

            <Section title="4. Temeiul legal">
              <p>
                Prelucrăm datele tale în baza:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Executării contractului de cazare</li>
                <li>Obligațiilor legale (Legea 17/1990 privind registrul cazării)</li>
                <li>Consimțământului tău expres (pentru newsletter)</li>
              </ul>
            </Section>

            <Section title="5. Cu cine partajăm datele">
              <p>
                Nu vindem și nu transmitem datele tale către terți pentru marketing. Le partajăm exclusiv cu:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Autorități publice, când legea ne obligă (poliție, ANAF)</li>
                <li>Furnizori IT (hosting, email) — sub contract și confidențialitate</li>
                <li>Procesatori de plăți — exclusiv pentru tranzacții</li>
              </ul>
            </Section>

            <Section title="6. Durata stocării">
              <p>
                Datele de rezervare sunt păstrate 5 ani (cerință fiscală). Datele de
                marketing — până la retragerea consimțământului. Cookies tehnice — maxim 12 luni.
              </p>
            </Section>

            <Section title="7. Drepturile tale">
              <p>În baza GDPR ai dreptul la:</p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Acces, rectificare, ștergere</li>
                <li>Restricționare, portabilitate</li>
                <li>Opoziție și retragere consimțământ</li>
                <li>Plângere la ANSPDCP (www.dataprotection.ro)</li>
              </ul>
              <p className="mt-3">
                Pentru orice solicitare scrie-ne la <strong>contact@vaiasaparts.ro</strong> — răspundem în maxim 30 de zile.
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                Folosim doar cookies strict tehnice (sesiune, preferințe limbă) și cookies
                de analitică agregată, fără identificare personală. Poți dezactiva oricând
                din setările browserului.
              </p>
            </Section>

            <Section title="9. Securitate">
              <p>
                Aplicăm măsuri tehnice și organizatorice rezonabile (TLS, control acces,
                copii de siguranță). În caz de incident notificăm imediat autoritatea
                competentă și persoanele afectate.
              </p>
            </Section>

            <Section title="10. Contact">
              <p>
                Pentru orice întrebare legată de prelucrarea datelor, scrie-ne la <strong>contact@vaiasaparts.ro</strong> sau sună la <strong>+40 752 388 388</strong>.
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
