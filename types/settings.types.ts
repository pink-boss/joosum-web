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
