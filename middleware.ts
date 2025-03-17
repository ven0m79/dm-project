import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config";
import { NextResponse } from "next/server";

export function middleware(req: {
  url: string | URL; nextUrl: { pathname: any; clone: () => any; }; cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }; 
}) {
  const pathname = req.nextUrl.pathname;
  const locale = pathname.split('/')[1];
  const supportedLocales = ['ua', 'en'];
  const url = new URL(req.url);
  const hostname = url.hostname;

  // Локаль из куки
  const cookieLocale = req.cookies.get('locale')?.value;

  // Если локаль отсутствует в пути и не задана в куки, перенаправляем на defaultLocale
  if (!supportedLocales.includes(locale)) {
    const defaultLocale = cookieLocale && supportedLocales.includes(cookieLocale) ? cookieLocale : 'ua';
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (hostname.startsWith('test')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
