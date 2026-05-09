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
  metadataBase: new URL("https://vaiasaparts.ro"),
  title: {
    default: "Vaias Aparts — Apartamente boutique lângă Târgu Neamț",
    template: "%s | Vaias Aparts"
  },
  description:
    "Cazare boutique 4 stele la marginea Târgu Neamț — apartamente cu suflet moldovenesc, aproape de mănăstirile Agapia, Văratec și Cetatea Neamț. Rezervări directe.",
  keywords: [
    "cazare Târgu Neamț",
    "aparthotel Neamț",
    "vilă cu apartamente",
    "cazare boutique Moldova",
    "apartamente de închiriat Neamț",
    "cazare Agapia",
    "Vaias Aparts"
  ],
  authors: [{ name: "Vaias Aparts" }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://vaiasaparts.ro",
    siteName: "Vaias Aparts",
    title: "Vaias Aparts — Boutique apartments in Moldova, Romania",
    description:
      "Boutique holiday apartments near Târgu Neamț — refined comfort with genuine Moldavian soul.",
    images: [
      {
        url: "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_16.jpg",
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
    canonical: "https://vaiasaparts.ro"
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
              name: "Vaias Aparts",
              description:
                "Apartamente boutique 4 stele la marginea Târgu Neamț, județul Neamț, România.",
              image:
                "https://www.vaiasaparts.ro/wp-content/uploads/2022/12/Vaias_aparts_16.jpg",
              "@id": "https://vaiasaparts.ro",
              url: "https://vaiasaparts.ro",
              telephone: "+40738345330",
              priceRange: "€€",
              starRating: { "@type": "Rating", ratingValue: "4" },
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
                { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
                { "@type": "LocationFeatureSpecification", name: "Free parking" },
                { "@type": "LocationFeatureSpecification", name: "Air conditioning" },
                { "@type": "LocationFeatureSpecification", name: "Kitchen" }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
