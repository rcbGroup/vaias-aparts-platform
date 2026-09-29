import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr", "de", "it", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match locale prefix: /en, /en/, /en/something
  const localePrefix = SUPPORTED_LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (localePrefix) {
    // Strip locale prefix for internal rewrite (keeps app routing intact)
    const strippedPath = pathname.replace(new RegExp(`^/${localePrefix}`), "") || "/";
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = strippedPath;

    const response = NextResponse.rewrite(rewriteUrl);
    // Pass detected language to layout via response header
    response.headers.set("x-lang", localePrefix);
    // Persist lang preference in cookie so LanguageProvider picks it up client-side
    response.cookies.set("lang", localePrefix, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static assets, API routes, and Next.js internals
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)"
  ]
};
