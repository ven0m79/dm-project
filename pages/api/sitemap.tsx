// pages/sitemap.xml.ts (Next.js pages router)
// або app/sitemap.xml/route.ts (якщо у тебе app router)

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://dm-project.com.ua";

  // ⚡ Жодних пробілів перед <?xml ... ?>
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-0.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/api/sitemapCategories</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/api/sitemapProducts</loc>
  </sitemap>
</sitemapindex>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // ⚡ Прибираємо будь-які BOM/UTF-8 сміття
  res.write(sitemapIndex.trim());
  res.end();
}
