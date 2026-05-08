export type Apartment = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  guests: number;
  sizeSqm: number;
  pricePerNightEUR: number;
  pricePerNightRON: number;
  weekendPriceEUR: number;
  weeklyDiscountPct: number;
  rating: number;
  reviewsCount: number;
  view: string;
  amenities: string[];
  rooms: { name: string; description: string }[];
  rules: string[];
  heroImage: string;
  gallery: string[];
};

const stockGallery = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
];

export const apartments: Apartment[] = [
  {
    slug: "ceahlau",
    name: "Apartament Ceahlău",
    tagline: "Două dormitoare cu vedere la munte",
    shortDescription:
      "Spațios apartament cu două dormitoare, terasă privată și o vedere impresionantă către Masivul Ceahlău.",
    description:
      "Apartament Ceahlău este sufletul nostru deschis spre munte. Două dormitoare luminoase, lemn cald de nuc, textile naturale și o terasă privată cu fotolii din răchită — totul așezat în liniștea pădurilor de la marginea Târgu Neamț. Dimineața, soarele intră blând prin fereastra mare a livingului; seara, când luminile orașului se sting, se aud doar greierii și clopotele depărtate ale mănăstirii Agapia. Ideal pentru familii sau două cupluri care își doresc un sejur tihnit, cu mic dejun pe terasă și plimbări pe poteci de munte.",
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    guests: 5,
    sizeSqm: 78,
    pricePerNightEUR: 55,
    pricePerNightRON: 274,
    weekendPriceEUR: 65,
    weeklyDiscountPct: 15,
    rating: 4.9,
    reviewsCount: 87,
    view: "Vedere panoramică spre Masivul Ceahlău",
    amenities: [
      "WiFi de mare viteză",
      "Aer condiționat",
      "Bucătărie complet utilată",
      "Mașină de spălat",
      "Parcare privată",
      "Terasă cu vedere",
      "Șemineu",
      "Smart TV",
      "Cafetieră Nespresso",
      "Lenjerie de bumbac fin",
      "Prosoape pufoase",
      "Produse cosmetice naturale"
    ],
    rooms: [
      { name: "Dormitor principal", description: "Pat king-size, dressing, vedere spre munte" },
      { name: "Al doilea dormitor", description: "Două paturi single, ideal pentru copii sau prieteni" },
      { name: "Living", description: "Canapea extensibilă, șemineu, fotolii de citit" },
      { name: "Bucătărie", description: "Plită cu inducție, cuptor, frigider mare, espressor" },
      { name: "Baie principală", description: "Cadă, duș tip ploaie, încălzire în pardoseală" },
      { name: "A doua baie", description: "Duș compact, finisaje în piatră naturală" },
      { name: "Terasă", description: "12 m² privată, mobilier din răchită, masă rustică pentru cină" }
    ],
    rules: [
      "Check-in: după ora 15:00",
      "Check-out: până la ora 11:00",
      "Fără fumat în interior (terasa este permisă)",
      "Animalele de companie sunt acceptate la cerere",
      "Fără petreceri sau evenimente",
      "Liniște după ora 22:00"
    ],
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "agapia",
    name: "Apartament Agapia",
    tagline: "Un dormitor cu grădină pentru reverii lente",
    shortDescription:
      "Cuib romantic cu un dormitor și acces direct în grădina interioară, perfect pentru cupluri în căutarea liniștii.",
    description:
      "Inspirat de smerenia mănăstirii vecine, Apartament Agapia este un cuib pentru două persoane. Pereți var natural, plapumă albă, parchet de stejar și o ușă glisantă care se deschide direct spre grădina interioară plină de lavandă și trandafiri vechi. Aici timpul se subțiază: cafeaua de dimineață se bea sub umbrarul de viță, iar seara se aude liniștea ca o catifea. Pentru luna de miere, aniversări sau pur și simplu pentru o pauză de la lume.",
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    guests: 2,
    sizeSqm: 48,
    pricePerNightEUR: 40,
    pricePerNightRON: 199,
    weekendPriceEUR: 48,
    weeklyDiscountPct: 12,
    rating: 4.8,
    reviewsCount: 64,
    view: "Acces grădină privată cu lavandă",
    amenities: [
      "WiFi de mare viteză",
      "Aer condiționat",
      "Bucătărie completă",
      "Parcare privată",
      "Acces grădină",
      "Smart TV",
      "Cafetieră",
      "Lenjerie de in",
      "Cosmetice locale",
      "Prosoape pufoase",
      "Mic dejun la cerere",
      "Pat king-size"
    ],
    rooms: [
      { name: "Dormitor", description: "Pat king-size, lenjerie de in, ferestre spre grădină" },
      { name: "Living deschis", description: "Canapea joasă, măsuță de lemn masiv, bibliotecă selectă" },
      { name: "Bucătărie", description: "Compactă dar completă: plită, cuptor mic, frigider, espressor" },
      { name: "Baie", description: "Duș tip ploaie, gresie de piatră, săpunuri de casă" },
      { name: "Grădină", description: "Acces privat, masă pentru două persoane, hamac între meri" }
    ],
    rules: [
      "Check-in: după ora 15:00",
      "Check-out: până la ora 11:00",
      "Doar pentru adulți (max. 2 oaspeți)",
      "Fără fumat",
      "Fără animale de companie",
      "Liniște după ora 22:00"
    ],
    heroImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "neamt",
    name: "Apartament Neamț",
    tagline: "Garsonieră caldă, în inima poveștii",
    shortDescription:
      "Studio cochet la doar câțiva pași de Cetatea Neamț — perfect pentru călătorii scurte și escapade solo.",
    description:
      "Apartament Neamț este o garsonieră croită cu grijă pentru cei care călătoresc ușor. Cărămidă aparentă, lampadar de alamă, pat moale cu pernuțe brodate manual și o fereastră care încadrează cetatea ca un tablou. Bucătăria este mică dar bine gândită — ai tot ce-ți trebuie să faci o cafea bună sau o cină la lumina lumânărilor. Ideal pentru un weekend istoric, pentru jurnaliști în drum sau pentru oricine vrea să simtă pulsul vechi al Moldovei.",
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    guests: 2,
    sizeSqm: 32,
    pricePerNightEUR: 30,
    pricePerNightRON: 149,
    weekendPriceEUR: 36,
    weeklyDiscountPct: 10,
    rating: 4.7,
    reviewsCount: 112,
    view: "Vedere către Cetatea Neamț",
    amenities: [
      "WiFi de mare viteză",
      "Aer condiționat",
      "Chicinetă echipată",
      "Smart TV",
      "Cafetieră",
      "Birou de lucru",
      "Parcare în zonă",
      "Lenjerie premium",
      "Prosoape pufoase",
      "Cosmetice naturale",
      "Self check-in"
    ],
    rooms: [
      { name: "Spațiu deschis", description: "Pat queen-size, zonă de lucru, fotoliu de citit" },
      { name: "Chicinetă", description: "Plită, frigider, espressor, vase pentru două persoane" },
      { name: "Baie", description: "Duș compact, finisaje în piatră, încălzire în pardoseală" }
    ],
    rules: [
      "Check-in: după ora 15:00",
      "Check-out: până la ora 11:00",
      "Maxim 2 oaspeți",
      "Fără fumat",
      "Fără animale",
      "Liniște după ora 22:00"
    ],
    heroImage: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "moldova",
    name: "Apartament Moldova",
    tagline: "Suită familială cu trei dormitoare",
    shortDescription:
      "Apartamentul nostru cel mai generos — trei dormitoare, două băi și un living pentru întâlniri lungi cu dragii tăi.",
    description:
      "Apartament Moldova este pentru călătoriile mari — bunici, părinți, copii, cumetri. Trei dormitoare, două băi spațioase, un living cu masă lungă de stejar la care încap zece, și o bucătărie pregătită să gătească gulaș, sarmale, plăcinte. Aerul are mireasmă de mere coapte și de pâine proaspătă; copiii se pot juca în curtea interioară, iar adulții pot deschide o sticlă de vin de Cotnari pe terasa de la etaj. O suită de poveste pentru reuniuni de familie sau evenimente intime.",
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    guests: 8,
    sizeSqm: 110,
    pricePerNightEUR: 75,
    pricePerNightRON: 374,
    weekendPriceEUR: 89,
    weeklyDiscountPct: 18,
    rating: 5.0,
    reviewsCount: 53,
    view: "Vedere dublă: curte interioară și dealuri",
    amenities: [
      "WiFi de mare viteză",
      "Aer condiționat (toate camerele)",
      "Bucătărie premium",
      "Mașină de spălat & uscător",
      "Parcare privată (2 mașini)",
      "Două terase",
      "Șemineu",
      "Smart TV cu Netflix",
      "Cafetieră premium",
      "Lenjerie de in",
      "Pătuț pentru copii",
      "Scaun de masă pentru bebeluș",
      "Jocuri de societate",
      "Bibliotecă",
      "Grătar privat",
      "Mic dejun premium la cerere"
    ],
    rooms: [
      { name: "Dormitor principal", description: "Pat king-size, baie en-suite, dressing" },
      { name: "Al doilea dormitor", description: "Pat queen-size, fereastră spre curte" },
      { name: "Al treilea dormitor", description: "Două paturi single, ideal pentru copii" },
      { name: "Living mare", description: "Masă pentru 10, șemineu, canapele generoase" },
      { name: "Bucătărie premium", description: "Insula de gătit, două cuptoare, frigider mare" },
      { name: "Baie principală", description: "Cadă cu hidromasaj, duș separat, două lavoare" },
      { name: "A doua baie", description: "Duș tip ploaie, finisaje fine" },
      { name: "Terasă superioară", description: "20 m², mobilier outdoor, vedere spre dealuri" },
      { name: "Curte interioară", description: "Grătar, masă lungă, plante aromatice" }
    ],
    rules: [
      "Check-in: după ora 15:00",
      "Check-out: până la ora 11:00",
      "Maxim 8 oaspeți",
      "Copiii sunt foarte bineveniți",
      "Animalele acceptate la cerere",
      "Fără petreceri zgomotoase",
      "Liniște după ora 22:00"
    ],
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=80"
    ]
  }
];

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return apartments.find((a) => a.slug === slug);
}

export function getRelatedApartments(slug: string, count = 3): Apartment[] {
  return apartments.filter((a) => a.slug !== slug).slice(0, count);
}

export const stockGalleryImages = stockGallery;
