import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { handleAuthToken } from "@/utils/auth/auth";
import { trimTrailingSlash } from "@/utils/envUri";
import {
  isExist,
  storeAuthTokenForOnboarding,
  storeAccessToken,
  storePreviousLoginProvider,
} from "@/utils/auth/auth";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const authCode = url.searchParams.get("code");

    if (!authCode) {
      console.error("code가 없습니다.");
      return new Response("Unauthorized: Missing code", { status: 401 });
    }

    // 사용자 존재 여부 확인
    const userExists = await isExist(authCode, "google");

    if (!userExists) {
      // 신규 사용자 - 온보딩으로 리다이렉트
      await storeAuthTokenForOnboarding(authCode, "google");
      return redirect("/onboarding");
    }

    // 기존 사용자 - 로그인 처리
    // 서버에 로그인 요청 보내기
    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/api/auth/google`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          code: authCode,
        }),
      },
    );

    const data = await response.json();

    // 토큰을 쿠키에 저장
    if (data.accessToken) {
      await storeAccessToken(data.accessToken);
    }

    await storePreviousLoginProvider("google");

    return redirect("/");
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
}
