"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

import {
  NotificationToast as NotificationToastType,
  ToastNotify,
} from "@/types/notification/toast.types";

import NotificationToast from "./NotificationToast";

type ToastMetaData = Omit<NotificationToastType, "visible"> &
  Required<Pick<NotificationToastType, "visible">> & {
    id: string;
  };

type NotificationToastContextType = {
  notify: (props: ToastNotify) => void;
};

const NotificationToastContext =
  createContext<NotificationToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMetaData[]>([]);
  const [mounted, setMounted] = useState(false);

  const notify = useCallback<(props: ToastNotify) => void>(
    ({ message, status, duration = 3000, animationDuration = 400 }) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        { id, message, status, duration, visible: false },
      ]);

      const animationTimer = setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: true } : t)),
        );
      }, animationDuration);

      const visibleTimer = setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
        );

        const animationTimer = setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, animationDuration);

        return () => clearTimeout(animationTimer);
      }, duration);

      return () => {
        clearTimeout(visibleTimer);
        clearTimeout(animationTimer);
      };
    },
    [],
  );

  // 전역 설정
  useEffect(() => {
    setMounted(true);
    window.__notify = notify;
    return () => {
      delete window.__notify;
    };
  }, [notify]);

  return (
    <NotificationToastContext.Provider value={{ notify }}>
      {children}
      {mounted &&
        createPortal(
          <div
            id="notification-toast-root"
            data-testid="notification-toast-root"
            className="fixed right-4 top-28 z-50 flex flex-col items-end"
          >
            {toasts.map((toast) => (
              <NotificationToast {...toast} key={toast.id} />
            ))}
          </div>,
          document.body,
        )}
    </NotificationToastContext.Provider>
  );
}
