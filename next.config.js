/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  // 여기에 다른 Next.js 설정을 추가할 수 있습니다.
};

module.exports = withPWA(nextConfig);
