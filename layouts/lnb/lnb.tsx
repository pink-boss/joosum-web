import Image from 'next/image';
import Link from 'next/link';

import { useCallback } from 'react';

import { NotificationListPopover } from '@/components/notification';
import Menu from '@/layouts/menu';

import { useDialogStore } from '@/libs/zustand/store';

import { ChevronRightLargeIcon } from '@/assets/icons';

export default function Lnb() {
  const { openMutateFolder, openAppDownload } = useDialogStore();

  const handleClose = useCallback(() => {
    openMutateFolder(false);
  }, [openMutateFolder]);

  const handleAppDownload = useCallback(() => {
    openAppDownload(true);
  }, [openAppDownload]);

  return (
    <div className="flex flex-col justify-between bg-gray-300 py-11">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-between px-10 py-1">
          <h1>
            <Link data-testid="logo_gnb_common" href="/dashboard" onClick={handleClose}>
              <Image alt="joosum" className="py-3" height={18} src="/images/joosum-text.png" width={88} />
            </Link>
          </h1>
          <NotificationListPopover />
        </div>
        <Menu />
      </div>
      <button
        className="ml-5.5 flex w-59 items-center px-4 py-3"
        data-testid="downloadApp_gnb_common"
        type="button"
        onClick={handleAppDownload}
      >
        <span className="text-left font-semibold text-gray-graphite">주섬 앱 다운로드</span>
        <ChevronRightLargeIcon aria-hidden="true" className="size-7 text-gray-600" />
      </button>
    </div>
  );
}
