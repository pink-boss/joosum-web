import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  storeAccessToken,
  storePreviousLoginProvider,
} from "@/utils/auth/auth";
import { trimTrailingSlash } from "@/utils/envUri";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { age, gender, nickname } = body;

    // 쿠키에서 idToken과 social 가져오기
    const cookieStore = await cookies();
    const idToken = cookieStore.get("idToken")?.value;
    const social = cookieStore.get("social")?.value as "apple" | "google";

    if (!idToken || !social) {
      return NextResponse.json(
        { error: "인증 토큰이 없습니다." },
        { status: 401 },
      );
    }

    // 서버에 회원가입 요청 보내기
    const signupData: any = {
      idToken,
      social,
    };

    // 완료 버튼을 눌렀을 때만 추가 정보 포함
    if (age !== undefined) signupData.age = age;
    if (gender !== undefined) signupData.gender = gender;
    if (nickname !== undefined) signupData.nickname = nickname;

    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/auth/signup`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(signupData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "회원가입에 실패했습니다." },
        { status: response.status },
      );
    }

    // 성공 시 토큰 저장 및 임시 쿠키 삭제
    const responseWithCookie = NextResponse.json(data);
    responseWithCookie.cookies.delete("idToken");
    responseWithCookie.cookies.delete("social");

    // accessToken을 쿠키에 저장
    if (data.accessToken) {
      await storeAccessToken(data.accessToken);
    }

    await storePreviousLoginProvider(social);

    return responseWithCookie;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
