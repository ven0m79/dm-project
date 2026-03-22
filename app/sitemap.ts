import type { MetadataRoute } from "next";
import {
  categoriesENIdData,
  categoriesUAIdData,
} from "@app/[locale]/components/constants";

const siteUrl = process.env.SITE_URL || "https://dm-project.com.ua";

const staticRoutes = [
  "/",
  "/about",
  "/catalog",
  "/catalog/sub-catalog",
  "/contacts",
  "/projects",
  "/services",
  "/shares",
  "/partners/atos",
  "/partners/dreger",
  "/partners/fsn",
  "/partners/inspital",
  "/partners/lojer",
  "/partners/mimp",
  "/partners/prohs",
  "/partners/renosem",
  "/shares/linea",
  "/shares/polaris200",
  "/shares/polaris200-2",
  "/shares/fabiusplusxl",
  "/shares/atlan300",
  "/shares/AWD655-2H-V1",
  "/shares/AWD655-2H-V2",
];

function withLocale(pathname: string, locale: "ua" | "en") {
  const normalizedPath = pathname === "/" ? "" : pathname;
  return locale === "ua" ? normalizedPath || "/" : `/en${normalizedPath}`;
}

function buildAbsoluteUrl(pathname: string) {
  return `${siteUrl}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const urls = new Set<string>();

  for (const locale of ["ua", "en"] as const) {
    for (const pathname of staticRoutes) {
      urls.add(buildAbsoluteUrl(withLocale(pathname, locale)));
    }
  }

  for (const slug of Object.keys(categoriesUAIdData)) {
    urls.add(
      buildAbsoluteUrl(
        `/catalog/sub-catalog?category=${encodeURIComponent(slug)}`,
      ),
    );
  }

  for (const slug of Object.keys(categoriesENIdData)) {
    urls.add(
      buildAbsoluteUrl(
        `/en/catalog/sub-catalog?category=${encodeURIComponent(slug)}`,
      ),
    );
  }

  return Array.from(urls).map((url) => ({
    url,
    lastModified,
    changeFrequency: "weekly",
    priority: url.includes("/catalog") ? 0.9 : 0.7,
  }));
}
