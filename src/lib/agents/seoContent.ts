/**
 * VAIA OS — Agent 16: SEO Content Engine.
 *
 * Deterministic generator for SEO-optimised blog posts.
 * Each generation request specifies a topic, target keywords, and audience.
 * Output: { slug, title, metaDescription, body, schemaJsonLd }.
 *
 * The generator is template-driven (not LLM-driven) so output is predictable,
 * cacheable, and free to run at scale. Real long-form rewriting can layer on top.
 */
import { apartments } from "../../../lib/apartments";

export type SEOTopic =
  | "monastery_circuit"
  | "neamt_citadel"
  | "winter_holidays_neamt"
  | "easter_pilgrimage"
  | "summer_family_neamt"
  | "diaspora_return"
  | "wellness_oglinzi"
  | "ceahlau_hike"
  | "food_traditions_moldova"
  | "wedding_neamt";

export type SEOBlogRequest = {
  topic: SEOTopic;
  keywords?: string[];
  language?: "ro" | "en";
  apartmentSlug?: string;
};

export type SEOBlogResult = {
  slug: string;
  title: string;
  metaDescription: string;
  body: string;
  keywords: string[];
  schemaJsonLd: object;
  ogImage: string;
  estimatedWordCount: number;
};

const TOPIC_CONFIGS: Record<
  SEOTopic,
  { titleRO: string; titleEN: string; keywords: string[]; sections: string[] }
> = {
  monastery_circuit: {
    titleRO: "Circuit Mănăstiri Neamț — 4 Mănăstiri într-o Zi de la Vaias Aparts",
    titleEN: "Neamț Monastery Circuit — 4 Monasteries in One Day from Vaias Aparts",
    keywords: ["mănăstiri Neamț", "circuit mănăstiri", "Agapia", "Văratec", "cazare aproape mănăstiri", "pelerinaj Moldova"],
    sections: ["intro_pilgrim", "agapia", "varatec", "neamt_monastery", "sihastria", "logistics", "where_to_stay"],
  },
  neamt_citadel: {
    titleRO: "Cetatea Neamțului — Ghid Complet 2026 (Plus Cazare Boutique La 2 Minute)",
    titleEN: "Neamț Citadel — Complete 2026 Guide (Plus Boutique Stay 2 Minutes Away)",
    keywords: ["Cetatea Neamțului", "vizită cetate Târgu Neamț", "atracții Neamț", "cazare Cetatea Neamțului"],
    sections: ["intro_citadel", "history", "what_to_see", "tickets_hours", "kid_friendly", "nearby_food", "where_to_stay"],
  },
  winter_holidays_neamt: {
    titleRO: "Crăciun și Revelion în Târgu Neamț — De Ce 2026 e Anul Tău Acolo",
    titleEN: "Christmas and New Year in Târgu Neamț — Why 2026 Is Your Year",
    keywords: ["Crăciun Neamț", "Revelion Moldova", "cazare sărbători Târgu Neamț", "tradiții Crăciun Moldova"],
    sections: ["intro_winter", "carols", "fasting_menu", "midnight_service", "snowy_walks", "where_to_stay"],
  },
  easter_pilgrimage: {
    titleRO: "Paștele Ortodox în Moldova — Pelerinaj la Mănăstiri",
    titleEN: "Orthodox Easter in Moldova — Monastery Pilgrimage",
    keywords: ["Paște Moldova", "Paște la mănăstire", "cazare Paște Neamț", "pelerinaj Paște"],
    sections: ["intro_easter", "monastery_services", "traditional_food", "fasting", "logistics", "where_to_stay"],
  },
  summer_family_neamt: {
    titleRO: "Vacanță de Vară cu Familia în Târgu Neamț — Idei și Cazare",
    titleEN: "Summer Family Vacation in Târgu Neamț — Ideas and Where to Stay",
    keywords: ["vacanță familie Neamț", "vacanță vară Moldova", "cazare familie Târgu Neamț", "activități copii"],
    sections: ["intro_family", "activities", "lakes", "food", "rainy_day", "where_to_stay"],
  },
  diaspora_return: {
    titleRO: "Acasă Pe Acasă — Ghid Diasporă Pentru Vacanța în Moldova",
    titleEN: "Coming Home — Diaspora Guide to a Moldova Vacation",
    keywords: ["diaspora România", "vacanță acasă", "diaspora Italia Spania UK Germania", "cazare diasporă Neamț"],
    sections: ["intro_diaspora", "feeling_home", "language_food", "monasteries", "family_logistics", "where_to_stay"],
  },
  wellness_oglinzi: {
    titleRO: "Tratament Oglinzi și Bălțătești — Cazare Confortabilă la 30 Minute",
    titleEN: "Oglinzi and Bălțătești Treatment — Comfortable Stay 30 Minutes Away",
    keywords: ["tratament Oglinzi", "tratament Bălțătești", "cazare wellness Neamț", "stațiune balneară Moldova"],
    sections: ["intro_wellness", "oglinzi_about", "baltatesti_about", "treatments", "logistics", "where_to_stay"],
  },
  ceahlau_hike: {
    titleRO: "Drumeție Ceahlău Pentru Începători — Plus Cazare de Bază în Târgu Neamț",
    titleEN: "Ceahlău Hike for Beginners — Plus a Solid Base in Târgu Neamț",
    keywords: ["drumeție Ceahlău", "Toaca Panaghia", "ascensiune Ceahlău", "cazare aproape Ceahlău"],
    sections: ["intro_ceahlau", "trail_overview", "what_to_pack", "season_tips", "where_to_stay"],
  },
  food_traditions_moldova: {
    titleRO: "Bucătăria Moldovei — 8 Mâncăruri Pe Care Le Mănânci Numai Aici",
    titleEN: "Moldova Cuisine — 8 Dishes You Eat Only Here",
    keywords: ["mâncare tradițională Moldova", "Han Rustic", "restaurante Târgu Neamț", "bucătărie regională"],
    sections: ["intro_food", "8_dishes", "han_rustic", "monastery_kitchens", "where_to_stay"],
  },
  wedding_neamt: {
    titleRO: "Nuntă în Neamț — Cazare Familie și Prieteni la Vaias Aparts",
    titleEN: "Wedding in Neamț — Family and Friends Stay at Vaias Aparts",
    keywords: ["nuntă Neamț", "cazare nuntă invitați", "cazare grup eveniment Moldova", "vilă întreagă nuntă"],
    sections: ["intro_wedding", "venue_capacity", "logistics", "extra_nights", "where_to_stay"],
  },
};

