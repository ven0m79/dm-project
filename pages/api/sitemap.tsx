// pages/api/sitemap.tsx

import { NextApiRequest, NextApiResponse } from "next";
import getDynamicRoutes from "../../utils/getDynamicRoutes";
//import getDynamicRoutesCategory from "../../utils/getDynamicRoutesCategory";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://dm-project.com.ua";
  const staticRoutes = ["/catalog/sub-catalog?category=or-equipment",
    "/catalog/sub-catalog?category=icu-equipment",
    "/catalog/sub-catalog?category=neonatal-equipment",
    "/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment",
    "/catalog/sub-catalog?category=gas-management-systems",
    "/catalog/sub-catalog?category=furniture",
    "/catalog/sub-catalog?category=accessories",
    "/en/catalog/sub-catalog?category=or-equipment",
    "/en/catalog/sub-catalog?category=icu-equipment",
    "/en/catalog/sub-catalog?category=neonatal-equipment",
    "/en/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment",
    "/en/catalog/sub-catalog?category=gas-management-systems",
    "/en/catalog/sub-catalog?category=furniture",
    "/en/catalog/sub-catalog?category=accessories",];

  try {
    // Получаем динамические маршруты
    const dynamicResponse = await getDynamicRoutes(req, res);
    const dynamicRoutes = dynamicResponse.success ? dynamicResponse.products : [];

    //const dynamicResponse1 = await getDynamicRoutesCategory(req, res);
    //const dynamicRoutes1 = dynamicResponse1.success ? dynamicResponse1.categories : [];
    // Все маршруты
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Формирование XML карты сайта
    const urls = allRoutes.map(
      (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join("")}
      </urlset>`;

    // Отправка карты сайта
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}