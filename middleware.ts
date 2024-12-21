import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultPath, protectedPaths, publicOnlyPaths } from "./utils/path";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken"); // TODO: 서버에도 로그인되어 있는지 확인
  const { pathname } = request.nextUrl;

  // 특정 경로는 미들웨어 처리에서 제외
  const ignorePaths = ["/api", "/_next", "/static", "/images", "/favicon.ico"];
  if (ignorePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 기본 경로는 home
  if (pathname === "/") {
    return NextResponse.redirect(new URL(defaultPath, request.url));
  }

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isPublicOnlyPath = publicOnlyPaths.includes(pathname);

  // 로그인 상태에 따른 리다이렉션
  if (accessToken) {
    // 로그인한 사용자가 공개 경로 접근 시도
    if (isPublicOnlyPath) {
      return NextResponse.redirect(new URL(defaultPath, request.url));
    }
  } else {
    // 로그인하지 않은 사용자가 보호된 경로 접근 시도
    if (isProtectedPath) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
