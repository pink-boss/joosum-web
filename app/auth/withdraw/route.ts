import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// TODO: 애플 개발 아이디 오류
export async function DELETE() {
  try {
    const token = cookies().get("accessToken");

    if (!token?.value) {
      return NextResponse.json({
        error: "정상적으로 로그인되어 있지 않습니다.",
      });
    }

    console.log("토큰:", token.value);
    console.log("API URL:", `${process.env.JOOSUM_SERVER_URI}/auth/me`);

    const res = await fetch(`${process.env.JOOSUM_SERVER_URI}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "DELETE",
      cache: "no-store",
    });

    console.log("응답 상태:", res.status);
    console.log("응답 헤더:", Object.fromEntries(res.headers));

    // 응답 본문이 비어있는지 확인
    const text = await res.text();
    console.log("Raw response:", text);

    let data;
    try {
      data = text ? JSON.parse(text) : {};
      console.log("파싱된 데이터:", data);
    } catch (parseError) {
      console.error("JSON 파싱 에러:", parseError);
      return NextResponse.json(
        { error: "서버 응답을 처리할 수 없습니다." },
        { status: 500 },
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "회원탈퇴 처리 중 오류가 발생했습니다." },
        { status: res.status },
      );
    }

    const response = NextResponse.json(
      { data: "회원탈퇴가 완료되었습니다." },
      { status: 200 },
    );

    response.cookies.delete("accessToken");
    return response;
  } catch (error: any) {
    console.error("회원탈퇴 처리 중 상세 에러:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "서버 통신 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
