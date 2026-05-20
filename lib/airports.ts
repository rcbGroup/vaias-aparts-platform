// Distances and drive times are road-distance estimates from
// Vila Vaias Aparts, Strada Sfântul Lazăr nr. 1, Târgu Neamț (47.2014, 26.3656)
// Lat/lng of each airport is used to plot the SVG regional map.

export type Country =
  | "Romania"
  | "Hungary"
  | "Moldova"
  | "Ukraine"
  | "Serbia"
  | "Bulgaria";

export type Region =
  | "Moldova"
  | "Transilvania"
  | "Muntenia"
  | "Banat"
  | "Crișana"
  | "Maramureș"
  | "Dobrogea"
  | "Bucovina"
  | "Internațional";

export type Airport = {
  slug: string;
  iata: string;
  name: string;
  shortName: string;
  city: string;
  country: Country;
  region: Region;
  lat: number;
  lng: number;
  distanceKm: number;
  driveTime: string; // "1h 15min"
  closest?: boolean; // featured as one of the 3 closest
  carriers: string[];
  routes: string[]; // sample cities/countries served
  transport: {
    label: string;
    description: string;
  }[];
  summary: string;
};

export const VILA_VAIAS_COORDS = { lat: 47.2014, lng: 26.3656 } as const;

export const airports: Airport[] = [
  // ─── ROMANIA — Moldova / Bucovina (closest) ───
  {
    slug: "bacau-bcm",
    iata: "BCM",
    name: "Aeroportul Internațional „George Enescu” Bacău",
    shortName: "Bacău",
    city: "Bacău",
    country: "Romania",
    region: "Moldova",
    lat: 46.5219,
    lng: 26.9101,
    distanceKm: 75,
    driveTime: "1h 15min",
    closest: true,
    carriers: ["Wizz Air", "Ryanair", "TAROM"],
    routes: [
      "Londra Luton (UK)",
      "Dublin (IE)",
      "Roma Fiumicino (IT)",
      "Milano Bergamo (IT)",
      "Bologna (IT)",
      "Torino (IT)",
      "Madrid (ES)",
      "Barcelona (ES)",
      "Paris Beauvais (FR)",
      "Bruxelles Charleroi (BE)",
      "Köln (DE)",
      "Dortmund (DE)",
      "Memmingen / München (DE)",
      "Tel Aviv (IL) — sezonier"
    ],
    transport: [
      {
        label: "Mașină proprie sau rent-a-car",
        description:
          "DN15D direct spre Târgu Neamț — 1h 15min, fără autostradă. Avis, Hertz, Sixt și Autonom au birouri în terminal."
      },
      {
        label: "Transfer privat Vaias",
        description:
          "La cerere putem trimite șofer la aeroport. Tarif fix, fără surprize. Cere ofertă pe WhatsApp +40 752 388 388."
      },
      {
        label: "Taxi / Bolt",
        description:
          "Bolt funcționează în Bacău. Tarif estimativ Aeroport → Târgu Neamț: 250–320 lei."
      }
    ],
    summary:
      "Al doilea aeroport ca apropiere — 75 km. Hub principal Wizz Air și Ryanair pentru Moldova: zboruri directe din Londra, Dublin, Roma, Milano, Madrid, Bruxelles, Köln și Tel Aviv."
  },
  {
    slug: "suceava-scv",
    iata: "SCV",
    name: "Aeroportul Internațional „Ștefan cel Mare” Suceava",
    shortName: "Suceava",
    city: "Suceava",
    country: "Romania",
    region: "Bucovina",
    lat: 47.6875,
    lng: 26.354,
    distanceKm: 60,
    driveTime: "1h 10min",
    closest: true,
    carriers: ["Wizz Air", "TAROM", "HiSky"],
    routes: [
      "Londra Luton (UK)",
      "Dublin (IE)",
      "Milano Bergamo (IT)",
      "Roma Ciampino (IT)",
      "Torino (IT)",
      "Bologna (IT)",
      "Madrid (ES)",
      "Barcelona (ES)",
      "Paris Beauvais (FR)",
      "München (DE)",
      "Dortmund (DE)",
      "Tel Aviv (IL)",
      "București Otopeni (RO)"
    ],
    transport: [
      {
        label: "Mașină / rent-a-car",
        description:
          "E85 + DN2 spre Târgu Neamț, ~1h 10min. Rent-a-car: Autonom, Avis, Klass Wagen — birouri în terminal."
      },
      {
        label: "Transfer privat Vaias",
        description:
          "Putem aranja transfer dedicat Suceava → Vaias Aparts. WhatsApp +40 752 388 388 pentru ofertă fermă."
      },
      {
        label: "Tren / autobuz",
        description:
          "De la Suceava există microbuze regulate spre Târgu Neamț (~1h 45min) cu schimbare la Fălticeni sau Pașcani."
      }
    ],
    summary:
      "Aeroportul Bucovinei — cel mai apropiat de Vaias, doar 60 km. Hub Wizz Air și poarta spre mănăstirile pictate (Voroneț, Sucevița, Moldovița) — toate într-un singur city break."
  },
  {
    slug: "iasi-ias",
    iata: "IAS",
    name: "Aeroportul Internațional Iași",
    shortName: "Iași",
    city: "Iași",
    country: "Romania",
    region: "Moldova",
    lat: 47.1786,
    lng: 27.6206,
    distanceKm: 130,
    driveTime: "2h 15min",
    closest: true,
    carriers: ["Wizz Air", "TAROM", "HiSky", "Lufthansa", "Austrian Airlines"],
    routes: [
      "Londra Luton & Stansted (UK)",
      "Dublin (IE)",
      "Milano Malpensa & Bergamo (IT)",
      "Roma Fiumicino (IT)",
      "Bologna (IT)",
      "Veneția Treviso (IT)",
      "Madrid (ES)",
      "Barcelona (ES)",
      "Paris CDG & Beauvais (FR)",
      "Frankfurt (DE)",
      "München (DE)",
      "Viena (AT)",
      "Bruxelles (BE)",
      "Tel Aviv (IL)",
      "Antalya (TR) — sezonier",
      "Larnaca (CY)",
      "Chișinău (MD)",
      "Istanbul (TR)"
    ],
    transport: [
      {
        label: "Mașină / rent-a-car",
        description:
          "DN28 + DN15B prin Pașcani — 2h 15min. În terminal: Autonom, Avis, Hertz, Sixt, Klass Wagen, Promotor."
      },
      {
        label: "Transfer privat",
        description:
          "Pentru oaspeții Vaias aranjăm transfer cu șofer vorbitor de engleză. Cere ofertă pe WhatsApp."
      },
      {
        label: "Tren / autobuz",
        description:
          "Tren Iași → Pașcani (1h), apoi microbuz Pașcani → Târgu Neamț (45 min). Total ~3h 30min cu transport public."
      }
    ],
    summary:
      "Cel mai mare aeroport din Moldova — cele mai multe destinații internaționale. Hub Lufthansa/Austrian + low-cost Wizz și Ryanair. 130 km de Vaias, ideal pentru zboruri din Frankfurt, Viena, Tel Aviv."
  },

  // ─── ROMANIA — Muntenia ───
  {
    slug: "bucuresti-otopeni-otp",
    iata: "OTP",
    name: "Aeroportul Internațional „Henri Coandă” București (Otopeni)",
    shortName: "București Otopeni",
    city: "București",
    country: "Romania",
    region: "Muntenia",
    lat: 44.5722,
    lng: 26.1022,
    distanceKm: 370,
    driveTime: "5h 30min",
    carriers: [
      "TAROM",
      "Wizz Air",
      "Ryanair",
      "Lufthansa",
      "Air France",
      "KLM",
      "British Airways",
      "Turkish Airlines",
      "Emirates",
      "Qatar Airways"
    ],
    routes: [
      "Hub internațional — peste 100 destinații",
      "Toate capitalele europene",
      "Dubai, Doha, Istanbul, Tel Aviv",
      "Conexiuni intercontinentale prin DXB, DOH, IST",
      "Zboruri interne: Cluj, Iași, Timișoara, Sibiu, Bacău, Suceava"
    ],
    transport: [
      {
        label: "Zbor intern de conexiune",
        description:
          "TAROM și Wizz operează zboruri Otopeni → Bacău (BCM) și Otopeni → Iași (IAS) zilnic. Cea mai rapidă variantă pentru a ajunge la Vaias."
      },
      {
        label: "Mașină / rent-a-car",
        description:
          "A3 + DN2 prin Buzău/Focșani/Bacău — 5h 30min. Drum lung dar simplu. Birouri rent-a-car: Avis, Hertz, Sixt, Europcar, Autonom în P1."
      },
      {
        label: "Tren CFR + microbuz",
        description:
          "Otopeni → Gara de Nord (tren, 20 min) → Bacău (4h cu IR) → microbuz Târgu Neamț (1h 30min). Total ~7–8h."
      }
    ],
    summary:
      "Cel mai mare aeroport din România. Recomandat doar dacă găsești tarif foarte bun sau ai conexiune intercontinentală — apoi cel mai rapid e zbor intern spre BCM/IAS sau mașină 5h 30min."
  },

  // ─── ROMANIA — Transilvania ───
  {
    slug: "cluj-napoca-clj",
    iata: "CLJ",
    name: "Aeroportul Internațional „Avram Iancu” Cluj-Napoca",
    shortName: "Cluj-Napoca",
    city: "Cluj-Napoca",
    country: "Romania",
    region: "Transilvania",
    lat: 46.7853,
    lng: 23.6862,
    distanceKm: 305,
    driveTime: "5h 30min",
    carriers: [
      "Wizz Air",
      "Ryanair",
      "TAROM",
      "Lufthansa",
      "Austrian Airlines",
      "KLM",
      "Turkish Airlines"
    ],
    routes: [
      "Londra Luton (UK)",
      "Dublin (IE)",
      "Milano, Roma, Bologna, Veneția (IT)",
      "Madrid, Barcelona, Valencia (ES)",
      "Paris CDG & Beauvais (FR)",
      "Frankfurt, München, Dortmund (DE)",
      "Viena (AT)",
      "Amsterdam (NL)",
      "Bruxelles (BE)",
      "Tel Aviv (IL)",
      "Istanbul (TR)",
      "Antalya (TR) — sezonier"
    ],
    transport: [
      {
        label: "Mașină / rent-a-car",
        description:
          "DN15 prin Târgu Mureș + Bicaz — 5h 30min printr-o priveliște superbă (Cheile Bicazului pe drum). Avis, Hertz, Sixt, Autonom în terminal."
      },
      {
        label: "Zbor de conexiune",
        description:
          "TAROM operează Cluj → București → Iași sau Bacău. Adesea mai rapid decât drumul cu mașina."
      },
      {
        label: "Tren CFR",
        description:
          "Cluj-Napoca → Suceava (cu schimbare) ~9–10h. Apoi microbuz Suceava → Târgu Neamț."
      }
    ],
    summary:
      "Cel mai mare aeroport din Transilvania, hub Wizz Air. Bună variantă dacă vrei să combini Moldova + Transilvania într-un singur traseu auto cu oprire prin Bicaz."
  },
  {
    slug: "targu-mures-tgm",
    iata: "TGM",
    name: "Aeroportul „Transilvania” Târgu Mureș",
    shortName: "Târgu Mureș",
    city: "Târgu Mureș",
    country: "Romania",
    region: "Transilvania",
    lat: 46.4677,
    lng: 24.4128,
    distanceKm: 260,
    driveTime: "4h 30min",
    carriers: ["Wizz Air", "HiSky"],
    routes: [
      "Londra Luton (UK)",
      "Dortmund (DE)",
      "Budapesta (HU)",
      "Memmingen (DE)",
      "Madrid (ES) — sezonier"
    ],
    transport: [
      {
        label: "Mașină",
        description:
          "DN15 + DN15B prin Topliţa, Borsec, Vatra Dornei — 4h 30min. Drum spectaculos prin munți."
      },
      {
        label: "Rent-a-car",
        description: "Autonom, Avis, Hertz și Sixt — birouri direct în terminal."
      }
    ],
    summary:
      "Aeroport mic, zboruri Wizz Air. Drumul spre Vaias trece prin Borsec și Vatra Dornei — splendid în orice anotimp."
  },
  {
    slug: "sibiu-sbz",
    iata: "SBZ",
    name: "Aeroportul Internațional Sibiu",
    shortName: "Sibiu",
    city: "Sibiu",
    country: "Romania",
    region: "Transilvania",
    lat: 45.7956,
    lng: 24.0913,
    distanceKm: 330,
    driveTime: "5h 30min",
    carriers: [
      "Lufthansa",
      "Austrian Airlines",
      "Wizz Air",
      "Ryanair",
      "TAROM",
      "Eurowings"
    ],
    routes: [
      "München (DE)",
      "Frankfurt (DE)",
      "Stuttgart (DE)",
      "Köln (DE)",
      "Düsseldorf (DE)",
      "Viena (AT)",
      "Londra Luton (UK)",
      "Madrid (ES)",
      "Roma, Milano (IT)",
      "Memmingen (DE)"
    ],
    transport: [
      {
        label: "Mașină",
        description:
          "DN1 + DN15 prin Brașov + Bicaz — 5h 30min. Rent-a-car în terminal (Avis, Hertz, Autonom)."
      },
      {
        label: "Zbor de conexiune",
        description:
          "Lufthansa operează SBZ → MUC → IAS sau via FRA. Pentru turiști din Germania, foarte bună variantă."
      }
    ],
    summary:
      "Hub puternic Lufthansa cu zboruri din 5 orașe germane. Recomandat pentru oaspeții din Germania, Austria și Elveția — apoi mașină prin Brașov + Cheile Bicazului."
  },

  // ─── ROMANIA — Banat & Crișana ───
  {
    slug: "timisoara-tsr",
    iata: "TSR",
    name: "Aeroportul Internațional „Traian Vuia” Timișoara",
    shortName: "Timișoara",
    city: "Timișoara",
    country: "Romania",
    region: "Banat",
    lat: 45.8099,
    lng: 21.3375,
    distanceKm: 620,
    driveTime: "9h 0min",
    carriers: [
      "Wizz Air",
      "Ryanair",
      "TAROM",
      "Lufthansa",
      "Austrian Airlines",
      "Turkish Airlines",
      "AnimaWings"
    ],
    routes: [
      "Londra Luton (UK)",
      "Dublin (IE)",
      "Milano, Roma, Bologna, Veneția (IT)",
      "Madrid, Barcelona, Valencia (ES)",
      "Paris Beauvais (FR)",
      "Frankfurt, München, Dortmund (DE)",
      "Viena (AT)",
      "Bruxelles Charleroi (BE)",
      "Eindhoven (NL)",
      "Istanbul (TR)"
    ],
    transport: [
      {
        label: "Zbor de conexiune",
        description:
          "Distanță foarte mare cu mașina. Recomandăm zbor de conexiune TSR → OTP → IAS sau BCM."
      },
      {
        label: "Mașină",
        description:
          "Doar dacă vrei să faci road-trip 2 zile prin Sibiu, Brașov, Cheile Bicazului. Altfel zborul intern e mai eficient."
      }
    ],
    summary:
      "Aeroport mare în vestul țării. Recomandăm conexiune intern spre Bacău sau Iași — drumul cu mașina este 620 km / 9h."
  },
  {
    slug: "oradea-omr",
    iata: "OMR",
    name: "Aeroportul Internațional Oradea",
    shortName: "Oradea",
    city: "Oradea",
    country: "Romania",
    region: "Crișana",
    lat: 47.0252,
    lng: 21.9025,
    distanceKm: 590,
    driveTime: "9h 0min",
    carriers: ["Wizz Air", "Ryanair"],
    routes: [
      "Londra Luton (UK)",
      "Milano Bergamo (IT)",
      "Roma Ciampino (IT)",
      "Madrid (ES)",
      "Köln (DE)",
      "Dortmund (DE)"
    ],
    transport: [
      {
        label: "Zbor de conexiune",
        description:
          "Drum cu mașina foarte lung. Caută conexiune Oradea → București sau Cluj → Iași/Bacău."
      }
    ],
    summary:
      "Aeroport în nord-vestul țării, focus pe Italia și UK. Distanța mare face zborul de conexiune varianta naturală."
  },
  {
    slug: "arad-arw",
    iata: "ARW",
    name: "Aeroportul Internațional Arad",
    shortName: "Arad",
    city: "Arad",
    country: "Romania",
    region: "Banat",
    lat: 46.1766,
    lng: 21.262,
    distanceKm: 610,
    driveTime: "9h 0min",
    carriers: ["Operațiuni charter și cargo"],
    routes: ["Charter sezonier", "Operațiuni școlare de aviație"],
    transport: [
      {
        label: "Recomandare",
        description:
          "Folosește Timișoara (TSR) la 50 km — mult mai multe zboruri comerciale."
      }
    ],
    summary:
      "Trafic comercial regulat limitat. Pentru oaspeții din vest, alege Timișoara (TSR), 50 km mai aproape de Vaias."
  },

  // ─── ROMANIA — Maramureș ───
  {
    slug: "satu-mare-suj",
    iata: "SUJ",
    name: "Aeroportul Internațional Satu Mare",
    shortName: "Satu Mare",
    city: "Satu Mare",
    country: "Romania",
    region: "Maramureș",
    lat: 47.7033,
    lng: 22.8856,
    distanceKm: 520,
    driveTime: "8h 0min",
    carriers: ["Wizz Air"],
    routes: ["Londra Luton (UK)", "Memmingen (DE) — sezonier"],
    transport: [
      {
        label: "Mașină",
        description:
          "Drum lung peste Carpați (Maramureș → Suceava → Târgu Neamț). 8 ore."
      }
    ],
    summary:
      "Aeroport mic, frecvențe limitate. Wizz operează cursa Londra → Satu Mare. Pentru a ajunge la Vaias, calea cea mai bună rămâne BCM, IAS sau SCV."
  },
  {
    slug: "baia-mare-bay",
    iata: "BAY",
    name: "Aeroportul Internațional Maramureș Baia Mare",
    shortName: "Baia Mare",
    city: "Baia Mare",
    country: "Romania",
    region: "Maramureș",
    lat: 47.6583,
    lng: 23.47,
    distanceKm: 440,
    driveTime: "7h 0min",
    carriers: ["TAROM (sezonier)", "Charter ocazional"],
    routes: ["București Otopeni (intern)"],
    transport: [
      {
        label: "Recomandare",
        description:
          "Aeroport regional cu trafic redus. Pentru un zbor sigur, alege Cluj (CLJ) sau Suceava (SCV)."
      }
    ],
    summary:
      "Aeroport mic, trafic comercial limitat. Cluj-Napoca este la 130 km cu zboruri zilnice."
  },

  // ─── ROMANIA — Oltenia ───
  {
    slug: "craiova-cra",
    iata: "CRA",
    name: "Aeroportul Internațional Craiova",
    shortName: "Craiova",
    city: "Craiova",
    country: "Romania",
    region: "Muntenia",
    lat: 44.3181,
    lng: 23.8886,
    distanceKm: 510,
    driveTime: "8h 0min",
    carriers: ["Wizz Air", "Ryanair"],
    routes: [
      "Londra Luton (UK)",
      "Milano Bergamo, Bologna (IT)",
      "Roma Ciampino (IT)",
      "Madrid (ES)",
      "Köln (DE)",
      "Dortmund (DE)",
      "Bruxelles Charleroi (BE)"
    ],
    transport: [
      {
        label: "Recomandare",
        description:
          "Distanță mare (510 km). Caută conexiune CRA → OTP → IAS sau BCM."
      }
    ],
    summary:
      "Aeroport puternic în sud-vestul țării. Pentru drum spre Vaias, conexiunea aerianã prin București e cea mai rapidă."
  },

  // ─── ROMANIA — Dobrogea ───
  {
    slug: "constanta-cnd",
    iata: "CND",
    name: "Aeroportul Internațional „Mihail Kogălniceanu” Constanța",
    shortName: "Constanța",
    city: "Constanța",
    country: "Romania",
    region: "Dobrogea",
    lat: 44.3622,
    lng: 28.4883,
    distanceKm: 480,
    driveTime: "6h 30min",
    carriers: ["TAROM", "Wizz Air", "Charter sezonier"],
    routes: [
      "București (intern)",
      "Londra Luton — sezonier",
      "Roma — sezonier",
      "Numeroase charter-uri estivale spre/dinspre litoral"
    ],
    transport: [
      {
        label: "Mașină",
        description:
          "A2 + DN2A + DN2 — 6h 30min. Drum direct prin București ocolitor."
      },
      {
        label: "Recomandare",
        description:
          "Bun ca punct de plecare după o săptămână la mare. Pentru zbor internațional standard, Otopeni e la 1h."
      }
    ],
    summary:
      "Aeroportul litoralului — operează mai ales vara. Bun pentru combinarea „mare + Moldova” într-o singură vacanță."
  },
  {
    slug: "tulcea-tce",
    iata: "TCE",
    name: "Aeroportul „Delta Dunării” Tulcea — Cataloi",
    shortName: "Tulcea",
    city: "Tulcea",
    country: "Romania",
    region: "Dobrogea",
    lat: 45.0626,
    lng: 28.7144,
    distanceKm: 390,
    driveTime: "6h 0min",
    carriers: ["Operațiuni charter / aviație generală"],
    routes: ["Zboruri turistice spre Delta Dunării", "Charter ocazional"],
    transport: [
      {
        label: "Recomandare",
        description:
          "Fără curse comerciale regulate. Pentru oaspeții care vor să combine Delta cu Moldova, recomandăm zbor pe Otopeni sau Bacău."
      }
    ],
    summary:
      "Aeroport mic, dedicat aviației generale și turismului în Deltă. Fără curse comerciale regulate."
  },

  // ─── INTERNAȚIONAL — ȚĂRI VECINE ───
  {
    slug: "chisinau-kiv",
    iata: "KIV",
    name: "Aeroportul Internațional Chișinău",
    shortName: "Chișinău",
    city: "Chișinău",
    country: "Moldova",
    region: "Internațional",
    lat: 46.9277,
    lng: 28.931,
    distanceKm: 250,
    driveTime: "4h 30min",
    carriers: [
      "Wizz Air",
      "Ryanair",
      "Air Moldova",
      "HiSky",
      "FlyOne",
      "Turkish Airlines",
      "LOT"
    ],
    routes: [
      "Londra Luton & Stansted (UK)",
      "Dublin (IE)",
      "Milano, Roma, Bologna (IT)",
      "Madrid, Barcelona (ES)",
      "Paris (FR)",
      "Frankfurt, München (DE)",
      "Viena (AT)",
      "Varșovia (PL)",
      "Tel Aviv (IL)",
      "Istanbul (TR)"
    ],
    transport: [
      {
        label: "Mașină",
        description:
          "Vama Sculeni sau Albița. Distanța ~250 km, ~4h 30min cu vamă. Necesită carte verde asigurare pentru R. Moldova."
      },
      {
        label: "Atenție",
        description:
          "Pentru cetățenii non-UE: vizele pentru R. Moldova pot diferi. Pregătiți actele înainte. Pentru români — doar buletinul."
      }
    ],
    summary:
      "Hub regional pentru Moldova. Multe zboruri din Italia și Marea Britanie. 250 km cu trecere de graniță prin Iași."
  },
  {
    slug: "budapesta-bud",
    iata: "BUD",
    name: "Aeroportul Internațional „Liszt Ferenc” Budapesta",
    shortName: "Budapesta",
    city: "Budapesta",
    country: "Hungary",
    region: "Internațional",
    lat: 47.4369,
    lng: 19.2556,
    distanceKm: 800,
    driveTime: "11h 0min",
    carriers: [
      "Wizz Air",
      "Ryanair",
      "Lufthansa",
      "British Airways",
      "KLM",
      "Air France",
      "Emirates",
      "Qatar Airways"
    ],
    routes: [
      "Toate marile capitale europene",
      "Conexiuni globale via OneWorld, SkyTeam, Star Alliance",
      "Hub Wizz Air"
    ],
    transport: [
      {
        label: "Recomandare",
        description:
          "Distanță foarte mare. Mai bine zbor de conexiune Budapesta → București → Bacău, sau spre Cluj/Târgu Mureș."
      }
    ],
    summary:
      "Hub european major. Recomandat doar dacă oferă conexiuni intercontinentale convenabile — apoi zbor intern."
  },
  {
    slug: "debrecen-deb",
    iata: "DEB",
    name: "Aeroportul Internațional Debrecen",
    shortName: "Debrecen",
    city: "Debrecen",
    country: "Hungary",
    region: "Internațional",
    lat: 47.4889,
    lng: 21.6153,
    distanceKm: 610,
    driveTime: "9h 0min",
    carriers: ["Wizz Air", "Ryanair"],
    routes: [
      "Londra Luton (UK)",
      "Milano, Roma (IT)",
      "Eindhoven (NL)",
      "Paris Beauvais (FR)",
      "Tel Aviv (IL)"
    ],
    transport: [
      {
        label: "Mașină",
        description:
          "Trecere graniță Borș, apoi DN1 + DN2. Drum lung — 9h. Recomandăm doar dacă tariful Wizz e mult mai bun."
      }
    ],
    summary:
      "Alternativă low-cost pentru cei din vestul Europei. Distanța face că Oradea sau Cluj sunt mai practice."
  },
  {
    slug: "lviv-lwo",
    iata: "LWO",
    name: "Aeroportul Internațional „Danylo Halytskyi” Lviv",
    shortName: "Lviv",
    city: "Lviv",
    country: "Ukraine",
    region: "Internațional",
    lat: 49.8125,
    lng: 23.9561,
    distanceKm: 430,
    driveTime: "6h 30min",
    carriers: ["Curse suspendate temporar"],
    routes: ["Operațiuni civile suspendate"],
    transport: [
      {
        label: "Notă importantă",
        description:
          "Spațiul aerian ucrainean este închis pentru aviația civilă de la începutul conflictului. Verificați înainte de orice planificare."
      }
    ],
    summary:
      "Aeroport civil închis în prezent. Listat pentru completitudine — vom actualiza când traficul comercial revine."
  },
  {
    slug: "belgrad-beg",
    iata: "BEG",
    name: "Aeroportul „Nikola Tesla” Belgrad",
    shortName: "Belgrad",
    city: "Belgrad",
    country: "Serbia",
    region: "Internațional",
    lat: 44.8184,
    lng: 20.3091,
    distanceKm: 830,
    driveTime: "12h 0min",
    carriers: ["Air Serbia", "Wizz Air", "Lufthansa", "Turkish Airlines"],
    routes: [
      "Toate marile capitale europene",
      "Hub Air Serbia — conexiuni Balcani",
      "Tel Aviv, Istanbul, Dubai"
    ],
    transport: [
      {
        label: "Recomandare",
        description:
          "Distanță prea mare pentru drum auto. Recomandăm conexiune Belgrad → București → Bacău."
      }
    ],
    summary:
      "Hub regional Balcani. Numai dacă veniți cu conexiune intercontinentală convenabilă."
  },
  {
    slug: "sofia-sof",
    iata: "SOF",
    name: "Aeroportul Internațional Sofia",
    shortName: "Sofia",
    city: "Sofia",
    country: "Bulgaria",
    region: "Internațional",
    lat: 42.6952,
    lng: 23.4067,
    distanceKm: 720,
    driveTime: "11h 0min",
    carriers: [
      "Wizz Air",
      "Ryanair",
      "Bulgaria Air",
      "Lufthansa",
      "Turkish Airlines"
    ],
    routes: [
      "Capitalele vest-europene",
      "Conexiuni Star Alliance",
      "Hub Wizz Air pentru Balcani"
    ],
    transport: [
      {
        label: "Recomandare",
        description:
          "Distanță foarte mare. Folosiți doar dacă aveți zbor de conexiune comod spre OTP, IAS sau BCM."
      }
    ],
    summary:
      "Capitală bulgară, hub Wizz Air. Pentru români din diaspora, aproape întotdeauna există variante mai apropiate."
  },
  {
    slug: "varna-var",
    iata: "VAR",
    name: "Aeroportul Internațional Varna",
    shortName: "Varna",
    city: "Varna",
    country: "Bulgaria",
    region: "Internațional",
    lat: 43.2321,
    lng: 27.8251,
    distanceKm: 620,
    driveTime: "8h 30min",
    carriers: ["Wizz Air", "Ryanair", "Lufthansa", "Charter sezonier"],
    routes: [
      "Capitalele europene — focus pe sezonul estival",
      "Tel Aviv, Berlin, Viena"
    ],
    transport: [
      {
        label: "Mașină",
        description:
          "Drum prin Vama Veche / Giurgiu. Cale mai practică: zbor spre Otopeni + conexiune internă."
      }
    ],
    summary:
      "Aeroport bulgăresc de pe litoral. Sezonier puternic. Pentru o vacanță „Marea Neagră + Moldova” e o variantă neașteptat de plăcută."
  }
];

