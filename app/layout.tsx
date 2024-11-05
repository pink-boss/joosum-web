"use client";
import "./globals.css";
import localFont from "next/font/local";
import clsx from "clsx";
import Logout from "@/components/auth/logout";
import Withdraw from "@/components/auth/withdraw";

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
        <Logout />
        <Withdraw />
        <Component>{children}</Component>
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
    <main className="flex min-h-screen flex-col items-center justify-center">
      {children}
    </main>
  );
}
