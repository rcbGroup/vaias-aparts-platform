/**
 * "Descoperă zona / Explore the area" — the local guide to the commune of
 * Vânători-Neamț and the Bison Land (Ținutul Zimbrului) ecodestination,
 * right next to Târgu Neamț.
 *
 * Content basis: the official Vânători-Neamț tourist map published by
 * OMD Vânători-Neamț (2026), cross-checked with the distances already used on
 * /zone-turistice and /ce-poti-face (lib/attractions.ts, lib/local-attractions.ts).
 * The map itself is copyrighted and is NOT reproduced — only the facts on it.
 * The map prints no distances; where a distance/time is shown here it comes from
 * the existing site data, otherwise it is intentionally omitted.
 *
 * Bilingual RO/EN. Other site languages fall back to EN.
 */

export type ExploreLang = "ro" | "en";
export type L = Record<ExploreLang, string>;

export const EXPLORE_PATH = "/exploreaza-zona";
export const EXPLORE_URL = `https://www.vaiasaparts.ro${EXPLORE_PATH}`;

export type ExplorePlace = {
  name: L;
  note: L;
  /** From Vaias Aparts — only where the site already publishes it. */
  distance?: string;
  drivingTime?: string;
  /** Internal link, if the place has its own page. */
  href?: string;
  featured?: boolean;
};

export type ExploreSection = {
  key: string;
  icon: string;
  eyebrow: L;
  title: L;
  intro: L;
  places: ExplorePlace[];
};

export const exploreHero = {
  eyebrow: { ro: "Descoperă zona", en: "Explore the area" } as L,
  title: {
    ro: "Ținutul Zimbrului, chiar lângă noi.",
    en: "Bison Land, right on our doorstep."
  } as L,
  subtitle: {
    ro: "Vânători-Neamț — parc natural, zimbri în libertate, mănăstiri și schituri ascunse în pădure, la câteva minute de Târgu Neamț. Ghidul nostru local, de la poarta Vaias Aparts.",
    en: "Vânători-Neamț: a natural park, free-roaming bison, monasteries and forest hermitages, a few minutes from Târgu Neamț. Our local guide, from the Vaias Aparts gate."
  } as L,
  image: "/attractions/vanatori-neamt.jpg"
};

export const exploreIntro: { eyebrow: L; title: L; body: L[] } = {
  eyebrow: { ro: "Unde suntem", en: "Where we are" },
  title: {
    ro: "O comună, un parc natural și singura ecodestinație din județul Neamț.",
    en: "One commune, one natural park and the only ecodestination in Neamț county."
  },
  body: [
    {
      ro: "Vaias Aparts este în Târgu Neamț, la marginea comunei Vânători-Neamț — stațiune turistică de interes local și parte a ecodestinației Ținutul Zimbrului, singura din județul Neamț. Cea mai mare parte a comunei este acoperită de Parcul Natural Vânători-Neamț: dealuri împădurite între văile râurilor Neamț (Ozana) și Nemțișor.",
      en: "Vaias Aparts is in Târgu Neamț, on the edge of the commune of Vânători-Neamț — a locally designated tourist resort and part of the Bison Land (Ținutul Zimbrului) ecodestination, the only one in Neamț county. Most of the commune lies inside the Vânători-Neamț Natural Park: forested hills between the valleys of the Neamț (Ozana) and Nemțișor rivers."
    },
    {
      ro: "Pe o rază de 20–35 de minute cu mașina găsești rezervația de zimbri, cea mai veche mănăstire din Moldova, cetatea lui Ștefan cel Mare, casa copilăriei lui Ion Creangă și zeci de schituri la care se ajunge numai prin pădure. Mai jos — tot ce merită văzut, organizat ca pe harta turistică oficială a comunei.",
      en: "Within a 20–35 minute drive you will find the bison reserve, the oldest monastery in Moldavia, Stephen the Great's citadel, Ion Creangă's childhood home and dozens of hermitages reached only through the forest. Below is everything worth seeing, organised the way the commune's official tourist map lays it out."
    }
  ]
};

