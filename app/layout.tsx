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
  metadataBase: new URL("https://vaias-aparts.vercel.app"),
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
    url: "https://vaias-aparts.vercel.app",
    siteName: "Vila Vaias Aparts",
    title: "Vila Vaias Aparts — 7 Apartamente Boutique în Târgu Neamț",
    description:
      "7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Rezervare directă.",
    images: [
      {
        url: "https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg",
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
    canonical: "https://vaias-aparts.vercel.app"
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
              "@type": "LodgingBusiness",
              name: "Vila Vaias Aparts",
              description:
                "7 apartamente boutique ultracentral în Târgu Neamț, la poalele Cetății Neamțului. Cazare 4 stele, clasificare certificat nr. 35332.",
              image:
                "https://vaiasaparts.ro/wp-content/uploads/2026/04/352052228_271844338750141_8938143583258797514_n.jpg",
              "@id": "https://vaias-aparts.vercel.app",
              url: "https://vaias-aparts.vercel.app",
              telephone: ["+40752388388", "+40738345330"],
              email: "contact@vaiasaparts.ro",
              priceRange: "€€",
              numberOfRooms: 7,
              checkinTime: "14:00",
              checkoutTime: "11:00",
              petsAllowed: true,
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
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
                { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Aer condiționat (Apartamentele 5 și 6)",
                  value: true
                },
                { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
                { "@type": "LocationFeatureSpecification", name: "CCTV 24/7", value: true },
                { "@type": "LocationFeatureSpecification", name: "Bucătăria pentru Toți", value: true }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
