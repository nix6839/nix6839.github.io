/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
    newNextLinkBehavior: true,
  },
};

module.exports = nextConfig;
