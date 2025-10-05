import { ToastNotify } from './notification-toast.types';

declare global {
  interface Window {
    __notify?: (props: ToastNotify) => void;
    Kakao: any;
  }
}

export {};
