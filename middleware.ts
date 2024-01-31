import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';

export default createMiddleware({

  // Used when no locale matches
  defaultLocale: 'ua',

  localePrefix,

  // A list of all locales that are supported
  locales
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ua)/:path*']
};