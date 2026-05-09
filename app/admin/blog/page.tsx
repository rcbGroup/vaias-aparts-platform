"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function AdminBlog() {
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((p) =>
    search === "" ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-forest-950 text-cream-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-cream-100/60 hover:text-cream-50 text-sm">← Dashboard</Link>
          <span className="text-cream-100/40">|</span>
          <span className="font-display text-lg">Blog & SEO</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/blog" target="_blank" className="text-sm text-cream-100/60 hover:text-cream-50">Blog public →</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "Articole publicate", value: blogPosts.length.toString(), color: "text-forest-700" },
            { label: "Categorii", value: new Set(blogPosts.map(p => p.category)).size.toString(), color: "text-walnut-600" },
            { label: "Timp mediu citire", value: `${Math.round(blogPosts.reduce((s, p) => s + p.readTime, 0) / blogPosts.length)} min`, color: "text-blue-600" },
            { label: "Tag-uri unice", value: new Set(blogPosts.flatMap(p => p.tags)).size.toString(), color: "text-purple-600" }
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-50 border border-stone-200 p-5 shadow-soft text-center">
              <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* SEO guidance */}
        <div className="rounded-2xl bg-forest-900 text-cream-50 p-6 mb-8">
          <h2 className="font-display text-xl mb-3">Checklist SEO</h2>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { done: true, task: "Sitemap.xml generat automat (/sitemap.xml)" },
              { done: true, task: "Robots.txt configurat (/robots.txt)" },
              { done: true, task: "Metadata (title, description, OG) pentru toate articolele" },
              { done: true, task: "Schema.org BlogPosting JSON-LD" },
              { done: false, task: "Google Search Console — adăugați proprietatea vaiasaparts.ro" },
              { done: false, task: "Google Analytics 4 — adăugați scriptul în layout.tsx" },
              { done: false, task: "Indexați sitemap.xml în Google Search Console" },
              { done: false, task: "5 articole noi în engleză pentru SEO internațional" }
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className={c.done ? "text-green-400" : "text-stone-500"}>
                  {c.done ? "✓" : "○"}
                </span>
                <span className={c.done ? "text-cream-100/80" : "text-cream-100/50"}>{c.task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Caută articol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-walnut-400 bg-cream-50"
          />
        </div>

        {/* Articles list */}
        <div className="rounded-2xl bg-cream-50 border border-stone-200 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-display text-xl text-forest-900">Articole ({filtered.length})</h2>
          </div>
          <div className="divide-y divide-stone-100">
            {filtered.map((p, i) => (
              <div key={p.slug} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-stone-50 transition">
                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl text-stone-300 w-8 shrink-0 text-right">{i + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-display text-lg text-forest-900">{p.title}</span>
                      <span className="rounded-full bg-walnut-100 text-walnut-700 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mb-1">{p.publishedAt} · {p.readTime} min · /blog/{p.slug}</div>
                    <p className="text-sm text-stone-500 line-clamp-1">{p.excerpt}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {p.tags.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] text-stone-500">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 transition"
                  >
                    Previzualizare →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended next articles */}
        <div className="mt-8 rounded-2xl bg-cream-50 border border-stone-200 shadow-soft p-6">
          <h2 className="font-display text-xl text-forest-900 mb-4">Articole recomandate — etapa 2</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Sfaturi pentru prima vizită la Mănăstirea Agapia",
              "Top 5 restaurante în Târgu Neamț",
              "Ghid complet Cetatea Neamț — intrare, program, trasee",
              "Best boutique accommodation near Neamț Monastery (EN)",
              "Moldova Monasteries Travel Guide 2026 (EN)",
              "Wochenende in der Moldau-Region — Reiseführer (DE)"
            ].map((title, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="h-6 w-6 rounded-full bg-stone-200 text-stone-500 text-xs grid place-items-center shrink-0">{i + 1}</span>
                <span className="text-sm text-forest-900">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
