import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { locales, defaultLocale, localePrefix } from "./config";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const url = new URL(req.url);
  const hostname = url.hostname;

  if (pathname.startsWith(`/${defaultLocale}/`)) {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = pathname.replace(`/${defaultLocale}`, "");
    return NextResponse.redirect(newUrl, 301);
  } else if (pathname === `/${defaultLocale}`) {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = "/";
    return NextResponse.redirect(newUrl, 301);
  }

  if (pathname === "/home") {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = "/";
    return NextResponse.redirect(newUrl, 301);
  } else if (pathname === "/en/home") {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = "/en";
    return NextResponse.redirect(newUrl, 301);
  }

  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
  });

  const response = intlMiddleware(req);

  if (hostname.startsWith("test")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // This matcher configuration looks correct for catching all relevant paths
  // and allowing next-intl to handle them.
  matcher: ["/((?!api|_next|.*\\..*).*)", "/", "/(ua|en)/:path*"],
};
