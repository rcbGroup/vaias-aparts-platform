import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/reviews
 *   ?refresh=1 — re-fetch from Google Places (rate-limit safe; only does network call when key present)
 *
 * Returns: { reviews: PlatformReview[], stats: { google: {...} } }
 *
 * Notes:
 *   - Uses Google Places API "Place Details" with `fields=reviews,rating,user_ratings_total`.
 *   - When GOOGLE_BUSINESS_API_KEY + GOOGLE_PLACE_ID are configured, fetches & upserts.
 *   - Always returns DB-cached reviews so the dashboard works without network.
 */

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  language?: string;
  time: number;
  relative_time_description?: string;
  profile_photo_url?: string;
};

type GooglePlaceDetailsResponse = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
  };
  error_message?: string;
};

async function fetchGoogleReviews(): Promise<{
  ok: boolean;
  rating?: number;
  totalCount?: number;
  reviews: GoogleReview[];
  error?: string;
}> {
  const apiKey = process.env.GOOGLE_BUSINESS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    return { ok: false, reviews: [], error: "missing-credentials" };
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("reviews_no_translations", "true");
  url.searchParams.set("reviews_sort", "newest");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!res.ok) return { ok: false, reviews: [], error: `http-${res.status}` };
    const data = (await res.json()) as GooglePlaceDetailsResponse;
    if (data.status !== "OK") {
      return { ok: false, reviews: [], error: data.error_message ?? data.status };
    }
    return {
      ok: true,
      rating: data.result?.rating,
      totalCount: data.result?.user_ratings_total,
      reviews: data.result?.reviews ?? [],
    };
  } catch (err) {
    return { ok: false, reviews: [], error: err instanceof Error ? err.message : "fetch-failed" };
  }
}

export async function GET(req: NextRequest) {
  if (!getAdminSession(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const refresh = searchParams.get("refresh") === "1";

  let googleStats: { rating?: number; totalCount?: number; error?: string } = {};

  if (refresh) {
    const fetched = await fetchGoogleReviews();
    googleStats = {
      rating: fetched.rating,
      totalCount: fetched.totalCount,
      error: fetched.error,
    };

    // Upsert reviews into PlatformReview, deduped on (platform, externalId)
    for (const r of fetched.reviews) {
      const externalId = `${r.author_name}-${r.time}`;
      try {
        await prisma.platformReview.upsert({
          where: {
            platform_externalId: { platform: "google", externalId },
          },
          update: {
            rating: r.rating,
            body: r.text || "",
            language: r.language,
            authorName: r.author_name,
            reviewedAt: new Date(r.time * 1000),
          },
          create: {
            platform: "google",
            externalId,
            authorName: r.author_name,
            rating: r.rating,
            body: r.text || "",
            language: r.language,
            reviewedAt: new Date(r.time * 1000),
          },
        });
      } catch {
        // ignore individual upsert failures
      }
    }
  }

  const dbReviews = await prisma.platformReview.findMany({
    orderBy: { reviewedAt: "desc" },
    take: 50,
  });

  // Also expose Booking.com snapshot from env or constants
  const stats = {
    google: {
      rating: googleStats.rating ?? null,
      totalCount: googleStats.totalCount ?? null,
      fetchError: googleStats.error ?? null,
    },
    booking: {
      rating: 9.4,
      url: "https://www.booking.com/hotel/ro/vaias-aparts-targu-neamt.html",
    },
  };

  return NextResponse.json({
    refreshed: refresh,
    reviews: dbReviews.map((r) => ({
      id: r.id,
      platform: r.platform,
      authorName: r.authorName,
      rating: r.rating,
      body: r.body,
      apartment: r.apartment,
      language: r.language,
      reviewedAt: r.reviewedAt.toISOString().split("T")[0],
      responded: r.responded,
    })),
    stats,
  });
}
