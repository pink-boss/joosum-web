/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // ngrok 사용 시 호스트 헤더 불일치 문제 해결
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.ngrok.io",
        "*.ngrok-free.app",
        "appleid.apple.com",
        "app.joosum.com",
      ],
    },
  },
};

export default nextConfig;
