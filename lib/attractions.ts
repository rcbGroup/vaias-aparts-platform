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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cetatea_Neamtului_-_exterior.jpg/1600px-Cetatea_Neamtului_-_exterior.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Manastirea_Agapia_-_panoramio.jpg/1600px-Manastirea_Agapia_-_panoramio.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/M15_-_Manastir_Varatek%2C_monasko_selo.jpg/1600px-M15_-_Manastir_Varatek%2C_monasko_selo.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ceahlau-mountains-romania-august-2017-0001.jpg/1600px-Ceahlau-mountains-romania-august-2017-0001.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bicaz_Gorges_%2843574913021%29.jpg/1600px-Bicaz_Gorges_%2843574913021%29.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Targu_Neamt%2C_foto_Curcan_Ionel_%281%29.jpg/1600px-Targu_Neamt%2C_foto_Curcan_Ionel_%281%29.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Casa_memorial%C4%83_Ion_Creang%C4%83_din_Humule%C8%99ti%2C_Targu_Neamt.jpg/1600px-Casa_memorial%C4%83_Ion_Creang%C4%83_din_Humule%C8%99ti%2C_Targu_Neamt.jpg"
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Neamt_Monastery.jpg/1600px-Neamt_Monastery.jpg"
  }
];

/**
 * Photo credits — all attraction images sourced from Wikimedia Commons under
 * Creative Commons or Public Domain licenses. See app/credite-foto for full
 * attribution required by CC-BY / CC-BY-SA licenses.
 */
export const attractionImageCredits = [
  {
    slug: "cetatea-neamt",
    author: "DanyellM",
    license: "CC-BY-SA-3.0-RO",
    source: "https://commons.wikimedia.org/wiki/File:Cetatea_Neamtului_-_exterior.jpg"
  },
  {
    slug: "manastirea-agapia",
    author: "mihai moise",
    license: "CC-BY-3.0",
    source: "https://commons.wikimedia.org/wiki/File:Manastirea_Agapia_-_panoramio.jpg"
  },
  {
    slug: "manastirea-varatec",
    author: "Misa.stefanovic.07",
    license: "CC-BY-SA-4.0",
    source: "https://commons.wikimedia.org/wiki/File:M15_-_Manastir_Varatek,_monasko_selo.jpg"
  },
  {
    slug: "muntele-ceahlau",
    author: "Giuseppe Milo",
    license: "CC-BY-2.0",
    source: "https://commons.wikimedia.org/wiki/File:Ceahlau-mountains-romania-august-2017-0001.jpg"
  },
  {
    slug: "cheile-bicazului",
    author: "Robert Anders",
    license: "CC-BY-2.0",
    source: "https://commons.wikimedia.org/wiki/File:Bicaz_Gorges_(43574913021).jpg"
  },
  {
    slug: "targu-neamt",
    author: "Curcan Ionel",
    license: "CC-BY-SA-4.0",
    source: "https://commons.wikimedia.org/wiki/File:Targu_Neamt,_foto_Curcan_Ionel_(1).jpg"
  },
  {
    slug: "casa-memoriala-creanga",
    author: "Cipriancobuz",
    license: "CC-BY-SA-3.0",
    source: "https://commons.wikimedia.org/wiki/File:Casa_memorial%C4%83_Ion_Creang%C4%83_din_Humule%C8%99ti,_Targu_Neamt.jpg"
  },
  {
    slug: "manastirea-neamt",
    author: "Acristianas (modified by Ghirlandajo)",
    license: "CC-BY-SA-4.0",
    source: "https://commons.wikimedia.org/wiki/File:Neamt_Monastery.jpg"
  }
];
