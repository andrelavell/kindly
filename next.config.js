/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
