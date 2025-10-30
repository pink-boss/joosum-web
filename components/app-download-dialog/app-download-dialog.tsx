import Image from 'next/image';

import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { IOSDownload } from '@/components/app-download';
import { DefaultDialog } from '@/components/default-dialog';

import { useDialogStore } from '@/libs/zustand/store';

export default function AppDownloadDialog() {
  const { isAppDownloadOpen: isOpen, openAppDownload: open } = useDialogStore();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  return (
    <DefaultDialog className="w-125 px-11 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-4">
        <Dialog.Title className="text-24-32 font-bold text-black">주섬 앱 다운로드</Dialog.Title>
        <Dialog.Description className="text-center text-16-19 font-normal text-gray-800">
          QR코드를 스캔하면 앱 설치화면으로 이동합니다.
        </Dialog.Description>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image alt="app store qr" height={124} src="/images/qr-app-store.png" width={124} />
            <IOSDownload />
          </div>
        </div>
        <span className="text-center text-16-19 font-normal text-gray-800">
          주섬 앱 다운로드 받고, 어디서든 내가 저장해둔
          <br />
          컨텐츠를 열어보세요!
        </span>
        <div className="w-full pt-3">
          <button
            className="h-14 w-full rounded-lg bg-gray-500 transition-colors hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            <span className="text-16-24 font-bold tracking-[-0.2px] text-white">닫기</span>
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}
