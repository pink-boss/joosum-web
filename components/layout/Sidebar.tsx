import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useOpenDialogStore } from "@/store/useDialogStore";

import Menu from "./Menu";
import NotificationDropdown from "../notification/list/NotificationDropdown";
import { sendGTMEvent } from "@next/third-parties/google";

type InputProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: InputProps) {
  const { openMutateLinkBook, openAppDownload } = useOpenDialogStore();

  const closeDialog = () => {
    openMutateLinkBook(false);
  };

  const openAppDownloadDialog = () => {
    sendGTMEvent({ event: "click.downloadApp_gnb_common" });
    openAppDownload(true);
  };
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-between bg-gray-vapor py-11">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-10 py-1">
            <Link
              href="/dashboard"
              className="cursor-pointer"
              onClick={() => {
                sendGTMEvent({ event: "click.logo_gnb_common" });
                closeDialog();
              }}
            >
              <Image
                src="/logo/joosum-text.png"
                width={88}
                height={18}
                alt="joosum"
                className="py-3"
              />
            </Link>
            <NotificationDropdown />
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
