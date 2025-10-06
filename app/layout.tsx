import localFont from 'next/font/local';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ClientLayout } from '@/layouts/layout';

import './globals.css';

const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

// export const metadata: Metadata = {
//   title: {
//     default: '주섬 - 링크 URL 저장 관리 앱 JOOSUM',
//     template: '%s | 주섬',
//   },
//   description:
//     '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하세요. 주섬과 함께 나만의 디지털 아카이브를 만들어보세요.',
//   keywords: ['링크 저장', '북마크', '아카이빙', '웹 클리핑', '정보 정리', '주섬', 'joosum'],
//   authors: [{ name: '주섬' }],
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL('https://app.joosum.com'),
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: '주섬 - 링크 URL 저장 관리 앱 JOOSUM',
//     description:
//       '나중에 보고 싶은 영상, 글, 웹페이지를 주섬주섬 모아 저장해두세요. 필요한 상황에 링크를 찾기 힘들지 않게 폴더별로 관리하고, 태그를 통해 어떤 내용인지 미리 파악하세요.',
//     url: 'https://app.joosum.com',
//     siteName: '주섬',
//     locale: 'ko_KR',
//     type: 'website',
//     images: [
//       {
//         url: '/og-image.png',
//         width: 1200,
//         height: 630,
//         alt: '주섬 - 링크 URL 저장 관리 앱 JOOSUM',
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: '주섬 - 링크 URL 저장 관리 앱 JOOSUM',
//     description:
//       '나중에 보고 싶은 영상, 글, 웹페이지를 주섬주섬 모아 저장해두세요. 필요한 상황에 링크를 찾기 힘들지 않게 폴더별로 관리하고, 태그를 통해 어떤 내용인지 미리 파악하세요.',
//     images: ['/og-image.png'],
//   },
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
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
