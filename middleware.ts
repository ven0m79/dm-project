import createMiddleware from 'next-intl/middleware';
//import { locales, localePrefix } from './navigation';

export default createMiddleware({

  // Used when no locale matches
  defaultLocale: 'ua',
  
  localePrefix: 'as-needed',

  // A list of all locales that are supported
  locales: ["ua","en"]
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ua)/:path*']
};