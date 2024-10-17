const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  mode: 'production', //혹은 'development'에 따라 조정
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  // 여기에 다른 Next.js 설정을 추가할 수 있습니다.
};

module.exports = withPWA(nextConfig);
