import { parse } from "querystring";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = parse(await request.text());
    const idToken = formData["id_token"] as string;
    const body = JSON.stringify({
      idToken,
    });

    // 서버에 로그인 요청 보내기
    const response = await fetch(
      `${process.env.JOOSUM_SERVER_URI}/api/auth/apple`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body,
      },
    );

    let data = await response.json();

    // 데이터 없으면 회원가입(온보딩)
    if (!data.accessToken) {
      cookies().set("idToken", idToken, {
        httpOnly: true,
        maxAge: 60 * 10, // 10분
        secure: true,
      });

      return redirect("/onboarding");
    }

    // 결과 받아서 세션이나 쿠키에 저장
    cookies().set({
      name: "accessToken",
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1일
    });
  } catch (e) {
    console.log(e);
    // 에러 발생하면 로그인 화면으로
    return redirect("/login");
  }

  return redirect("/");
}
