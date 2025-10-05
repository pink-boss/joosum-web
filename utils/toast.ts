import { ToastNotify } from '@/types/notification-toast.types';

export const toast = (props: ToastNotify) => {
  if (typeof window === 'undefined') return;
  window.__notify?.(props);
};
