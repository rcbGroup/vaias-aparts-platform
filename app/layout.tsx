import Script from "next/script";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import MobileBookFab from "@/components/MobileBookFab";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

type Lang = "ro" | "en" | "fr" | "de" | "it" | "es";

const SITE_META: Record<Lang, {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDesc: string;
  ogLocale: string;
  ogAlt: string;
}> = {
  ro: {
    title: "Vila Vaias Aparts – 7 Apartamente Boutique în Târgu Neamț | Lângă Cetatea Neamțului",
    titleTemplate: "%s | Vila Vaias Aparts Târgu Neamț",
    description: "Vila Vaias Aparts – 7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Aproape de Agapia, Văratec, Neamț și Ceahlău. Rezervare directă, cel mai bun preț.",
    keywords: ["cazare Târgu Neamț","aparthotel Neamț","vilă cu apartamente","cazare boutique Moldova","apartamente de închiriat Neamț","cazare Agapia","Vaias Aparts","Vila Vaias Aparts","cazare ultracentral Târgu Neamț","cazare lângă Cetatea Neamțului","cazare diaspora Neamț","cazare pelerini Neamț","7 apartamente Târgu Neamț","rezervare directă Neamț"],
    ogTitle: "Vila Vaias Aparts – 7 Apartamente Boutique în Târgu Neamț",
    ogDesc: "7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Rezervare directă.",
    ogLocale: "ro_RO",
    ogAlt: "Vila Vaias Aparts – Cazare boutique Târgu Neamț",
  },
  en: {
    title: "Vila Vaias Aparts – 7 Boutique Apartments in Târgu Neamț | Near Neamț Citadel",
    titleTemplate: "%s | Vila Vaias Aparts Târgu Neamț",
    description: "Vila Vaias Aparts – 7 boutique apartments in the heart of Târgu Neamț, at the foot of Neamț Citadel. Near Agapia, Văratec monasteries and Ceahlău mountain. Direct booking, best price.",
    keywords: ["accommodation Târgu Neamț","boutique apartments Romania","Neamț Citadel hotel","Vaias Aparts","Moldova Romania apartments","Agapia monastery accommodation","direct booking Romania"],
    ogTitle: "Vila Vaias Aparts – 7 Boutique Apartments in Târgu Neamț",
    ogDesc: "7 boutique apartments in the heart of Târgu Neamț, near Neamț Citadel. Direct booking, best price.",
    ogLocale: "en_US",
    ogAlt: "Vila Vaias Aparts – Boutique accommodation Târgu Neamț",
  },
  fr: {
    title: "Vila Vaias Aparts – 7 Appartements Boutique à Târgu Neamț | Près de la Citadelle de Neamț",
    titleTemplate: "%s | Vila Vaias Aparts Târgu Neamț",
    description: "Vila Vaias Aparts – 7 appartements boutique en plein centre de Târgu Neamț, au pied de la citadelle de Neamț. Près des monastères Agapia et Văratec. Réservation directe, meilleur prix.",
    keywords: ["hébergement Târgu Neamț","appartements boutique Roumanie","citadelle Neamț hôtel","Vaias Aparts","Moldavie Roumanie appartements","monastère Agapia hébergement"],
    ogTitle: "Vila Vaias Aparts – 7 Appartements Boutique à Târgu Neamț",
    ogDesc: "7 appartements boutique en plein centre de Târgu Neamț, au pied de la citadelle de Neamț. Réservation directe.",
    ogLocale: "fr_FR",
    ogAlt: "Vila Vaias Aparts – Hébergement boutique Târgu Neamț",
  },
  de: {
    title: "Vila Vaias Aparts – 7 Boutique-Apartments in Târgu Neamț | Nahe der Burg Neamț",
    titleTemplate: "%s | Vila Vaias Aparts Târgu Neamț",
    description: "Vila Vaias Aparts – 7 Boutique-Apartments im Herzen von Târgu Neamț, am Fuß der Burg Neamț. Nahe der Klöster Agapia und Văratec sowie des Ceahlău-Massivs. Direktbuchung, bester Preis.",
    keywords: ["Unterkunft Târgu Neamț","Boutique-Apartments Rumänien","Burg Neamț Hotel","Vaias Aparts","Moldau Rumänien Apartments","Kloster Agapia Unterkunft"],
    ogTitle: "Vila Vaias Aparts – 7 Boutique-Apartments in Târgu Neamț",
    ogDesc: "7 Boutique-Apartments im Herzen von Târgu Neamț, am Fuß der Burg Neamț. Direktbuchung, bester Preis.",
    ogLocale: "de_DE",
    ogAlt: "Vila Vaias Aparts – Boutique-Unterkunft Târgu Neamț",
  },
  it: {
    title: "Vila Vaias Aparts – 7 Appartamenti Boutique a Târgu Neamț | Vicino alla Cittadella di Neamț",
    titleTemplate: "%s | Vila Vaias Aparts Târgu Neamț",
    description: "Vila Vaias Aparts – 7 appartamenti boutique nel cuore di Târgu Neamț, ai piedi della Cittadella di Neamț. Vicino ai monasteri Agapia e Văratec e al massiccio del Ceahlău. Prenotazione diretta, miglior prezzo.",
    keywords: ["alloggio Târgu Neamț","appartamenti boutique Romania","cittadella Neamț hotel","Vaias Aparts","Moldavia Romania appartamenti","monastero Agapia alloggio"],
    ogTitle: "Vila Vaias Aparts – 7 Appartamenti Boutique a Târgu Neamț",
    ogDesc: "7 appartamenti boutique nel cuore di Târgu Neamț, ai piedi della Cittadella di Neamț. Prenotazione diretta.",
    ogLocale: "it_IT",
    ogAlt: "Vila Vaias Aparts – Alloggio boutique Târgu Neamț",
  },
  es: {
    title: "Vila Vaias Aparts – 7 Apartamentos Boutique en Târgu Neamț | Cerca de la Ciudadela de Neamț",
    titleTemplate: "%s | Vila Vaias Aparts Târgu Neamț",
    description: "Vila Vaias Aparts – 7 apartamentos boutique en el corazón de Târgu Neamț, al pie de la Ciudadela de Neamț. Cerca de los monasterios Agapia y Văratec y el macizo Ceahlău. Reserva directa, mejor precio.",
    keywords: ["alojamiento Târgu Neamț","apartamentos boutique Rumanía","ciudadela Neamț hotel","Vaias Aparts","Moldavia Rumanía apartamentos","monasterio Agapia alojamiento"],
    ogTitle: "Vila Vaias Aparts – 7 Apartamentos Boutique en Târgu Neamț",
    ogDesc: "7 apartamentos boutique en el corazón de Târgu Neamț, al pie de la Ciudadela de Neamț. Reserva directa.",
    ogLocale: "es_ES",
    ogAlt: "Vila Vaias Aparts – Alojamiento boutique Târgu Neamț",
  }
};

