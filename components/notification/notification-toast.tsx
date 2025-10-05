import clsx from 'clsx';

import { NotificationToast as NotificationToastType } from '@/types/notification-toast.types';

export default function NotificationToast({ message, status, visible = false }: NotificationToastType) {
  return (
    <div
      aria-modal
      aria-keyshortcuts="Escape"
      aria-labelledby="notification-toast"
      data-visible={visible}
      role="alertdialog"
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        'min-w-40 rounded-lg shadow-lg',
        'flex flex-col items-center justify-center gap-5 px-10 py-5 font-semibold',
        'transition-[margin,transform,opacity] duration-500 ease-in-out will-change-transform',
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        status === 'success' && 'bg-primary-200 text-primary-600',
        status === 'fail' && 'bg-error text-white',
        status === 'warning' && 'bg-yellow-100 text-yellow-800',
        'mb-4',
      )}
    >
      {message}
    </div>
  );
}
