import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useOpenDialogStore } from "@/store/useDialogStore";

import Menu from "./Menu";

type InputProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: InputProps) {
  const { openMutateLinkBook, openAppDownload } = useOpenDialogStore();

  const closeDialog = () => {
    openMutateLinkBook(false);
  };

  const openAppDownloadDialog = () => {
    openAppDownload(true);
  };
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-between bg-gray-vapor py-11">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-10 py-1">
            <Link
              href="/"
              className="cursor-pointer"
              onClick={() => {
                closeDialog();
              }}
            >
              <Image
                src="/logo/joosum-text.png"
                width={88}
                height={31}
                alt="joosum"
              />
            </Link>
            <div
              className="cursor-pointer"
              onClick={() => {
                closeDialog();
              }}
            >
              <Image
                src="/icons/basic-bell.png"
                width={24}
                height={24}
                alt="bell"
              />
            </div>
          </div>
          <Menu />
        </div>
        <div
          className="ml-[22px] flex w-[236px] cursor-pointer items-center px-4 py-3"
          onClick={openAppDownloadDialog}
        >
          <div className="font-semibold text-gray-graphite">
            주섬 앱 다운로드
          </div>
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
