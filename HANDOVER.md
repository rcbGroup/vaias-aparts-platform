# HANDOVER — Vaias Aparts Platform

**Vila Vaias Aparts | Vaia Rustic SRL | CUI 36258605**  
Strada Sfântul Lazăr Nr. 1, Târgu Neamț, Județul Neamț, România, 615200  
Tel/WA: +40 738 345 330 · +40 752 388 388  
Email: contact@VaiasAparts.ro  

---

## ⚠️ REGULI OPERAȚIONALE CRITICE (NICIODATĂ DE ÎNCĂLCAT)

1. **Codul casetei de chei NU se scrie niciodată** — se comunică verbal, prin telefon, în ziua sosirii
2. **Returnarea cheilor la check-out:** cutia metalică maro, peretele parter, lângă Kitchen for All, sub Apartamentul 2
3. **Bucătăria comună = „Kitchen for All"** — NICIODATĂ mansardă, loft sau altă denumire
4. **Etaje:** parter / etaj 1 / etaj 2 (NICIODATĂ mansardă sau loft)
5. **Toate paturile:** Emperor size 2m×2m — menționat explicit la fiecare rezervare
6. **Check-in: 14:00 | Check-out: 11:00** — fără excepție nesolicitată
7. **Toate mesajele** se semnează „Echipa Vaias Aparts"
8. **Adresare oaspeți:** Domnule/Doamnă + prenume/nume (niciodată familiar la primul contact)
9. **Reducere oaspeți care revin:** „până la 25%" — NICIODATĂ o cifră fixă

---

## ACCES PLATFORMĂ

| Serviciu | URL | Login |
|---|---|---|
| **Site producție** | https://vaias-aparts.vercel.app | — |
| **Admin panel** | https://vaias-aparts.vercel.app/admin | contact@vaiasaparts.ro / VaiasAdmin2026! |
| **Vercel** | vercel.com/rcb-group/vaias-aparts | — |
| **GitHub** | — | (conectare git recomandată) |

---

## ARHITECTURA TEHNICĂ

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS cu design system custom (forest/walnut/cream/stone)
- **Database:** PostgreSQL (Prisma ORM) — necesită conectare la Supabase/Neon
- **Email:** Resend API
- **WhatsApp/SMS:** Twilio
- **Plăți:** Stripe (pregătit, neactivat încă)
- **Deploy:** Vercel (auto-deploy)

### Pagini existente (40 rute)
- `/` — Homepage
- `/apartments` — Listing apartamente (7 apartamente)
- `/apartments/[slug]` — Pagini individuale (7 pagini)
- `/blog` — Blog listing
- `/blog/[slug]` — 10 articole SEO
- `/rezervare` — Formular rezervare (conectat la API)
- `/recenzii` — Recenzii (12 recenzii)
- `/zone-turistice` — Atracții turistice
- `/galerie` — Galerie foto
- `/despre-noi` — Povestea noastră
- `/contact` — Contact + formulare
- `/admin` — Login admin
- `/admin/dashboard` — Dashboard
- `/admin/rezervari` — Gestionare rezervări
- `/sitemap.xml` — Sitemap automat
- `/robots.txt` — SEO

### API Routes
- `POST /api/booking` — Primire cerere rezervare + notificare owner (WhatsApp + Email)
- `POST /api/contact` — Formular contact
- `POST /api/newsletter` — Abonare newsletter
- `POST/DELETE /api/admin/login` — Autentificare admin

---

## APARTAMENTELE

| Nr | Etaj | Dormitoare | Capacitate | RON/noapte | EUR/noapte | AC | Accesibil |
|---|---|---|---|---|---|---|---|
| 1 | Etaj 1 | 1 | 2 pers | 280 | 56 | ✗ | ✗ |
| 2 | Etaj 1 | 1 | 2 pers | 280 | 56 | ✗ | ✗ |
| 3 | Etaj 1 | 2 | 4 pers | 350 | 70 | ✗ | ✗ |
| 4 | Etaj 1 | 2 | 4 pers | 350 | 70 | ✗ | ✗ |
| 5 | Etaj 2 | 1+canapea L | 3 pers | 310 | 62 | ✓ | ✗ |
| 6 | Etaj 2 | 1 | 2 pers | 310 | 62 | ✓ | ✗ |
| 7 | Parter | 1 | 2 pers | 250 | 50 | ✗ | ✓ |

**Capacitate totală vilă:** 19 persoane  
**Prețuri weekend:** +~18% față de tariful de săptămână  
**Reducere săptămânală:** 10% la 7+ nopți  
**Reducere booking direct:** 5% față de platforme externe

---

## VARIABILE DE MEDIU (`.env.local`)

Toate variabilele necesare sunt în `.env.local`. **NICIODATĂ nu commitați acest fișier în git.**

