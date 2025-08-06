import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, // 301 redirect
      },
      {
        source: '/en/home',
        destination: '/en',
        permanent: true, // 301 redirect
      },
      {
        source: '/ua/:path*',
        destination: '/:path*',
        permanent: true, // 301 redirect
      }
    ];
  }
};


export default withNextIntl(nextConfig);
