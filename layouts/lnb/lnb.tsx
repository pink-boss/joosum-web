import Image from 'next/image';
import Link from 'next/link';

import { useCallback } from 'react';

import { NotificationListDropdown } from '@/components/notification';
import Menu from '@/layouts/menu';

import { useDialogStore } from '@/libs/zustand/store';

export default function Lnb() {
  const { openMutateFolder, openAppDownload } = useDialogStore();

  const handleClose = useCallback(() => {
    openMutateFolder(false);
  }, [openMutateFolder]);

  const handleAppDownload = useCallback(() => {
    openAppDownload(true);
  }, [openAppDownload]);

  return (
    <div className="flex flex-col justify-between bg-gray-vapor py-11">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-10 py-1">
          {/* 로고 */}
          <Link className="cursor-pointer" data-testid="logo_gnb_common" href="/dashboard" onClick={handleClose}>
            <Image alt="joosum" className="py-3" height={18} src="/logo/joosum-text.png" width={88} />
          </Link>
          {/* 알림 */}
          <NotificationListDropdown />
        </div>
        {/* 폴더 리스트 + 폴더 만들기 */}
        <Menu />
      </div>
      {/* 앱 다운로드 */}
      <button
        className="ml-[22px] flex w-[236px] cursor-pointer items-center px-4 py-3"
        data-testid="downloadApp_gnb_common"
        type="button"
        onClick={handleAppDownload}
      >
        <span className="text-left font-semibold text-gray-graphite">주섬 앱 다운로드</span>
        <Image alt="right" height={28} src="/icons/icon-right.png" width={28} />
      </button>
    </div>
  );
}
