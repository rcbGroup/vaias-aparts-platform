import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  siteVideos,
  videoEmbedUrl,
  videoObjectLd,
  YOUTUBE_CHANNEL,
  type SiteVideo,
} from "@/lib/videos";
import { HERO_DRONE_OVERVIEW } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Videouri | Vila Vaias Aparts Târgu Neamț — Tururi video apartamente & vilă",
  description:
    "Toate tururile video Vila Vaias Aparts: prezentarea întregii vile, fiecare dintre cele 7 apartamente și bucătăria comună. Vezi cazarea în mișcare înainte să rezervi.",
  alternates: { canonical: "https://www.vaiasaparts.ro/videouri" },
};

const villa = siteVideos.find((v) => v.category === "vila")!;
const apartmentVideos = siteVideos.filter((v) => v.category === "apartament");
const kitchen = siteVideos.find((v) => v.category === "bucatarie")!;

function Embed({ video }: { video: SiteVideo }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl shadow-card bg-forest-950">
      <iframe
        src={videoEmbedUrl(video.youtubeId)}
        title={`${video.title} — Vila Vaias Aparts`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function VideouriPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie video"
        title="Vila Vaias Aparts în mișcare."
        subtitle="Tururi video pentru întreaga vilă, fiecare apartament și bucătăria comună — vezi cazarea înainte să rezervi."
        image={HERO_DRONE_OVERVIEW}
      />

      {/* WHOLE VILLA */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="eyebrow mb-3">Vila întreagă</div>
            <h2 className="font-display text-3xl md:text-5xl text-forest-900 mb-4 text-balance">
              {villa.title}
            </h2>
            <p className="font-serif text-lg text-forest-800/85">{villa.description}</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <Embed video={villa} />
          </div>
        </div>
      </section>

      {/* APARTMENTS */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-3">Apartamentele</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-balance">
              Cele 7 apartamente, fiecare în filmul lui
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {apartmentVideos.map((v) => (
              <div key={v.youtubeId}>
                <Embed video={v} />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-forest-900">{v.title}</h3>
                    <p className="text-sm text-stone-600 mt-1 leading-relaxed">{v.description}</p>
                  </div>
                  {v.aptSlug && (
                    <Link
                      href={`/apartments/${v.aptSlug}`}
                      className="btn-secondary text-sm shrink-0 whitespace-nowrap"
                    >
                      Vezi apartamentul
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHARED KITCHEN */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="eyebrow mb-3">Bucătăria pentru Toți</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-4 text-balance">
              {kitchen.title}
            </h2>
            <p className="font-serif text-lg text-forest-800/85">{kitchen.description}</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <Embed video={kitchen} />
          </div>
          <div className="mt-10 text-center">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              ▶️ Vezi toate filmările pe canalul YouTube Vaias Aparts
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-walnut-700 py-20 text-center text-cream-50">
        <div className="container-narrow">
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 text-balance">
            Ți-a plăcut ce ai văzut?
          </h2>
          <p className="mt-5 font-serif text-xl text-cream-100/90">
            Rezervă direct pe WhatsApp — cel mai bun preț, confirmare rapidă.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/40752388388?text=Bun%C4%83%20ziua!%20Am%20v%C4%83zut%20videoclipurile%20Vila%20Vaias%20Aparts%20%C8%99i%20doresc%20s%C4%83%20rezerv.%20%F0%9F%8F%A1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900"
            >
              💬 Rezervă pe WhatsApp
            </a>
            <Link href="/apartments" className="btn-outline-light">
              Vezi apartamentele
            </Link>
          </div>
        </div>
      </section>

      {siteVideos.map((v) => (
        <script
          key={v.youtubeId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectLd(v)) }}
        />
      ))}
    </>
  );
}
