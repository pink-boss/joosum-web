import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { trimTrailingSlash } from "@/utils/envUri";

import { handleAuthToken } from "@/utils/auth/auth";

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

    handleAuthToken(data);

    return redirect("/");
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
}