const SECTION_TEMPLATES_RO: Record<string, string> = {
  intro_pilgrim:
    "Drumul către mănăstirile Nordului Moldovei începe rareori cu o destinație clară. Începe cu o căutare — de liniște, de rugăciune, de aer curat de pădure. Târgu Neamț este punctul de plecare cel mai potrivit. De aici, în 15-20 minute, ajungi la oricare din cele patru mănăstiri istorice ale zonei.",
  agapia:
    "Mănăstirea Agapia te primește cu picturile lui Nicolae Grigorescu din 1858 — singura biserică din lume pictată integral de marele pictor român. Maicile sunt prietenoase, programul de slujbe este predictibil (utrenia la 6:00, Sfânta Liturghie duminica la 9:00), iar pelerinii sunt bineveniți.",
  varatec:
    "Mănăstirea Văratec, la 5 minute de Agapia, este cea mai mare mănăstire de maici din România. Aici găsești mormântul Veronicăi Micle. Atelierele tradiționale produc miere, dulceață, plante și icoane — un cadou potrivit pentru drum.",
  neamt_monastery:
    "Mănăstirea Neamț este leagănul ortodoxiei moldovenești. Aici a copilărit părintele Daniil Sandu Tudor și se păstrează manuscrise vechi de șapte secole. Slujba serală este un moment de pace pe care îl recomandăm tuturor pelerinilor.",
  sihastria:
    "Mănăstirea Sihăstria este locul Părintelui Cleopa Ilie — duhovnicul ortodoxiei moderne. Mulți pelerini vin aici pentru un sfat duhovnicesc, pentru taina spovedaniei, sau doar pentru a vedea mormântul Părintelui.",
  logistics:
    "De la Vila Vaias Aparts (Strada Sfântul Lazăr nr. 1, Târgu Neamț), distanțele sunt: Agapia 12 km, Văratec 16 km, Neamț 15 km, Sihăstria 18 km. Toate se pot vizita într-o zi cu mașina sau cu un microbuz închiriat (ne ocupăm noi de logistică la cerere).",
  where_to_stay:
    "După o zi de pelerinaj, te aștepți cu apartamentele Vila Vaias Aparts — boutique, calde, cu Wi-Fi de mare viteză, Bucătărie pentru Toți și parcare gratuită. 7 apartamente complete în mijlocul Târgu Neamț, la 2 minute de Cetatea Neamțului. Tarife de la 297 lei/noapte cu reducere 25% pentru sejururi de 7+ nopți.",
  intro_citadel:
    "Cetatea Neamțului veghează asupra Târgu Neamț de pe vârful Pleșu de mai bine de 600 de ani. Construită de Petru I Mușat la sfârșitul secolului XIV, întărită de Ștefan cel Mare, asediată de turci și polonezi — fiecare piatră are o poveste.",
  history:
    "Vizita la cetate este o lecție de istorie vie. Restaurarea din anii 2009-2010 a redat majoritatea structurilor — bastioane, turnuri de pază, capela domnească. Ghidajul audio (15 lei) povestește toate momentele cheie, de la fundație până la asaltul din 1691.",
  what_to_see:
    "Nu ratați: Turnul de Sud cu panorama spre Oglinzi și Bălțătești, capela cu fresce, beciurile cu armament și sala domnească. Pentru fotografi: răsăritul de pe terasa estică, când lumina aurie atinge zidurile.",
  tickets_hours:
    "Bilet adult: 15 lei. Copii: 8 lei. Program: 9:00-18:00 (vara), 9:00-16:00 (iarna). Închisă lunea. Parcarea de la baza cetății este gratuită. Urcușul durează 10-15 minute, drumul accesibil parțial pentru cei cu mobilitate redusă.",
  kid_friendly:
    "Copiii adoră cetatea — au unde alerga, fortificațiile sunt sigure, iar ghidajul are anecdote despre cavaleri și domnitori care țin atenția pruncilor. Recomandăm o vizită de 2 ore în zilele cu vreme bună.",
  nearby_food:
    "După vizită, coborâți spre centrul Târgu Neamț. La 2 minute de mers pe jos găsiți Han Rustic — bucătărie moldovenească autentică (sarmale, ciorbă rădăuțeană, mămăligă cu brânză și smântână). Recomandăm să rezervați masa în prealabil prin Vila Vaias Aparts.",
  intro_winter:
    "Iarna în Moldova este altceva. Zăpada pune liniște pe mănăstiri, târgul îmbracă luminile sărbătorilor, iar serile lungi devin invitație la povești. Vila Vaias Aparts este pregătită pentru Crăciun și Revelion — apartamente calde, lenjerie premium, brad în living la cerere.",
  carols:
    "Colindătorii încă vin la ușile caselor în Târgu Neamț — copii cu steaua, grupuri de tineri cu pluguri, băieți cu măști de capră. Aceasta este o tradiție vie, nu un spectacol turistic.",
  fasting_menu:
    "Postul Crăciunului se ține în mănăstirile din jur (Agapia, Văratec). Vă putem aranja mese tradiționale de post cu binecuvântarea părintelui sau cu rețete vechi de la familii din Neamț.",
  midnight_service:
    "Slujba de la miezul nopții (Învierea Domnului la Paști, Naașterea la Crăciun, Anul Nou nou la Revelion) este o experiență de neuitat. Vă recomandăm Mănăstirea Neamț — distanță 12 km, parcare suficientă.",
  snowy_walks:
    "Pădurea Văratec sub zăpadă, drumeție ușoară spre Sihla, ceai cald la Han Rustic — așa arată dimineața perfectă de iarnă în Neamț.",
  intro_easter:
    "Paștele la mănăstirile din Neamț este o experiență spirituală pe care toți creștinii o caută cel puțin o dată în viață. Slujba Învierii, lumânarea din mâini, oamenii care ies cu pasca și ouăle roșii — totul are sens aici.",
  monastery_services:
    "Slujba Învierii la Mănăstirea Neamț începe la ora 23:30. Recomandăm să ajungeți cu 30 minute mai devreme pentru a găsi loc. Mănăstirea Agapia organizează slujbă paralelă pentru cei care preferă mai puțină aglomerație.",
  traditional_food:
    "Pasca, drobul de miel, cozonacul, ouăle roșii. Vă putem aranja masa de Paști cu produse de la mănăstirea Văratec sau cu rețete clasice moldovenești.",
  fasting:
    "Săptămâna Mare se ține post strict. Avem meniu de post la cerere — fără carne, fără lactate, fără ouă. Mâncare de calitate, nu compromisă.",
  intro_family:
    "Vara în Moldova — copiii descoperă cetatea, mănăstirile, lacurile, pădurile. Adulții se relaxează cu o cafea pe terasă. Vila Vaias Aparts are 7 apartamente, fiecare cu bucătărie proprie (sau acces la Bucătăria pentru Toți) — perfect pentru familii cu copii.",
  activities:
    "Cetatea Neamțului, traseul La Stejarul (lângă Vânători), grădina zoologică Vânători-Neamț cu zimbri, pescuit la Refugiul Vaias (lacul nostru privat), drumeție ușoară la Sihla.",
  lakes:
    "Refugiul Vaias — lacul nostru privat la 30 minute. Pescuit recreativ, BBQ, plimbare. Includem echipamentul. Familie întreagă, o zi întreagă.",
  food:
    "Han Rustic în Târgu Neamț pentru cina familiei. Pentru micul dejun, Bucătăria pentru Toți de la Vila Vaias Aparts vă oferă tot ce aveți nevoie — sau oferim coș de bun venit cu produse locale.",
  rainy_day:
    "Pentru zile ploioase: Muzeul Memorial Ion Creangă (la Humulești, satul scriitorului), Muzeul de Istorie Târgu Neamț, vizită ghidată Cetatea Neamțului (parțial sub acoperiș).",
  intro_diaspora:
    "Te-ai întors acasă. Mama te așteaptă, dar nu ai unde să te cazezi confortabil cu copiii și soțul/soția. Vila Vaias Aparts este soluția — apartamente moderne, dar românești, în mijlocul Moldovei tale.",
  feeling_home:
    "Ne primim oaspeții ca pe rudele venite de departe. Cafea bună la sosire, sfat dacă vrei să găsești cea mai bună brânză de Neamț, recomandare pentru băile termale Oglinzi sau Bălțătești.",
  language_food:
    "Comunicăm în română, engleză, italiană sau franceză — limba ta. Mâncarea este cea pe care o știi de acasă: sarmale, mititei, ciorbă rădăuțeană, plăcintă cu brânză.",
  monasteries:
    "Mulți români din diaspora vin la mănăstirile Neamț pentru aprindere de lumânare la mormântul Părintelui Cleopa. Sau pentru o Sfântă Liturghie care să le amintească de copilărie. Suntem aici să te însoțim.",
  family_logistics:
    "Te ajutăm cu transferul de la aeroport (Iași 200 km, Bacău 90 km, Suceava 110 km, Cluj 350 km), cu organizarea unei petreceri de familie, cu rezervarea pentru o nuntă sau o pomenire.",
  intro_wellness:
    "Stațiunile balneare Oglinzi (15 km) și Bălțătești (10 km) sunt destinații cunoscute pentru tratament reumatologic, dermatologic și ginecologic. Vila Vaias Aparts este baza ideală — mai aproape decât Slănic Moldova, mai liniștit decât Vatra Dornei.",
  oglinzi_about:
    "Apele minerale de la Oglinzi tratează afecțiuni reumatice și dermatologice. Bazinul cu apă termală de 38°C este deschis tot anul. Tratamentul standard durează 10-14 zile cu o ședință zilnică.",
  baltatesti_about:
    "Bălțătești are tradiție balneară din 1893. Recomandat pentru afecțiuni ginecologice, reumatice și ale aparatului locomotor. Sezonul: aprilie-octombrie.",
  treatments:
    "Vă ajutăm cu programările la stațiuni, transportul zilnic și meniu adaptat. Cazarea la apartament boutique după ședința de tratament — confort maxim de recuperare.",
  intro_ceahlau:
    "Ceahlăul (Olimpul Daciei) este vârful de la 1907 m altitudine pe care îl vezi din Târgu Neamț în zilele clare. Drumeție pentru pasionați, dar accesibilă și începătorilor cu condiție fizică medie.",
  trail_overview:
    "Traseul cel mai accesibil pleacă din Durău (50 km de la Târgu Neamț) și urcă spre Toaca + Panaghia (5-6 ore dus-întors, dificultate medie). Începătorii fac traseul cu ghid local.",
  what_to_pack:
    "Bocanci buni, jachetă impermeabilă (vremea se schimbă rapid), 2 litri apă/persoană, sandvișuri, baton energie, telefon încărcat. Recomandăm să porniți la 7:00 dimineața.",
  season_tips:
    "Iunie-septembrie: optim. Octombrie: frumos dar răcoros. Iarna: doar cu ghid și echipament alpin. Aprilie-mai: zăpadă reziduală pe vârf.",
  intro_food:
    "Bucătăria moldovenească este simplă, bogată, hrănitoare. Nu este o bucătărie de restaurant — este o bucătărie de casă, transmisă prin generații.",
  "8_dishes":
    "Sarmalele cu mămăligă. Ciorba rădăuțeană (de pui cu smântână și ardei iute). Mititeii pe grătar de cărbune. Tochitura cu brânză și ou. Tobă de casă. Cozonacul cu nucă. Plăcinta poale-n brâu cu brânză sărată. Vinul fiert de iarnă.",
  han_rustic:
    "Han Rustic este reperul gastronomic din Târgu Neamț. La 200 m de Vila Vaias Aparts. Vă ajutăm cu rezervarea (un apel din partea noastră scurtează coada).",
  monastery_kitchens:
    "Mănăstirile Agapia și Văratec oferă mâncare tradițională de post — la nevoie, vă putem aranja masa în trapeza mănăstirii cu binecuvântarea părintelui starețului.",
  intro_wedding:
    "O nuntă în Neamț are sens. Mănăstirile pentru cununia religioasă, vila boutique pentru cazarea familiei, Han Rustic sau Buciumeni pentru petrecere — toate la distanțe rezonabile.",
  venue_capacity:
    "Vila Vaias Aparts oferă 7 apartamente, capacitate confortabilă 22 persoane (până la 28). Perfect pentru familia apropiată + prietenii cei mai dragi. Ceilalți invitați pot dormi la hoteluri din apropiere (avem recomandări).",
  extra_nights:
    "Recomandăm minim 2 nopți pentru o nuntă: cazare cu o seară înainte (pregătiri, masă pentru familia mirilor), nuntă, somn după ceremonie. Tarif preferențial pentru rezervări de grup minim 4 apartamente.",
};

