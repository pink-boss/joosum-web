"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ToastNotificationStatus } from "@/types/notification.types";

type InputProps = {
  message: string;
  status: ToastNotificationStatus;
  duration?: number;
};

export default function Toast({
  message,
  status,
  duration = 3000,
}: InputProps) {
  const animationDuration = 400;
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setShouldRender(true);
    const preRenderTimer = setTimeout(() => setIsVisible(true), 100);

    const hideTimer = setTimeout(() => setIsVisible(false), duration);
    const removeTimer = setTimeout(
      () => setShouldRender(false),
      duration + animationDuration,
    );
    return () => {
      clearTimeout(preRenderTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (!shouldRender) return null;

  const notification = (
    <div
      role="alertdialog"
      className={clsx(
        "min-w-40 rounded-lg shadow-lg",
        "flex flex-col items-center justify-center gap-5 px-10 py-5 font-semibold",
        "transform transition-[margin,transform,opacity] duration-500 ease-in-out will-change-transform",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        status === "success" && "text-primary-600 bg-primary-200",
        status === "fail" && "bg-error text-white",
        "mb-4",
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
