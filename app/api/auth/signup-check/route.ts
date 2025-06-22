import { trimTrailingSlash } from "@/utils/envUri";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const requestUrl = `${trimTrailingSlash(process.env.JOOSUM_SERVER_URI)}/api/auth/signup-check?email=${searchParams.get("email")}`;
    const requestInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Api-Key": `test-internal-key`,
      },
      method: "GET",
    };

    const response = await fetch(requestUrl, requestInit);

    if (!response.body) {
      return NextResponse.json({ status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "서버 요청 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
