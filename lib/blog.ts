export type BlogPost = {
  slug: string;
  title: string;
  titleEN?: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  seoTitle?: string;
  seoDesc?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ce-sa-vizitezi-targu-neamt",
    title: "Ce să vizitezi în Târgu Neamț și împrejurimi — ghid complet 2026",
    excerpt: "Cetatea Neamț, mănăstirile Agapia și Văratec, casa lui Creangă, Masivul Ceahlău — tot ce trebuie să știi pentru o vizită memorabilă în Țara de Sus.",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    category: "Ghid turistic",
    tags: ["Târgu Neamț", "atracții", "Moldova", "mănăstiri", "Ceahlău"],
    publishedAt: "2026-04-15",
    readTime: 12,
    seoTitle: "Ce să vizitezi în Târgu Neamț 2026 — ghid complet cu hărți și sfaturi",
    seoDesc: "Ghid turistic complet Târgu Neamț: Cetatea Neamț, Mănăstirile Agapia & Văratec, Casa Creangă, Cheile Bicazului. Itinerarii și sfaturi de la localnici.",
    body: `
## Târgu Neamț — în inima Moldovei istorice

Târgu Neamț este unul dintre cele mai bogate centre istorice și spirituale ale României. Situat în județul Neamț, la poalele Carpaților Orientali, orașul este poarta de intrare în Țara de Sus — o regiune cu mănăstiri pictate, cetăți medievale și munți acoperiți de legende.

## 1. Cetatea Neamț — simbolul județului

La nici 4 km de Vaias Aparts se înalță **Cetatea Neamț**, ctitorită de Petru I Mușat în a doua jumătate a secolului XIV și întărită de Ștefan cel Mare. Este una dintre cele mai bine conservate cetăți medievale din Moldova.

**Ce să vezi:** turnul de intrare, curtea interioară, fosta sală de tron, vederea panoramică asupra văii Ozanei.

**Program:** Marți–Duminică, 09:00–18:00 (Mai–Octombrie); 09:00–17:00 (Noiembrie–Aprilie).

**Sfat:** Vizitați dimineața devreme pentru fotografii fără aglomerație.

## 2. Mănăstirea Agapia — perla Moldovei

La 12 km de Târgu Neamț se află **Mănăstirea Agapia**, fondată în 1644, renumită pentru frescele pictate de Nicolae Grigorescu între 1858 și 1861. Este una dintre cele mai mari mănăstiri de maici din România.

**Muzeul mănăstirii** adăpostește icoane, odoare bisericești și lucrări originale Grigorescu — o colecție de o valoare extraordinară.

**Sfat:** Respectați codul vestimentar — fuste sau pantaloni lungi. La intrare se pot închiria fuste pentru doamne.

## 3. Mănăstirea Văratec — liniște și lavandă

**Mănăstirea Văratec** (1785) este adăpostul de veci al poetei Veronica Micle — muza lui Mihai Eminescu. Mormântul ei, în curtea mănăstirii, este un loc de pelerinaj literar.

Câmpurile de lavandă din jur înfloresc în iulie — un spectacol vizual de neuitat.

## 4. Casa Memorială Ion Creangă — Humuleștii copilăriei

La 7 km de Târgu Neamț se află **Humulești**, cartierul natal al lui Ion Creangă. Casa în care s-a născut autorul „Amintirilor din copilărie" este astăzi muzeu, reconstituind viața rurală moldovenească din secolul XIX.

**Imperdibil:** Bojdeuca lui Creangă din Iași (65 km) completează perfect vizita.

## 5. Masivul Ceahlău — muntele sfânt al dacilor

La 55 km de Vaias Aparts, **Masivul Ceahlău** — „Olimpul dacilor" — oferă trasee pentru toate nivelurile.

**Trasee recomandate:**
- **Piatra Lăcrimată** (4–5 ore tur-retur) — cel mai popular
- **Cabana Dochia** (5–6 ore) — cu vedere panoramică superbă
- **Duruitoarea** — cascada cea mai accesibilă (1,5 ore)

## 6. Cheile Bicazului și Lacul Roșu

La 40 km est, **Cheile Bicazului** sunt printre cele mai spectaculoase chei din România — pereți de calcar de până la 300 m înălțime, strângi care îți taie respirația.

**Lacul Roșu** (3 km mai departe), format în 1837 printr-o alunecare de teren, e unic în România: trunchiurile brazilor îngropați în lac îi dau un aer misterios și fotografiabil.

## 7. Mănăstirea Neamț — cea mai veche din Moldova

La 14 km de Târgu Neamț, **Mănăstirea Neamț** (1407) este cel mai important centru monahal ortodox din Moldova. Biblioteca mănăstirii adăpostește manuscrise medievale de mare valoare.

## Cum ajungi la toate acestea de la Vaias Aparts

De la **Strada Sfântul Lazăr Nr. 1, Târgu Neamț**, aveți acces rapid la toate obiectivele:
- Cetatea Neamț: 5 min (4 km)
- Mănăstirea Agapia: 15 min (12 km)
- Mănăstirea Văratec: 20 min (16 km)
- Cheile Bicazului: 45 min (40 km)
- Masivul Ceahlău: 55 min (55 km)

Rezervați un apartament și lăsați-ne să vă facem un itinerar personalizat!
    `
  },
  {
    slug: "manastirile-moldovei-ghid-spiritual",
    title: "Mănăstirile Moldovei — ghid spiritual pentru pelerinaj și călători curioși",
    excerpt: "Agapia, Văratec, Neamț, Secu, Sihăstria — cinci mănăstiri la o oră de Vaias Aparts, fiecare cu o poveste care schimbă perspectiva.",
    coverImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1600&q=80",
    category: "Spiritualitate",
    tags: ["mănăstiri", "pelerinaj", "Moldova", "ortodox", "turism spiritual"],
    publishedAt: "2026-03-20",
    readTime: 10,
    seoTitle: "Mănăstirile Moldovei — ghid complet pentru pelerinaj 2026",
    seoDesc: "Ghid complet al mănăstirilor din județul Neamț: Agapia, Văratec, Neamț, Secu, Sihăstria. Program vizite, cod vestimentar, distanțe.",
    body: `
## De ce să vizitezi mănăstirile Moldovei

Județul Neamț adăpostește cea mai mare concentrare de mănăstiri ortodoxe din România — un traseu spiritual unic în Europa, unde arta sacră, liniștea naturii și istoria milenară se întrepătrund.

## Codul vestimentar — obligatoriu la toate mănăstirile

Indiferent de credința sau convingerile tale, codul vestimentar este obligatoriu:
- **Femei:** rochii sau fuste lungi (sub genunchi), umeri acoperiți
- **Bărbați:** pantaloni lungi, fără maiou
- La intrare se pot închiria fuste și batic — gratuit sau contra cost mic

## Mănăstirea Agapia — Nicolas Grigorescu și maicile pictorițe

Fondată în 1644 de hatmanul Gavriil Coci, **Mănăstirea Agapia** a trecut prin incendii și reconstrucții până la înfățișarea de azi.

Frescele din naosul bisericii mari au fost pictate de **Nicolae Grigorescu** între 1858–1861, pe când tânărul pictor abia împlinise 20 de ani. Lucrările de la Agapia l-au consacrat și i-au deschis drumul spre Paris.

**Practic:** Muzeu deschis Marți–Duminică, 09:00–17:00. Intrare: 10 lei.

## Mănăstirea Văratec — Veronica Micle și câmpurile de lavandă

Întemeiată în 1785, **Mănăstirea Văratec** este astăzi reședința a peste 400 de maici — cea mai mare comunitate monahală feminină din România.

Mormântul **Veronicăi Micle** — poeta și muza lui Eminescu — se află în cimitirul mănăstirii. O vizită emoționantă, mai ales dacă ești pasionat de literatura română.

**Iulie:** Câmpurile de lavandă înfloresc în jurul mănăstirii — un spectacol fotografic de excepție.

## Mănăstirea Neamț — inima monahismului moldovenesc

Ctitorită de **Petru I Mușat** (1407) și întărită de Ștefan cel Mare, **Mănăstirea Neamț** este cel mai vechi și mai mare centru monahal din Moldova.

Biblioteca mănăstirii păstrează peste 18.000 de volume, dintre care sute de manuscrise medievale cu miniaturi valoroase.

**Turnul-clopotniță** (1821) oferă o perspectivă unică asupra complexului monahal.

## Mănăstirea Secu și Sihăstria — în inima pădurii

La 30 km de Târgu Neamț, **Mănăstirea Secu** (1602) și **Sihăstria** (1734) sunt adâncite în pădure, accesibile pe un drum forestier.

Sihăstria este locul în care a viețuit **Părintele Paisie Olaru**, unul dintre marii duhovnici ai secolului XX — un loc de pelerinaj pentru credincioșii ortodocși.

## Circuit recomandat: o zi, cinci mănăstiri

**Pornind de la Vaias Aparts:**
1. 08:30 — Plecare spre Mănăstirea Neamț (14 km)
2. 10:00 — Mănăstirea Secu + Sihăstria (traseu comun, 6 km)
3. 12:30 — Prânz în Târgu Neamț
4. 14:00 — Mănăstirea Agapia (12 km)
5. 16:00 — Mănăstirea Văratec (16 km)
6. 18:00 — Întoarcere la Vaias Aparts

**Distanță totală:** ~80 km, timp condus ~2 ore.

Cazare la **Vaias Aparts** — rezervare directă la cel mai bun preț.
    `
  },
  {
    slug: "ceahlau-trasee-ghid-montane",
    title: "Ceahlău — ghid complet de trasee pentru drumeții, 2026",
    excerpt: "Piatra Lăcrimată, Cabana Dochia, Duruitoarea, Stânile lui Vodă — tot ce trebuie să știi înainte de a urca pe muntele sfânt al dacilor.",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    category: "Natură & drumeții",
    tags: ["Ceahlău", "trasee montane", "drumeții", "natură", "Neamț"],
    publishedAt: "2026-03-01",
    readTime: 14,
    seoTitle: "Ceahlău trasee 2026 — ghid complet cu hărți, timp și dificultate",
    seoDesc: "Trasee pe Masivul Ceahlău: Piatra Lăcrimată, Dochia, Duruitoarea. Hărți, dificultate, echipament recomandat. Cazare în Târgu Neamț.",
    body: `
## Masivul Ceahlău — muntele sfânt al României

Ceahlăul (1.907 m) este cel mai reprezentativ masiv din Carpații Moldovei și unul dintre cele mai iubite destinații montane din România. Dacii îl numeau „locuința zeilor" — și pe bună dreptate: formațiunile stâncoase spectaculoase, flora alpină unică și panoramele uimitoare justifică orice superlativ.

## Cum ajungi la Ceahlău de la Vaias Aparts

**De la Târgu Neamț:**
- **Ruta 1 (prin Bicaz):** Târgu Neamț → Bicaz → Durău: 55 km, ~50 min
- **Ruta 2 (prin Piatra Neamț):** Târgu Neamț → Piatra Neamț → Durău: 65 km, ~60 min

**Accesul principal** se face prin **Durău** (stațiune montană la poalele Ceahlăului) sau **Izvorul Muntelui**.

## Trasee principale — descriere și dificultate

### 1. Durău — Cabana Dochia (marcaj bandă roșie)
**Durată:** 4–5 ore urcare, 3–4 ore coborâre
**Dificultate:** Mediu
**Diferență de nivel:** ~750 m

Cel mai popular traseu, pornind din Durău. Trece prin Poiana Maicilor, urcă la Stânile lui Vodă și ajunge la **Cabana Dochia** (1.750 m) — punct panoramic suprem. Pe timp senin, vezi până la Marea Neagră.

### 2. Durău — Piatra Lăcrimată (marcaj triunghi roșu)
**Durată:** 3–4 ore tur-retur
**Dificultate:** Ușor–Mediu
**Diferență de nivel:** ~450 m

Traseul Piatra Lăcrimată pornește din Durău și urcă la formațiunea stâncoasă în formă de lacrimă — una dintre cele mai fotografiate imagini ale Ceahlăului.

### 3. Cascada Duruitoarea (marcaj punct albastru)
**Durată:** 1,5–2 ore tur-retur
**Dificultate:** Ușor
**Diferență de nivel:** ~200 m

Potrivit pentru familii cu copii și drumeți ocazionali. Cascada Duruitoarea (25 m înălțime) este accesibilă și spectaculoasă, mai ales primăvara și toamna.

### 4. Izvorul Muntelui — Stânile lui Vodă (marcaj bandă albastră)
**Durată:** 5–6 ore tur-retur
**Dificultate:** Mediu–Dificil
**Diferență de nivel:** ~900 m

Traseu mai puțin circulat, cu peisaje salbatice și formațiuni stâncoase impresionante. Recomandat drumeților cu experiență.

## Echipament recomandat

- **Bocanci** cu gleznă înaltă (chiar și vara — pietrele sunt alunecoase)
- **Haine în straturi** — temperatura scade cu ~6°C la fiecare 1.000 m altitudine
- **Apă:** minimum 2 litri per persoană
- **Îmbrăcăminte de ploaie** — vremea se schimbă rapid
- **Batoane energizante + mâncare** (fără magazin pe trasee)
- **Aplicația Muntele.ro sau Maps.me** offline

## Cazare la poalele Ceahlăului

**Cabana Dochia** (1.750 m) oferă cazare simplă și mâncare caldă — rezervare obligatorie în weekend.

**Stațiunea Durău** are pensiuni și hoteluri pentru o bază mai confortabilă.

**La Vaias Aparts din Târgu Neamț** — cazare boutique la 55 km de Durău. Plecat dimineața la 07:00, pe munte la 08:00, înapoi la apartament seara la 20:00. Duș fierbinte, pat Emperor — exact ce ai nevoie după o zi de drumeție.

[Rezervă acum →](/rezervare)
    `
  },
  {
    slug: "cazare-targu-neamt-de-ce-sa-alegi-direct",
    title: "De ce să alegi cazare boutique în loc de hotel — experiența Vaias Aparts",
    excerpt: "Intimitate, flexibilitate, bucătărie proprie, fără check-in la recepție — ce înseamnă să stai la un apartament boutique în Târgu Neamț.",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    category: "Despre noi",
    tags: ["cazare boutique", "Târgu Neamț", "apartament", "vacanță", "direct"],
    publishedAt: "2026-02-10",
    readTime: 8,
    seoTitle: "Cazare boutique Târgu Neamț — Vaias Aparts, 7 apartamente cu suflet",
    seoDesc: "Vaias Aparts: 7 apartamente boutique în Târgu Neamț. Paturi Emperor 2m×2m, bucătărie proprie, parcare gratuită. Rezervare directă = cel mai bun preț.",
    body: `
## Apartamentele boutique — o altă filosofie de cazare

Când te gândești la o vacanță la Târgu Neamț, prima opțiune care îți vine în minte poate fi un hotel sau o pensiune. Dar există o a treia cale — apartamentele boutique — care combină cel mai bun din ambele lumi: intimitatea și independența unui apartament personal, cu calitatea și îngrijirea unui hotel de 4 stele.

**Vaias Aparts** a ales această cale. Iată de ce.

## Intimitate totală, fără compromisuri

Într-un hotel, chiar dacă camera e elegantă, tot vei traversa holuri comune, vei auzi ușile vecinilor, vei împărți liftul cu alți turiști. La Vaias Aparts, fiecare apartament este un spațiu complet privat — propria intrare, propriul living, propria bucătărie.

Nu există recepție cu orar fix. Check-in-ul se face oricând, la orice oră, cu instrucțiunile trimise în avans. Codul de la intrare vi-l comunicăm verbal, prin telefon, în ziua sosirii — niciodată în scris.

## 7 apartamente cu caracteristici unice

Oferim 7 apartamente diferite, fiecare cu personalitatea lui:

- **Apartamentele 1 & 2** (etaj 1) — perfecte pentru cupluri, 1 dormitor Emperor, liniște garantată
- **Apartamentele 3 & 4** (etaj 1) — 2 dormitoare Emperor, pentru familii sau prieteni
- **Apartamentele 5 & 6** (etaj 2) — cu aer condiționat, vederi mai generoase
- **Apartamentul 7** (parter) — accesibil, cu acces la Kitchen for All

**Toate paturile** sunt Emperor size — 2m×2m. Nu facem compromisuri la calitatea somnului.

## Bucătăria proprie — libertatea de a mânca cum vrei

Fiecare apartament are bucătăria lui, complet utilată. Dimineața poți face cafeaua la tine acasă, nu trebuie să aștepți micul dejun la o oră fixă. Poți cumpăra brânzeturi din piața locală, pâine caldă de la brutăria din colț, și mânca pe masă cu familia — fără meniu impus, fără chelner.

Pentru cei care preferă să nu gătească, restaurantele din Târgu Neamț oferă mâncare moldovenească autentică la prețuri accesibile. Vă facem recomandări personalizate.

## Rezervare directă = cel mai bun preț

Rezervând direct prin telefon, WhatsApp sau formularul de pe site, beneficiezi de:
- **5% reducere** față de orice altă platformă
- **Late check-out gratuit** (până la 13:00, în limita disponibilității)
- **Mic dejun cadou** la sejururi de 4 nopți sau mai mult
- **Discuție directă cu gazda** — nu cu un call center

[Rezervă acum, direct →](/rezervare)

## Parcare gratuită, spații verzi, liniște

Vila Vaias Aparts dispune de parcare privată gratuită pentru oaspeți. Curtea interioară și spațiile verzi oferă un ambient plăcut pentru serile calde.

## Auzim mereu de la oaspeți

„*Ne-am simțit ca acasă, dar mai bine.*" — este ce auzim cel mai des.

Asta ne bucură, pentru că asta am construit: un loc în care intimitatea, confortul și autenticitatea moldovenească se întâlnesc.

[Citește recenziile →](/recenzii) · [Descoperă apartamentele →](/apartments)
    `
  },
  {
    slug: "bucatarie-moldoveneasca-retete-traditionale",
    title: "Bucătăria moldovenească — 7 preparate pe care trebuie să le guști în Târgu Neamț",
    excerpt: "Sarmale în foi de viță, plăcintă poale-n brâu, păstrăv de Bicaz, vin de Cotnari — un ghid gastronomic al Moldovei autentice.",
    coverImage: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1600&q=80",
    category: "Gastronomie",
    tags: ["bucătărie moldovenească", "mâncare", "restaurante", "Târgu Neamț", "gastronomie"],
    publishedAt: "2026-01-25",
    readTime: 9,
    seoTitle: "Bucătăria moldovenească — preparate tradiționale în Târgu Neamț",
    seoDesc: "Descoperă bucătăria moldovenească autentică în Târgu Neamț: sarmale, plăcinte, păstrăv, vin de Cotnari. Restaurante recomandate și rețete tradiționale.",
    body: `
## Mâncarea în Moldova — o artă moștenită din generație în generație

Moldova culinară este diferită de orice altceva ai gustat în România. Influențele slavice, gust pentru acru și afumat, abundența produselor locale și tradiția gătitului lent — toate conferă bucătăriei moldovenești o profunzime și o complexitate aparte.

Iată 7 preparate pe care trebuie să le guști când ești în Târgu Neamț.

## 1. Sarmalele moldovenești — regele mesei de duminică

**Sarmalele** moldovenești sunt învelite în foi de viță murată (nu în varză, ca în alte regiuni), umplute cu carne de porc și vită tocată, orez și ierburi. Se fierb lent, la cuptor, cu smântână, ciuperci și afumătură.

Se servesc cu **mămăligă caldă** și **smântână rece** — combinația clasică, neschimbată de sute de ani.

*Unde să le guști în Târgu Neamț:* Întreabă-ne — vă facem recomandări personalizate!

## 2. Plăcinta poale-n brâu — gust de casă

**Plăcinta poale-n brâu** este un preparat specific Moldovei — aluat pufos, cu brânză de vaci, smântână, zahăr și ouă, împăturit în mod tradițional. Se coace în cuptor sau pe plită.

Fiecare familie are rețeta ei, moștenită de la bunici. Dacă aveți noroc, veți găsi plăcinte la o cofetărie locală sau la piața agroalimentară.

## 3. Păstrăvul de Bicaz — prospețime din munți

**Păstrăvul** crescut în apele reci ale Bicazului este o delicatesă locală. Se pregătește simplu — grătar pe jar de fag, cu mujdei, cartofi noi și salată verde.

Restaurantele de pe **Valea Bistriței** (35–45 km de Târgu Neamț) servesc păstrăv proaspăt, prins în dimineața aceleiași zile.

## 4. Mămăliga moldovenească — pâinea săracului, azi delicatesă

**Mămăliga** din făină de porumb galben, gătită în ceaun, cu unt și brânză — nu este un simplu acompaniament, ci un preparat în sine. În Moldova, mămăliga cu brânză de burduf și smântână este un fel principal.

## 5. Brânza de burduf — aroma Carpaților

**Brânza de burduf** din Pipirig (25 km de Târgu Neamț) este una dintre cele mai apreciate brânzeturi românești. Maturată în coajă de brad sau de molid, are o aromă puternică și specifică — iubită de gurmanzi, inconfundabilă.

O puteți cumpăra de la piața agroalimentară din Târgu Neamț sau direct de la producători locali.

## 6. Borșul moldovenesc — acidul care deschide apetitul

**Borșul** (nu ciorba obișnuită) este gătit cu borș de putină — un lichid acru fermentat din tărâțe de grâu. Se adaugă legume, carne sau pește. Gustul acid, distinct, este marca bucătăriei moldovenești.

## 7. Vinul de Cotnari — licoarea regilor Moldovei

**Cotnari** este cea mai veche podgorie din România, atestată documentar din 1448. Soiurile tradiționale — Grasa, Tămâioasa Românească, Frâncușa — produc vinuri albe, dulci sau demi-dulci, cu parfum de miere și flori.

Podgoria Cotnari se află la **65 km de Vaias Aparts** — o excursie de jumătate de zi, cu degustare inclusă, pe care o recomandăm cu drag.

## Recomandarea noastră

La Vaias Aparts, fiecare apartament are bucătărie complet echipată — perfectă pentru a cumpăra produse locale de la piață și a pregăti o masă moldovenească acasă, în liniștea apartamentului vostru.

[Rezervă un apartament →](/rezervare)
    `
  },
  {
    slug: "weekend-romantic-targu-neamt",
    title: "Weekend romantic în Târgu Neamț — ghid complet pentru cupluri",
    excerpt: "Mănăstiri și lavandă, mâncare moldovenească la lumânare, traseu pe Ceahlău, vin de Cotnari — un weekend perfect pentru doi.",
    coverImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
    category: "Idei de vacanță",
    tags: ["romantic", "cuplu", "weekend", "Târgu Neamț", "luna de miere"],
    publishedAt: "2026-01-10",
    readTime: 7,
    seoTitle: "Weekend romantic Târgu Neamț — ghid pentru cupluri 2026",
    seoDesc: "Weekend romantic în Târgu Neamț: itinerar complet pentru cupluri, mănăstiri, natură, gastronomie. Cazare boutique la Vaias Aparts.",
    body: `
## De ce Târgu Neamț pentru un weekend romantic?

Moldova are ceva special — o lentoare a timpului, o blândețe a peisajelor, o autenticitate a trăirilor. Mănăstirile cu fresce, dealurile verzi, mâncarea gătită lent, oamenii ospitalieri — totul invită la prezență, la a fi cu adevărat împreună.

Târgu Neamț nu este o destinație de masă. Nu veți găsi aglomerație, zgomot sau artificii turistice. Veți găsi liniște, frumusețe naturală și locuri cu poveste.

## Vineri seara — sosire și primă seară

**18:00** — Sosire la Vaias Aparts. Check-in lent, bagajele jos. Aperitiv cu vin moldovenesc din frigider (îl pregătim noi, la cerere).

**20:00** — Cină la un restaurant din Târgu Neamț. Recomandările noastre se schimbă cu sezonul — întreabă-ne.

**22:30** — Plimbare pe faleza Ozanei. Noaptea, orașul este liniștit și cerul e plin de stele.

## Sâmbătă — zi plină, ritmul vostru

**08:00** — Cafea și mic dejun la voi, în apartament. Piața agroalimentară este la 5 minute — brânzeturi locale, ouă proaspete, miere.

**10:00** — **Mănăstirea Agapia.** Frescele lui Grigorescu, liniștea curții interioare, câmpul de lavandă dacă sunteți în iulie.

**12:30** — **Mănăstirea Văratec** și mormântul Veronicăi Micle. O vizită emoționantă pentru iubitorii de literatură.

**14:00** — Prânz la o terasă cu vedere. Sarmale, brânză de burduf, vin alb.

**16:00** — **Cetatea Neamț.** Urcați la turn, vedeți văile — o altă lume.

**19:00** — Întoarcere la Vaias Aparts. Baie lungă, odihnă.

**21:00** — Cină romantică la lumânare, acasă sau afară.

## Duminică — natură și plecare lentă

**09:00** — Mic dejun lent. Cafea dublă. Fără grabă.

**11:00** — Opțional: traseu ușor la Cascada Duruitoarea (Ceahlău, 55 km) sau plimbare la Lacul Bâtca Doamnei.

**14:00** — Prânz. Check-out (sau late check-out gratuit dacă rezervați direct).

**16:00** — Drum spre casă, cu amintiri și poate o sticlă de vin de Cotnari în portbagaj.

## Apartamentele recomandate pentru cupluri

- **Apartament 1 sau 2** (etaj 1) — pat Emperor, liniște, intimitate totală
- **Apartament 5 sau 6** (etaj 2) — cu aer condiționat, pentru serile calde de vară

## Avantajele rezervării directe

Rezervând direct la Vaias Aparts:
- **5% reducere** față de orice altă platformă
- **Late check-out gratuit** — nu grăbim plecarea
- **Mic dejun cadou** la 4+ nopți
- Suntem la telefon oricând ai o întrebare

[Rezervă weekendul romantic →](/rezervare)
    `
  },
  {
    slug: "vacanta-cu-familia-targu-neamt",
    title: "Vacanță cu familia în Târgu Neamț — idei și sfaturi practice pentru copii",
    excerpt: "Cetatea Neamț, drumeții ușoare pe Ceahlău, Lacul Roșu, bucătărie proprie — tot ce ai nevoie pentru o vacanță reușită cu copiii.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    category: "Idei de vacanță",
    tags: ["familie", "copii", "vacanță", "Târgu Neamț", "activități"],
    publishedAt: "2025-12-15",
    readTime: 8,
    seoTitle: "Vacanță cu familia în Târgu Neamț — activități pentru copii 2026",
    seoDesc: "Vacanță cu copii în Târgu Neamț: Cetatea Neamț, Ceahlău, Lacul Roșu, Cheile Bicazului. Cazare cu 2 dormitoare la Vaias Aparts.",
    body: `
## Târgu Neamț cu copiii — mai bun decât ai crede

Mulți părinți se gândesc la Târgu Neamț ca la o destinație pentru adulți — mănăstiri, cetăți, munte. Dar copiii adoră exact aceste lucruri: cetățile cu turnuri și povești, cascadele cu apă rece, lacurile cu culori ciudate, și... paturile mari la hotel!

Hai să construim împreună vacanța perfectă pentru o familie cu copii de orice vârstă.

## Cazare: 2 dormitoare Emperor pentru toată familia

La Vaias Aparts, **Apartamentele 3 și 4** (etaj 1) au câte 2 dormitoare cu paturi Emperor 2m×2m — perfect pentru 4 persoane, cu toată lumea confortabilă.

Bucătăria proprie înseamnă că:
- Copiii pot mânca la orice oră
- Nu mai stați 45 de minute la restaurant cu un copil nerăbdător
- Puteți cumpăra iaurt, fructe și cereale de la piață

**Sfat:** La check-in vă putem pune la dispoziție o cărucior pentru copii mici, dacă aveți nevoie. Întrebați în avans.

## Activități pentru copii — pe vârste

### Copii mici (2–6 ani)
- **Curtea Vaias Aparts** — spațiu verde, liniștit, sigur
- **Cetatea Neamț** — turnuri și povești medievale (le place enorm)
- **Cascada Duruitoarea** (Ceahlău) — 1,5 ore mers pe jos, accesibil cu copii de 3+ ani
- **Piața agroalimentară** — experiență senzorială: brânzeturi, miere, animale domestice

### Copii (7–12 ani)
- **Cetatea Neamț** — cu ghid, povestea lui Ștefan cel Mare prinde viață
- **Casa memorială Ion Creangă** (Humulești) — personalitate pe care o studiază la școală
- **Lacul Roșu + Cheile Bicazului** — spectacol natural impresionant
- **Traseu ușor pe Ceahlău** — Cascada Duruitoarea sau Piatra Lăcrimată (cu echipament adecvat)

### Adolescenți (13–18 ani)
- **Drumeție completă pe Ceahlău** — Cabana Dochia sau Piatra Lăcrimată
- **Kayak sau bicicletă** pe lângă Lacul Bicaz
- **Mănăstirile** — experiență culturală cu context istorico-artistic

## Itinerar recomandat: 4 zile

**Ziua 1:** Sosire → Cetatea Neamț → seară în Târgu Neamț
**Ziua 2:** Mănăstiri (Agapia + Văratec) → picnic în pădure
**Ziua 3:** Ceahlău (Cascada Duruitoarea) → Lacul Roșu
**Ziua 4:** Casa Creangă → cumpărături → plecare

## De ce să stați mai mult de 3 zile

Ritmul lent al Moldovei face bine. Copiii au nevoie de o zi-două să se decomprimeze de la școală și activitățile zilnice. Dacă rămâneți 4–5 nopți, veți simți diferența.

**La Vaias Aparts:** sejururile de 7 nopți beneficiază de **reducere automată de 10%** față de prețul per noapte.

[Rezervă apartamentul cu 2 dormitoare →](/rezervare)
    `
  },
  {
    slug: "diaspora-romana-vacanta-acasa",
    title: "Vacanță acasă — pentru românii din diaspora care vor să regăsească Moldova",
    excerpt: "Ești plecat de ani buni și vrei să aduci copiii sau partenerii să vadă unde ai crescut? Vaias Aparts e locul perfect pentru o întoarcere cu sens.",
    coverImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    category: "Idei de vacanță",
    tags: ["diaspora", "România", "acasă", "vacanță", "Moldova"],
    publishedAt: "2025-11-20",
    readTime: 7,
    seoTitle: "Vacanță în Moldova pentru diaspora română — Vaias Aparts Târgu Neamț",
    seoDesc: "Românii din diaspora care vor să revină în Moldova: cazare boutique la Târgu Neamț, mănăstiri, munte, mâncare autentică. Rezervare în engleză, franceză, germană.",
    body: `
## Acasă, dar altfel

Ai plecat din România acum 5, 10, 20 de ani. Ai construit o viață nouă — în Londra, Paris, Dublin, Roma, München sau oriunde altundeva. Dar în fiecare an vine o clipă în care dorul de munte, de mâncare gătită cu dragoste, de liniștea dealurilor moldovenești devine copleșitor.

Și vrei să îi aduci și pe ai tăi — partenerul care nu a văzut niciodată o mănăstire ortodoxă, copiii care au crescut cu alt accent, prietenii care au auzit despre România doar la știri.

**Vaias Aparts** este locul perfect pentru această întoarcere cu sens.

## Moldova — o altă Românie

Țara de Sus, cum o numesc localnicii, este România la superlativ: mai verzi dealurile, mai profunde mănăstirile, mai autentică mâncarea.

Cetatea Neamț stă dreaptă de 600 de ani. Mănăstirile Agapia și Văratec îți opresc respirația indiferent dacă ești credincios sau nu. Lacul Roșu și Cheile Bicazului arată ca un decor de film.

Și tot Târgu Neamț este orașul natal al lui Ion Creangă — dacă îți amintești „Amintirile din copilărie" de la școală, ești acasă.

## Pentru partenerii și copiii care nu vorbesc română

La Vaias Aparts vorbim engleză, franceză, germană și italiană. Toată comunicarea noastră (mesaje, instrucțiuni, recomandări) poate fi în limba preferată.

Ghidăm oaspeții internaționali spre experiențe autentice — nu spre atracții turistice de suprafață.

## Rezervare simplă, din orice colț al lumii

Puteți rezerva prin:
- **WhatsApp** (messaggiamo in English, français, deutsch, italiano): wa.me/40738345330
- **Email:** contact@VaiasAparts.ro
- **Formularul de pe site** (disponibil în 6 limbi)

**Plata:** card bancar, transfer SWIFT, sau cash la sosire. Emitem factură fiscală pentru orice rezident european.

## Prețuri în EUR, fără surprize

Toate prețurile sunt în EUR, clare și transparente:
- Apartamente 1 sau 2: €56/noapte (2 persoane)
- Apartamente 3 sau 4: €70/noapte (4 persoane)
- Apartamente 5 sau 6: €62/noapte (2–3 persoane)
- Apartament 7: €50/noapte (accesibil, 2 persoane)

**Reducere 10%** la 7+ nopți. **5% reducere** față de platforme externe la rezervare directă.

## Un cuvânt de la gazde

Știm ce înseamnă dorul. Știm cum e să explici cuiva drag un loc care te-a format. Vă așteptăm cu drag — și cu cuvintele potrivite în orice limbă.

[Scrie-ne pe WhatsApp →](https://wa.me/40738345330) · [Rezervă direct →](/rezervare)
    `
  },
  {
    slug: "cheile-bicazului-lacul-rosu-ghid",
    title: "Cheile Bicazului și Lacul Roșu — ghid complet 2026",
    excerpt: "Tot ce trebuie să știi pentru o vizită la Cheile Bicazului: parcări, trasee, program, tarife, cum să eviți aglomerația și ce să nu ratezi.",
    coverImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
    category: "Natură & drumeții",
    tags: ["Cheile Bicazului", "Lacul Roșu", "natură", "trasee", "Bicaz"],
    publishedAt: "2025-11-01",
    readTime: 10,
    seoTitle: "Cheile Bicazului și Lacul Roșu — ghid complet cu prețuri și trasee 2026",
    seoDesc: "Ghid Cheile Bicazului 2026: trasee, tarife, parcări, program. Lacul Roșu la 3 km. Cazare la 40 km, Vaias Aparts Târgu Neamț.",
    body: `
## Cheile Bicazului — spectacol geologic de excepție

Cheile Bicazului sunt o formațiune naturală unică în România — un defileu tăiat de râul Bicaz prin Munții Hășmaș, cu pereți de calcar care ating 300 m înălțime. Traseul rutier (DN12C) șerpuiește timp de 8 km prin chei, oferind perspective care lasă fără cuvinte.

**Distanță de la Vaias Aparts:** 40 km (circa 45 minute)

## Cum să ajungi

**Ruta:** Târgu Neamț → Bicaz → Cheile Bicazului → Lacul Roșu

Drumul urmează DN15B până la Bicaz, apoi DN12C prin chei. Drumul este bine asfalt și accesibil tot anul.

**Atenție:** În sezonul estival (iulie–august), cheile sunt aglomerate. Recomandăm:
- Plecarea dimineața devreme (înainte de 08:30)
- Sau vizita în zilele de luni–joi
- Evitați weekend-urile de vârf

## Parcarea și accesul

Nu există taxă de acces pe traseul rutier. Parcările se plătesc la locurile de popas comerciale (mici tarife locale).

**Sfat:** Parcați la intrarea dinspre Bicaz și mergeți pe jos prin chei — veți vedea mult mai mult și veți prinde fotografii imposibil de realizat din mașină.

## Ce să nu ratezi

### Gâtul Iadului — cel mai dramatic punct
**Gâtul Iadului** este cel mai îngust punct al cheilor — pereții stâncoși se apropie la câteva zeci de metri, iar lumina naturală abia pătrunde. O experiență intimidantă în cel mai bun sens.

### Cascada Duruitoarea (varianta din Cheile Bicazului)
Nu confundați cu Cascada Duruitoarea de pe Ceahlău. Aceasta din urmă este mai mică, dar accesibilă direct de pe DN12C.

### Punctele de belvedere
Pe ambele părți ale cheilor există poteci care urcă pentru perspective aeriene. Cea mai bună: **traseul marcat cu cruce albastră**, accesibil din dreptul popasului turistic principal.

## Lacul Roșu — 3 km după ieșirea din chei

Lacul Roșu (sau Lacul Ghilcoș) s-a format în 1837 printr-o alunecare de teren care a blocat pârâul Ghilcoș. Numele vine de la rocile roșcate de pe fundul lacului.

**Caracteristica distinctivă:** trunchiurile brazilor înecați în 1837 se mai văd și astăzi în lac — o imagine misterioasă și unică.

**Activități:** plimbări cu barca (cu vasle sau electrică), pescuit sportiv, picnic pe maluri.

**Stațiunea Lacu Roșu** are pensiuni, restaurante și magazine — dar rezervați în avans pentru weekend.

## Trasee de drumeție în zonă

### Lacul Roșu — Vârful Ucigașul (marcaj cruce roșie)
**Durată:** 3–4 ore tur-retur | **Dificultate:** Mediu
Urcuș abrupt spre **Vârful Ucigașul** (1.432 m) cu panorame spre Hășmaș și Cheile Bicazului.

### Traseu circular Lacul Roșu — Cheile Sugăului
**Durată:** 5–6 ore | **Dificultate:** Mediu-Dificil
Cheile Sugăului sunt o surpriză ascunsă — mai înguste și mai sălbatice decât Cheile Bicazului principale.

## Program și tarife 2026

- **Acces rutier:** Liber, 24/7 (drum național)
- **Parcări:** 5–10 RON/oră (la popasurile comerciale)
- **Bărci Lacul Roșu:** 30–50 RON/30 minute (prețuri orientative, se negociază)

## Combinați vizita cu o noapte la Vaias Aparts

Cheile Bicazului merită o zi întreagă. Cazați-vă la **Vaias Aparts** (40 km distanță) — plecați dimineața la 08:00, explorați cheile și Lacul Roșu toată ziua, reveniți seara la apartament confortabil.

[Rezervă acum →](/rezervare)
    `
  },
  {
    slug: "targu-neamt-iarna-activitati",
    title: "Târgu Neamț iarna — ce să faci în sezonul rece pentru o vacanță memorabilă",
    excerpt: "Mănăstiri în zăpadă, schi pe Ceahlău, Crăciun și Revelion moldovenesc, atmosfera de Bobotează — iarna în Moldova are o magie aparte.",
    coverImage: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?auto=format&fit=crop&w=1600&q=80",
    category: "Ghid turistic",
    tags: ["iarnă", "Crăciun", "Revelion", "schi", "Târgu Neamț", "sezon"],
    publishedAt: "2025-10-10",
    readTime: 9,
    seoTitle: "Târgu Neamț iarna 2025-2026 — activități, Crăciun, Revelion",
    seoDesc: "Ce să faci iarna în Târgu Neamț: mănăstiri în zăpadă, schi pe Ceahlău, Crăciun, Revelion moldovenesc. Cazare la Vaias Aparts.",
    body: `
## Moldova iarna — o cu totul altă lume

Dacă Moldova de vară înseamnă lavandă și lumina caldă pe câmpuri, Moldova de iarnă înseamnă altceva: mănăstiri îngropate în zăpadă, clopotele care răsună în aerul îngheța, focul din sobă, borșul fierbinte cu smântână.

Nu este o destinație cu lifturi și pârtii de lux. Este o destinație cu autenticitate brută și o frumusețe care nu se lasă fotografiată ușor — trebuie să o trăiești.

## Crăciun și Revelion la Vaias Aparts

**Sărbătorile de iarnă** sunt momentul ideal pentru a închiria două apartamente alăturate (de exemplu, 3 + 4) și a petrece Crăciunul sau Revelionul cu familia extinsă.

La cerere, pregătim:
- Coș de Crăciun cu produse locale (brânzeturi, vin de Cotnari, turtă dulce)
- Recomandări pentru cine festive la restaurantele locale
- Program de vizite la mănăstiri (Liturghia de Crăciun la Mănăstirea Neamț este o experiență unică)

**Minim 3 nopți** în perioada 23 decembrie – 7 ianuarie.

## Schi și sporturi de iarnă pe Ceahlău

**Durău** (55 km de Vaias Aparts) are o pârtie de schi pentru începători și intermediari, cu telegondolă funcțională în sezon. Condiții de zăpadă bune din ianuarie până în martie.

**Stațiunea Durău** iarna este mult mai liniștită decât vara — prețuri mai mici, oameni mai puțini.

## Mănăstirile iarna — o experiență spirituală completă

Mănăstirile din județul Neamț sunt deschise tot anul. Iarna, cu zăpadă pe acoperișuri și cu clopotele mai clare în aerul înghețat, au o atmosferă incomparabilă.

**Recomandare:** Vizitați **Mănăstirea Neamț** pentru Liturghia de Crăciun (25 decembrie, ora 00:00) sau Bobotează (6 ianuarie) — experiențe spirituale care rămân cu tine toată viața, credincioși sau nu.

## Mesele de iarnă — ce să guști

Iarna, bucătăria moldovenească dă tot ce are mai bun:

- **Ciorba de burtă** — caldă, acră, cu smântână grasă
- **Sarmale cu afumătură** — versiunea de iarnă, mai robustă
- **Tochitură moldovenească** — carne de porc cu mămăligă și ou
- **Vin fiert cu scorțișoară** — inevitabil
- **Pălincă din prune** — dacă rezistați...

## Prețuri de iarnă la Vaias Aparts

Sezonul de iarnă (noiembrie–martie, exclusiv sărbătorile) oferă prețuri reduse:
- Apartamente 1, 2: **€50/noapte** (față de €56 vara)
- Apartamente 3, 4: **€62/noapte** (față de €70 vara)
- Apartamente 5, 6: **€55/noapte** (față de €62 vara)

**Reducere 10%** la rezervări directe de 7+ nopți.

## Sfat practic pentru iarnă

Verificați condițiile meteo înainte de plecare — drumul prin Cheile Bicazului poate fi închis la zăpadă abundentă. Pneurile de iarnă sunt obligatorii pe DN12C între 1 noiembrie și 31 martie.

La Vaias Aparts, toate apartamentele au **încălzire centrală** funcțională. Câteva apartamente au radiatoare electrice suplimentare pentru nopțile foarte reci.

[Rezervă pentru Crăciun sau iarnă →](/rezervare)
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}
