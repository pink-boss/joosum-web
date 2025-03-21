import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { trimTrailingSlash } from "@/utils/envUri";
import { logout } from "@/utils/auth/auth";

export async function POST() {
  const token = cookies().get("accessToken");

  if (!token?.value) {
    return NextResponse.json({ error: "정상적으로 로그인되어 있지 않습니다." });
  }

  const response = await fetch(
    `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/auth/logout`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
      method: "POST",
    },
  );

  if (response.ok) {
    logout();
    return NextResponse.json({ data: "로그아웃 되었습니다." });
  } else {
    return NextResponse.json({ error: "로그아웃에 실패했습니다." });
  }
}
