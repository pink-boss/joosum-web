import "./globals.css";
import localFont from "next/font/local";
import clsx from "clsx";

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
      <body
        className={clsx(
          pretendard.variable,
          "font-pretendard",
          "bg-white pt-[47px] tablet:pt-[58px] pc:pt-[82px]",
        )}
      >
        <main className="flex flex-col items-center justify-between">
          {children}
        </main>
      </body>
    </html>
  );
}
