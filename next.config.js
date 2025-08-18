/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '89.104.70.149',
        port: '1338'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000'
      },
      {
        protocol: 'https',
        hostname: 'roliz.ru',
      },
      {
        protocol: 'https',
        hostname: 'roliz-moto.ru',
      },
    ],
  },

};

module.exports = nextConfig;
