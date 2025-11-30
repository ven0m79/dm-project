import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,


  images: {
  unoptimized: false,
  formats: ["image/avif", "image/webp"],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "api.dm-project.com.ua",
      pathname: "/**",
    },
  ],
},


  // Хедери для кешування
  async headers() {
    return [
      // 1. Кешуємо Next.js статичні файли (JS/CSS) на 1 рік
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // 2. Кешуємо картинки з public/images на 1 рік
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // 3. Кешуємо шрифти
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // 4. Кешуємо SVG, ICO, WEBP, PNG у корені public/
      {
        source: "/:path*\\.(ico|png|svg|webp|jpg|jpeg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // 5. Забороняємо кешування HTML сторінок (SSR/ISR/Routes)
      {
        source: "/((?!_next/static|images|fonts).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
}
export default withNextIntl(nextConfig);
