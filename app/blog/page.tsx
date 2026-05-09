"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";


export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-forest-950 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 to-forest-950" />
        <div className="relative container-x">
          <div className="eyebrow-light mb-4">Blog & Ghiduri</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream-50 text-balance max-w-4xl">
            Descoperă Moldova autentică.
          </h1>
          <p className="mt-5 font-serif text-xl text-cream-100/80 max-w-2xl">
            Ghiduri turistice, trasee montane, mănăstiri, gastronomie și idei de vacanță — scrise de gazde care cunosc fiecare colț al Țării de Sus.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section bg-cream-50">
        <div className="container-x">
          <div className="eyebrow mb-6">Articol recomandat</div>
          <Link href={`/blog/${featured.slug}`} className="group grid gap-8 md:grid-cols-2 items-center">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-card">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 rounded-full bg-walnut-500 px-3 py-1 text-xs font-medium text-cream-50 uppercase tracking-wider">
                {featured.category}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-[0.2em] mb-3">
                {featured.publishedAt} · {featured.readTime} min
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-forest-900 text-balance group-hover:text-walnut-700 transition">
                {featured.title}
              </h2>
              <p className="mt-4 font-serif text-lg text-forest-700/80 italic leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-walnut-600 font-medium text-sm">
                Citește articolul <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="mb-10">
            <div className="eyebrow mb-3">Toate articolele</div>
            <h2 className="font-display text-3xl md:text-4xl text-forest-900">
              Ghiduri, sfaturi și povești din Moldova.
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-lift group rounded-2xl overflow-hidden bg-cream-50 shadow-soft flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-walnut-500/90 px-2.5 py-0.5 text-[10px] font-medium text-cream-50 uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-stone-500 uppercase tracking-[0.18em] mb-2">
                    {post.publishedAt} · {post.readTime} min
                  </div>
                  <h3 className="font-display text-xl text-forest-900 text-balance group-hover:text-walnut-700 transition flex-1">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] text-stone-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-forest-900 py-20 text-cream-50">
        <div className="container-narrow text-center">
          <div className="eyebrow-light mb-4">Newsletter</div>
          <h2 className="font-display text-4xl text-cream-50">
            Povești din Moldova, în inbox-ul tău.
          </h2>
          <p className="mt-4 font-serif text-lg text-cream-100/80 max-w-xl mx-auto">
            Ghiduri noi, oferte sezoniere și un cod de reducere pentru prima rezervare directă.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="adresa@email.ro"
              className="flex-1 rounded-full bg-forest-800 border border-forest-700 px-5 py-3 text-sm text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-walnut-400"
            />
            <button type="submit" className="btn-primary">
              Abonează-te
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
