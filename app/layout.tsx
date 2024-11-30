"use client";
import "./globals.css";
import localFont from "next/font/local";
import clsx from "clsx";
import Sidebar from "@/components/layout/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { publicOnlyPaths } from "@/utils/path";
import Topbar from "@/components/layout/topbar";
import CreateFolderDialog from "./my-folder/create/dialog";

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
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const isPublicOnlyPath = publicOnlyPaths.includes(pathname);

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
          <Component>{children}</Component>
        ) : (
          <QueryClientProvider client={queryClient}>
            <Sidebar>
              <Component>
                <Topbar />
                {children}
                <div id="modal-root" />
              </Component>
            </Sidebar>
            <CreateFolderDialog />
          </QueryClientProvider>
        )}
      </body>
    </html>
  );
}

function Component({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {children}
    </main>
  );
}
