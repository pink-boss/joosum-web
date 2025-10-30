import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useGetNotificationSetting, useUpdateNotificationSetting } from '@/services/notification';

import { DefaultDialog } from '@/components/default-dialog';
import Toggle from '@/components/toggle';

import { useDialogStore } from '@/libs/zustand/store';

import { CloseDialogIcon } from '@/assets/icons';

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
    <DefaultDialog className="h-69 w-125 px-5 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-5 px-6">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <Dialog.Title className="text-24-32 font-bold text-black">알림 설정</Dialog.Title>
            <button type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-18-26 font-semibold tracking-[-0.2px] text-black">읽지 않은 링크</span>
            <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-700">
              &apos;읽지 않음&apos; 상태의 링크 알림
            </span>
          </div>
          <Toggle dataTestId="unread_settingNotification_myPage" isOn={!!isReadAgree} onUpdate={handleReadAgree} />
        </div>
        <hr className="w-full border-gray-500" />
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-18-26 font-semibold tracking-[-0.2px] text-black">분류되지 않은 링크</span>
            <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-700">
              &apos;기본&apos; 폴더에 분류된 링크 알림
            </span>
          </div>
          <Toggle
            dataTestId="unclassified_settingNotification_myPage"
            isOn={!!isClassifyAgree}
            onUpdate={handleClassifyAgree}
          />
        </div>
      </div>
    </DefaultDialog>
  );
}
