import { NextApiRequest, NextApiResponse } from "next";
import getDynamicRoutes from "../../utils/getDynamicRoutes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://dm-project.com.ua";

  try {
    const dynamicResponse = await getDynamicRoutes();
    const dynamicRoutes = dynamicResponse.success ? dynamicResponse.products : [];

    const urls = dynamicRoutes.map((route: { url: string; date_modified: string }) => {
      const cleanRoute = route.url.startsWith("/ua/")
        ? route.url.replace(/^\/ua\//, "/")
        : route.url;

      const lastmod = route.date_modified
        ? new Date(route.date_modified).toISOString().split("T")[0] // YYYY-MM-DD
        : new Date().toISOString().split("T")[0];

      return `
        <url>
          <loc>${baseUrl}${cleanRoute}</loc>
          <lastmod>${lastmod}</lastmod>
        </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join("")}
      </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}
