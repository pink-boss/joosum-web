import Image from "next/image";
import React from "react";
import Menu from "./menu";

type InputProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: InputProps) {
  return (
    <div className="flex">
      <div className="bg-background-menu flex w-[282px] flex-col justify-between py-11">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-10 py-1">
            <Image
              src="/logo/joosum-text.png"
              width={88}
              height={31}
              alt="joosum"
            />
            <Image
              src="/icons/basic-bell.png"
              width={24}
              height={24}
              alt="bell"
            />
          </div>
          <Menu />
        </div>
        <div className="ml-[22px] flex w-[236px] items-center px-4 py-3">
          <div className="font-semibold">주섬 앱 다운로드</div>
          <Image
            src="/icons/icon-right.png"
            width={28}
            height={28}
            alt="right"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
