import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config";
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const url = new URL(req.url);
  const hostname = url.hostname;

  const supportedLocales = ['ua', 'en'];
  const defaultLocale = 'ua';

  const pathLocale = pathname.split('/')[1];

  // 🛑 Якщо є /ua у URL — редирект на шлях без /ua
  if (pathLocale === 'ua') {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/ua/, '') || '/';
    return NextResponse.redirect(newUrl);
  }

  // 🔁 Обробка middleware через next-intl
  const intlMiddleware = createMiddleware({
    locales: supportedLocales,
    defaultLocale: defaultLocale,
    localePrefix: 'as-needed',
  });

  const response = intlMiddleware(req);

  // 🕷️ Заборона індексації для subdomain test.*
  if (hostname.startsWith('test')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
