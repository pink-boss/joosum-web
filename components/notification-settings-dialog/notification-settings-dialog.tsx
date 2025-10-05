import Image from 'next/image';

import { useCallback } from 'react';

import { useGetNotificationSetting, useUpdateNotificationSetting } from '@/services/notification';

import Dialog from '@/components/dialog';
import Toggle from '@/components/toggle';

import { useDialogStore } from '@/libs/zustand/store';

import { UpdateFormState, UpdateNotificationSettingType } from '@/types/notification-settings.types';

// 알림 설정 모달
export default function NotificationSettingDialog() {
  const { isNotificationSettingOpen: isOpen, openNotificationSetting: open } = useDialogStore();

  const { data } = useGetNotificationSetting();
  const { isReadAgree, isClassifyAgree } = data ?? {};

  const updateNotificationSetting = useUpdateNotificationSetting();

  const handleSetting = useCallback(
    (updateType: UpdateNotificationSettingType) => {
      const state: UpdateFormState = {
        isReadAgree: !!isReadAgree,
        isClassifyAgree: !!isClassifyAgree,
      };
      if (updateType === 'read') state.isReadAgree = !state.isReadAgree;
      if (updateType === 'classify') state.isClassifyAgree = !state.isClassifyAgree;

      updateNotificationSetting.mutate(state);
    },
    [updateNotificationSetting, isReadAgree, isClassifyAgree],
  );

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleReadAgree = useCallback(() => {
    handleSetting('read');
  }, [handleSetting]);

  const handleClassifyAgree = useCallback(() => {
    handleSetting('classify');
  }, [handleSetting]);

  return (
    <Dialog className="h-[276px] w-[500px] px-5 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-5 px-6">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">알림 설정</span>
            <button type="button" onClick={handleClose}>
              <Image alt="close" height={24} src="/icons/basic-close.png" width={24} />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between" data-testid="read-agree">
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">읽지 않은 링크</div>
            <div className="text-sm text-gray-dim">&apos;읽지 않음&apos; 상태의 링크 알림</div>
          </div>
          <Toggle dataTestId="unread_settingNotification_myPage" isOn={!!isReadAgree} onUpdate={handleReadAgree} />
        </div>
        <div className="w-full">
          <div className="w-full border-t border-gray-silver" />
        </div>
        <div className="flex w-full items-center justify-between" data-testid="classify-agree">
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">분류되지 않은 링크</div>
            <div className="text-sm text-gray-dim">&apos;기본&apos; 폴더에 분류된 링크 알림</div>
          </div>
          <Toggle
            dataTestId="unclassified_settingNotification_myPage"
            isOn={!!isClassifyAgree}
            onUpdate={handleClassifyAgree}
          />
        </div>
      </div>
    </Dialog>
  );
}
