import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { useDialogStore } from '@/libs/zustand/store';

export default function UserDrawerSetting() {
  const { openNotificationSetting, openTagSetting } = useDialogStore();

  const handleNotificationSettings = useCallback(() => {
    openNotificationSetting(true);
  }, [openNotificationSetting]);

  const handleTagSetting = useCallback(() => {
    openTagSetting(true);
  }, [openTagSetting]);

  return (
    <div>
      <div className={clsx('bg-gray-ghost px-10 py-2.5', 'font-bold')}>설정</div>
      <div className={clsx('flex flex-col gap-[10px] px-10 py-5', 'font-semibold')}>
        <Menu dataTestId="settingNotification_myPage" title="알림 설정" onClick={handleNotificationSettings} />
        <Menu dataTestId="settingTag_myPage" title="태그 관리" onClick={handleTagSetting} />
      </div>
    </div>
  );
}

function Menu({ dataTestId, title, onClick }: { dataTestId: string; onClick: () => void; title: string }) {
  return (
    <button className="flex cursor-pointer justify-between" data-testid={dataTestId} type="button" onClick={onClick}>
      <span className="text-left">{title}</span>
      <Image alt="open" height={24} src="/icons/icon-chevron-right.png" width={24} />
    </button>
  );
}
