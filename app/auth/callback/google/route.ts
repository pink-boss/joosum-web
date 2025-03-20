import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { trimTrailingSlash } from "@/utils/envUri";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      console.error("code가 없습니다.");
      return new Response("Unauthorized: Missing code", { status: 401 });
    }

    const body = JSON.stringify({
      idToken: code,
    });

    console.log("-------------------------------0");
    console.log(code);
    // 서버에 로그인 요청 보내기
    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/api/auth/google`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body,
      },
    );

    console.log("-------------------------------1");
    console.log(response);

    let data = await response.json();
    if (data.error) {
      new Error(data.error);
    }
    console.log("-------------------------------3");
    console.log(data);

    // // 데이터 없으면 회원가입(온보딩)
    // if (!data.accessToken) {
    //   cookies().set("code", code, {
    //     httpOnly: true,
    //     maxAge: 60 * 10, // 10분
    //     secure: true,
    //   });

    //   return redirect("/onboarding");
    // }

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

    return redirect("/");
  } catch (e) {
    console.log(e);
    // 에러 발생하면 로그인 화면으로
    return redirect("/login");
  }
}