const LANG_URLS: Record<Lang, string> = {
  ro: "https://www.vaiasaparts.ro",
  en: "https://www.vaiasaparts.ro/en",
  fr: "https://www.vaiasaparts.ro/fr",
  de: "https://www.vaiasaparts.ro/de",
  it: "https://www.vaiasaparts.ro/it",
  es: "https://www.vaiasaparts.ro/es"
};

const VALID_LANGS: Lang[] = ["ro", "en", "fr", "de", "it", "es"];

function getLang(raw: string | null): Lang {
  if (raw && (VALID_LANGS as string[]).includes(raw)) return raw as Lang;
  return "ro";
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const lang = getLang(headersList.get("x-lang"));
  const meta = SITE_META[lang];

  return {
    metadataBase: new URL("https://www.vaiasaparts.ro"),
    title: {
      default: meta.title,
      template: meta.titleTemplate
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Vila Vaias Aparts" }],
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: VALID_LANGS.filter((l) => l !== lang).map((l) => SITE_META[l].ogLocale),
      url: LANG_URLS[lang],
      siteName: "Vila Vaias Aparts",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [
        {
          url: "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDesc
    },
    alternates: {
      canonical: LANG_URLS[lang],
      languages: {
        ro: "https://www.vaiasaparts.ro",
        en: "https://www.vaiasaparts.ro/en",
        fr: "https://www.vaiasaparts.ro/fr",
        de: "https://www.vaiasaparts.ro/de",
        it: "https://www.vaiasaparts.ro/it",
        es: "https://www.vaiasaparts.ro/es",
        "x-default": "https://www.vaiasaparts.ro"
      }
    },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const lang = getLang(headersList.get("x-lang"));

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang={lang}>
      <head>
        {/* hreflang alternate links – belt-and-suspenders alongside Next.js alternates */}
        <link rel="alternate" hrefLang="ro" href="https://www.vaiasaparts.ro" />
        <link rel="alternate" hrefLang="en" href="https://www.vaiasaparts.ro/en" />
        <link rel="alternate" hrefLang="fr" href="https://www.vaiasaparts.ro/fr" />
        <link rel="alternate" hrefLang="de" href="https://www.vaiasaparts.ro/de" />
        <link rel="alternate" hrefLang="it" href="https://www.vaiasaparts.ro/it" />
        <link rel="alternate" hrefLang="es" href="https://www.vaiasaparts.ro/es" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vaiasaparts.ro" />

        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body>
        <LanguageProvider initialLang={lang}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileBookFab />
          <ChatWidget />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LodgingBusiness", "Hotel"],
              name: "Vila Vaias Aparts",
              alternateName: ["Vaias Aparts", "Vaias Aparts Târgu Neamț"],
              description:
                "Vila Vaias Aparts – 7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Cazare 4 stele, clasificare certificat nr. 35332. Aproape de mănăstirile Agapia, Văratec, Neamț și de masivul Ceahlău.",
              image: [
                "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg",
                "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-2.jpg",
                "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-vedere-aeriana-drona-1.jpg",
                "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-vedere-aeriana-noapte-1.jpg",
                "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-apartament-1-living-1.jpg"
              ],
              logo: "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg",
              "@id": "https://www.vaiasaparts.ro",
              url: "https://www.vaiasaparts.ro",
              telephone: ["+40752388388", "+40738345330"],
              email: "contact@vaiasaparts.ro",
              priceRange: "€€",
              currenciesAccepted: "RON, EUR",
              paymentAccepted: "Cash, Credit Card, Bank Transfer",
              numberOfRooms: 7,
              checkinTime: "14:00",
              checkoutTime: "11:00",
              petsAllowed: true,
              smokingAllowed: false,
              starRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "99",
                bestRating: "5",
                worstRating: "1"
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Strada Sfântul Lazăr Nr. 1",
                addressLocality: "Târgu Neamț",
                addressRegion: "Neamț",
                postalCode: "615200",
                addressCountry: "RO"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.2014,
                longitude: 26.3656
              },
              hasMap: "https://www.google.com/maps/place/Vaias+Aparts/",
              areaServed: [
                { "@type": "City", name: "Târgu Neamț" },
                { "@type": "AdministrativeArea", name: "Județul Neamț" },
                { "@type": "Country", name: "România" }
              ],
              sameAs: [
                "https://www.facebook.com/VaiasAparts",
                "https://www.youtube.com/@VaiasAparts/videos",
                "https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html"
              ],
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
                { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
                { "@type": "LocationFeatureSpecification", name: "Air conditioning (Apartments 5 & 6)", value: true },
                { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
                { "@type": "LocationFeatureSpecification", name: "Communal kitchen (Bucătăria pentru Toți)", value: true },
                { "@type": "LocationFeatureSpecification", name: "CCTV 24/7", value: true },
                { "@type": "LocationFeatureSpecification", name: "Pet-friendly", value: true },
                { "@type": "LocationFeatureSpecification", name: "Family rooms", value: true },
                { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible (Apartment 7)", value: true },
                { "@type": "LocationFeatureSpecification", name: "Smart TV in every apartment", value: true },
                { "@type": "LocationFeatureSpecification", name: "Private bathroom in every apartment", value: true },
                { "@type": "LocationFeatureSpecification", name: "Private terrace", value: true },
                { "@type": "LocationFeatureSpecification", name: "Self check-in", value: true },
                { "@type": "LocationFeatureSpecification", name: "Multilingual staff (RO/EN/IT/DE/FR/ES)", value: true }
              ],
              makesOffer: {
                "@type": "AggregateOffer",
                priceCurrency: "RON",
                lowPrice: 295,
                highPrice: 695,
                offerCount: 7,
                availability: "https://schema.org/InStock"
              },
              potentialAction: {
                "@type": "ReserveAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://wa.me/40752388388",
                  inLanguage: ["ro-RO", "en-US", "fr-FR", "de-DE", "it-IT", "es-ES"],
                  actionPlatform: [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                },
                result: { "@type": "LodgingReservation", name: "Rezervare apartament Vaias Aparts" }
              }
            })
          }}
        />

        {/* Organization JSON-LD – for entity graph & AI search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vila Vaias Aparts",
              legalName: "Vaia Rustic SRL",
              url: "https://www.vaiasaparts.ro",
              logo: "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg",
              taxID: "36258605",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+40-752-388-388",
                  contactType: "reservations",
                  areaServed: ["RO", "EU"],
                  availableLanguage: ["Romanian", "English", "Italian", "German", "French", "Spanish"]
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+40-738-345-330",
                  contactType: "customer support",
                  areaServed: ["RO", "EU"],
                  availableLanguage: ["Romanian", "English", "Italian", "German"]
                }
              ],
              sameAs: [
                "https://www.facebook.com/VaiasAparts",
                "https://www.youtube.com/@VaiasAparts/videos",
                "https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html"
              ]
            })
          }}
        />

        {/* WebSite JSON-LD with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Vila Vaias Aparts",
              url: "https://www.vaiasaparts.ro",
              inLanguage: ["ro-RO", "en-US", "fr-FR", "de-DE", "it-IT", "es-ES"],
              publisher: {
                "@type": "Organization",
                name: "Vila Vaias Aparts",
                logo: "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
