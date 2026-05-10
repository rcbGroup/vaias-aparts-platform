export type GuestAvatar = {
  id: string;
  icon: string;
  titleRO: string;
  descriptionRO: string;
  ctaTextRO: string;
  whatsappMessageRO: string;
};

export const guestAvatars: GuestAvatar[] = [
  {
    id: "families",
    icon: "👨‍👩‍👧‍👦",
    titleRO: "Familii cu copii",
    descriptionRO: "Apartamente spațioase cu pat Emperor, bucătărie proprie și parcare gratuită în curte. Aer curat, spațiu de joacă și liniște — vacanță adevărată pentru toată familia.",
    ctaTextRO: "Rezervă pentru familie",
    whatsappMessageRO: "Bună ziua! Suntem o familie cu copii și dorim să rezervăm un apartament la Vila Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] adulți, [NR] copii (vârste: [VÂRSTE]). Vă rog să ne comunicați disponibilitatea."
  },
  {
    id: "couples",
    icon: "💑",
    titleRO: "Cupluri în escapadă",
    descriptionRO: "Pat Emperor de 2m×2m, lenjerie de bumbac fin, intimitate deplină. Fără zgomot de hotel, fără recepție. Doar voi doi, în liniștea Moldovei.",
    ctaTextRO: "Rezervă escapada",
    whatsappMessageRO: "Bună ziua! Suntem un cuplu și dorim să rezervăm un apartament la Vila Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], 2 adulți. Vă rog să ne comunicați disponibilitatea și opțiunile."
  },
  {
    id: "pilgrims",
    icon: "🕊️",
    titleRO: "Pelerini și credincioși",
    descriptionRO: "La câțiva pași de Agapia, Văratec, Neamț și Sihăstria. Vila Vaias Aparts este baza perfectă pentru pelerinajul la mănăstirile din Moldova.",
    ctaTextRO: "Rezervă pentru pelerinaj",
    whatsappMessageRO: "Bună ziua! Suntem interesați de cazare pentru un pelerinaj la mănăstirile din zona Neamț. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], [NR] persoane. Vă rog să ne comunicați disponibilitatea."
  },
  {
    id: "diaspora",
    icon: "✈️",
    titleRO: "Diaspora care revine acasă",
    descriptionRO: "Un loc cald și familiar în inima Moldovei, pentru românii care vin acasă. Comunicare pe WhatsApp în română sau engleză, confirmare rapidă.",
    ctaTextRO: "Rezervă acasă la Neamț",
    whatsappMessageRO: "Hello! I am Romanian, living abroad, and I would like to book a stay at Vila Vaias Aparts for my visit home to Neamt. Dates: [CHECK-IN] – [CHECK-OUT], [NR] adults, [NR] children. Please confirm availability and price."
  },
  {
    id: "groups",
    icon: "🎉",
    titleRO: "Grupuri și reuniuni",
    descriptionRO: "Vila întreagă pentru grupul vostru — toate cele 7 apartamente independente, capacitate 22–28 persoane. Nunți, aniversări, reuniuni de familie sau echipă.",
    ctaTextRO: "Solicită ofertă grup",
    whatsappMessageRO: "Bună ziua! Suntem un grup și dorim să rezervăm mai multe apartamente (sau întreaga vilă) la Vila Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT]. Total persoane: [NR]. Vă rog o ofertă personalizată."
  },
  {
    id: "business",
    icon: "💼",
    titleRO: "Călători de afaceri",
    descriptionRO: "Wi-Fi rapid, spațiu de lucru, parcare sigură și confortul unui apartament propriu — mai bine decât orice cameră de hotel. Facturare simplă.",
    ctaTextRO: "Rezervă sejur business",
    whatsappMessageRO: "Bună ziua! Vin în Târgu Neamț pentru afaceri și doresc să rezerv un apartament la Vila Vaias Aparts. Datele: [DATA CHECK-IN] – [DATA CHECK-OUT], 1 adult. Am nevoie de factură fiscală. Vă rog confirmați disponibilitatea."
  }
];
