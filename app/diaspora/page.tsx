import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vacanță acasă în România | Cazare Târgu Neamț | Vaias Aparts",
  description: "Ești în diaspora și vrei să te întorci acasă cu stil? Vaias Aparts — apartamente boutique în Moldova, la mănăstiri și munte. Rezervă direct și economisești 5%.",
  keywords: ["cazare România diaspora", "vacanță Moldova", "Târgu Neamț", "mănăstiri Moldova", "apartamente boutique România"]
};

const countries = [
  { flag: "🇬🇧", name: "Marea Britanie", romanians: "1.2M" },
  { flag: "🇮🇹", name: "Italia", romanians: "1.1M" },
  { flag: "🇩🇪", name: "Germania", romanians: "800K" },
  { flag: "🇪🇸", name: "Spania", romanians: "650K" },
  { flag: "🇫🇷", name: "Franța", romanians: "400K" },
  { flag: "🇮🇪", name: "Irlanda", romanians: "130K" }
];

export default function DiasporaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center bg-forest-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/attractions/cetatea-neamt.jpg"
            alt="Cetatea Neamț — Moldova autentică, România"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/40 to-forest-950" />
        <div className="relative container-x">
          <div className="max-w-3xl">
            <div className="eyebrow-light mb-4">Pentru românii din diaspora</div>
            <h1 className="font-display text-5xl md:text-7xl text-cream-50 text-balance leading-tight">
              Acasă, dar mai bine.
            </h1>
            <p className="mt-6 font-serif text-xl md:text-2xl text-cream-100/85 max-w-2xl leading-relaxed">
              Moldova te așteaptă — cu mănăstiri pictate, munte și oameni care știu să primească. Vaias Aparts e locul unde te simți acasă fără să-ți dai seama.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/rezervare" className="btn-primary text-lg px-8 py-4">
                Rezervă direct — economisești 5%
              </Link>
              <Link href="/apartments" className="btn-outline-light text-lg px-8 py-4">
                Vezi apartamentele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE DO YOU COME FROM */}
      <section className="bg-stone-50 py-16 border-b border-stone-100">
        <div className="container-x">
          <div className="eyebrow text-center mb-8">Veniți de peste tot</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {countries.map((c) => (
              <div key={c.name} className="text-center">
                <div className="text-4xl mb-2">{c.flag}</div>
                <div className="font-medium text-forest-900 text-sm">{c.name}</div>
                <div className="text-xs text-stone-500">{c.romanians} români</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VAIAS */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow mb-4">De ce Vaias Aparts</div>
            <h2 className="font-display text-4xl md:text-5xl text-forest-900 text-balance">
              Nu e o pensiune. E o casă care te înțelege.
            </h2>
            <div className="divider-gold my-7" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🏡",
                title: "Independență totală",
                text: "Apartamente proprii, intrare separată, nicio recepție, niciun zgomot. Intimitatea pe care o vrei după ani de apartamente mici în străinătate."
              },
              {
                icon: "🛏",
                title: "Pat Emperor 2×2m",
                text: "Toate paturile sunt Emperor size. Nu twin-urile strâmte din hoteluri — ci spațiu real, lenjerie de bumbac fin, somn adevărat."
              },
              {
                icon: "🍳",
                title: "Kitchen for All",
                text: "Bucătăria comună dotată cu tot ce trebuie. Gătești ce vrei, faci cafea la 6 dimineața, nu depinzi de nimeni."
              },
              {
                icon: "📍",
                title: "La 2 min de centru",
                text: "Strada Sfântul Lazăr Nr. 1 — în inima Târgu Neamțului. Cetatea la 5 min, mănăstirile la 30 min, Ceahlăul la 1 oră."
              },
              {
                icon: "💳",
                title: "Rezervare directă — mai ieftin",
                text: "Fără comisioane Booking.com. Rezervând direct, economisești 5% față de platformele externe. Comunicare directă, fără intermediari."
              },
              {
                icon: "🔄",
                title: "Reducere la revenire",
                text: "Oaspeții care se întorc primesc o reducere personalizată de până la 25%. Mulți dintre ei vin de două ori pe an."
              }
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-7">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display text-xl text-forest-900 mb-3">{f.title}</h3>
                <p className="text-stone-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S NEARBY */}
      <section className="section bg-forest-900 text-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="eyebrow-light mb-4">Ce găsiți la o oră distanță</div>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
              Moldova pe care ați lăsat-o în urmă. Intactă.
            </h2>
            <div className="divider-gold my-7" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Mănăstirea Agapia", dist: "30 min", img: "/attractions/manastirea-agapia.jpg" },
              { name: "Cetatea Neamț", dist: "5 min", img: "/attractions/cetatea-neamt.jpg" },
              { name: "Masivul Ceahlău", dist: "55 min", img: "/attractions/muntele-ceahlau.jpg" },
              { name: "Cheile Bicazului", dist: "50 min", img: "/attractions/cheile-bicazului.jpg" }
            ].map((p) => (
              <div key={p.name} className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                <Image src={p.img} alt={p.name} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="font-display text-lg text-cream-50">{p.name}</div>
                  <div className="text-xs text-cream-100/70">{p.dist} cu mașina</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section bg-cream-50">
        <div className="container-narrow text-center">
          <div className="eyebrow mb-6">Ce spun cei care s-au întors</div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                text: "Am venit cu familia din Londra — prima dată după 4 ani. Am plâns când am văzut Ceahlăul de la fereastră. Vaias Aparts a făcut întoarcerea perfectă.",
                name: "Mihai D.",
                city: "Londra → Târgu Neamț",
                flag: "🇬🇧"
              },
              {
                text: "Stăm în Italia de 12 ani. Vacanța asta a fost prima oară când copiii noștri au auzit clopotele de la mănăstire. Vom reveni de Crăciun.",
                name: "Elena și Vasile M.",
                city: "Milano → Târgu Neamț",
                flag: "🇮🇹"
              }
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-stone-50 border border-stone-100 p-8 text-left">
                <p className="font-serif text-xl text-forest-800 italic leading-relaxed">„{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-2xl">{t.flag}</span>
                  <div>
                    <div className="font-display text-lg text-forest-900">{t.name}</div>
                    <div className="text-xs text-stone-500">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICAL INFO */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <div className="eyebrow mb-4">Informații practice</div>
              <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-8">
                Totul pregătit pentru voi.
              </h2>
              <div className="space-y-4 text-sm text-stone-600">
                <div className="flex gap-3">
                  <span className="text-walnut-500 font-bold shrink-0">→</span>
                  <span><strong>Check-in 14:00</strong> — intrare autonomă cu cutie de chei (codul vi-l comunicăm telefonic în ziua sosirii)</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-walnut-500 font-bold shrink-0">→</span>
                  <span><strong>Check-out 11:00</strong> — cheile în cutia metalică maro de la parter, lângă Kitchen for All</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-walnut-500 font-bold shrink-0">→</span>
                  <span><strong>Parcare privată</strong> gratuită în curte</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-walnut-500 font-bold shrink-0">→</span>
                  <span><strong>WiFi rapid</strong> în fiecare apartament</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-walnut-500 font-bold shrink-0">→</span>
                  <span><strong>Plată</strong> cash, card sau transfer bancar</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-walnut-500 font-bold shrink-0">→</span>
                  <span>Vorbim română, engleză, franceză</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-forest-900 text-cream-50 p-8">
              <div className="eyebrow-light mb-4">Rezervare directă</div>
              <h3 className="font-display text-2xl text-cream-50 mb-6">Contactați-ne direct</h3>
              <div className="space-y-4">
                <a href="https://wa.me/40738345330" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-green-600 text-cream-50 px-5 py-3 hover:bg-green-700 transition">
                  <span className="text-xl">💬</span>
                  <span>WhatsApp: +40 738 345 330</span>
                </a>
                <a href="tel:+40738345330" className="flex items-center gap-3 rounded-xl bg-forest-700 text-cream-50 px-5 py-3 hover:bg-forest-600 transition">
                  <span className="text-xl">📞</span>
                  <span>+40 738 345 330</span>
                </a>
                <Link href="/rezervare" className="flex items-center gap-3 rounded-xl bg-walnut-500 text-cream-50 px-5 py-3 hover:bg-walnut-600 transition">
                  <span className="text-xl">📅</span>
                  <span>Formular rezervare online</span>
                </Link>
              </div>
              <p className="mt-5 text-xs text-cream-100/60">
                Echipa Vaias Aparts răspunde în maxim 4 ore. Seara și weekendurile — prin WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Moldova te așteaptă.
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            7 apartamente boutique, Emperor size, la 2 minute de Cetatea Neamț. Rezervând direct economisești 5%.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/rezervare" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900 text-lg px-8 py-4">
              Rezervă acum — cel mai mic preț
            </Link>
            <Link href="/apartments" className="btn-outline-light text-lg px-8 py-4">
              Alege apartamentul
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
