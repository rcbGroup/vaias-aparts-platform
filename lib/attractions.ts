export type Attraction = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  distance: string;
  drivingTime: string;
  category: "Mănăstire" | "Munte" | "Cetate" | "Oraș" | "Natură";
  image: string;
};

export const attractions: Attraction[] = [
  {
    slug: "cetatea-neamt",
    name: "Cetatea Neamț",
    shortDescription:
      "Cetatea medievală a lui Ștefan cel Mare, cocoțată pe culme — un balcon peste istorie.",
    longDescription:
      "Construită în secolul al XIV-lea și fortificată de Ștefan cel Mare, Cetatea Neamț este unul dintre cele mai bine păstrate monumente medievale din România. Drumul către cetate trece printr-o pădure de fag, iar de pe ziduri vedeți întreaga vale a Ozanei. Vizitați podul mobil, donjonul, capela și foișoarele — totul reconstituit cu grijă.",
    distance: "5 km",
    drivingTime: "10 min",
    category: "Cetate",
    image: "https://images.unsplash.com/photo-1583425423320-d40d80d12af9?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "manastirea-agapia",
    name: "Mănăstirea Agapia",
    shortDescription:
      "Una dintre cele mai mari mănăstiri de maici din lume, cu fresce semnate de Nicolae Grigorescu.",
    longDescription:
      "Mănăstirea Agapia este una dintre comorile spirituale ale Moldovei. Pictura interioară a fost realizată în 1858 de Nicolae Grigorescu, atunci tânăr de 20 de ani. Plimbarea pe aleile mănăstirii, printre case țărănești albe ale măicuțelor, este o experiență liniștitoare. Există un mic muzeu cu icoane și carte veche.",
    distance: "10 km",
    drivingTime: "15 min",
    category: "Mănăstire",
    image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "manastirea-varatec",
    name: "Mănăstirea Văratec",
    shortDescription:
      "Cea mai mare mănăstire de maici din România, în mijlocul codrilor de fag.",
    longDescription:
      "Văratec este un sat-mănăstire — peste 400 de măicuțe trăiesc aici, în case albe risipite printre livezi de meri. Biserica principală, construită în 1808, păstrează picturi din secolul XIX. Aproape de mănăstire este mormântul Veronicăi Micle. În luna iunie, mireasma de tei umple întreaga vale.",
    distance: "14 km",
    drivingTime: "20 min",
    category: "Mănăstire",
    image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "muntele-ceahlau",
    name: "Masivul Ceahlău",
    shortDescription:
      "Muntele sfânt al dacilor — trasee, peisaje legendare și aerul cel mai curat al Moldovei.",
    longDescription:
      "Considerat de strămoșii noștri muntele zeului Zamolxis, Ceahlăul este un masiv plin de legende. Trasee accesibile pleacă din Durău spre Cabana Dochia, trecând pe lângă Piatra Lăcrimată și Cascada Duruitoarea. La 1907 m, peisajul este absolut impresionant — în zilele clare se văd Ceahlăul, Bicazul și valea Bistriței.",
    distance: "60 km",
    drivingTime: "45 min",
    category: "Munte",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "cheile-bicazului",
    name: "Cheile Bicazului",
    shortDescription:
      "Un canion cu pereți de calcar de 300 m, sculptat în milenii de râul Bicaz.",
    longDescription:
      "Cheile Bicazului sunt o minune geologică — drumul șerpuiește printre pereți verticali de stâncă, sub care apa Bicazului curge învolburată. La capăt vă așteaptă Lacul Roșu, format după o alunecare de teren în 1837. Peisajul este uimitor în orice anotimp, dar mai ales toamna, când frunzele se aprind.",
    distance: "75 km",
    drivingTime: "1 h",
    category: "Natură",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "targu-neamt",
    name: "Centrul Târgu Neamț",
    shortDescription:
      "Orașul lui Ion Creangă — case vechi, târg săptămânal și aroma de plăcinte cu brânză.",
    longDescription:
      "Târgu Neamț este un mic oraș cu un suflet mare. Aici a copilărit Ion Creangă, marele povestitor — casa lui memorială este la Humulești, la 5 minute de centru. Plimbați-vă pe strada principală, intrați în piață sâmbătă dimineața pentru produse locale, opriți la cofetăria Solex pentru o prăjitură tradițională. Restaurantele din zonă servesc preparate moldovenești autentice.",
    distance: "1 km",
    drivingTime: "5 min",
    category: "Oraș",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "casa-memoriala-creanga",
    name: "Casa Memorială Ion Creangă",
    shortDescription:
      '"Stau câteodată și-mi aduc aminte" — casa în care s-au scris Amintirile din copilărie.',
    longDescription:
      "În satul Humulești, casa joasă cu prispă albă păstrează atmosfera secolului XIX, când marele povestitor trăia aici copilăria descrisă în Amintiri. Vedeți leagănul, vatra, podul cu vișini din curte. O vizită scurtă, dar plină de încărcătură pentru oricine a citit Amintirile din copilărie la școală.",
    distance: "3 km",
    drivingTime: "7 min",
    category: "Oraș",
    image: "https://images.unsplash.com/photo-1502780402662-acc01917ddc5?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "manastirea-neamt",
    name: "Mănăstirea Neamț",
    shortDescription:
      "„Ierusalimul ortodoxiei românești” — cea mai veche și importantă mănăstire din Moldova.",
    longDescription:
      "Fondată de Petru I Mușat și terminată de Ștefan cel Mare în 1497, Mănăstirea Neamț este leagănul culturii românești medievale. Aici a funcționat prima tipografie din Moldova. Biblioteca păstrează manuscrise vechi, iar muzeul găzduiește icoane de o frumusețe rară. O vizită aici este un exercițiu de tăcere și uimire.",
    distance: "12 km",
    drivingTime: "18 min",
    category: "Mănăstire",
    image: "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?auto=format&fit=crop&w=1600&q=80"
  }
];
