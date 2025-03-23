import { ToastNotificationProps } from "@/types/notification.types";

export const saveLinkSuccessProps: ToastNotificationProps = {
  message: "링크가 저장되었습니다.",
  status: "success",
};

export const saveLinkFailedProps: ToastNotificationProps = {
  message: "링크 저장에 실패했습니다.",
  status: "fail",
};
