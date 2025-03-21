import { parse } from "querystring";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { trimTrailingSlash } from "@/utils/envUri";
import { handleAuthToken } from "@/utils/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const formData = parse(await request.text());
    const idToken = formData["id_token"] as string;
    const body = JSON.stringify({
      idToken,
    });

    // 서버에 로그인 요청 보내기
    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/api/auth/apple`,
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

    handleAuthToken(data);

    return redirect("/");
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }
}
