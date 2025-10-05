import { useCallback, useState } from 'react';

import clsx from 'clsx';

import { useClickAway } from '@/hooks/utils';

import { BasicBellIcon, CloseDialogIcon } from '@/assets/icons';

import NotificationList from './notification-list';

export default function NotificationListDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const ref = useClickAway({ onClose: () => setIsOpen(false) });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  return (
    <div ref={ref} className="relative">
      {isOpen && (
        <div
          className={clsx(
            'absolute left-8 z-20 w-[390px] rounded-lg border border-gray-ghost bg-white shadow-xl',
            'flex flex-col',
          )}
        >
          <div className="flex items-center justify-between p-5">
            <div className="size-6" />
            <div className="text-2xl font-bold">알림</div>
            {/* 알림 > 닫기 */}
            <button data-testid="close_notification" type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
          <NotificationList setHasNotification={setHasNotification} />
        </div>
      )}
      {/* LNB > 알림 */}
      <button className="relative" data-testid="notification_gnb_common" type="button" onClick={handleOpen}>
        <BasicBellIcon aria-hidden="true" className="size-6 text-black" />
        {hasNotification && <div className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-error" />}
      </button>
    </div>
  );
}
