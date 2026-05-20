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
    image: "/attractions/cetatea-neamt.jpg"
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
    image: "/attractions/manastirea-agapia.jpg"
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
    image: "/attractions/manastirea-varatec.jpg"
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
    image: "/attractions/muntele-ceahlau.jpg"
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
    image: "/attractions/cheile-bicazului.jpg"
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
    image: "/attractions/targu-neamt.jpg"
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
    image: "/attractions/casa-memoriala-creanga.jpg"
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
    image: "/attractions/manastirea-neamt.jpg"
  },
  {
    slug: "manastirea-secu",
    name: "Mănăstirea Secu",
    shortDescription:
      "Mănăstire de călugări ascunsă în codrii Vânătorilor, cu ziduri de cetate și o liniște adâncă.",
    longDescription:
      "Ridicată în 1602 de vornicul Nestor Ureche, tatăl cronicarului Grigore Ureche, Mănăstirea Secu se ascunde într-o poiană înconjurată de pădure, pe valea pârâului Secu. Zidurile groase și turnurile de apărare amintesc de vremurile tulburi, dar înăuntru domnește pacea. Este una dintre cele mai importante vetre monahale din Moldova, legată de marii duhovnici ai secolului XX.",
    distance: "20 km",
    drivingTime: "30 min",
    category: "Mănăstire",
    image: "/attractions/manastirea-secu.jpg"
  },
  {
    slug: "manastirea-sihastria",
    name: "Mănăstirea Sihăstria",
    shortDescription:
      "Vatra părintelui Cleopa și a marilor duhovnici — un loc de pelerinaj viu al ortodoxiei românești.",
    longDescription:
      "Mănăstirea Sihăstria, la câțiva kilometri de Secu, este locul unde au trăit și au fost îngropați marii duhovnici Cleopa Ilie și Paisie Olaru. Pentru mii de pelerini, este una dintre cele mai căutate destinații spirituale din țară. Atmosfera de rugăciune, izvorul tămăduitor și drumul prin pădure spre Schitul Sihla fac din vizită o experiență adâncă.",
    distance: "22 km",
    drivingTime: "35 min",
    category: "Mănăstire",
    image: "/attractions/manastirea-sihastria.jpg"
  },
  {
    slug: "manastirea-bistrita",
    name: "Mănăstirea Bistrița",
    shortDescription:
      "Necropolă domnească a lui Alexandru cel Bun, cu turn-clopotniță și o istorie de șase secole.",
    longDescription:
      "Ctitorită la 1402 de Alexandru cel Bun, Mănăstirea Bistrița adăpostește mormântul marelui domnitor și o parte din tezaurul medieval al Moldovei. Turnul-clopotniță, paraclisul lui Ștefan cel Mare și clopotul Buga, dăruit de Alexandru cel Bun, sunt mărturii ale măreției de odinioară. Se află aproape de Piatra Neamț, pe drumul spre munte.",
    distance: "40 km",
    drivingTime: "50 min",
    category: "Mănăstire",
    image: "/attractions/manastirea-bistrita.jpg"
  },
  {
    slug: "statiunea-durau",
    name: "Stațiunea Durău",
    shortDescription:
      "Stațiune montană la poalele Ceahlăului — aer tare, pârtie de schi și poarta spre trasee.",
    longDescription:
      "Durău este stațiunea de la poalele Ceahlăului, la peste 750 m altitudine, cunoscută pentru aerul curat, mănăstirea pictată de Nicolae Tonitza și pârtia de schi pentru iarnă. Vara, de aici pleacă cele mai frumoase trasee spre Cabana Dochia și Toaca. Este locul perfect pentru o zi de munte — drumeție, telescaun și priveliști spre masivul legendar.",
    distance: "65 km",
    drivingTime: "1 h 10 min",
    category: "Munte",
    image: "/attractions/statiunea-durau.jpg"
  },
  {
    slug: "lacul-rosu",
    name: "Lacul Roșu",
    shortDescription:
      "Lacul de baraj natural cu trunchiuri de brad ieșite din apă — o priveliște unică în Carpați.",
    longDescription:
      "Format în 1837 după o uriașă alunecare de teren care a barat pârâul Bicaz, Lacul Roșu este cel mai mare lac natural de baraj din România. Trunchiurile de brad care ies din apă îi dau un aer ireal, iar culoarea roșiatică vine din aluviunile bogate în fier. Se află chiar la capătul Cheilor Bicazului — o excursie de o zi care merită fiecare kilometru.",
    distance: "80 km",
    drivingTime: "1 h 20 min",
    category: "Natură",
    image: "/attractions/lacul-rosu.jpg"
  },
  {
    slug: "vanatori-neamt",
    name: "Parcul Natural Vânători-Neamț",
    shortDescription:
      "Rezervația de zimbri Dragoș Vodă — singura turmă de zimbri în libertate semi-naturală din zonă.",
    longDescription:
      "La doar câțiva kilometri de noi, Parcul Natural Vânători-Neamț găzduiește Rezervația de Zimbri „Dragoș Vodă”, unde puteți vedea de aproape zimbrul european — simbolul Moldovei medievale, readus aici după ce dispăruse în sălbăticie. Traseul prin pădure, observatoarele și aerul curat fac din vizită o experiență minunată pentru familii și copii.",
    distance: "10 km",
    drivingTime: "15 min",
    category: "Natură",
    image: "/attractions/vanatori-neamt.jpg"
  },
  {
    slug: "piatra-neamt",
    name: "Piatra Neamț",
    shortDescription:
      "„Perla Moldovei” — oraș montan cu telegondolă, ansamblul lui Ștefan cel Mare și priveliști de pe Cozla.",
    longDescription:
      "Piatra Neamț, reședința județului, este un oraș cochet așezat între dealuri împădurite. Urcați cu telegondola pe Muntele Cozla pentru o panoramă superbă, vizitați Curtea Domnească și Turnul lui Ștefan cel Mare, apoi plimbați-vă pe faleza Bistriței. Are muzee, restaurante bune și o atmosferă relaxată — o destinație de o zi excelentă din Târgu Neamț.",
    distance: "46 km",
    drivingTime: "50 min",
    category: "Oraș",
    image: "/attractions/piatra-neamt.jpg"
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
  },
  {
    slug: "manastirea-secu",
    author: "Cezar Suceveanu (uploader Cezarika1, ro.wikipedia)",
    license: "CC-BY-2.5",
    source: "https://commons.wikimedia.org/wiki/File:M%C4%83n%C4%83stirea_Secu.jpg"
  },
  {
    slug: "manastirea-sihastria",
    author: "mihai moise",
    license: "CC-BY-3.0",
    source: "https://commons.wikimedia.org/wiki/File:Manastirea_Sihastria_-_panoramio.jpg"
  },
  {
    slug: "manastirea-bistrita",
    author: "Losy (Romanian Wikipedia)",
    license: "CC-BY-2.5",
    source: "https://commons.wikimedia.org/wiki/File:Manastirea_Bistrita_0023.JPG"
  },
  {
    slug: "statiunea-durau",
    author: "Vianora Pescaru",
    license: "CC-BY-SA-3.0-RO",
    source: "https://commons.wikimedia.org/wiki/File:M%C4%83n%C4%83stirea_Dur%C4%83u.jpg"
  },
  {
    slug: "lacul-rosu",
    author: "Emilpop",
    license: "CC-BY-SA-3.0",
    source: "https://commons.wikimedia.org/wiki/File:Lacul;_Rosu,_Romania.JPG"
  },
  {
    slug: "vanatori-neamt",
    author: "Cristian Borteș (bortescristian), Cluj-Napoca",
    license: "CC-BY-2.0",
    source: "https://commons.wikimedia.org/wiki/File:Rezervatia_de_zimbrii_Dragos_Voda_(2725611733).jpg"
  },
  {
    slug: "piatra-neamt",
    author: "zaFleur",
    license: "CC-BY-SA-3.0",
    source: "https://commons.wikimedia.org/wiki/File:Piatra-Neam%C8%9B_din_Cozla_-_panoramio.jpg"
  }
];
