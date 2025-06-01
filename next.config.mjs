// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 개발 환경에서 WebSocket 관련 에러 방지
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 개발 환경에서 WebSocket 연결 에러 방지
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
