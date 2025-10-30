import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // 🧩 Кешування статичних файлів Next.js
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 рік
          },
        ],
      },

      // 🖼️ Кешування зображень (якщо вони в /public/images або /images)
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // 📦 Кешування шрифтів (якщо є в /public/fonts)
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // 🧰 Додатково: кешування favicon та іконок
      {
        source: "/:path*.{ico,png,svg,webp}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['api.dm-project.com.ua'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dm-project.com.ua',
        pathname: '/**',
      },
    ],
    deviceSizes: [320, 480, 768, 1024, 1280, 1600],
  },
};

export default withNextIntl(nextConfig);