export const exploreSections: ExploreSection[] = [
  {
    key: "natura",
    icon: "🦬",
    eyebrow: { ro: "Zimbri & natură", en: "Bison & nature" },
    title: { ro: "Parcul Natural Vânători-Neamț", en: "Vânători-Neamț Natural Park" },
    intro: {
      ro: "Păduri de fag și brad, poteci marcate, vârfuri de peste 1.000 m și singura turmă de zimbri din zonă. Parcul este administrat împreună cu Romsilva; respectă marcajele și regulile ariei protejate.",
      en: "Beech and fir forests, marked trails, peaks above 1,000 m and the only bison herd in the area. The park is managed together with Romsilva; follow the trail markings and the protected-area rules."
    },
    places: [
      {
        name: { ro: "Rezervația de Zimbri „Dragoș Vodă”", en: "“Dragoș Vodă” Bison Reserve" },
        note: {
          ro: "Zimbrul european, simbolul Moldovei medievale, văzut de aproape în pădure. Observatoare, potecă prin pădure, ideal pentru familii cu copii.",
          en: "The European bison, symbol of medieval Moldavia, seen up close in the forest. Viewing platforms and a forest path — ideal for families with children."
        },
        distance: "10 km",
        drivingTime: "15 min",
        featured: true
      },
      {
        name: { ro: "Centrul de Vizitare al Parcului Natural", en: "Natural Park Visitor Centre" },
        note: {
          ro: "Lângă rezervație, pe DN15B. Punct de plecare pentru trasee, informații despre parc și expoziție despre zimbri.",
          en: "Next to the reserve, on the DN15B road. Starting point for trails, park information and a bison exhibition."
        }
      },
      {
        name: { ro: "Trasee marcate și vârfuri", en: "Marked trails and peaks" },
        note: {
          ro: "Potecile marcate urcă spre Vârful Mare Sihlea (1.178 m), Vârful La Paltin (1.135 m), Vârful Chita Mică (1.061 m), Vârful Mestecănului (967 m), Vârful Mănăstirea Agapia (893 m) și Culmea Pleșului (872 m) — altitudini conform hărții oficiale. Pentru trasee lungi cere sfatul Centrului de Vizitare.",
          en: "Marked paths climb to Vârful Mare Sihlea (1,178 m), Vârful La Paltin (1,135 m), Vârful Chita Mică (1,061 m), Vârful Mestecănului (967 m), Vârful Mănăstirea Agapia (893 m) and Culmea Pleșului (872 m) — altitudes as printed on the official map. Ask the Visitor Centre before attempting the longer routes."
        }
      },
      {
        name: { ro: "Văile Neamț (Ozana), Nemțișor și Secu", en: "The Neamț (Ozana), Nemțișor and Secu valleys" },
        note: {
          ro: "Trei văi care structurează comuna: Ozana lui Creangă pe lângă Târgu Neamț, Nemțișorul spre Mănăstirea Neamț și Secul spre Secu și Sihăstria.",
          en: "Three valleys shape the commune: Creangă's Ozana past Târgu Neamț, the Nemțișor towards Neamț Monastery and the Secu towards Secu and Sihăstria."
        }
      }
    ]
  },
  {
    key: "manastiri",
    icon: "⛪",
    eyebrow: { ro: "Mănăstiri & schituri", en: "Monasteries & hermitages" },
    title: { ro: "Vatra monahală a Moldovei", en: "Moldavia's monastic heartland" },
    intro: {
      ro: "Trei mănăstiri mari pe teritoriul comunei, alte două la câțiva kilometri și o salbă de schituri în pădure. Ținută decentă la intrare; programul slujbelor se confirmă la fiecare mănăstire.",
      en: "Three major monasteries inside the commune, two more a few kilometres away and a string of hermitages in the forest. Modest dress is expected; service times are confirmed at each monastery."
    },
    places: [
      {
        name: { ro: "Mănăstirea Neamț", en: "Neamț Monastery" },
        note: {
          ro: "Cea mai veche și mai importantă mănăstire din Moldova, terminată de Ștefan cel Mare în 1497. Alături: Biserica Sfântului Ioan Iacob de la Neamț, Schitul Vovidenia și Schitul Pocrov.",
          en: "The oldest and most important monastery in Moldavia, completed by Stephen the Great in 1497. Nearby: the Church of Saint John Jacob of Neamț, Vovidenia Hermitage and Pocrov Hermitage."
        },
        distance: "12 km",
        drivingTime: "18 min",
        featured: true
      },
      {
        name: { ro: "Mănăstirea Secu", en: "Secu Monastery" },
        note: {
          ro: "Mănăstire fortificată din 1602, ascunsă într-o poiană pe valea Secului, pe drumul județean 157F.",
          en: "A fortified monastery from 1602, hidden in a clearing on the Secu valley, along county road 157F."
        },
        distance: "20 km",
        drivingTime: "30 min"
      },
      {
        name: { ro: "Mănăstirea Sihăstria", en: "Sihăstria Monastery" },
        note: {
          ro: "Vatra părintelui Cleopa. De aici pleacă poteca prin pădure spre Schitul Sihla și Peștera Sfintei Cuvioase Teodora, iar în apropiere este Schitul Sfântul Daniil Sihastru.",
          en: "Home of Father Cleopa. From here a forest path leads to Sihla Hermitage and the Cave of Saint Theodora, with Saint Daniel the Hermit's hermitage nearby."
        },
        distance: "22 km",
        drivingTime: "35 min"
      },
      {
        name: { ro: "Mănăstirea Agapia și Agapia Veche", en: "Agapia Monastery and Agapia Veche" },
        note: {
          ro: "Frescele lui Nicolae Grigorescu, casele albe ale măicuțelor și, mai sus în pădure, Schitul Agapia Veche.",
          en: "Nicolae Grigorescu's frescoes, the nuns' white houses and, higher up in the forest, the Agapia Veche hermitage."
        },
        distance: "10 km",
        drivingTime: "15 min"
      },
      {
        name: { ro: "Mănăstirea Văratec", en: "Văratec Monastery" },
        note: {
          ro: "Cea mai mare mănăstire de maici din România, la capătul drumului 15C spre sud, lângă Pădurea de Argint.",
          en: "Romania's largest convent, at the southern end of road 15C, next to the Silver Forest (Pădurea de Argint)."
        },
        distance: "14 km",
        drivingTime: "20 min"
      },
      {
        name: { ro: "Schiturile din pădure", en: "Forest hermitages" },
        note: {
          ro: "Icoana Veche, Icoana Nouă, Poiana Cerbului, Cărbuna, Braniște, Dobru, Nifon, Poiana lui Ioan și Sfânta Cruce — schituri mici, la care se ajunge pe drumuri forestiere sau poteci. Verifică accesul înainte de drum.",
          en: "Icoana Veche, Icoana Nouă, Poiana Cerbului, Cărbuna, Braniște, Dobru, Nifon, Poiana lui Ioan and Sfânta Cruce — small hermitages reached by forest tracks or footpaths. Check access before setting out."
        }
      }
    ]
  },
  {
    key: "cultura",
    icon: "🏛️",
    eyebrow: { ro: "Istorie & cultură", en: "History & culture" },
    title: { ro: "Cetăți, muzee și case memoriale", en: "Citadels, museums and memorial houses" },
    intro: {
      ro: "Ștefan cel Mare, Ion Creangă, Mihail Sadoveanu, Alexandru Vlahuță — toți au lăsat urme la câțiva kilometri de vilă.",
      en: "Stephen the Great, Ion Creangă, Mihail Sadoveanu, Alexandru Vlahuță — all left their mark a few kilometres from the villa."
    },
    places: [
      {
        name: { ro: "Cetatea Neamț", en: "Neamț Citadel" },
        note: {
          ro: "Cetatea medievală a lui Ștefan cel Mare, pe culmea de deasupra orașului. Pod mobil, donjon, capelă și vedere peste toată valea Ozanei.",
          en: "Stephen the Great's medieval citadel on the ridge above the town. Drawbridge, keep, chapel and a view over the whole Ozana valley."
        },
        distance: "5 km",
        drivingTime: "10 min",
        featured: true
      },
      {
        name: { ro: "Casa și Muzeul Memorial „Ion Creangă”, Humulești", en: "Ion Creangă Memorial House and Museum, Humulești" },
        note: {
          ro: "Casa copilăriei din „Amintiri din copilărie”, în satul Humulești, chiar la ieșirea din Târgu Neamț.",
          en: "The childhood home from “Memories of Childhood”, in the village of Humulești, right on the edge of Târgu Neamț."
        },
        drivingTime: "7 min"
      },
      {
        name: { ro: "Muzeul Memorial „Mihail Sadoveanu”, Vovidenia", en: "Mihail Sadoveanu Memorial Museum, Vovidenia" },
        note: {
          ro: "Casa Visarion Puiu, lângă Mănăstirea Neamț, unde Sadoveanu și-a petrecut ultimii ani.",
          en: "The Visarion Puiu house next to Neamț Monastery, where Sadoveanu spent his final years."
        }
      },
      {
        name: { ro: "Muzeul etnografic „Vasile Găman”, Lunca", en: "Vasile Găman Ethnographic Museum, Lunca" },
        note: {
          ro: "Colecție de unelte, port popular și obiecte țărănești din satele comunei, în Lunca, pe DN15B.",
          en: "A collection of tools, folk costume and peasant objects from the commune's villages, in Lunca on the DN15B road."
        }
      },
      {
        name: { ro: "Casa Memorială „Alexandru Vlahuță”, Agapia", en: "Alexandru Vlahuță Memorial House, Agapia" },
        note: {
          ro: "Casa scriitorului, în incinta Mănăstirii Agapia.",
          en: "The writer's house, inside the grounds of Agapia Monastery."
        }
      },
      {
        name: { ro: "Monumentul Eroilor, Nemțișor", en: "Heroes' Monument, Nemțișor" },
        note: {
          ro: "Monument dedicat eroilor satului Nemțișor, pe drumul comunal 172 spre Mănăstirea Neamț.",
          en: "A monument to the village heroes of Nemțișor, on rural road 172 towards Neamț Monastery."
        }
      }
    ]
  },
  {
    key: "mancare",
    icon: "🍽️",
    eyebrow: { ro: "Unde mănânci", en: "Where to eat" },
    title: { ro: "Bucătărie moldovenească, aproape de pădure", en: "Moldavian cooking, close to the forest" },
    intro: {
      ro: "Harta turistică oficială a comunei listează trei restaurante și câteva puncte gastronomice locale. Primul pe lista noastră este, firește, al nostru.",
      en: "The commune's official tourist map lists three restaurants and a few local food venues. First on our list is, naturally, our own."
    },
    places: [
      {
        name: { ro: "Han Rustic", en: "Han Rustic" },
        note: {
          ro: "Restaurantul familiei Vaias, în comuna Vânători-Neamț, pe DN15B — listat la „Restaurante” pe harta turistică oficială. Sarmale, mămăligă, tocăniță, plăcinte și vinuri de podgorie. Relansare în curând; rezervările se fac prin noi.",
          en: "The Vaias family restaurant in the commune of Vânători-Neamț, on the DN15B road — listed under “Where to eat” on the official tourist map. Sarmale, mămăligă, stews, pies and estate wines. Relaunching soon; reservations through us."
        },
        href: "/han-rustic",
        featured: true
      },
      {
        name: { ro: "Păstrăvăriile „La Frunză” și Ursu", en: "“La Frunză” and Ursu trout farms" },
        note: {
          ro: "Păstrăv proaspăt, la păstrăvăriile marcate pe hartă în pădurea parcului.",
          en: "Fresh trout at the two trout farms marked on the map inside the park forest."
        }
      },
      {
        name: { ro: "Puncte gastronomice locale", en: "Local food venues" },
        note: {
          ro: "La Nuța și Ionică, La Moșie Nemțișor și Cabana La Dogaru — gospodării și cabane cu mâncare locală, marcate pe harta oficială.",
          en: "La Nuța și Ionică, La Moșie Nemțișor and Cabana La Dogaru — farmsteads and cabins serving local food, marked on the official map."
        }
      }
    ]
  }
];

