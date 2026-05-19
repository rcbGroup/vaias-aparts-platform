import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cazare pelerini mănăstiri Moldova | Vaias Aparts Târgu Neamț",
  description: "Cazare boutique pentru pelerinii care vizitează mănăstirile Moldovei — Agapia, Văratec, Neamț, Secu, Sihăstria. La 30 de minute de mănăstirile din Neamț.",
  keywords: ["cazare pelerini Moldova", "mănăstiri Neamț cazare", "Agapia Văratec cazare", "pelerinaj Moldova", "retragere spirituală Neamț"]
};

const monasteries = [
  { name: "Mănăstirea Agapia", dist: "30 min", desc: "Cea mai vizitată mănăstire din Moldova. Picturile lui Nicolae Grigorescu." },
  { name: "Mănăstirea Văratec", dist: "35 min", desc: "Cea mai mare mănăstire de maici din România. 400 de monahii." },
  { name: "Mănăstirea Neamț", dist: "15 min", desc: "Cea mai veche vatră monahală din Moldova. Biblioteca cu manuscrise." },
  { name: "Mănăstirea Secu", dist: "40 min", desc: "Liniște deplină în pădure. Ctitorie din 1602." },
  { name: "Mănăstirea Sihăstria", dist: "45 min", desc: "Locul Părintelui Cleopa. Pelerinaj la mormântul sfântului." },
  { name: "Mănăstirea Bistrița", dist: "25 min", desc: "Una dintre cele mai vechi mănăstiri moldovenești. Izvorul Tămăduirii." }
];

