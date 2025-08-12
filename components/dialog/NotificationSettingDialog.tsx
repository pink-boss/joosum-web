import Image from "next/image";

import { useQueryNotificationSetting } from "@/hooks/settings/useQueryNotificationSetting";
import useUpdateNotificationSetting from "@/hooks/settings/useUpdateNotificationSetting";
import { useOpenDialogStore } from "@/store/useDialogStore";
import {
  UpdateFormState,
  UpdateNotificationSettingType,
} from "@/types/notification/settings.types";

import Toggle from "../Toggle";
import Dialog from "./Dialog";
import { sendGTMEvent } from "@next/third-parties/google";

export default function NotificationSettingDialog() {
  const { isNotificationSettingOpen: isOpen, openNotificationSetting: open } =
    useOpenDialogStore();

  const onClose = () => {
    open(false);
  };

  const { data } = useQueryNotificationSetting();
  const { isReadAgree, isClassifyAgree } = data ?? {};

  const updateNotificationSetting = useUpdateNotificationSetting();

  const handleSetting = (updateType: UpdateNotificationSettingType) => {
    const state: UpdateFormState = {
      isReadAgree: !!isReadAgree,
      isClassifyAgree: !!isClassifyAgree,
    };
    if (updateType === "read") state.isReadAgree = !state.isReadAgree;
    if (updateType === "classify")
      state.isClassifyAgree = !state.isClassifyAgree;

    updateNotificationSetting.mutate(state);
  };

  const onClickReadAgree = () => {
    sendGTMEvent({
      event: "click.unread_settingNotification_myPage",
    });
    handleSetting("read");
  };

  const onClickClassifyAgree = () => {
    sendGTMEvent({
      event: "click.unclassified_settingNotification_myPage",
    });
    handleSetting("classify");
  };

  return (
    <Dialog
      testId="notification-setting"
      className="h-[276px] w-[500px] px-5 py-10"
      open={isOpen}
      onCloseCallback={onClose}
    >
      <div className="flex flex-col items-center gap-5 px-6">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">알림 설정</span>
            <button onClick={onClose}>
              <Image
                src="/icons/basic-close.png"
                alt="close"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div
          data-testid="read-agree"
          className="flex w-full items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">읽지 않은 링크</div>
            <div className="text-sm text-gray-dim">
              &apos;읽지 않음&apos; 상태의 링크 알림
            </div>
          </div>
          <Toggle isOn={!!isReadAgree} onUpdate={onClickReadAgree} />
        </div>
        <div className="w-full">
          <div className="w-full border-t border-gray-silver" />
        </div>
        <div
          data-testid="classify-agree"
          className="flex w-full items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold">분류되지 않은 링크</div>
            <div className="text-sm text-gray-dim">
              &apos;기본&apos; 폴더에 분류된 링크 알림
            </div>
          </div>
          <Toggle isOn={!!isClassifyAgree} onUpdate={onClickClassifyAgree} />
        </div>
      </div>
    </Dialog>
  );
}
