import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create intl middleware once
const intlMiddleware = createMiddleware(routing);

function isInfoPath(pathname: string) {
  return pathname === "/info" || pathname.startsWith("/info/");
}

function isLocaleInfoPath(pathname: string) {
  // Handles /uk/info and /uk/info/...
  const segments = pathname.split("/").filter(Boolean); // ["uk","info",...]
  if (segments.length < 2) return false;

  const [maybeLocale, second] = segments;

  // routing.locales can be string[] in next-intl routing config
  // @ts-expect-error: depends on your routing typing, but works at runtime
  const locales: string[] = routing.locales ?? [];

  return locales.includes(maybeLocale) && second === "info";
}

export default function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname, hostname } = nextUrl;

  // ---------------------------------------------------------------------------
  // 1) 301 redirect www -> canonical
  // ---------------------------------------------------------------------------
  if (hostname.startsWith("www.")) {
    const url = nextUrl.clone();
    url.hostname = hostname.replace(/^www\./, "");
    return NextResponse.redirect(url, 301);
  }

  // ---------------------------------------------------------------------------
  // 2) Keep WP route stable:
  //    - /info and /info/* bypass next-intl completely
  //    - /{locale}/info -> redirect to /info (optional but recommended)
  // ---------------------------------------------------------------------------
  // if (isLocaleInfoPath(pathname)) {
  //   const url = nextUrl.clone();

  //   // strip first segment (locale) from /{locale}/info...
  //   const segments = pathname.split("/").filter(Boolean);
  //   // segments = [locale, "info", ...rest]
  //   const rest = segments.slice(1); // ["info", ...]
  //   url.pathname = "/" + rest.join("/");

  //   return NextResponse.redirect(url, 301);
  // }

if (pathname.startsWith("/info")) {
    const res = NextResponse.next();

    // Keep your "noindex for test domains" logic for /info too
    if (hostname.startsWith("test")) {
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    res.headers.set("X-Forwarded-Host", "dm-project.com.ua");
    res.headers.set("X-Forwarded-Proto", "https");
    return res;
  }

  // ---------------------------------------------------------------------------
  // 3) next-intl routing (everything else)
  // ---------------------------------------------------------------------------
  const response = intlMiddleware(request);

  // If next-intl did a redirect — return it immediately
  if (response.headers.has("Location")) {
    return response;
  }

  // ---------------------------------------------------------------------------
  // 4) Legacy redirect /home -> /
  // ---------------------------------------------------------------------------
  if (pathname.endsWith("/home")) {
    const url = nextUrl.clone();
    url.pathname = pathname.replace(/\/home$/, "") || "/";
    return NextResponse.redirect(url, 301);
  }

  // ---------------------------------------------------------------------------
  // 5) Disallow indexing for test domains
  // ---------------------------------------------------------------------------
  if (hostname.startsWith("test")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
