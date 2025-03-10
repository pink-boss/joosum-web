import Image from "next/image";
import Dialog from "./Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import Toggle from "../Toggle";
import { useQueryNotificationSetting } from "@/hooks/settings/useQueryNotificationSetting";
import useUpdateNotificationSetting from "@/hooks/settings/useUpdateNotificationSetting";
import {
  UpdateFormState,
  UpdateNotificationType,
} from "@/types/settings.types";

export default function NotificationSettingDialog() {
  const { isNotificationSettingOpen: isOpen, openNotificationSetting: open } =
    useOpenDialogStore();

  const onClose = () => {
    open(false);
  };

  const { data: notification } = useQueryNotificationSetting();

  const updateNotificationSetting = useUpdateNotificationSetting();

  const handleSetting = (updateType: UpdateNotificationType) => {
    const state: UpdateFormState = {
      isReadAgree: !!notification?.isReadAgree,
      isClassifyAgree: !!notification?.isClassifyAgree,
    };
    if (updateType === "read") state.isReadAgree = !state.isReadAgree;
    if (updateType === "classify")
      state.isClassifyAgree = !state.isClassifyAgree;

    updateNotificationSetting.mutate(state);
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
              '읽지 않음' 상태의 링크 알림
            </div>
          </div>
          <Toggle
            isOn={!!notification?.isReadAgree}
            onUpdate={() => handleSetting("read")}
          />
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
              '기본' 폴더에 분류된 링크 알림
            </div>
          </div>
          <Toggle
            isOn={!!notification?.isClassifyAgree}
            onUpdate={() => handleSetting("classify")}
          />
        </div>
      </div>
    </Dialog>
  );
}
