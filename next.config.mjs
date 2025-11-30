import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
    loader: "default",
    formats: ["image/avif", "image/webp"],

    /** 
     * 🟢 ONLY remotePatterns — сучасний підхід
     * Покриває всі випадки WooCommerce (API + сайт, http/https)
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dm-project.com.ua",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dm-project.com.ua",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.dm-project.com.ua",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "dm-project.com.ua",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.dm-project.com.ua",
        pathname: "/**",
      },
    ],

    deviceSizes: [320, 480, 768, 1024, 1280, 1600],
  },
};

export default withNextIntl(nextConfig);
