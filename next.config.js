/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,
  images: {
    domains: [
      "wmc-euw.b-cdn.net",
      "wmc-us-east.b-cdn.net",
      "flat-disk-f8fd.instasuche.workers.dev",
    ],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
