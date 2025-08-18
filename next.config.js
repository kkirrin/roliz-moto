/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: [
    //   "89.104.70.149",
    //   "localhost",
    //   "127.0.0.1",
    //   "roliz.ru",
    //   "roliz-moto.ru",
    // ], 
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
        port: '1338'
      },
      {
        protocol: 'https',
        hostname: 'roliz-moto.ru',
        port: '1338'
      },

    ],
  },

};

module.exports = nextConfig;
