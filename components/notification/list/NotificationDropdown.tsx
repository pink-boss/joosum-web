import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";

import { useClearDropdown } from "@/hooks/useClearDropdown";

import NotificationList from "./NotificationList";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const onCloseDropdown = () => setIsOpen(false);

  const ref = useClearDropdown(onCloseDropdown);

  const onOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  return (
    <div
      className="relative"
      data-testid="notification-dropdown"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {isOpen && (
        <div
          className={clsx(
            "absolute left-8 z-20 w-[390px] rounded-lg border border-gray-ghost bg-white shadow-xl",
            "flex flex-col",
          )}
        >
          <div className="flex items-center justify-between p-5">
            <div className="size-6" />
            <div className="text-2xl font-bold">알림</div>
            <button onClick={onCloseDropdown}>
              <Image
                alt="close"
                src="/icons/basic-close.png"
                width={24}
                height={24}
              />
            </button>
          </div>
          <NotificationList setHasNotification={setHasNotification} />
        </div>
      )}
      <button className="relative" onClick={onOpen}>
        <Image src="/icons/basic-bell.png" width={24} height={24} alt="bell" />
        {hasNotification && (
          <div className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-error" />
        )}
      </button>
    </div>
  );
};

export default NotificationDropdown;
