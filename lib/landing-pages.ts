export type LandingPage = {
  slug: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  intro: {
    heading: string;
    body: string[];
  };
  distance: string;
  drivingTime: string;
  highlights: { icon: string; title: string; text: string }[];
  whyChoose: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  nearby: string[];
  bookingPitch: string;
  primaryCTA: string;
  whatsappMessage: string;
};

const VILLA_PHOTO_1 = "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_11.jpg";
const VILLA_PHOTO_2 = "https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg";
const VILLA_PHOTO_3 = "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_12.jpg";
const VILLA_PHOTO_4 = "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_7.jpg";
const VILLA_PHOTO_5 = "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_16.jpg";

export const landingPages: LandingPage[] = [
  {
    slug: "cazare-targu-neamt",
    hero: {
      eyebrow: "Cazare în Târgu Neamț",
      title: "Cea mai bine notată cazare din Târgu Neamț — 7 apartamente boutique.",
      subtitle:
        "Booking.com 9.4 · 99 recenzii Google 5.0 · Ultracentral, lângă Cetatea Neamțului. Rezervare directă — fără comision OTA.",
      image: VILLA_PHOTO_2
    },
    meta: {
      title: "Cazare Târgu Neamț — Vila Vaias Aparts | 7 apartamente boutique, 9.4 Booking",
      description:
        "Cazare în Târgu Neamț la Vila Vaias Aparts — 7 apartamente boutique ultracentral, Booking.com 9.4, 99 recenzii Google 5.0. Parcare gratuită, WiFi rapid, animale acceptate. Rezervare directă — cel mai bun preț.",
      keywords: [
        "cazare Targu Neamt",
        "cazare Târgu Neamț",
        "cazare Targu Neamt centru",
        "apartamente Târgu Neamț",
        "pensiune Târgu Neamț",
        "vilă cazare Târgu Neamț",
        "cazare ieftină Târgu Neamț",
        "cazare cu parcare Târgu Neamț"
      ]
    },
    intro: {
      heading: "De ce Vila Vaias Aparts este alegerea numărul 1 pentru cazare în Târgu Neamț",
      body: [
        "Vila Vaias Aparts oferă 7 apartamente boutique independente, în centrul orașului Târgu Neamț, la doar 5 minute cu mașina de Cetatea Neamțului și la 30 de minute de mănăstirile Agapia și Văratec. Suntem clasificați 4 stele (certificat 35332/2023) și recunoscuți drept cea mai bine notată cazare din zonă: 9.4 pe Booking.com și 99 de recenzii Google la 5.0 stele.",
        "Spre deosebire de o pensiune obișnuită, fiecare apartament are propria intrare, baie privată, bucătărie complet utilată (sau acces la Bucătăria pentru Toți la Apartament 7) și terasă. Aveți intimitatea unui apartament închiriat și grija unei familii care gestionează personal vila. Parcarea în curte este gratuită, WiFi-ul de mare viteză este inclus, iar animalele de companie sunt bine venite, fără cost suplimentar.",
        "Rezervând direct pe WhatsApp sau telefon, evitați comisionul de 15–25% al platformelor de rezervare. Cel mai bun preț — direct la noi. Confirmare în câteva ore între 08:00 și 22:00."
      ]
    },
    distance: "Ultracentral",
    drivingTime: "0 min",
    highlights: [
      { icon: "🏰", title: "5 min de Cetatea Neamțului", text: "Cetatea medievală a lui Ștefan cel Mare — drumul trece prin pădurea de fag." },
      { icon: "⛪", title: "30 min de Agapia și Văratec", text: "Cele mai vizitate mănăstiri de maici din Moldova — perfect pentru pelerinaj sau plimbare." },
      { icon: "🅿️", title: "Parcare gratuită în curte", text: "Toate apartamentele beneficiază de parcare în curtea vilei, fără cost suplimentar." },
      { icon: "📶", title: "WiFi rapid în toate apartamentele", text: "Internet de mare viteză inclus — perfect pentru muncă remote sau streaming." },
      { icon: "🐕", title: "Animale acceptate", text: "Animalele de companie sunt bine venite, la cerere, fără cost suplimentar." },
      { icon: "🍳", title: "Bucătărie completă", text: "Fiecare apartament are bucătărie proprie utilată (sau acces la Bucătăria pentru Toți)." }
    ],
    whyChoose: [
      { title: "Cel mai bun preț — direct la noi", text: "Rezervând prin WhatsApp sau telefon, evitați comisionul OTA de 15–25%. Prețul rămâne între noi." },
      { title: "Confirmare în câteva ore", text: "Răspundem pe WhatsApp de regulă în câteva ore, între 08:00 și 22:00. Fără robot — direct cu familia care gestionează vila." },
      { title: "Self check-in cu ghidaj", text: "Veniți la orice oră după 14:00 — vă întâmpinăm sau vă transmitem instrucțiunile, cum vă este mai comod." },
      { title: "Flexibilitate pentru cereri speciale", text: "Pat suplimentar pentru copil, transfer de la gara Paşcani, sfaturi despre mănăstiri — întrebați liber." }
    ],
    faqs: [
      {
        q: "Care este cea mai bună cazare din Târgu Neamț?",
        a: "Vila Vaias Aparts este cea mai bine notată cazare din Târgu Neamț, cu scor 9.4 pe Booking.com și 99 de recenzii Google la 5.0 stele. Oferă 7 apartamente boutique independente, clasificate 4 stele (certificat nr. 35332)."
      },
      {
        q: "Cât costă cazarea la Vila Vaias Aparts în Târgu Neamț?",
        a: "Apartamentele single (1 dormitor) pornesc de la 297 RON/noapte, iar cele cu 2 dormitoare de la 547 RON/noapte. Pentru sejururi de 2-3 nopți aplicăm 10% reducere, pentru 4-6 nopți 15%, iar pentru 7+ nopți 25%. Tarifele sunt mai bune rezervând direct (WhatsApp +40 752 388 388)."
      },
      {
        q: "Care este distanța de la Vila Vaias Aparts la Cetatea Neamțului?",
        a: "Cetatea Neamțului este la 5 km (10 minute cu mașina) de Vila Vaias Aparts. Drumul trece printr-o pădure de fag și este accesibil tot anul."
      },
      {
        q: "Are Vila Vaias Aparts parcare?",
        a: "Da, parcarea este gratuită în curtea vilei pentru toți oaspeții, în limita locurilor disponibile (primul venit, primul servit). Curtea este monitorizată CCTV 24/7."
      },
      {
        q: "Acceptați animale de companie?",
        a: "Da, animalele de companie sunt bine venite, la cerere prealabilă, fără cost suplimentar. Vă rugăm să ne spuneți la rezervare ce animal aduceți."
      },
      {
        q: "Pot rezerva un apartament cu acces pentru persoane cu mobilitate redusă?",
        a: "Da, Apartamentul 7 este situat la parter, fără trepte, cu spații generoase și baie accesibilă. Este alegerea recomandată pentru oaspeții cu mobilitate redusă, vârstnici sau familii cu copii mici."
      }
    ],
    nearby: ["Cetatea Neamțului (5 km)", "Casa Memorială Ion Creangă (3 km)", "Mănăstirea Neamț (12 km)", "Mănăstirea Agapia (14 km)", "Mănăstirea Văratec (18 km)", "Masivul Ceahlău (60 km)"],
    bookingPitch:
      "Avem 7 apartamente independente — single (3 oaspeți, capacitate 5) și apartamente cu 2 dormitoare (4 oaspeți, capacitate 6). Pentru grupuri sau familii mari, vila întreagă găzduiește 22 până la 28 de persoane.",
    primaryCTA: "Rezervă cazare în Târgu Neamț",
    whatsappMessage:
      "Bună ziua! Doresc să rezerv cazare la Vila Vaias Aparts în Târgu Neamț. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] adulți, [NR] copii. Vă rog să-mi comunicați disponibilitatea și prețul."
  },
  {
    slug: "cazare-cetatea-neamtului",
    hero: {
      eyebrow: "Cazare lângă Cetatea Neamțului",
      title: "La 5 minute de Cetatea lui Ștefan cel Mare.",
      subtitle:
        "Vila Vaias Aparts — 7 apartamente boutique ultracentrale, doar 5 km de Cetatea Neamțului. Booking 9.4 · 99 recenzii Google 5.0.",
      image: VILLA_PHOTO_4
    },
    meta: {
      title: "Cazare lângă Cetatea Neamțului — Vila Vaias Aparts | 5 km, ultracentral",
      description:
        "Cazare la 5 km de Cetatea Neamțului, cetatea medievală a lui Ștefan cel Mare. Vila Vaias Aparts — 7 apartamente boutique, parcare gratuită, animale acceptate. Booking 9.4.",
      keywords: [
        "cazare Cetatea Neamtului",
        "cazare langa Cetatea Neamtului",
        "cazare aproape de Cetatea Neamt",
        "Cetatea Neamt cazare",
        "cazare Targu Neamt cetate"
      ]
    },
    intro: {
      heading: "Cetatea Neamțului la 5 minute — cazare premium pentru vizitatorii cetății",
      body: [
        "Cetatea Neamțului, ridicată în secolul al XIV-lea și fortificată de Ștefan cel Mare, este unul dintre cele mai bine păstrate monumente medievale din România. De pe ziduri vedeți întreaga vale a Ozanei. La doar 5 km de cetate, Vila Vaias Aparts este cea mai apropiată cazare boutique de înaltă calitate.",
        "Drumul către cetate trece printr-o pădure de fag — 10 minute cu mașina sau o plimbare de 1 oră pe jos. Vă putem ajuta cu indicații, program de vizitare și cele mai bune ore pentru fotografii (mai ales toamna, când frunzele se aprind).",
        "După vizita la cetate, vă întoarceți în apartamentul vostru cu bucătărie completă, baie privată și terasă proprie. Lăsați-vă încălțămintea de munte la intrare, deschideți frigiderul plin cu produse cumpărate de la piața locală și savurați liniștea."
      ]
    },
    distance: "5 km",
    drivingTime: "10 min",
    highlights: [
      { icon: "🏰", title: "5 km de Cetatea Neamțului", text: "Cea mai apropiată cazare boutique 4 stele de cetate." },
      { icon: "🌳", title: "Drum prin pădurea de fag", text: "Trasee accesibile către cetate, mai ales spectaculoase toamna." },
      { icon: "📸", title: "Sfaturi locale pentru vizită", text: "Vă spunem cele mai bune ore pentru poze, evitați aglomerația de weekend." },
      { icon: "🅿️", title: "Parcare gratuită", text: "Lăsați mașina la vilă, ieșiți relaxat spre cetate dimineața." }
    ],
    whyChoose: [
      { title: "La 10 minute cu mașina", text: "Cea mai eficientă bază pentru a explora cetatea — fără să stați pe drumuri." },
      { title: "Liniște după vizită", text: "Cetatea poate fi obositoare — apartamentul vostru cu terasă privată vă reface puterile." },
      { title: "Itinerar complet în zonă", text: "Combinați vizita la cetate cu mănăstirile, Casa Creangă și Centrul Târgu Neamț." }
    ],
    faqs: [
      {
        q: "Care este cea mai apropiată cazare de Cetatea Neamțului?",
        a: "Vila Vaias Aparts este una dintre cele mai apropiate cazări boutique 4 stele de Cetatea Neamțului — doar 5 km (10 minute cu mașina) prin centrul orașului Târgu Neamț."
      },
      {
        q: "Care este programul Cetății Neamț?",
        a: "Cetatea Neamț este deschisă de obicei zilnic între orele 9:00 și 18:00 (vara), 9:00–17:00 (iarna). Pentru programul actualizat, verificați site-ul oficial sau întrebați-ne la check-in — vă spunem și cele mai bune ore pentru a evita aglomerația."
      },
      {
        q: "Pot ajunge pe jos la cetate de la Vila Vaias Aparts?",
        a: "Da, drumul pe jos durează aproximativ 1 oră prin pădurea de fag. Este o plimbare frumoasă, mai ales toamna, dar recomandăm încălțăminte adecvată și apă."
      }
    ],
    nearby: ["Cetatea Neamțului (5 km)", "Casa Creangă (3 km)", "Centrul Târgu Neamț (1 km)", "Mănăstirea Neamț (12 km)"],
    bookingPitch:
      "Apartamente cu 1 sau 2 dormitoare, capacitate 3-6 oaspeți. Apartamentele 5 și 6 au aer condiționat — recomandat vara, după drumul spre cetate.",
    primaryCTA: "Rezervă cazare lângă cetate",
    whatsappMessage:
      "Bună ziua! Doresc cazare la Vila Vaias Aparts pentru a vizita Cetatea Neamțului. Datele: [DATA] – [DATA], [NR] persoane. Vă rog să-mi comunicați disponibilitatea."
  },
  {
    slug: "cazare-manastirea-agapia",
    hero: {
      eyebrow: "Cazare lângă Mănăstirea Agapia",
      title: "Aproape de Agapia. Aproape de liniște.",
      subtitle:
        "Vila Vaias Aparts — 30 de minute de Mănăstirea Agapia, una dintre cele mai mari mănăstiri de maici din lume. Picturile lui Nicolae Grigorescu.",
      image: VILLA_PHOTO_3
    },
    meta: {
      title: "Cazare Mănăstirea Agapia — Vila Vaias Aparts | 30 min, boutique 4★",
      description:
        "Cazare la 30 min de Mănăstirea Agapia, cu picturile lui Nicolae Grigorescu. Vila Vaias Aparts — apartamente boutique 4 stele în Târgu Neamț. 99 recenzii Google 5.0.",
      keywords: [
        "cazare Manastirea Agapia",
        "cazare langa Agapia",
        "Agapia cazare pelerini",
        "cazare Agapia Varatec",
        "pelerinaj Agapia cazare"
      ]
    },
    intro: {
      heading: "Mănăstirea Agapia la 30 de minute — refugiul ideal pentru pelerini",
      body: [
        "Mănăstirea Agapia este una dintre comorile spirituale ale Moldovei — peste 300 de monahii trăiesc aici, în case albe risipite pe dealuri. Pictura interioară a fost realizată în 1858 de Nicolae Grigorescu, atunci tânăr de 20 de ani. La doar 30 de minute cu mașina, Vila Vaias Aparts este punctul ideal de pornire.",
        "Spre deosebire de chiliile mănăstirești, la noi aveți un apartament propriu — pat Emperor moale, baie privată, bucătărie. Vă întoarceți din slujbă, vă faceți un ceai, vă liniștiți. A doua zi sunteți gata pentru un nou drum prin mănăstiri.",
        "Itinerarul recomandat pelerinilor: Agapia (30 min), Văratec (35 min), Sihăstria (45 min, mormântul Părintelui Cleopa), Mănăstirea Neamț (15 min). Vă putem da o foaie de drum în prima zi."
      ]
    },
    distance: "14 km",
    drivingTime: "30 min",
    highlights: [
      { icon: "⛪", title: "30 min de Mănăstirea Agapia", text: "Picturile lui Nicolae Grigorescu și liniștea mănăstirii de maici." },
      { icon: "🛐", title: "Pelerinaj complet în zonă", text: "Agapia, Văratec, Sihăstria, Mănăstirea Neamț — toate la o oră de noi." },
      { icon: "🕊️", title: "Liniște garantată", text: "Apartamente independente, atmosferă rezervată — perfect după slujbe." },
      { icon: "📿", title: "Familie credincioasă", text: "Suntem o familie ortodoxă — primim cu drag pelerinii și înțelegem nevoile lor." }
    ],
    whyChoose: [
      { title: "Confort după pelerinaj", text: "Pat moale, baie privată, bucătărie — vă reface forțele pentru a doua zi de mănăstiri." },
      { title: "Itinerar personalizat", text: "Vă recomandăm ordinea mănăstirilor, programul slujbelor și locurile de masă." },
      { title: "Acceptăm grupuri de pelerini", text: "Vila întreagă pentru 22-28 persoane — autocar parohial, prieteni, familie extinsă." }
    ],
    faqs: [
      {
        q: "Care este cea mai apropiată cazare de Mănăstirea Agapia?",
        a: "Vila Vaias Aparts este la 14 km (30 min cu mașina) de Mănăstirea Agapia. Există și cazare la chilii în mănăstire, dar pentru cei care preferă confort propriu (baie privată, bucătărie), Vila Vaias Aparts este cea mai bună alegere."
      },
      {
        q: "Pot vizita Agapia și Văratec în aceeași zi?",
        a: "Da, cele două mănăstiri sunt la doar 4 km una de alta și se pot vizita într-o singură dimineață. Vă recomandăm să începeți cu Agapia (mai mare, programul de slujbe e diferit) și să continuați cu Văratec."
      },
      {
        q: "Care este programul slujbelor la Mănăstirea Agapia?",
        a: "Slujba de utrenie este de regulă la 5:00, Sf. Liturghie la 7:00, iar vecernia la 17:00 (program orientativ, verificați la mănăstire). Mănăstirea este deschisă pentru pelerini între orele 8:00 și 19:00."
      },
      {
        q: "Organizați transport către mănăstiri?",
        a: "Nu avem transport propriu, dar putem recomanda taximetriști de încredere și itinerarul cel mai eficient. Drumul cu mașina proprie este cel mai practic — parcarea la mănăstiri este gratuită."
      }
    ],
    nearby: ["Mănăstirea Agapia (14 km)", "Mănăstirea Văratec (18 km)", "Mănăstirea Sihăstria (40 km)", "Mănăstirea Neamț (12 km)"],
    bookingPitch:
      "Apartamentele cu 2 dormitoare (3 și 4) sunt populare la grupurile de pelerini — 4 persoane în condiții bune, posibilitate până la 6. Pentru grupuri parohiale, vila întreagă găzduiește 22-28 persoane.",
    primaryCTA: "Rezervă cazare aproape de Agapia",
    whatsappMessage:
      "Bună ziua! Doresc cazare aproape de Mănăstirea Agapia pentru pelerinaj. Datele: [DATA] – [DATA], [NR] persoane. Vă rog disponibilitatea și sfaturi pentru itinerar."
  },
  {
    slug: "cazare-manastirea-varatec",
    hero: {
      eyebrow: "Cazare lângă Mănăstirea Văratec",
      title: "Lângă cea mai mare mănăstire de maici din România.",
      subtitle:
        "Vila Vaias Aparts — 35 minute de Mănăstirea Văratec. Mormântul Veronicăi Micle și mireasma de tei a satului-mănăstire.",
      image: VILLA_PHOTO_5
    },
    meta: {
      title: "Cazare Mănăstirea Văratec — Vila Vaias Aparts | 35 min boutique 4★",
      description:
        "Cazare la 35 min de Mănăstirea Văratec, cea mai mare mănăstire de maici din România. Vila Vaias Aparts — 7 apartamente boutique, Booking 9.4, animale acceptate.",
      keywords: [
        "cazare Manastirea Varatec",
        "cazare langa Varatec",
        "Varatec cazare",
        "pelerinaj Varatec cazare",
        "cazare Veronica Micle"
      ]
    },
    intro: {
      heading: "Mănăstirea Văratec — sat-mănăstire, livezi de meri și liniște",
      body: [
        "Văratec este mai mult decât o mănăstire — este un sat de monahii, cu peste 400 de măicuțe care trăiesc în case albe risipite printre livezi de meri și pomi de tei. Biserica principală, construită în 1808, păstrează picturi din secolul XIX. Aproape de mănăstire este mormântul Veronicăi Micle. În luna iunie, mireasma de tei umple întreaga vale.",
        "La 35 de minute de Vila Vaias Aparts, Văratec se vizitează cel mai bine combinat cu Agapia (la doar 4 km). O zi întreagă vă permite să descoperiți liniștit ambele mănăstiri, plus o oprire la mănăstirea sihăstrească Văratec Veche, ascunsă în pădure."
      ]
    },
    distance: "18 km",
    drivingTime: "35 min",
    highlights: [
      { icon: "⛪", title: "35 min de Mănăstirea Văratec", text: "Cea mai mare mănăstire de maici din România, peste 400 de monahii." },
      { icon: "🌿", title: "Sat-mănăstire în livezi", text: "Plimbare printre case albe, livezi de meri, mireasmă de tei." },
      { icon: "📜", title: "Mormântul Veronicăi Micle", text: "Loc de pelerinaj pentru iubitorii de literatură română." },
      { icon: "🍯", title: "Produse mănăstirești", text: "Miere, dulcețuri, prosforă — magazinul mănăstirii merită vizitat." }
    ],
    whyChoose: [
      { title: "Aproape de Agapia (4 km)", text: "Vizită combinată Văratec + Agapia într-o singură dimineață." },
      { title: "Familie credincioasă, oaspeți respectați", text: "Înțelegem și respectăm ritmul pelerinilor — programul de masă, liniștea." },
      { title: "Apartamente curate, lenjerie premium", text: "Vă întoarceți din pelerinaj la pat moale, baie privată, bucătărie utilată." }
    ],
    faqs: [
      {
        q: "Care este cea mai apropiată cazare cu confort de Mănăstirea Văratec?",
        a: "Vila Vaias Aparts este la 18 km (35 min) de Mănăstirea Văratec — cea mai apropiată cazare boutique 4 stele. Mănăstirea oferă și chilii pentru pelerini, dar pentru confortul unei băi private și bucătărie proprie, recomandăm Vila Vaias Aparts."
      },
      {
        q: "Pot vedea mormântul Veronicăi Micle la Văratec?",
        a: "Da, mormântul Veronicăi Micle se află în cimitirul mănăstirii, ușor de găsit. Vă recomandăm să întrebați la intrare — măicuțele vă vor îndruma cu drag."
      },
      {
        q: "Cea mai bună perioadă pentru a vizita Mănăstirea Văratec?",
        a: "Iunie este magic — teii înfloresc și mireasma umple satul. Septembrie este la fel de frumos, cu livezi pline. Iarna este liniștită, perfect pentru reculegere."
      }
    ],
    nearby: ["Mănăstirea Văratec (18 km)", "Mănăstirea Agapia (14 km)", "Mănăstirea Neamț (12 km)", "Mănăstirea Secu (25 km)"],
    bookingPitch: "Apartamentele cu 2 dormitoare găzduiesc 4-6 persoane — ideal pentru familii sau grupuri mici de pelerini.",
    primaryCTA: "Rezervă cazare pentru Văratec",
    whatsappMessage:
      "Bună ziua! Doresc cazare pentru vizita la Mănăstirea Văratec. Datele: [DATA] – [DATA], [NR] persoane. Vă mulțumesc!"
  },
  {
    slug: "cazare-manastirea-neamt",
    hero: {
      eyebrow: "Cazare lângă Mănăstirea Neamț",
      title: "La 15 minute de Ierusalimul ortodoxiei românești.",
      subtitle:
        "Vila Vaias Aparts — cea mai apropiată cazare boutique de Mănăstirea Neamț. Cea mai veche mănăstire moldovenească, prima tipografie din Moldova.",
      image: VILLA_PHOTO_1
    },
    meta: {
      title: "Cazare Mănăstirea Neamț — Vila Vaias Aparts | 15 min, boutique 4★",
      description:
        "Cazare la 15 min de Mănăstirea Neamț, cea mai veche mănăstire din Moldova. Vila Vaias Aparts — boutique 4 stele, Booking 9.4, parcare gratuită, WiFi rapid.",
      keywords: [
        "cazare Manastirea Neamt",
        "cazare langa Manastirea Neamt",
        "Manastirea Neamt cazare",
        "pelerinaj Manastirea Neamt"
      ]
    },
    intro: {
      heading: "Mănăstirea Neamț — leagănul culturii moldovenești medievale",
      body: [
        "Fondată de Petru I Mușat și terminată de Ștefan cel Mare în 1497, Mănăstirea Neamț este leagănul culturii românești medievale. Aici a funcționat prima tipografie din Moldova. Biblioteca păstrează manuscrise vechi, iar muzeul găzduiește icoane de o frumusețe rară. Considerată „Ierusalimul ortodoxiei românești” — un titlu pe care îl merită cu prisosință.",
        "La doar 12 km (15 minute cu mașina) de Vila Vaias Aparts, este cea mai apropiată dintre marile mănăstiri ale Neamțului. O vizită aici este obligatorie pentru orice pelerin sau iubitor de istorie."
      ]
    },
    distance: "12 km",
    drivingTime: "15 min",
    highlights: [
      { icon: "⛪", title: "15 min de Mănăstirea Neamț", text: "Cea mai veche mănăstire moldovenească — fondată secolul XIV." },
      { icon: "📜", title: "Prima tipografie din Moldova", text: "Aici s-au tipărit primele cărți românești — un loc de cultură vie." },
      { icon: "🖼️", title: "Muzeu cu icoane rare", text: "Colecție de icoane și manuscrise de o frumusețe excepțională." },
      { icon: "🌳", title: "Codrii de fag și brad", text: "Liniștea pădurii — perfect pentru reculegere." }
    ],
    whyChoose: [
      { title: "Cea mai apropiată cazare", text: "15 minute cu mașina — puteți merge dimineața la slujbă și vă întoarceți la apartament pentru micul dejun." },
      { title: "Combinație Neamț + Agapia + Văratec", text: "Toate trei mănăstirile la o oră distanță una de alta — itinerar complet într-o zi." },
      { title: "Liniște și intimitate", text: "Apartamente independente — perfect după o zi de pelerinaj." }
    ],
    faqs: [
      {
        q: "Cât durează cu mașina de la Vila Vaias Aparts la Mănăstirea Neamț?",
        a: "Doar 15 minute (12 km). Este una dintre cele mai apropiate dintre marile mănăstiri."
      },
      {
        q: "Există slujbă de noapte la Mănăstirea Neamț?",
        a: "Da, la sărbători mari (Sf. Înălțare a Sfintei Cruci — hramul mănăstirii, Învierea, Crăciunul) sunt slujbe nocturne. Pentru programul exact, verificați site-ul mănăstirii sau întrebați la check-in."
      },
      {
        q: "Pot vizita Mănăstirea Neamț împreună cu Agapia și Văratec în aceeași zi?",
        a: "Da, este itinerarul recomandat de noi: Neamț dimineața (15 min), apoi Agapia (30 min) și Văratec (35 min). Distanțele între ele sunt mici."
      }
    ],
    nearby: ["Mănăstirea Neamț (12 km)", "Mănăstirea Agapia (14 km)", "Mănăstirea Văratec (18 km)", "Cetatea Neamțului (5 km)"],
    bookingPitch:
      "Apartamentele single sunt potrivite pentru pelerini individuali; cele cu 2 dormitoare pentru familii. Pentru grupuri parohiale, vila întreagă (22-28 persoane).",
    primaryCTA: "Rezervă cazare pentru Mănăstirea Neamț",
    whatsappMessage:
      "Bună ziua! Doresc cazare pentru vizita la Mănăstirea Neamț. Datele: [DATA] – [DATA], [NR] persoane. Mulțumesc!"
  },
  {
    slug: "cazare-ceahlau",
    hero: {
      eyebrow: "Cazare aproape de Ceahlău",
      title: "Bază confortabilă pentru muntele sfânt.",
      subtitle:
        "Vila Vaias Aparts — la 45 minute de masivul Ceahlău. Plecați dimineața spre Cabana Dochia, vă întoarceți seara la apartament cu terasă privată.",
      image: VILLA_PHOTO_4
    },
    meta: {
      title: "Cazare aproape de Ceahlău — Vila Vaias Aparts | 45 min, 4★ boutique",
      description:
        "Cazare la 45 min de masivul Ceahlău, muntele sfânt al dacilor. Vila Vaias Aparts — apartamente boutique 4 stele, parcare gratuită, WiFi rapid. Booking 9.4.",
      keywords: [
        "cazare Ceahlau",
        "cazare aproape de Ceahlau",
        "cazare munte Neamt",
        "cazare Durau alternativa",
        "cazare pentru drumetii Ceahlau"
      ]
    },
    intro: {
      heading: "Ceahlău la 45 minute — muntele zeilor daci",
      body: [
        "Considerat de strămoșii noștri muntele zeului Zamolxis, Ceahlăul este un masiv plin de legende. Trasee accesibile pleacă din Durău spre Cabana Dochia, trecând pe lângă Piatra Lăcrimată și Cascada Duruitoarea. La 1907 m, peisajul este absolut impresionant.",
        "Vila Vaias Aparts este o alternativă liniștită la cazările aglomerate din Durău — la doar 45 minute cu mașina de punctul de pornire al traseelor. După o zi de drumeție, vă întoarceți la un apartament cu duș fierbinte, bucătărie pentru o cină caldă și terasă privată cu vedere spre cerul Moldovei."
      ]
    },
    distance: "60 km",
    drivingTime: "45 min",
    highlights: [
      { icon: "⛰️", title: "45 min de masivul Ceahlău", text: "Plecați dimineața relaxat — sunteți la traseu înainte de 9:00." },
      { icon: "🥾", title: "Trasee accesibile", text: "De la familii la drumeți experimentați — Toaca, Dochia, Duruitoarea." },
      { icon: "🛁", title: "Confort după drumeție", text: "Apartamentele 5 și 6 au aer condiționat — răcorire perfectă după munte." },
      { icon: "🍲", title: "Bucătărie pentru cină proprie", text: "Pregătiți cina cu produsele de la piața Târgu Neamț." }
    ],
    whyChoose: [
      { title: "Alternativă la cazările din Durău", text: "Mai liniștit, preț mai bun, confort superior — la doar 45 min de munte." },
      { title: "Combinație munte + cultură", text: "Câteva zile la Vaias vă permit Ceahlău + mănăstiri + cetate într-un singur sejur." },
      { title: "Parcare gratuită pentru mașină", text: "După drumeție, mașina e în siguranță în curtea noastră." }
    ],
    faqs: [
      {
        q: "Cât durează cu mașina de la Vila Vaias Aparts la Ceahlău?",
        a: "Aproximativ 45 de minute cu mașina (60 km) până la Durău, punctul de pornire al traseelor."
      },
      {
        q: "Sunt traseele de pe Ceahlău accesibile pentru începători?",
        a: "Da, traseul Durău – Cabana Dochia este accesibil pentru începători cu condiție fizică medie (4-5 ore dus-întors). Pentru copii recomandăm traseul Cascada Duruitoarea (2-3 ore)."
      },
      {
        q: "Care este cea mai bună perioadă pentru drumeție pe Ceahlău?",
        a: "Mai-septembrie pentru drumeții fără probleme. Toamna (sept-oct) este spectaculoasă cromatic. Iarna doar pentru drumeți experimentați cu echipament adecvat."
      }
    ],
    nearby: ["Masivul Ceahlău (60 km)", "Cheile Bicazului (75 km)", "Lacul Roșu (80 km)", "Cetatea Neamțului (5 km)"],
    bookingPitch:
      "Pentru sejururi de drumeție recomandăm minim 3 nopți — vă oferă timp să faceți Ceahlău + Bicaz + mănăstiri. Reducere automată 10-15% pentru sejururi 2-6 nopți.",
    primaryCTA: "Rezervă cazare pentru Ceahlău",
    whatsappMessage:
      "Bună ziua! Doresc cazare pentru drumeții pe Ceahlău. Datele: [DATA] – [DATA], [NR] persoane. Vă rog disponibilitatea."
  },
  {
    slug: "cazare-grup-targu-neamt",
    hero: {
      eyebrow: "Vila întreagă pentru grupuri",
      title: "22 până la 28 de persoane — vila întreagă, exclusiv pentru grupul tău.",
      subtitle:
        "Reuniuni de familie, nunți, retrageri parohiale, echipe corporate, autocare cu pelerini. 7 apartamente independente, intimitatea fiecăruia.",
      image: VILLA_PHOTO_3
    },
    meta: {
      title: "Cazare grup Târgu Neamț — Vila întreagă, 22-28 persoane | Vaias Aparts",
      description:
        "Cazare pentru grupuri în Târgu Neamț — vila întreagă Vaias Aparts pentru 22-28 persoane. Reuniuni familie, nunți, pelerini, corporate retreats. Tarif personalizat.",
      keywords: [
        "cazare grup Targu Neamt",
        "vila intreaga Targu Neamt",
        "cazare grup mare Neamt",
        "rezervare vila intreaga Neamt",
        "cazare parohie Neamt",
        "cazare nunta Targu Neamt",
        "team building Neamt"
      ]
    },
    intro: {
      heading: "Vila întreagă — toate cele 7 apartamente exclusiv pentru grupul vostru",
      body: [
        "Pentru reuniuni mari de familie, nunți, retrageri parohiale, autocare cu pelerini sau team-building corporate, Vila Vaias Aparts oferă posibilitatea de a rezerva întreaga vilă. 7 apartamente independente, capacitate optimă 22 persoane, maxim 26-28 cu paturi extensibile.",
        "Spre deosebire de un hotel sau o pensiune cu camere alăturate, fiecare apartament are intrarea proprie, baia privată și bucătăria proprie. Aveți intimitatea unui apartament al vostru, dar sunteți toți împreună în același complex. Bucătăria pentru Toți (la parter) servește pentru micul dejun comun, sărbători sau dineul de grup.",
        "Pentru grupuri oferim prețuri personalizate, plus posibilitatea de a discuta servicii adiționale (catering, transfer, ghid local pentru mănăstiri sau cetate)."
      ]
    },
    distance: "—",
    drivingTime: "—",
    highlights: [
      { icon: "👨‍👩‍👧‍👦", title: "22-28 persoane", text: "Capacitate optimă 22, maxim 26-28 cu paturi extensibile." },
      { icon: "🏠", title: "7 apartamente independente", text: "Intimitate completă pentru fiecare familie, dar toți împreună." },
      { icon: "🍳", title: "Bucătăria pentru Toți", text: "Spațiu comun pentru mese de grup, sărbători, agape." },
      { icon: "🅿️", title: "Parcare pentru tot grupul", text: "Curtea poate găzdui mașinile întregului grup, plus autocar." },
      { icon: "💰", title: "Tarif personalizat", text: "Reducere pentru vila întreagă vs. apartamente individuale." },
      { icon: "📞", title: "Coordonator dedicat", text: "Familia care gestionează vila vă ajută cu logistica grupului." }
    ],
    whyChoose: [
      { title: "Toți împreună, dar fiecare cu spațiul lui", text: "Familia mare cu bebeluși, bunici, adolescenți — toți confortabili." },
      { title: "Locația perfectă pentru evenimente", text: "Ultracentral Târgu Neamț, lângă Cetatea Neamțului și mănăstiri. Restaurantele și serviciile la pas." },
      { title: "Confirmare rapidă pentru organizatori", text: "Ne adresăm direct organizatorului — fără să treceți prin 7 rezervări separate." },
      { title: "Flexibilitate pentru cereri speciale", text: "Catering, ghidaj la mănăstiri, transfer de la gara Pașcani — discutăm liber." }
    ],
    faqs: [
      {
        q: "Câte persoane încap în vila întreagă Vaias Aparts?",
        a: "Capacitatea optimă este 22 persoane, iar maximul este 26-28 cu paturi extensibile (canapele). Totul în 7 apartamente independente, fiecare cu baia și bucătăria proprie (sau bucătăria comună pentru Apt 7)."
      },
      {
        q: "Care este tariful pentru vila întreagă?",
        a: "Tariful pentru vila întreagă este personalizat în funcție de numărul de nopți, perioada anului și numărul de persoane. Pentru o ofertă exactă, contactați-ne pe WhatsApp +40 752 388 388 cu datele dvs. Răspundem în câteva ore."
      },
      {
        q: "Acceptați grupuri cu autocar?",
        a: "Da, curtea vilei permite parcarea unui autocar. Acceptăm cu drag grupuri de pelerini (parohii), grupuri de turism organizat, sau echipe corporate cu autocar."
      },
      {
        q: "Putem organiza catering / mese de grup la vilă?",
        a: "Da, putem coordona catering cu restaurantele partenere din zonă sau puteți folosi Bucătăria pentru Toți pentru a găti împreună. Pentru evenimente speciale (nuntă, botez), vă recomandăm restaurantele cu sală din zonă, în parteneriat cu noi."
      }
    ],
    nearby: ["Cetatea Neamțului (5 km)", "Mănăstirea Neamț (12 km)", "Mănăstirea Agapia (14 km)", "Mănăstirea Văratec (18 km)"],
    bookingPitch:
      "Pentru grupuri mai mari de 8 persoane, recomandăm rezervarea vilei întregi — preț mai bun decât apartamente individuale și logistică simplificată.",
    primaryCTA: "Solicită ofertă vilă întreagă",
    whatsappMessage:
      "Bună ziua! Suntem interesați să rezervăm întreaga vilă Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT]. Total adulți: [NR]. Total copii: [NR]. Vă rog să ne comunicați disponibilitatea și prețul total."
  },
  {
    slug: "cazare-diaspora-targu-neamt",
    hero: {
      eyebrow: "Bine ați venit acasă",
      title: "Pentru diaspora — un acasă în Moldova.",
      subtitle:
        "Vila Vaias Aparts vă așteaptă cu un apartament al vostru — pentru zilele când vă întoarceți la părinți, la mănăstiri, la rădăcini. Italian, English, German vorbit fluent.",
      image: VILLA_PHOTO_2
    },
    meta: {
      title: "Cazare diaspora Târgu Neamț — Vila Vaias Aparts | Apartamente boutique",
      description:
        "Cazare pentru diaspora în Târgu Neamț, Moldova. Vila Vaias Aparts — 7 apartamente boutique pentru zilele când vă întoarceți acasă. Engleză, italiană, germană.",
      keywords: [
        "cazare diaspora Neamt",
        "cazare romani Italia Moldova",
        "cazare romani Spania Moldova",
        "cazare diaspora Targu Neamt",
        "vacanta diaspora Romania",
        "cazare familie diaspora"
      ]
    },
    intro: {
      heading: "Pentru românii din străinătate — apartamentul vostru când vă întoarceți acasă",
      body: [
        "Știm cum este când părinții stau într-un apartament mic și veniți cu toată familia din străinătate pentru câteva săptămâni. Vila Vaias Aparts vă oferă un spațiu generos, propriu, la pas de centrul Târgu Neamț. Aveți unde să stați comod, fără să încărcați pe părinți, dar suficient de aproape pentru a-i vizita zilnic.",
        "Vorbim engleză, italiană și germană fluent — copiii voștri care au crescut în străinătate pot comunica liber. Acceptăm cu drag plata cu cardul (Visa, Mastercard) și emitem factură fiscală pentru orice rezervare. Tichetele de vacanță (Pluxee, Up, Edenred) — în curs de acceptare.",
        "Pentru sejururi mai lungi (1-2 săptămâni), aplicăm automat reducerea de 25% pentru 7+ nopți. Familia care gestionează vila este flexibilă cu programul de check-in și check-out pentru cei care vin pe zboruri târzii."
      ]
    },
    distance: "Ultracentral",
    drivingTime: "0 min",
    highlights: [
      { icon: "🌍", title: "Multilingv", text: "Engleză, italiană, germană, franceză — copiii voștri se înțeleg cu noi." },
      { icon: "💳", title: "Card acceptat", text: "Plata cu Visa/Mastercard. Factură fiscală emisă pentru orice rezervare." },
      { icon: "🛬", title: "Flexibilitate check-in", text: "Veniți pe zbor de noapte? Discutăm — vă ajutăm." },
      { icon: "👨‍👩‍👧‍👦", title: "Spațiu pentru toată familia", text: "Apartamente cu 2 dormitoare pentru copii, bunici și voi — toți confortabili." },
      { icon: "💰", title: "Reducere 25% pentru 7+ nopți", text: "Sejururi lungi sunt încurajate — exact ce vă trebuie pentru vacanța acasă." },
      { icon: "🤝", title: "Familie locală", text: "Vorbiți direct cu noi, nu cu un call center din alt oraș." }
    ],
    whyChoose: [
      { title: "Apartament propriu — nu îl deranjați pe părinți", text: "Aveți spațiu propriu, dar la 5 minute de oriunde locuiesc părinții voștri în Târgu Neamț." },
      { title: "Copiii voștri se simt acasă", text: "WiFi rapid, smart TV cu Netflix, bucătărie pentru gustări — atmosferă familiară." },
      { title: "Tot ce e românesc, la pas", text: "Piața locală, restaurante moldovenești, mănăstirile copilăriei voastre — totul aproape." },
      { title: "Pentru vacanțe lungi", text: "1-2 săptămâni la apartament cu reducere 25% — confort superior unei pensiuni." }
    ],
    faqs: [
      {
        q: "Pot plăti cu cardul de la banca din străinătate?",
        a: "Da, acceptăm carduri Visa și Mastercard emise de orice bancă din Uniunea Europeană sau internațional. Plata se face în RON la cursul BNR din ziua tranzacției."
      },
      {
        q: "Vorbiți engleză sau italiană?",
        a: "Da, echipa noastră vorbește română, engleză, italiană, germană și franceză. Copiii voștri care au crescut în străinătate pot comunica liber cu noi."
      },
      {
        q: "Care este reducerea pentru sejururi de 1-2 săptămâni?",
        a: "Pentru sejururi de 7 sau mai multe nopți aplicăm automat reducere de 25%. Pentru 4-6 nopți, reducere 15%. Pentru 2-3 nopți, reducere 10%."
      },
      {
        q: "Putem rezerva cu mai multe luni înainte?",
        a: "Da, recomandăm chiar — pentru vacanțele de Paște, august sau Crăciun, apartamentele se ocupă cu 3-6 luni înainte. Rezervarea se confirmă cu avans 30%."
      },
      {
        q: "Putem aduce copilașii și animalele de companie?",
        a: "Bineînțeles. Avem paturi extensibile pentru copii, iar animalele de companie sunt bine venite, fără cost suplimentar. Vă rugăm să ne spuneți la rezervare."
      }
    ],
    nearby: ["Centrul Târgu Neamț (1 km)", "Cetatea Neamțului (5 km)", "Mănăstirile Neamțului", "Aeroport Iași (90 km, 1.5 h)"],
    bookingPitch:
      "Pentru sejururi lungi (10+ zile), apartamentele cu 2 dormitoare oferă confortul unei case proprii. Reducere 25% automată pentru 7+ nopți.",
    primaryCTA: "Rezervă pentru vacanța acasă",
    whatsappMessage:
      "Hi! I'm a Romanian from abroad and I'd like to book Vila Vaias Aparts. Dates: [CHECK-IN] - [CHECK-OUT], [NR] adults, [NR] children. Please send availability and prices."
  }
];

export function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}

export const landingPageSlugs = landingPages.map((p) => p.slug);
