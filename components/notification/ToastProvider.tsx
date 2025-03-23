"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

import { ToastNotification, ToastNotify } from "@/types/notification.types";
import Notification from "./Notification";

type ToastMetaData = Omit<ToastNotification, "visible"> &
  Required<Pick<ToastNotification, "visible">> & {
    id: string;
  };

type NotificationContextType = {
  notify: (props: ToastNotify) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMetaData[]>([]);

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
    window.__notify = notify;
    return () => {
      delete window.__notify;
    };
  }, [notify]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {createPortal(
        <div
          id="notification-root"
          data-testid="notification-root"
          className="fixed right-4 top-10 z-50 flex flex-col items-end"
        >
          {toasts.map((toast) => (
            <Notification {...toast} key={toast.id} />
          ))}
        </div>,
        document.body,
      )}
    </NotificationContext.Provider>
  );
}