Pentru Vercel, adăugați variabilele manual:
```
vercel env add DATABASE_URL production
vercel env add RESEND_API_KEY production
vercel env add TWILIO_ACCOUNT_SID production
vercel env add TWILIO_AUTH_TOKEN production
vercel env add TWILIO_WHATSAPP_FROM production
```

---

## PLAN DE MARKETING 90 DE ZILE

### Lunile 1–3 (Mai–Iulie 2026)

#### Luna 1 — Fundații digitale (Mai)

**SEO & Conținut**
- [ ] Verificați Google Search Console — adăugați proprietatea pentru vaiasaparts.ro
- [ ] Indexați sitemap.xml în Google Search Console
- [ ] Creați profil Google Business Profile (Google Maps) cu toate cele 7 apartamente
- [ ] Completați profilul Booking.com cu fotografii profesionale pentru toate 7 apartamente
- [ ] Actualizați profilul TripAdvisor
- [ ] Publicați toate cele 10 articole de blog (sunt gata, necesită verificare)

**Social Media**
- [ ] Creați pagină Facebook: facebook.com/VaiasAparts
- [ ] Creați cont Instagram: instagram.com/VaiasAparts
- [ ] Postați 3 fotografii/săptămână pe Instagram (apartamente, zone turistice, mâncare locală)
- [ ] Conectați Facebook cu Instagram pentru postare dublă automată

**WhatsApp Business**
- [ ] Activați contul WhatsApp Business pe +40 738 345 330
- [ ] Configurați mesaj de bun venit automat
- [ ] Creați catalog cu apartamentele și prețurile

**Email Marketing**
- [ ] Configurați Resend API (resend.com)
- [ ] Creați primul newsletter de bun venit pentru abonați
- [ ] Activați secvența de mesaje automate la rezervare

#### Luna 2 — Creștere organică (Iunie)

**Recenzii**
- [ ] Colectați activ recenzii Google de la oaspeții din mai
- [ ] Creați campanie de recenzii: link direct Google Maps trimis la 24h după check-out
- [ ] Răspundeți la TOATE recenziile în 24h (în română și limba oaspetelui)
- [ ] Targetați: 20+ recenzii Google noi în iunie

**Conținut**
- [ ] 2 articole noi de blog: „Sfaturi pentru prima vizită la Mănăstirea Agapia" + „Top 5 restaurante în Târgu Neamț"
- [ ] 4 Reels Instagram cu videoclipuri din apartamente și atracții

**Parteneriate locale**
- [ ] Contactați 3–5 restaurante pentru parteneriat (comision 5–8% pe recomandare)
- [ ] Contactați agențiile de turism din Iași și Bacău
- [ ] Propuneți colaborare ghizilor turistici locali

**Advertising**
- [ ] Lansați campanie Meta Ads (Facebook/Instagram): buget €300/lună
  - Target: Românii din diaspora (UK, Irlanda, Italia, Germania, Franța, Spania)
  - Target: Familii cu venituri medii-ridicate din București, Cluj, Iași
  - Mesaj: „Acasă, dar mai bine" / „Cel mai bun preț, direct"

#### Luna 3 — Optimizare și sezon (Iulie)

**Sezon de vârf**
- [ ] Prețuri weekend ajustate pentru iulie-august (+20-25%)
- [ ] Activați minim 3 nopți în weekendurile de vârf
- [ ] Blocat Booking.com pentru datele cu cerere mare (rezervați direct mai profitabil)

**Programul de afiliere**
- [ ] Lansați programul de afiliere cu 5% comision
- [ ] Contactați 10 bloggeri de travel din România
- [ ] Creați pagina de afiliere pe site (necesită implementare)

**Email Campaigns**
- [ ] Newsletter lunar cu oferta lunii + articol de blog
- [ ] Campanie „Early Bird" pentru toamnă: 15% reducere la rezervări din iulie pentru septembrie-octombrie

---

### Sezonalitate & Prețuri recomandate

| Perioadă | Multiplicator | Note |
|---|---|---|
| Ianuarie–Februarie | 0.85 | Sezon slab, prețuri reduse |
| Martie–Aprilie | 1.0 | Sezon mediu |
| Mai–Iunie | 1.1 | Sezon bun |
| Iulie–August | 1.25 | Sezon de vârf |
| Septembrie–Octombrie | 1.1 | Sezon bun (drumeții, toamnă) |
| Noiembrie | 0.9 | Sezon slab |
| Decembrie | 1.3 | Crăciun/Revelion — prețuri maxime |

---

## SECVENȚA DE MESAJE AUTOMATE

### La primirea cererii de rezervare
1. **Imediat:** SMS/WA oaspete → „Cererea dumneavoastră a fost primită. Revenite în maxim 4 ore. — Echipa Vaias Aparts"
2. **Imediat:** Email/WA owner → notificare completă cu detalii

### La confirmarea rezervării
3. **La confirmare:** Email oaspete → confirmare cu detalii complete
4. **La confirmare:** WA oaspete → „Rezervarea dumneavoastră este confirmată! Check-in: [DATA], ora 14:00. Vă contactăm în ziua sosirii cu instrucțiunile de acces. — Echipa Vaias Aparts"

