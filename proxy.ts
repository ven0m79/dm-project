import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create intl middleware once
const intlMiddleware = createMiddleware(routing);

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

  if (pathname.startsWith("/info")) {
    const res = NextResponse.next();
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
  if (hostname === "test.dm-project.com.ua") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
