// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";
import transpileModules from "next-transpile-modules";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts"); // правильний шлях
const withTM = transpileModules(["framer-motion"]); // import замість require

const nextConfig = {
  reactStrictMode: true,

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

  trailingSlash: true,

  async rewrites() {
    return [

      {
        source: "/info/wp-admin/:path*",
        destination: "https://info.dm-project.com.ua/wp-admin/:path*"
      },
      {
        source: "/info/wp-login.php",
        destination: "https://info.dm-project.com.ua/wp-login.php"
      },
      {
        source: "/info/:path*",
        destination: "https://info.dm-project.com.ua/:path*"
      },
      {
        source: "/info",
        destination: "https://info.dm-project.com.ua",
      },
      {
        source: "/info/:path*",
        destination: "https://info.dm-project.com.ua/:path*",
      },
    ];
  },



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
        source: "/:path*\\.(ico|png|svg|webp|jpg|jpeg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

// 🌟 Комбінуємо плагіни ES Module
export default withNextIntl(withTM(nextConfig));
