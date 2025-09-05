// pages/api/sitemap.tsx

import { NextApiRequest, NextApiResponse } from "next";
import getDynamicRoutes from "../../utils/getDynamicRoutes";
//import getDynamicRoutesCategory from "../../utils/getDynamicRoutesCategory";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://dm-project.com.ua";

  try {
    // Получаем динамические маршруты
    const dynamicResponse = await getDynamicRoutes(req, res);
    const dynamicRoutes = dynamicResponse.success ? dynamicResponse.products : [];

     // Все маршруты
    const allRoutes = [...dynamicRoutes];

    // Формирование XML карты сайта
    const urls = allRoutes.map((route) => {
      // Якщо починається з "/ua/", замінюємо на "/"
      const cleanRoute = route.startsWith("/ua/") ? route.replace(/^\/ua\//, "/") : route;

      return `
        <url>
          <loc>${baseUrl}${cleanRoute}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>`;
    });

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