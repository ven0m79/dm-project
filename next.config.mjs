import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Оптимізація картинок
  images: {
    loader: "default",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Хедери для кешування
 
  // Додатково: дозволяємо оптимізацію локальних картинок без проблем на продакшені
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

export default withNextIntl(nextConfig);
