import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Politică Cookies | Vila Vaias Aparts",
  description: "Politica privind cookies pe site-ul Vila Vaias Aparts. Operator: VAIA RUSTIC SRL, CUI 36258605."
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Politică Cookies"
        subtitle="Ce sunt cookies, ce folosim și cum le poți controla."
        image="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=85"
      />

      <section className="section bg-cream-50">
        <div className="container-narrow prose-content">
          <article className="space-y-8 text-forest-800 leading-relaxed">
            <p className="text-sm text-stone-500">
              Ultima actualizare: <strong>1 mai 2026</strong>
            </p>

            <Section title="1. Ce sunt cookies">
              <p>
                Cookies sunt fișiere text de mici dimensiuni pe care site-urile web le
                salvează în browserul tău pentru a-și aminti preferințele tale, a-ți
                păstra sesiunea activă și a măsura modul în care site-ul este folosit.
                Nu conțin programe executabile și nu pot accesa alte fișiere de pe
                dispozitivul tău.
              </p>
            </Section>

            <Section title="2. Ce cookies folosim">
              <p>Pe vaiasaparts.ro folosim doar două categorii:</p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>
                  <strong>Cookies strict necesare</strong> — pentru funcționarea site-ului
                  (sesiune, preferință limbă RO/EN, securitate formulare). Fără acestea
                  rezervările și schimbarea limbii nu funcționează.
                </li>
                <li>
                  <strong>Cookies de analitică agregată</strong> — pentru a înțelege ce
                  pagini sunt vizitate, fără identificare personală. Datele sunt
                  agregate și nu sunt vândute terților.
                </li>
              </ul>
              <p className="mt-3">
                Nu folosim cookies de publicitate comportamentală și nu permitem terților
                să te urmărească pe alte site-uri.
              </p>
            </Section>

            <Section title="3. Durata cookies">
              <p>
                Cookies de sesiune se șterg automat când închizi browserul. Cookies
                persistente (de exemplu preferința de limbă) au o durată de maxim 12 luni,
                după care expiră și sunt recreate la următoarea vizită.
              </p>
            </Section>

            <Section title="4. Cum dezactivezi cookies">
              <p>
                Poți bloca sau șterge cookies oricând din setările browserului tău.
                Instrucțiuni pentru cele mai populare browsere:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Chrome: Setări → Confidențialitate și securitate → Cookies</li>
                <li>Firefox: Setări → Confidențialitate &amp; securitate</li>
                <li>Safari: Preferințe → Confidențialitate</li>
                <li>Edge: Setări → Cookies și permisiuni site</li>
              </ul>
              <p className="mt-3">
                Reține că dezactivarea cookies strict necesare poate face ca anumite
                funcționalități (rezervare, limbă) să nu mai funcționeze corect.
              </p>
            </Section>

            <Section title="5. Cookies de la terți">
              <p>
                Site-ul poate încărca resurse găzduite de terți (imagini, hărți, fonturi,
                video YouTube). Acești furnizori își aplică propriile politici de cookies.
                Nu controlăm conținutul cookies-urilor lor și te încurajăm să consulți
                politicile lor de confidențialitate.
              </p>
            </Section>

            <Section title="6. Modificări">
              <p>
                Această politică poate fi actualizată periodic. Versiunea curentă este
                cea publicată pe această pagină, cu data de la începutul documentului.
              </p>
            </Section>

            <Section title="7. Contact">
              <p>
                Pentru întrebări despre cookies sau prelucrarea datelor, scrie-ne la{" "}
                <strong>contact@vaiasaparts.ro</strong> sau sună la{" "}
                <strong>+40 752 388 388</strong>. Vezi și{" "}
                <a href="/politica-confidentialitate" className="underline">Politica de Confidențialitate</a>.
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
