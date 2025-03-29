export interface Notification {
  deviceId: string;
  isClassifyAgree: boolean;
  isReadAgree: boolean;
  notificationAgreeId: string;
  userId: string;
}

export type UpdateFormState = Pick<
  Notification,
  "isClassifyAgree" | "isReadAgree"
>;

export type UpdateNotificationType = "read" | "classify";

export type UpdateFormResult = {
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
  upsertedID: string;
};

export type ToastStatus = "success" | "fail" | "warning";

export type ToastNotify = ToastNotification & {
  animationDuration?: number;
};

export interface ToastNotification {
  message: string;
  status: ToastStatus;
  duration?: number;
  visible?: boolean;
}