export default function PeleriniPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end bg-forest-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/attractions/manastirea-neamt.jpg"
            alt="Mănăstirea Neamț — Moldova, România"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 to-forest-950" />
        <div className="relative container-x pb-8">
          <div className="max-w-3xl">
            <div className="eyebrow-light mb-4">Cazare pentru pelerini</div>
            <h1 className="font-display text-5xl md:text-6xl text-cream-50 text-balance leading-tight">
              Aproape de mănăstiri. Departe de agitație.
            </h1>
            <p className="mt-6 font-serif text-xl text-cream-100/85 max-w-2xl leading-relaxed">
              Vaias Aparts — baza ta de pelerinaj în inima Neamțului. La 15 minute de Mănăstirea Neamț, 30 de minute de Agapia și Văratec.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/rezervare" className="btn-primary text-lg px-8 py-4">
                Rezervă locul tău
              </Link>
              <a href="https://wa.me/40738345330" target="_blank" rel="noreferrer" className="btn-outline-light text-lg px-8 py-4">
                Întreabă disponibilitate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DISTANCE TABLE */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-4">Mănăstirile Moldovei</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Șase mănăstiri, toate la o oră distanță.
            </h2>
            <div className="divider-gold my-7" />
            <p className="font-serif text-lg text-forest-700/80">
              Târgu Neamț este poarta mănăstirilor din nord-estul Moldovei. Din Strada Sfântul Lazăr Nr. 1, ajungeți la toate mănăstirile fără drum lung.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {monasteries.map((m) => (
              <div key={m.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg text-forest-900">{m.name}</h3>
                  <span className="rounded-full bg-walnut-100 text-walnut-700 px-3 py-0.5 text-xs font-medium">{m.dist}</span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STAY */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-4">De ce Vaias Aparts</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              Un loc de odihnă adevărată.
            </h2>
            <div className="divider-gold my-7" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🌿", title: "Liniște și pace", text: "Fără petreceri, fără zgomot. Apartamente independente cu atmosphere de retragere." },
              { icon: "🛏", title: "Odihnă reală", text: "Pat Emperor 2×2m, lenjerie de bumbac, somn adânc după o zi de pelerinaj." },
              { icon: "🍳", title: "Bucătărie echipată", text: "Kitchen for All — gătiți ce doriți: post, mâncare de casă sau micul dejun devreme." },
              { icon: "⏰", title: "Check-in flexibil", text: "Ajungeți după slujba de seară? Ne sunați și intrarea se face autonom, oricând." },
              { icon: "🚗", title: "Parcare sigură", text: "Parcare privată în curte, gratuită. Porniți la mănăstiri oricând." },
              { icon: "📿", title: "Ghidaj spiritual", text: "La cerere, vă recomandăm duhovnicii, programul slujbelor și traseele mai puțin cunoscute." }
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-forest-800/40 border border-cream-200/10 p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-display text-xl text-cream-50 mb-2">{f.title}</h3>
                <p className="text-cream-100/75 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-4">Itinerar sugerat</div>
            <h2 className="font-display text-4xl text-forest-900 text-balance">
              3 zile de pelerinaj în Moldova.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Ziua 1",
                subtitle: "Mănăstirile Văii Neamțului",
                items: [
                  "Sosire la Vaias Aparts (check-in 14:00)",
                  "Vizită Cetatea Neamț (5 min)",
                  "Utrenie la Mănăstirea Neamț",
                  "Mănăstirea Bistrița",
                  "Rugăciune de seară"
                ]
              },
              {
                title: "Ziua 2",
                subtitle: "Agapia și Văratec",
                items: [
                  "Liturghie la Agapia (7:00)",
                  "Vizită picturi Grigorescu",
                  "Prânz la obștea mănăstirii",
                  "Mănăstirea Văratec",
                  "Mormântul Veronicăi Micle"
                ]
              },
              {
                title: "Ziua 3",
                subtitle: "Sihăstria și Secu",
                items: [
                  "Utrenie la Sihăstria (6:00)",
                  "La mormântul Părintelui Cleopa",
                  "Mănăstirea Secu — pădure, liniște",
                  "Liturghie de întoarcere",
                  "Check-out 11:00"
                ]
              }
            ].map((d) => (
              <div key={d.title} className="rounded-2xl bg-stone-50 border border-stone-100 p-7">
                <div className="eyebrow mb-1">{d.title}</div>
                <h3 className="font-display text-xl text-forest-900 mb-5">{d.subtitle}</h3>
                <ul className="space-y-3">
                  {d.items.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-walnut-100 text-walnut-600 text-[10px] grid place-items-center shrink-0 font-medium">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICAL */}
      <section className="section bg-stone-50">
        <div className="container-narrow">
          <div className="eyebrow text-center mb-4">Informații practice</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-center mb-10">
            Ce trebuie să știți.
          </h2>
          <div className="space-y-4 text-sm text-stone-600 max-w-2xl mx-auto">
            {[
              "Dress code la mănăstiri: femeile poartă fustă și batic, bărbații pantaloni lungi. Aveți în mașină haine de rezervă.",
              "Fotografiatul este interzis în interior la unele mănăstiri. Respectați indicațiile.",
              "Programul slujbelor variază. Recomandăm să verificați cu o zi înainte la numerele mănăstirii.",
              "Mănăstirile oferă cazare modestă. Vaias Aparts oferă confort superior și independență totală.",
              "Post: Kitchen for All este echipată pentru mâncare de post. Avem lista de restaurante cu meniu de post."
            ].map((info, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-walnut-500 font-bold shrink-0 mt-0.5">✦</span>
                <span>{info}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Locuri disponibile — rezervați acum.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/80">
            7 apartamente, check-in autonom, liniște garantată. Rezervare directă — fără comisioane.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/rezervare" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
              Rezervă online
            </Link>
            <a href="https://wa.me/40738345330" target="_blank" rel="noreferrer" className="btn-outline-light">
              WhatsApp: +40 738 345 330
            </a>
          </div>
          <p className="mt-6 text-sm text-cream-100/60">
            Echipa Vaias Aparts · Strada Sfântul Lazăr Nr. 1 · Târgu Neamț
          </p>
        </div>
      </section>
    </>
  );
}
