// pages/api/sitemap.tsx

import { NextApiRequest, NextApiResponse } from "next";
import getDynamicRoutes from "../../utils/getDynamicRoutes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://dm-project.com.ua";
  const staticRoutes = ["/", "/about", "/contacts"];

  try {
    // Получаем динамические маршруты
    const dynamicResponse = await getDynamicRoutes(req, res);
    const dynamicRoutes = dynamicResponse.success ? dynamicResponse.products : [];

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
