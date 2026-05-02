import type { MetadataRoute } from "next";
import {
  getAllCategorySlugsByLocale,
  getAllProductIdsByLocale,
} from "../lib/db/queries";

const BASE = "https://dm-project.com.ua";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [uaCategorySlugs, enCategorySlugs, uaProductIds, enProductIds] =
    await Promise.all([
      getAllCategorySlugsByLocale("ua"),
      getAllCategorySlugsByLocale("en"),
      getAllProductIdsByLocale("ua"),
      getAllProductIdsByLocale("en"),
    ]);

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  entries.push(
    { url: BASE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/en`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/catalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/en/catalog`, changeFrequency: "weekly", priority: 0.9 },
  );

  // Category pages (UA — no prefix)
  for (const slug of uaCategorySlugs) {
    entries.push({
      url: `${BASE}/catalog/sub-catalog?category=${encodeURIComponent(slug)}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Category pages (EN)
  for (const slug of enCategorySlugs) {
    entries.push({
      url: `${BASE}/en/catalog/sub-catalog?category=${encodeURIComponent(slug)}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Product pages (UA)
  for (const id of uaProductIds) {
    entries.push({
      url: `${BASE}/catalog/sub-catalog/product/${id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Product pages (EN)
  for (const id of enProductIds) {
    entries.push({
      url: `${BASE}/en/catalog/sub-catalog/product/${id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
