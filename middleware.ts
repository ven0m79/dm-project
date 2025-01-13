import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config";
import { NextResponse } from "next/server";

export function middleware(req: { nextUrl: { pathname: any; clone: () => any; }; cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }; }) {
  const pathname = req.nextUrl.pathname;
  const locale = pathname.split('/')[1];
  const supportedLocales = ['ua', 'en'];

  // Локаль из куки
  const cookieLocale = req.cookies.get('locale')?.value;

  // Если локаль отсутствует в пути и не задана в куки, перенаправляем на defaultLocale
  if (!supportedLocales.includes(locale)) {
    const defaultLocale = cookieLocale && supportedLocales.includes(cookieLocale) ? cookieLocale : 'ua';
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
