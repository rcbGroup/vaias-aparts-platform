import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { generateBlogPost, topicCatalog, ALL_TOPICS } from "@/src/lib/agents/seoContent";

const schema = z.object({
  topic: z.enum([
    "monastery_circuit",
    "neamt_citadel",
    "winter_holidays_neamt",
    "easter_pilgrimage",
    "summer_family_neamt",
    "diaspora_return",
    "wellness_oglinzi",
    "ceahlau_hike",
    "food_traditions_moldova",
    "wedding_neamt",
  ]),
  language: z.enum(["ro", "en"]).optional(),
  keywords: z.array(z.string()).optional(),
  apartmentSlug: z.string().optional(),
  publish: z.boolean().optional(),
});

export async function GET() {
  return NextResponse.json({ ok: true, topics: topicCatalog(), allTopics: ALL_TOPICS });
}

export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }

  const post = generateBlogPost(parsed.data);

  // Persist to BlogPost if publish=true.
  if (parsed.data.publish) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        create: {
          slug: post.slug,
          title: post.title,
          excerpt: post.metaDescription,
          body: post.body,
          category: parsed.data.topic,
          tags: post.keywords,
          published: true,
          publishedAt: new Date(),
          seoTitle: post.title,
          seoDesc: post.metaDescription,
          coverImage: post.ogImage,
        },
        update: {
          title: post.title,
          excerpt: post.metaDescription,
          body: post.body,
          tags: post.keywords,
          published: true,
          seoTitle: post.title,
          seoDesc: post.metaDescription,
          coverImage: post.ogImage,
        },
      });
    } catch (err: any) {
      return NextResponse.json({ ok: false, generated: post, dbError: err.message }, { status: 200 });
    }
  }

  return NextResponse.json({ ok: true, post });
}