export type ExploreItinerary = { title: L; duration: L; steps: L[] };

export const exploreItineraries: { eyebrow: L; title: L; subtitle: L; items: ExploreItinerary[] } = {
  eyebrow: { ro: "Jumătăți de zi", en: "Half-day plans" },
  title: { ro: "Trei drumuri scurte, din poarta noastră.", en: "Three short trips, from our gate." },
  subtitle: {
    ro: "Pentru excursii de o zi întreagă — Ceahlău, Cheile Bicazului, Lacul Roșu — vezi pagina Zone turistice.",
    en: "For full-day trips — Ceahlău, the Bicaz Gorge, the Red Lake — see the Attractions page."
  },
  items: [
    {
      title: { ro: "Dimineața zimbrilor", en: "Bison morning" },
      duration: { ro: "circa 4 ore", en: "about 4 hours" },
      steps: [
        { ro: "Rezervația de Zimbri „Dragoș Vodă” — devreme, când zimbrii sunt la hrănitori", en: "“Dragoș Vodă” Bison Reserve — early, when the bison are at the feeders" },
        { ro: "Centrul de Vizitare al Parcului", en: "Park Visitor Centre" },
        { ro: "Mănăstirea Neamț și Muzeul Sadoveanu", en: "Neamț Monastery and the Sadoveanu Museum" },
        { ro: "Prânz moldovenesc la Han Rustic", en: "Moldavian lunch at Han Rustic" }
      ]
    },
    {
      title: { ro: "Pelerinaj pe Valea Secului", en: "Pilgrimage up the Secu valley" },
      duration: { ro: "circa 5 ore", en: "about 5 hours" },
      steps: [
        { ro: "Mănăstirea Secu, pe drumul 157F", en: "Secu Monastery, on road 157F" },
        { ro: "Mănăstirea Sihăstria — mormântul părintelui Cleopa", en: "Sihăstria Monastery — Father Cleopa's grave" },
        { ro: "Pe jos spre Schitul Sihla și Peștera Sfintei Teodora", en: "On foot to Sihla Hermitage and Saint Theodora's Cave" },
        { ro: "Întoarcere prin Agapia", en: "Return via Agapia" }
      ]
    },
    {
      title: { ro: "Creangă și Cetatea", en: "Creangă and the Citadel" },
      duration: { ro: "circa 3 ore", en: "about 3 hours" },
      steps: [
        { ro: "Casa Memorială Ion Creangă, Humulești", en: "Ion Creangă Memorial House, Humulești" },
        { ro: "Cetatea Neamț", en: "Neamț Citadel" },
        { ro: "Muzeul etnografic „Vasile Găman”, Lunca", en: "Vasile Găman Ethnographic Museum, Lunca" },
        { ro: "Cafea înapoi la Vaias Aparts", en: "Coffee back at Vaias Aparts" }
      ]
    }
  ]
};

