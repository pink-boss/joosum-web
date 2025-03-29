import { ToastNotificationProps } from "@/types/notification.types";

declare global {
  interface Window {
    __notify?: (props: ToastNotificationProps) => void;
  }
}

export {};
