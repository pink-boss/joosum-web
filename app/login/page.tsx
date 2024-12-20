"use client";

import AppleOAuthHandler from "./apple";
import GoogleOAuthHandler from "./google";

export default function Login() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 pb-5 text-center">
        <h1 className="text-2xl font-bold">주섬 시작하기</h1>
        <div className="text-gray-ink font-extrabold">
          <p>원하는 대로 저장하고 관리하는 나만의 링크 아카이빙,</p>
          <p>SNS 로그인으로 빠르게 시작해보세요.</p>
        </div>
      </div>

      <div className="flex w-[335px] flex-col gap-4">
        <AppleOAuthHandler />
        {/* <GoogleOAuthHandler /> */}
      </div>

      {/* <button>카카오로 시작하기</button> */}
      {/* <button onClick={() => handleClick("naver")}>네이버로 시작하기</button> */}
    </div>
  );
}
