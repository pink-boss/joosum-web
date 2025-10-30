import { useState } from 'react';

import * as Popover from '@radix-ui/react-popover';

import { BasicBellIcon, CloseDialogIcon } from '@/assets/icons';

import NotificationList from './notification-list';

export default function NotificationListPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  return (
    <div className="relative size-6">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button className="relative" data-testid="notification_gnb_common" type="button">
            <BasicBellIcon aria-hidden="true" className="size-6 text-black" />
            {hasNotification && <div className="absolute right-0 top-0 size-1.5 rounded-full bg-error" />}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            className="flex w-97.5 flex-col rounded-lg border border-gray-200 bg-white shadow-2-16-19-0"
            side="right"
            sideOffset={4}
          >
            <div className="flex items-center justify-between p-5">
              <div className="invisible size-6" />
              <h2 className="text-24-32 font-bold text-black">알림</h2>
              {/* 알림 > 닫기 */}
              <button data-testid="close_notification" type="button" onClick={() => setIsOpen(false)}>
                <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
              </button>
            </div>
            <NotificationList setHasNotification={setHasNotification} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
