/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
     domains: [
      "89.104.70.149",
      "localhost",
      "127.0.0.1",
      "roliz.ru",
      "roliz-moto.ru",
    ], // замените это значение на ваш домен или IP-адрес изображений
  },
};

module.exports = nextConfig;
