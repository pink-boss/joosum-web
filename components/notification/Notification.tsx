"use client";

import clsx from "clsx";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { useOpenNotificationStore } from "@/store/useNotificationStore";
import { ToastNotificationStatus } from "@/types/notification.types";

type InputProps = {
  message: string;
  status: ToastNotificationStatus;
};

export default function Notification({ message, status }: InputProps) {
  const { isNotificationOpen, openNotification } = useOpenNotificationStore();

  const onClose = useCallback(() => {
    if (isNotificationOpen) openNotification(false);
  }, [isNotificationOpen, openNotification]);

  if (!isNotificationOpen) return null;

  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   setIsVisible(true);
  //   const timer = setTimeout(() => setIsVisible(false), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  const notification = (
    <div
      role="alertdialog"
      className={clsx(
        "fixed right-2 top-10 z-50 min-w-40 rounded-lg shadow-lg",
        "flex flex-col items-center justify-center gap-5 px-10 py-5 font-semibold",
        `transition-all duration-300 ease-in-out`,
        status === "success" && `text-primary-600 bg-primary-200`,
        status === "fail" && `bg-error text-white`,
      )}
      aria-modal
      aria-labelledby="notification"
      aria-keyshortcuts="Escape"
      onClick={(e) => e.stopPropagation()}
    >
      {message}
    </div>
  );

  const root = document.getElementById("notification-root");
  if (!root) return null;

  return createPortal(notification, root);
}
