import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { IOSDownload } from '@/components/app-download';
import { DefaultDialog } from '@/components/default-dialog';

import { useDialogStore } from '@/libs/zustand/store';

export default function AppDownloadDialog() {
  const { isAppDownloadOpen: isOpen, openAppDownload: open } = useDialogStore();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  return (
    <DefaultDialog className="w-[500px] px-11 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-900">주섬 앱 다운로드</h2>

        <div className="text-center text-gray-800">QR코드를 스캔하면 앱 설치화면으로 이동합니다.</div>

        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image alt="app store qr" height={124} src="/images/qr-app-store.png" width={124} />
            <IOSDownload />
          </div>
          {/* <div className="flex flex-col items-center gap-2">
            <Image
              src="/images/qr-google-play.png"
              alt="google play qr"
              width={124}
              height={124}
            />
            <AndroidDownload />
          </div> */}
        </div>

        <p className="text-center text-sm text-gray-700">
          <span>주섬 앱 다운로드 받고, 어디서든 내가 저장해둔</span>
          <span>컨텐츠를 열어보세요!</span>
        </p>

        {/* 닫기 버튼 */}
        <div className="w-full pt-4">
          <button
            onClick={handleClose}
            className={clsx(
              'bg-gray-500 font-bold text-white',
              'h-14 w-full rounded-lg transition-colors hover:bg-gray-600',
            )}
          >
            닫기
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}
