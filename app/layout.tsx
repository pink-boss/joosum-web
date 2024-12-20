"use client";

import "./globals.css";
import localFont from "next/font/local";
import clsx from "clsx";
import Sidebar from "@/components/layout/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { publicOnlyPaths } from "@/utils/path";
import Topbar from "@/components/layout/Topbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DynamicOpenDialogs from "@/components/dialog/DynamicOpenDialogs";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { MutateLinkDrawer } from "./link-book/drawer/dynamic";

const queryClient = new QueryClient();

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicOnlyPath = publicOnlyPaths.includes(pathname);

  const { isLinkDrawerOpen } = useOpenDrawerStore();

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
      <body className={clsx(pretendard.variable, "bg-white font-pretendard")}>
        {isPublicOnlyPath ? (
          <Component className="justify-center">{children}</Component>
        ) : (
          <QueryClientProvider client={queryClient}>
            <Sidebar>
              <Component>
                <Topbar />
                {children}
                <div id="drawer-root" />
                <div id="modal-root" />
                {isLinkDrawerOpen && <MutateLinkDrawer />}
                <DynamicOpenDialogs />
              </Component>
            </Sidebar>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        )}
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
        "relative flex h-screen w-full flex-col items-center",
        className && className,
      )}
    >
      {children}
    </main>
  );
}
