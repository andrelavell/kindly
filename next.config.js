/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  swcMinify: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ]
  },
  output: 'standalone',
  poweredByHeader: false,
  typescript: {
    // Since extension code is not part of the Next.js build
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      'aws-crt': false,
    };

    return config;
  }
}

module.exports = nextConfig;
