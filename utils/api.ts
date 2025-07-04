import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { trimTrailingSlash } from "./envUri";

interface FetchParams {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  queryString?: string | null;
  body?: Record<string, any> | Array<any> | string | number | boolean | null;
  Authorization?: string;
}

export async function serverApi({
  path,
  method,
  queryString,
  body,
  Authorization,
}: FetchParams) {
  const token = (await cookies()).get("accessToken");

  if (!token?.value) {
    return NextResponse.json({ error: "정상적으로 로그인되어 있지 않습니다." });
  }

  try {
    const requestInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: Authorization ?? `Bearer ${token.value}`,
      },
      method: method ?? "GET",
    };
    if (body) {
      requestInit.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/${path}${queryString ? `?${queryString}` : ""}`,
      requestInit,
    );

    if (!response.body) {
      return NextResponse.json({ status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { error: "서버 요청 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
