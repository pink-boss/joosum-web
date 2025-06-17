export interface NotificationSetting {
  deviceId: string;
  isClassifyAgree: boolean;
  isReadAgree: boolean;
  notificationAgreeId: string;
  userId: string;
}

export type UpdateFormState = Pick<
  NotificationSetting,
  "isClassifyAgree" | "isReadAgree"
>;

export type UpdateFormResult = {
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
  upsertedID: string;
};

export type UpdateNotificationSettingType = "read" | "classify";
