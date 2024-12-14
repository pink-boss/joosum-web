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
import { useOpenDialogStore } from "@/store/useDialogStore";
import {
  DeleteLinkBookDialog,
  DeleteLinkDialog,
  MutateLinkBookDialog,
} from "@/components/dialog/dynamic";

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
  const { isMutateLinkBookOpen, isDeleteLinkBookOpen, isDeleteLinkOpen } =
    useOpenDialogStore();

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
                <div id="modal-root" />
                {isMutateLinkBookOpen && <MutateLinkBookDialog />}
                {isDeleteLinkBookOpen && <DeleteLinkBookDialog />}
                {isDeleteLinkOpen && <DeleteLinkDialog />}
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
