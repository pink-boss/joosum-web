import { Metadata } from 'next';
import localFont from 'next/font/local';

import { ReactNode } from 'react';

import StructuredData from '@/components/structured-data';
import { ClientLayout } from '@/layouts/layout';

import { clsx } from '@/utils/clsx';

import './globals.css';

const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: '주섬 - 간편한 링크 아카이빙 서비스',
    template: '%s | 주섬',
  },
  description:
    '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하세요. 주섬과 함께 나만의 디지털 아카이브를 만들어보세요.',
  keywords: ['링크 저장', '북마크', '아카이빙', '웹 클리핑', '정보 정리', '주섬', 'joosum'],
  authors: [{ name: 'Joosum Team' }],
  creator: 'Joosum',
  publisher: 'Joosum',
  appleWebApp: {
    capable: true,
    title: '주섬',
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://app.joosum.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '주섬 - 간편한 링크 아카이빙 서비스',
    description:
      '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하세요. 주섬과 함께 나만의 디지털 아카이브를 만들어보세요.',
    url: 'https://app.joosum.com',
    siteName: '주섬',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '주섬 - 간편한 링크 아카이빙 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '주섬 - 간편한 링크 아카이빙 서비스',
    description: '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하세요.',
    images: ['/images/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <StructuredData />
        <script
          async
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          type="text/javascript"
        ></script>
        <script async src="https://accounts.google.com/gsi/client"></script>
        <script
          async
          crossOrigin="anonymous"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        ></script>
      </head>
      <body className={clsx(pretendard.variable, 'font-pretendard')}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
