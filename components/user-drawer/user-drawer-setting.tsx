import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

import { ChevronRightIcon } from '@/assets/icons';

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
      <span className="bg-gray-200 px-10 py-3 text-18-24 font-bold tracking-[-0.2px] text-gray-700">설정</span>
      <div className="flex flex-col gap-5 px-10 py-5">
        <Menu dataTestId="settingNotification_myPage" title="알림 설정" onClick={handleNotificationSettings} />
        <Menu dataTestId="settingTag_myPage" title="태그 관리" onClick={handleTagSetting} />
      </div>
    </div>
  );
}

function Menu({ dataTestId, title, onClick }: { dataTestId: string; onClick: () => void; title: string }) {
  return (
    <button className="flex justify-between" data-testid={dataTestId} type="button" onClick={onClick}>
      <span className="text-left text-18-24 font-semibold tracking-[-0.2px] text-gray-700">{title}</span>
      <ChevronRightIcon aria-hidden="true" className="size-6 text-gray-500" />
    </button>
  );
}