export const closestAirports = airports
  .filter((a) => a.closest)
  .sort((a, b) => a.distanceKm - b.distanceKm);
export const romanianAirports = airports.filter((a) => a.country === "Romania");
export const internationalAirports = airports.filter(
  (a) => a.country !== "Romania"
);

export function getAirportBySlug(slug: string) {
  return airports.find((a) => a.slug === slug);
}

// ─── CITY-BREAK PACKAGES BY ORIGIN ───

export type CityBreakOrigin = {
  city: string;
  country: string;
  flag: string;
  airport: { iata: string; slug: string; name: string };
  pitch: string;
  nights: string;
  fromPriceEUR: number;
  whatsappMessage: string;
};

export const cityBreakOrigins: CityBreakOrigin[] = [
  {
    city: "Londra",
    country: "Marea Britanie",
    flag: "🇬🇧",
    airport: { iata: "BCM", slug: "bacau-bcm", name: "Bacău" },
    pitch:
      "Wizz Air zboară direct Londra Luton → Bacău. 3 ore de zbor + 75 km până la noi.",
    nights: "3–5 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Bună! Vin din Londra și aterizez la Bacău. Aș dori o ofertă city break 3–5 nopți la Vaias Aparts."
  },
  {
    city: "Dublin",
    country: "Irlanda",
    flag: "🇮🇪",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "Ryanair zboară Dublin → Iași. Coborâți direct în Moldova, ajungeți la Vaias în 2h cu mașina.",
    nights: "4–6 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Salut! Vin din Dublin, aterizez la Iași. Vreau un city break 4-6 nopți la Vaias Aparts."
  },
  {
    city: "Milano",
    country: "Italia",
    flag: "🇮🇹",
    airport: { iata: "BCM", slug: "bacau-bcm", name: "Bacău" },
    pitch:
      "Wizz Air și Ryanair zboară Bergamo / Malpensa → Bacău și Iași zilnic. Cel mai vizat traseu al diasporei.",
    nights: "5–7 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Buongiorno! Vengo da Milano, atterro a Bacău. Vorrei un city break 5-7 notti."
  },
  {
    city: "Roma",
    country: "Italia",
    flag: "🇮🇹",
    airport: { iata: "BCM", slug: "bacau-bcm", name: "Bacău" },
    pitch:
      "Wizz Air Fiumicino → Bacău. Pelerinaj la mănăstirile Moldovei, cu plecare directă din Roma.",
    nights: "5–7 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Bună ziua! Vin din Roma, aterizez la Bacău. Vreau ofertă pelerinaj la mănăstirile Moldovei."
  },
  {
    city: "Madrid",
    country: "Spania",
    flag: "🇪🇸",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "Wizz Air Madrid → Iași. Diaspora din Spania ajunge acasă în 4 ore de zbor + 2h cu mașina.",
    nights: "5–7 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "¡Hola! Vengo de Madrid y aterrizo en Iași. Quiero un city break 5-7 noches."
  },
  {
    city: "Barcelona",
    country: "Spania",
    flag: "🇪🇸",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "Wizz Air Barcelona → Iași. Cazare boutique pentru românii din Catalonia care vor acasă.",
    nights: "5–7 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Salut! Vin din Barcelona, aterizez la Iași. Doresc ofertă pentru 5-7 nopți."
  },
  {
    city: "Paris",
    country: "Franța",
    flag: "🇫🇷",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "TAROM și Wizz Air Paris CDG / Beauvais → Iași. Patru zboruri pe săptămână.",
    nights: "4–6 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Bonjour! J'arrive de Paris à Iași. Je voudrais un city break 4-6 nuits."
  },
  {
    city: "Frankfurt",
    country: "Germania",
    flag: "🇩🇪",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "Lufthansa Frankfurt → Iași zilnic. Confort business class, pat Emperor 2×2m la Vaias.",
    nights: "3–5 nopți",
    fromPriceEUR: 70,
    whatsappMessage:
      "Hallo! Ich komme aus Frankfurt nach Iași. Ich möchte 3-5 Nächte buchen."
  },
  {
    city: "München",
    country: "Germania",
    flag: "🇩🇪",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch: "Lufthansa și Wizz Air zboară München → Iași zilnic.",
    nights: "3–5 nopți",
    fromPriceEUR: 70,
    whatsappMessage:
      "Grüß Gott! Ich komme aus München, möchte 3-5 Nächte im Vaias Aparts."
  },
  {
    city: "Viena",
    country: "Austria",
    flag: "🇦🇹",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "Austrian Airlines zilnic Viena → Iași. Două ore de zbor, două ore cu mașina, ești la Vaias.",
    nights: "3–5 nopți",
    fromPriceEUR: 70,
    whatsappMessage:
      "Servus! Ich fliege von Wien nach Iași. Ich brauche 3-5 Nächte."
  },
  {
    city: "Bruxelles",
    country: "Belgia",
    flag: "🇧🇪",
    airport: { iata: "BCM", slug: "bacau-bcm", name: "Bacău" },
    pitch:
      "Wizz Air Bruxelles Charleroi → Bacău. Diaspora din Belgia, weekendul perfect.",
    nights: "3–4 nopți",
    fromPriceEUR: 60,
    whatsappMessage:
      "Bonjour! J'arrive de Bruxelles à Bacău. Je veux 3-4 nuits à Vaias Aparts."
  },
  {
    city: "Tel Aviv",
    country: "Israel",
    flag: "🇮🇱",
    airport: { iata: "IAS", slug: "iasi-ias", name: "Iași" },
    pitch:
      "Wizz Air Tel Aviv → Iași — sezon estival. Patrimoniu evreiesc bogat în Neamț (sinagoga din Târgu Neamț).",
    nights: "4–7 nopți",
    fromPriceEUR: 65,
    whatsappMessage:
      "Shalom! I'm flying from Tel Aviv to Iași. I'd like to book 4-7 nights at Vaias Aparts."
  },
  {
    city: "Berlin",
    country: "Germania",
    flag: "🇩🇪",
    airport: { iata: "OTP", slug: "bucuresti-otopeni-otp", name: "București" },
    pitch:
      "Wizz Air și Lufthansa zilnic Berlin → București. Conexiune internă spre Bacău, 50 minute.",
    nights: "4–6 nopți",
    fromPriceEUR: 70,
    whatsappMessage:
      "Hallo! Ich fliege von Berlin via Bukarest. Ich brauche eine Empfehlung für 4-6 Nächte."
  }
];
