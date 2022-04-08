/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
