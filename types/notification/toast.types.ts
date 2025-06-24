export type ToastStatus = "success" | "fail" | "warning";

export interface NotificationToast {
  message: string;
  status: ToastStatus;
  duration?: number;
  visible?: boolean;
}

export type ToastNotify = NotificationToast & {
  animationDuration?: number;
};
