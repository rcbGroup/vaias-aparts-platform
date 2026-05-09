import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.publishedAt
    },
    alternates: { canonical: `https://vaiasaparts.ro/blog/${post.slug}` }
  };
}

function renderBody(body: string) {
  const lines = body.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-display text-3xl md:text-4xl text-forest-900 mt-14 mb-5 text-balance">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-display text-2xl text-forest-900 mt-10 mb-4">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-semibold text-forest-800 mt-4">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="mt-4 space-y-2 pl-5">
          {items.map((item, j) => (
            <li key={j} className="text-forest-800 leading-relaxed flex gap-2">
              <span className="text-walnut-500 mt-1 shrink-0">·</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\. /)) {
        items.push(lines[i].trim().replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="mt-4 space-y-2 pl-5 list-decimal marker:text-walnut-500">
          {items.map((item, j) => (
            <li key={j} className="text-forest-800 leading-relaxed pl-1">
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line === "") {
      // skip
    } else {
      elements.push(
        <p key={i} className="text-forest-800 leading-relaxed mt-5"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
    i++;
  }

  return <>{elements}</>;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-walnut-600 underline hover:text-walnut-700">$1</a>');
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Vaias Aparts" },
    publisher: {
      "@type": "Organization",
      name: "Vaias Aparts",
      logo: { "@type": "ImageObject", url: "https://vaiasaparts.ro/logo.png" }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://vaiasaparts.ro/blog/${post.slug}` }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative bg-forest-950 pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="absolute inset-0 opacity-25">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 to-forest-950" />
        <div className="relative container-narrow">
          <Link href="/blog" className="text-sm text-cream-100/60 hover:text-cream-50 inline-flex items-center gap-1 mb-6">
            ← Înapoi la blog
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="rounded-full bg-walnut-500 px-3 py-1 text-xs font-medium text-cream-50 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-cream-100/60 text-sm">{post.publishedAt} · {post.readTime} min de citit</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 text-balance leading-[1.05]">
            {post.title}
          </h1>
          <p className="mt-5 font-serif text-xl text-cream-100/80 max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* COVER IMAGE */}
      <div className="container-narrow -mt-8">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card-hover">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <article className="section">
        <div className="container-narrow">
          <div className="prose max-w-none">
            {renderBody(post.body)}
          </div>

          {/* TAGS */}
          <div className="mt-12 pt-8 border-t border-stone-200 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-600">
                #{t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-forest-900 text-cream-50 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 pattern-moldavian-dark opacity-50 pointer-events-none" />
            <div className="relative">
              <div className="eyebrow-light mb-3">Cazare boutique în Târgu Neamț</div>
              <h3 className="font-display text-3xl md:text-4xl text-cream-50 text-balance">
                Planifică-ți vacanța la Vaias Aparts.
              </h3>
              <p className="mt-4 font-serif text-lg text-cream-100/85">
                7 apartamente cu paturi Emperor 2m×2m, bucătărie proprie și parcare gratuită. Rezervare directă = cel mai bun preț.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/rezervare" className="btn-primary bg-cream-50 text-forest-900 hover:bg-cream-100 hover:text-forest-900">
                  Rezervă acum
                </Link>
                <a href="https://wa.me/40738345330" target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED */}
      <section className="section bg-stone-50">
        <div className="container-x">
          <div className="eyebrow mb-3">Mai multe articole</div>
          <h2 className="font-display text-3xl text-forest-900 mb-10">
            Continuă să explorezi.
          </h2>
          <div className="grid gap-7 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-lift group rounded-2xl overflow-hidden bg-cream-50 shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-stone-500 uppercase tracking-[0.18em] mb-2">
                    {p.category} · {p.readTime} min
                  </div>
                  <h3 className="font-display text-lg text-forest-900 group-hover:text-walnut-700 transition text-balance">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