export type PracticalItem = { label: L; value: L; href?: string };

export const explorePractical: { eyebrow: L; title: L; items: PracticalItem[] } = {
  eyebrow: { ro: "Util", en: "Useful" },
  title: { ro: "Informații practice", en: "Practical information" },
  items: [
    {
      label: { ro: "Urgențe", en: "Emergencies" },
      value: { ro: "112 — poliție, pompieri, ambulanță", en: "112 — police, fire, ambulance" },
      href: "tel:112"
    },
    {
      label: { ro: "Primăria Vânători-Neamț", en: "Vânători-Neamț Town Hall" },
      value: { ro: "0233 251 001", en: "+40 233 251 001" },
      href: "tel:+40233251001"
    },
    {
      label: { ro: "Administrația Parcului Natural · Jandarmeria Montană", en: "Natural Park Administration · Mountain Gendarmerie" },
      value: { ro: "0233 206 001", en: "+40 233 206 001" },
      href: "tel:+40233206001"
    },
    {
      label: { ro: "În centrul comunei", en: "In the commune centre" },
      value: {
        ro: "Farmacie, cabinet medical, bancomat și magazin local, pe DN15B, în Vânători-Neamț.",
        en: "Pharmacy, medical clinic, cash machine and a local shop on the DN15B road in Vânători-Neamț."
      }
    },
    {
      label: { ro: "Drumuri", en: "Roads" },
      value: {
        ro: "DN15B spre Mănăstirea Neamț și Poiana Teiului · DN15C spre Piatra Neamț sau Fălticeni · DJ157F spre Secu și Sihăstria · DC172 spre Nemțișor.",
        en: "DN15B towards Neamț Monastery and Poiana Teiului · DN15C towards Piatra Neamț or Fălticeni · DJ157F towards Secu and Sihăstria · DC172 towards Nemțișor."
      }
    },
    {
      label: { ro: "Cum ajungi la noi", en: "Getting to us" },
      value: { ro: "Indicații, aeroporturi și parcare pe pagina Cum ajungi.", en: "Directions, airports and parking on the Getting there page." },
      href: "/cum-ajungi"
    }
  ]
};

