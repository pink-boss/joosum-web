"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import clsx from "clsx";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

import DynamicOpenDialogs from "@/components/dialog/DynamicOpenDialogs";
import DynamicOpenDrawers from "@/components/drawer/DynamicOpenDrawers";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Loading from "@/components/Loading";
import { ToastProvider } from "@/components/notification/ToastProvider";
import PublicPathHeader from "@/components/PublicPathHeader";
import ScreenSizeWrapper from "@/components/ScreenSizeWrapper";
import { publicOnlyPaths } from "@/utils/path";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
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
          if (error instanceof Error && error.message.includes("4")) {
            return false;
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: "always",
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
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
  const isPublicOnlyPath = publicOnlyPaths.includes(pathname);
  const [queryClient] = useState(() => getQueryClient());

  return (
    <html lang="ko">
      <head>
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          async
        ></script>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </head>
      <body className={clsx(pretendard.variable, "font-pretendard")}>
        <ScreenSizeWrapper>
          {isPublicOnlyPath ? (
            <Component className="justify-center">
              <PublicPathHeader />
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </Component>
          ) : (
            <QueryClientProvider client={queryClient}>
              <ToastProvider>
                <Sidebar>
                  <Component>
                    <Topbar />
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                    <div id="drawer-root" />
                    <div id="modal-root" />
                    <DynamicOpenDrawers />
                    <DynamicOpenDialogs />
                  </Component>
                </Sidebar>
              </ToastProvider>
              {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
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
    <main
      className={clsx(
        "relative flex h-screen w-full flex-col items-center bg-white text-black",
        className && className,
      )}
    >
      {children}
    </main>
  );
}
