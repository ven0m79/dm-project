import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config";

export default createMiddleware({
  defaultLocale: locales[0],
  locales,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