export const exploreSource: L = {
  ro: "Informații preluate din Harta turistică oficială Vânători-Neamț (OMD Vânători-Neamț, 2026) și verificate cu datele noastre. Distanțele și timpii sunt orientativi, din Vaias Aparts, Str. Sfântul Lazăr nr. 1, Târgu Neamț.",
  en: "Information drawn from the official Vânători-Neamț tourist map (OMD Vânători-Neamț, 2026) and checked against our own data. Distances and times are indicative, from Vaias Aparts, Str. Sfântul Lazăr nr. 1, Târgu Neamț."
};

export const exploreCta: { title: L; subtitle: L; primary: L; secondary: L } = {
  title: { ro: "Spune-ne ce te atrage.", en: "Tell us what draws you." },
  subtitle: {
    ro: "Îți rezervăm masa la Han Rustic, îți aranjăm un ghid pentru mănăstiri sau îți facem un plan pe zile.",
    en: "We will book your table at Han Rustic, arrange a monastery guide or plan your days for you."
  },
  primary: { ro: "Scrie-ne pe WhatsApp", en: "Message us on WhatsApp" },
  secondary: { ro: "Vezi apartamentele", en: "See the apartments" }
};

export const exploreCrossLinks: { label: L; href: string }[] = [
  { label: { ro: "Ce poți face pe jos, din vilă", en: "Things to do on foot from the villa" }, href: "/ce-poti-face" },
  { label: { ro: "Zone turistice la o oră", en: "Attractions within an hour" }, href: "/zone-turistice" },
  { label: { ro: "Han Rustic", en: "Han Rustic" }, href: "/han-rustic" },
  { label: { ro: "Pachete pentru pelerini", en: "Pilgrim packages" }, href: "/pelerini" }
];

export const exploreUi = {
  from: { ro: "din vilă", en: "from the villa" } as L,
  withCar: { ro: "cu mașina", en: "by car" } as L,
  ourPick: { ro: "Recomandarea noastră", en: "Our pick" } as L,
  more: { ro: "Mai departe", en: "Further afield" } as L,
  sourceLabel: { ro: "Sursă", en: "Source" } as L
};
