'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';

import { Suspense, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';

import { DynamicDialogs } from '@/components/dynamic-dialogs';
import { DynamicDrawers } from '@/components/dynamic-drawers';
import Loader from '@/components/loader';
import { NotificationToastProvider } from '@/components/notification';
import PublicPathHeader from '@/components/public-path-header';
import ScreenSizeWrapper from '@/components/screen-size-wrapper';
import Gnb from '@/layouts/gnb';
import Lnb from '@/layouts/lnb';

import { publicOnlyPaths } from '@/utils/path';

import './globals.css';

const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

// QueryClient 최적화 설정
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분 (구 cacheTime)
        retry: (failureCount, error) => {
          // 4xx 에러는 재시도하지 않음
          if (error instanceof Error && error.message.includes('4')) {
            return false;
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: 'always',
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicOnlyPath = publicOnlyPaths.some((path) => pathname.startsWith(path));

  const [queryClient] = useState(() => getQueryClient());

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
        <GoogleTagManager gtmId="GTM-K4FXLG7Z" />
        <ScreenSizeWrapper>
          {isPublicOnlyPath ? (
            <Component className="justify-center">
              <PublicPathHeader />
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </Component>
          ) : (
            <QueryClientProvider client={queryClient}>
              <NotificationToastProvider>
                <div className="flex h-screen">
                  <Lnb />
                  <Component>
                    <Gnb />
                    <Suspense fallback={<Loader />}>
                      <main className="relative w-full flex-1">{children}</main>
                    </Suspense>
                    <div id="drawer-root" />
                    <div id="modal-root" />
                    <DynamicDrawers />
                    <DynamicDialogs />
                  </Component>
                </div>
              </NotificationToastProvider>
            </QueryClientProvider>
          )}
        </ScreenSizeWrapper>
      </body>
    </html>
  );
}

function Component({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        'h-screen flex-1 overflow-x-hidden',
        'flex flex-col items-center',
        'bg-white text-black',
        className && className,
      )}
    >
      {children}
    </div>
  );
}
