import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import MobileBookFab from "@/components/MobileBookFab";

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
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
        width: 1200,
        height: 630,
        alt: "Vaias Aparts boutique apartments"
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
  return (
    <html lang="ro">
      <body>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileBookFab />
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
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
              "@id": "https://vaiasaparts.ro",
              url: "https://vaiasaparts.ro",
              telephone: "+40 740 000 000",
              priceRange: "€€",
              starRating: { "@type": "Rating", ratingValue: "4" },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Strada Boureni",
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
