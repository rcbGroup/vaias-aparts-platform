export type Review = {
  name: string;
  city: string;
  date: string;
  rating: number;
  apartment: string;
  text: string;
  source: "Google" | "TripAdvisor" | "Booking" | "Direct";
};

export const reviews: Review[] = [
  {
    name: "Ana-Maria Petrescu",
    city: "București",
    date: "Martie 2026",
    rating: 5,
    apartment: "Apartament Ceahlău",
    text:
      "Un loc de poveste. Am stat patru zile cu familia și ne-am simțit ca acasă, dar mai bine. Detaliile contează: lenjeria de bumbac fin, cafeaua la espressor, micul dejun cu produse locale. Vom reveni cu siguranță.",
    source: "Google"
  },
  {
    name: "Lucas Müller",
    city: "Berlin",
    date: "Februarie 2026",
    rating: 5,
    apartment: "Apartament Agapia",
    text:
      "Possibly the most peaceful place we've stayed in Romania. The garden is enchanting, the host is warm and discreet, and the area around is full of history. A perfect honeymoon stay.",
    source: "TripAdvisor"
  },
  {
    name: "Cristian Dobre",
    city: "Iași",
    date: "Ianuarie 2026",
    rating: 5,
    apartment: "Apartament Moldova",
    text:
      "Am sărbătorit 30 de ani de căsătorie cu părinții și copiii noștri. Apartamentul Moldova ne-a încăput pe toți confortabil, masa lungă din living a strâns trei generații. O experiență pe care nu o vom uita.",
    source: "Direct"
  },
  {
    name: "Elena Popescu",
    city: "Cluj-Napoca",
    date: "Noiembrie 2025",
    rating: 5,
    apartment: "Apartament Neamț",
    text:
      "Garsoniera este perfectă pentru un weekend de explorat zona. Curat impecabil, design rafinat, foarte aproape de Cetatea Neamț. Recomand cu drag.",
    source: "Booking"
  },
  {
    name: "Marie Dubois",
    city: "Lyon",
    date: "Octombrie 2025",
    rating: 5,
    apartment: "Apartament Ceahlău",
    text:
      "Quel endroit magnifique! La vue sur les montagnes au matin est inoubliable. L'accueil de Vasi a été chaleureux et professionnel. Nous reviendrons absolument.",
    source: "TripAdvisor"
  },
  {
    name: "Andrei Ionescu",
    city: "Timișoara",
    date: "Septembrie 2025",
    rating: 5,
    apartment: "Apartament Moldova",
    text:
      "Vacanță cu doi copii și bunicii — totul a mers perfect. Pătuțul pentru bebeluș, jocurile, grătarul în curte… s-a văzut că gazda gândește la fiecare detaliu. Un loc cu suflet.",
    source: "Google"
  },
  {
    name: "James O'Connor",
    city: "Dublin",
    date: "August 2025",
    rating: 5,
    apartment: "Apartament Agapia",
    text:
      "An absolute gem. The aesthetic is refined without being precious, the linen is exquisite, and the area is dripping with history and natural beauty. Best stay we've had in Eastern Europe.",
    source: "TripAdvisor"
  },
  {
    name: "Diana Constantinescu",
    city: "București",
    date: "Iulie 2025",
    rating: 5,
    apartment: "Apartament Neamț",
    text:
      "Un mic refugiu cu personalitate, în inima Târgu Neamț. Patul foarte bun, cafeaua excelentă, vederea spre cetate de neuitat. Mulțumesc, Vasi!",
    source: "Direct"
  },
  {
    name: "Răzvan și Ioana",
    city: "Brașov",
    date: "Iunie 2025",
    rating: 5,
    apartment: "Apartament Ceahlău",
    text:
      "Am venit pentru o săptămână și am plecat cu sufletul plin. Terasa, șemineul, plimbările pe la mănăstiri, mâncarea moldovenească din zona — totul a contribuit la o vacanță perfectă.",
    source: "Google"
  }
];
