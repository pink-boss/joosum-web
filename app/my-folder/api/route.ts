import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("accessToken");

  if (!token?.value) {
    return NextResponse.json({ error: "정상적으로 로그인되어 있지 않습니다." });
  }

  try {
    const response = await fetch(
      `${process.env.JOOSUM_SERVER_URI}/api/link-books`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.value,
        },
        method: "GET",
      },
    );

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
