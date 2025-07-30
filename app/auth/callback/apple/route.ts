import { parse } from "querystring";

import { NextRequest, NextResponse } from "next/server";

import {
  isExist,
  storeAuthTokenForOnboarding,
  storeAccessToken,
  storePreviousLoginProvider,
} from "@/utils/auth/auth";
import { getClientUri, getServerApiUri } from "@/utils/envUri";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  try {
    const formData = parse(await request.text());
    const idToken = formData["id_token"] as string | undefined;

    if (!idToken) {
      console.error("idToken이 없습니다.");
      return new Response("Unauthorized: Missing idToken", { status: 401 });
    }

    // 사용자 존재 여부 확인
    const userExists = await isExist(idToken);

    if (!userExists) {
      // 신규 사용자 - 온보딩으로 리다이렉트
      await storeAuthTokenForOnboarding(idToken, "apple");
      return NextResponse.redirect(getClientUri() + "/onboarding");
    }

    // 서버에 로그인 요청 보내기
    const response = await fetch(`${getServerApiUri()}/api/auth/apple`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        idToken,
      }),
    });

    // 기존 사용자 - 로그인 처리
    let data = await response.json();

    // 토큰을 쿠키에 저장
    if (data.accessToken) {
      await storeAccessToken(data.accessToken);
    }

    await storePreviousLoginProvider("apple");

    return redirect(getClientUri() + "/");
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
}
