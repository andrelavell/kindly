/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
    unoptimized: true,
    domains: ['joinkindly.org']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure static files are handled correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : ''
};

module.exports = nextConfig;
