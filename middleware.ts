import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config";

export default createMiddleware({
  locales,
  defaultLocale: "ua",
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
