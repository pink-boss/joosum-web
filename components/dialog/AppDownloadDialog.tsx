import clsx from "clsx";
import Image from "next/image";

import { useOpenDialogStore } from "@/store/useDialogStore";

import Dialog from "./Dialog";

export default function AppDownloadDialog() {
  const { isAppDownloadOpen: isOpen, openAppDownload: open } =
    useOpenDialogStore();

  const onClose = () => {
    open(false);
  };

  return (
    <Dialog
      testId="app-download"
      className="w-[500px] px-11 py-10"
      open={isOpen}
      onCloseCallback={onClose}
    >
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-black">주섬 앱 다운로드</h2>

        <div className="text-center text-gray-ink">
          QR코드를 스캔하면 앱 설치화면으로 이동합니다.
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/app-store-qr.png"
              alt="app store qr"
              width={124}
              height={124}
              className="bg-gray-ghost"
            />
            <a
              href="https://apps.apple.com/kr/app/%EC%A3%BC%EC%84%AC-joosum/id6455258212"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/app-store.png"
                alt="app store"
                width={124}
                height={39}
              />
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/google-play-qr.png"
              alt="google play qr"
              width={124}
              height={124}
              className="bg-gray-ghost"
            />
            <a
              href="https://play.google.com/store/apps/details?id=com.joosum.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/google-play.png"
                alt="google play"
                width={124}
                height={39}
              />
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-dim">
          <span>주섬 앱 다운로드 받고, 어디서든 내가 저장해둔</span>
          <span>컨텐츠를 열어보세요!</span>
        </p>

        {/* 닫기 버튼 */}
        <div className="w-full pt-4">
          <button
            className={clsx(
              "bg-primary-500 font-bold text-white",
              "h-14 w-full rounded-lg transition-colors hover:bg-primary-600",
            )}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </Dialog>
  );
}
