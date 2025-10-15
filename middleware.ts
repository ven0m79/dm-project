import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";
import { locales, defaultLocale, localePrefix } from "./config";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const url = new URL(req.url);
  const hostname = url.hostname;

  // --- 🔁 301 редірект з www на canonical домен ---
  if (hostname.startsWith("www.")) {
    const newUrl = new URL(req.url);
    newUrl.hostname = hostname.replace("www.", "");
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  // --- 🔁 Якщо користувач на /home або /en/home → редіректимо на корінь ---
  if (pathname === "/home") {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = "/";
    return NextResponse.redirect(newUrl, 301);
  } else if (pathname === "/en/home") {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = "/en";
    return NextResponse.redirect(newUrl, 301);
  }

  // --- 🌍 Міжнародні маршрути ---
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
  });

  const response = intlMiddleware(req);

  // --- 🧱 Забороняємо індексацію для тестових доменів ---
  if (hostname.startsWith("test")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