### Înainte de sosire
5. **-7 zile:** WA/Email → „Ne bucurăm că veniți! Aveți întrebări sau cereri speciale? — Echipa Vaias Aparts"
6. **-1 zi:** WA → instrucțiuni complete de acces (codul cutiei NU în scris — sunați!)
7. **-1 zi:** Email → confirmare check-in, ghid zonă, recomandări

### Durante sejur
8. **+2 ore după check-in:** WA → „Sperăm că v-ați instalat bine. Suntem la dispoziție pentru orice nevoie. — Echipa Vaias Aparts"
9. **-1 zi checkout:** WA → reminder check-out 11:00, instrucțiuni chei (cutia metalică maro, parter, lângă Kitchen for All, sub Apartamentul 2)

### După plecare
10. **+2 ore:** WA/Email → „Mulțumim că ați ales Vaias Aparts! O recenzie pe Google ne-ar ajuta enorm: [LINK]. — Echipa Vaias Aparts"
11. **+7 zile:** Email → ofertă de revenire cu reducere personalizată

---

## CALENDAR ORTODOX — MESAJE SEZONIERE

### Sărbători cheie pentru mesaje personalizate
- **Crăciun (25–26 dec):** „Crăciun fericit din partea Echipei Vaias Aparts!"
- **Revelion (31 dec):** „Un an nou plin de bucurii!"
- **Paște:** „Hristos a Înviat! Sărbători fericite!"
- **Sf. Gheorghe (23 apr):** Mesaj pentru oaspeții cu numele Gheorghe
- **Sf. Constantin și Elena (21 mai):** Mesaj pentru oaspeții cu aceste nume

---

## PRIORITĂȚI TEHNICE RĂMASE

### Prioritate înaltă (în 30 de zile)
- [ ] **Conectare bază de date PostgreSQL** (Supabase sau Neon) și rulare migrații Prisma
- [ ] **Configurare Twilio WhatsApp Business** — verificare număr, template-uri mesaje
- [ ] **Configurare Resend** — domeniu verificat, template-uri email
- [ ] **Fotografii profesionale** pentru toate 7 apartamente (crucial!)
- [ ] **Google Analytics 4** — adăugați scriptul în layout.tsx
- [ ] **Meta Pixel** — adăugați ID-ul real în .env.local

### Prioritate medie (în 60 de zile)
- [ ] **Sincronizare iCal** cu 5StarDesk (disponibilitate în timp real)
- [ ] **Stripe** — activare plăți online (opțional, dacă piața dorește)
- [ ] **Pagina de afiliere** — programul de afiliere cu 3 niveluri
- [ ] **Blog:** 5 articole noi în engleză pentru SEO internațional

### Prioritate scăzută (în 90 de zile)
- [ ] **CRM complet** cu Prisma DB și istoricul oaspeților
- [ ] **Food & beverage** pre-order sistem
- [ ] **Parteneriate restaurante** cu QR code-uri
- [ ] **Experiențe/tururi** pagini dedicate

---

## FOTOGRAFII RECOMANDATE

Fotografiile profesionale sunt **cel mai important lucru** de făcut după implementarea tehnică.

**Per apartament (minim 12 fotografii):**
1. Hero shot — dormitor cu pat Emperor (natural light)
2. Living cu canapea
3. Bucătărie echipată
4. Baie
5. Vedere de la fereastră
6. Detalii (lenjerie, ornamente, lumini)

**Vila în exterior:**
- Fațada vilei
- Curtea interioară / parcare
- Intrarea principală

**Zonele comune:**
- Kitchen for All
- Coridor/scări

**Zona turistică:**
- Cetatea Neamț
- Mănăstirile Agapia/Văratec
- Ceahlău

**Fotograf recomandat:** Contactați fotografi din Piatra Neamț sau Iași specializați în real estate/hospitality. Buget estimat: €300–500 pentru tot.

---

## INDICATORI DE PERFORMANȚĂ (KPI)

### Obiective lunare
| KPI | Luna 1 | Luna 2 | Luna 3 |
|---|---|---|---|
| Rezervări directe | 10 | 15 | 25 |
| Recenzii Google noi | 5 | 15 | 30 |
| Rating Google | 4.5+ | 4.7+ | 4.8+ |
| Abonați newsletter | 20 | 50 | 100 |
| Vizitatori site/lună | 500 | 1.500 | 3.000 |
| Rata ocupare | 40% | 60% | 80% |

---

## CONTACT TEHNIC

Pentru probleme tehnice cu platforma:
- Vercel: dashboard.vercel.com
- Prisma Docs: pris.ly
- Next.js Docs: nextjs.org/docs

---

*Handover pregătit: Mai 2026 | Vaias Aparts Platform v2.0*  
*Echipa Vaias Aparts — Strada Sfântul Lazăr Nr. 1, Târgu Neamț*
