export type Review = {
  name: string;
  city: string;
  date: string;
  rating: number;
  apartment?: string;
  text: string;
  source: "Google" | "TripAdvisor" | "Booking" | "Direct";
  platform?: string;
};

export const reviews: Review[] = [
  {
    name: "Ana-Maria Petrescu",
    city: "București",
    date: "Martie 2026",
    rating: 5,
    apartment: "Apartament 3",
    text:
      "Un loc de poveste. Am stat patru zile cu familia și ne-am simțit ca acasă, dar mai bine. Detaliile contează: lenjeria de bumbac, cafeaua la espressor, tot ce aveam nevoie gata pregătit. Vom reveni cu siguranță.",
    source: "Google"
  },
  {
    name: "Lucas Müller",
    city: "Berlin",
    date: "Februarie 2026",
    rating: 5,
    apartment: "Apartament 1",
    text:
      "Possibly the most peaceful place we've stayed in Romania. The host is warm and discreet, and the area around is full of history. A perfect couple's stay.",
    source: "TripAdvisor"
  },
  {
    name: "Cristian Dobre",
    city: "Iași",
    date: "Ianuarie 2026",
    rating: 5,
    apartment: "Apartament 4",
    text:
      "Am sărbătorit 30 de ani de căsătorie cu familia noastră — am rezervat două apartamente alăturate și a fost perfect. Gazda a gândit la fiecare detaliu. O experiență pe care nu o vom uita.",
    source: "Direct"
  },
  {
    name: "Elena Popescu",
    city: "Cluj-Napoca",
    date: "Noiembrie 2025",
    rating: 5,
    apartment: "Apartament 7",
    text:
      "Apartamentul de la parter este perfect pentru nevoile noastre de accesibilitate. Curat impecabil, design rafinat, bucătăria comună (Kitchen for All) este bine dotată. Recomand cu drag.",
    source: "Booking"
  },
  {
    name: "Marie Dubois",
    city: "Lyon",
    date: "Octombrie 2025",
    rating: 5,
    apartment: "Apartament 5",
    text:
      "Quel endroit magnifique! L'appartement avec air conditionné au deuxième étage est parfait en été. L'accueil a été chaleureux et professionnel. Nous reviendrons absolument.",
    source: "TripAdvisor"
  },
  {
    name: "Andrei Ionescu",
    city: "Timișoara",
    date: "Septembrie 2025",
    rating: 5,
    apartment: "Apartament 3",
    text:
      "Vacanță cu doi copii — totul a mers perfect. Paturile Emperor sunt incredibile, copiii au dormit imediat. Parcare privată gratuită, curte liniștită. S-a văzut că gazda gândește la fiecare detaliu.",
    source: "Google"
  },
  {
    name: "James O'Connor",
    city: "Dublin",
    date: "August 2025",
    rating: 5,
    apartment: "Apartament 2",
    text:
      "An absolute gem. The aesthetic is refined without being precious, the linen is exquisite, and the area is dripping with history and natural beauty. Best stay we've had in Eastern Europe.",
    source: "TripAdvisor"
  },
  {
    name: "Diana Constantinescu",
    city: "București",
    date: "Iulie 2025",
    rating: 5,
    apartment: "Apartament 6",
    text:
      "Apartamentul cu aer condiționat de la etaj 2 — excelent în iulie. Patul Emperor, aerul condiționat, liniștea — totul perfect. Mulțumim Echipei Vaias Aparts!",
    source: "Direct"
  },
  {
    name: "Răzvan și Ioana",
    city: "Brașov",
    date: "Iunie 2025",
    rating: 5,
    apartment: "Apartament 1",
    text:
      "Am venit pentru o săptămână și am plecat cu sufletul plin. Plimbările pe la mănăstiri, mâncarea moldovenească din zonă, serile liniștite — totul a contribuit la o vacanță perfectă.",
    source: "Google"
  },
  {
    name: "Isabela Florescu",
    city: "Galați",
    date: "Mai 2025",
    rating: 5,
    apartment: "Apartament 4",
    text:
      "Am venit cu mama și sora mea — două dormitoare separate, o singură bucătărie, și liniștea completă. Perfect pentru un weekend feminin de relaxare. Ne întoarcem în toamnă!",
    source: "Google"
  },
  {
    name: "Petra Novák",
    city: "Bratislava",
    date: "Aprilie 2025",
    rating: 5,
    apartment: "Apartament 5",
    text:
      "We found this gem while looking for accommodation near the monasteries. The apartment on the second floor is bright, comfortable, and the canapea extensibilă was perfect for our third guest. Highly recommend!",
    source: "Booking"
  },
  {
    name: "Marius Tăbăcaru",
    city: "Suceava",
    date: "Martie 2025",
    rating: 5,
    apartment: "Apartament 2",
    text:
      "Vin la Vaias Aparts de trei ori pe an pentru afaceri. Este singurul loc din Târgu Neamț unde mă simt cu adevărat odihnit. Patul Emperor este excepțional. Reducerea de 25% pentru oaspeții care revin este un gest frumos.",
    source: "Direct"
  }
];
