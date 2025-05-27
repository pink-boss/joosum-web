import { parse } from "querystring";

import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { trimTrailingSlash } from "@/utils/envUri";
import {
  isExist,
  storeAuthTokenForOnboarding,
  storeAccessToken,
  storePreviousLoginProvider,
} from "@/utils/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const formData = parse(await request.text());
    const idToken = formData["id_token"] as string | undefined;

    if (!idToken) {
      console.error("idToken이 없습니다.");
      return new Response("Unauthorized: Missing idToken", { status: 401 });
    }
    // 사용자 존재 여부 확인
    const userExists = await isExist(idToken, "apple");

    if (!userExists) {
      // 신규 사용자 - 온보딩으로 리다이렉트
      await storeAuthTokenForOnboarding(idToken, "apple");
      return redirect("/onboarding");
    }

    // 서버에 로그인 요청 보내기
    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/api/auth/apple`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          idToken,
        }),
      },
    );

    // 기존 사용자 - 로그인 처리
    let data = await response.json();

    // 토큰을 쿠키에 저장
    if (data.accessToken) {
      await storeAccessToken(data.accessToken);
    }

    await storePreviousLoginProvider("apple");

    return redirect("/");
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
}