function buildBody(topic: SEOTopic, lang: "ro" | "en"): { body: string; wordCount: number } {
  const config = TOPIC_CONFIGS[topic];
  const parts: string[] = [];
  for (const sectionKey of config.sections) {
    const tmpl = SECTION_TEMPLATES_RO[sectionKey];
    if (tmpl) {
      parts.push(tmpl);
    }
  }
  const body = parts.join("\n\n");
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  return { body, wordCount };
}

function slugFor(topic: SEOTopic, lang: "ro" | "en"): string {
  const baseSlug = topic.replace(/_/g, "-");
  return lang === "en" ? `${baseSlug}-en` : baseSlug;
}

export function generateBlogPost(req: SEOBlogRequest): SEOBlogResult {
  const lang = req.language ?? "ro";
  const cfg = TOPIC_CONFIGS[req.topic];
  if (!cfg) throw new Error(`Unknown topic ${req.topic}`);
  const title = lang === "ro" ? cfg.titleRO : cfg.titleEN;
  const { body, wordCount } = buildBody(req.topic, lang);
  const keywords = Array.from(new Set([...cfg.keywords, ...(req.keywords ?? [])]));
  const slug = slugFor(req.topic, lang);
  const metaDescription =
    lang === "ro"
      ? body.slice(0, 158).trim() + "…"
      : body.slice(0, 158).trim() + "…";

  const apartment = req.apartmentSlug ? apartments.find(a => a.slug === req.apartmentSlug) : apartments[0];

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: metaDescription,
    inLanguage: lang === "ro" ? "ro-RO" : "en-US",
    author: { "@type": "Organization", name: "Vila Vaias Aparts" },
    publisher: {
      "@type": "Organization",
      name: "Vila Vaias Aparts",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/vaias-aparts-logo.png",
      },
    },
    mainEntityOfPage: `https://www.vaiasaparts.ro/blog/${slug}`,
    keywords: keywords.join(", "),
    about: apartment
      ? {
          "@type": "LodgingBusiness",
          name: apartment.name,
          telephone: "+40743456789",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Strada Sfântul Lazăr nr. 1",
            addressLocality: "Târgu Neamț",
            addressCountry: "RO",
          },
        }
      : undefined,
  };

  return {
    slug,
    title,
    metaDescription,
    body,
    keywords,
    schemaJsonLd,
    ogImage: apartment?.heroImage ?? "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_16.jpg",
    estimatedWordCount: wordCount,
  };
}

export const ALL_TOPICS: SEOTopic[] = Object.keys(TOPIC_CONFIGS) as SEOTopic[];

export function topicCatalog() {
  return ALL_TOPICS.map(t => ({
    topic: t,
    titleRO: TOPIC_CONFIGS[t].titleRO,
    titleEN: TOPIC_CONFIGS[t].titleEN,
    keywords: TOPIC_CONFIGS[t].keywords,
  }));
}
