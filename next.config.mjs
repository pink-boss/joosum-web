/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  devIndicators: false,

  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // ngrok 사용 시 호스트 헤더 불일치 문제 해결
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.ngrok.io', '*.ngrok-free.app', 'appleid.apple.com', 'app.joosum.com'],
    },
  },

  // SVG를 React Component로 변환
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
