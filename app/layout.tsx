import Script from "next/script";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import MobileBookFab from "@/components/MobileBookFab";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vaiasaparts.ro"),
  title: {
    default: "Vila Vaias Aparts — 7 Apartamente Boutique în Târgu Neamț | Lângă Cetatea Neamțului",
    template: "%s | Vila Vaias Aparts Târgu Neamț"
  },
  description:
    "Vila Vaias Aparts — 7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Aproape de Agapia, Văratec, Neamț și Ceahlău. Rezervare directă, cel mai bun preț.",
  keywords: [
    "cazare Târgu Neamț",
    "aparthotel Neamț",
    "vilă cu apartamente",
    "cazare boutique Moldova",
    "apartamente de închiriat Neamț",
    "cazare Agapia",
    "Vaias Aparts",
    "Vila Vaias Aparts",
    "cazare ultracentral Târgu Neamț",
    "cazare lângă Cetatea Neamțului",
    "cazare diaspora Neamț",
    "cazare pelerini Neamț",
    "7 apartamente Târgu Neamț",
    "rezervare directă Neamț"
  ],
  authors: [{ name: "Vila Vaias Aparts" }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://www.vaiasaparts.ro",
    siteName: "Vila Vaias Aparts",
    title: "Vila Vaias Aparts — 7 Apartamente Boutique în Târgu Neamț",
    description:
      "7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Rezervare directă.",
    images: [
      {
        url: "https://www.vaiasaparts.ro/gallery/vila-vaias-aparts-targu-neamt-exterior-fatada-1.jpg",
        width: 1200,
        height: 630,
        alt: "Vila Vaias Aparts — Cazare boutique Târgu Neamț"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaias Aparts",
    description: "Boutique apartments near Târgu Neamț, Romania"
  },
  alternates: {
    canonical: "https://www.vaiasaparts.ro"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="ro">
      <head>
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
        <LanguageProvider>
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
                "Vila Vaias Aparts — 7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Cazare 4 stele, clasificare certificat nr. 35332. Aproape de mănăstirile Agapia, Văratec, Neamț și de masivul Ceahlău.",
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
                { "@type": "LocationFeatureSpecification", name: "Multilingual staff (RO/EN/IT/DE/FR)", value: true }
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
                  inLanguage: "ro-RO",
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

        {/* Organization JSON-LD — for entity graph & AI search */}
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
                  availableLanguage: ["Romanian", "English", "Italian", "German", "French"]
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
              inLanguage: ["ro-RO", "en-US"],
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
