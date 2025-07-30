import { NextRequest, NextResponse } from "next/server";

import {
  isExist,
  storeAuthTokenForOnboarding,
  storeAccessToken,
  storePreviousLoginProvider,
} from "@/utils/auth/auth";
import { getClientUri, getServerApiUri } from "@/utils/envUri";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      console.error("Authorization code가 없습니다.");
      return new Response("Unauthorized: Missing authorization code", {
        status: 401,
      });
    }

    // Authorization code를 사용해서 토큰 교환
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${getClientUri()}/auth/callback/google`,
      }),
    });

    const tokenData = await tokenResponse.json();
    const idToken = tokenData.id_token;

    if (!idToken) {
      console.error("idToken를 받지 못했습니다.");
      return new Response("Unauthorized: Failed to get idToken", {
        status: 401,
      });
    }

    // 사용자 존재 여부 확인
    const userExists = await isExist(idToken);

    if (!userExists) {
      // 신규 사용자 - 온보딩으로 리다이렉트
      await storeAuthTokenForOnboarding(idToken, "google");
      return NextResponse.redirect(getClientUri() + "/onboarding");
    }

    // TODO: 구글 웹 회원가입도 idtoken 제대로 처리되는지 확인 요청
    // TODO: { code: 'INTERNAL_SERVER_ERROR', message: '이메일을 가져오는 중 오류가 발생했습니다' }
    // 기존 사용자 - 로그인 처리
    // 서버에 로그인 요청 보내기
    const response = await fetch(`${getServerApiUri()}/api/auth/google/web`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        idToken,
      }),
    });

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
