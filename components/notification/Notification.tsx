import { ToastNotification } from "@/types/notification.types";
import clsx from "clsx";

type InputProps = ToastNotification;

export default function Notification({
  message,
  status,
  visible = false,
}: InputProps) {
  return (
    <div
      role="alertdialog"
      className={clsx(
        "min-w-40 rounded-lg shadow-lg",
        "flex flex-col items-center justify-center gap-5 px-10 py-5 font-semibold",
        "transform transition-[margin,transform,opacity] duration-500 ease-in-out will-change-transform",
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        status === "success" && "text-primary-600 bg-primary-200",
        status === "fail" && "bg-error text-white",
        status === "warning" && "bg-yellow-100 text-yellow-800",
        "mb-4",
      )}
      aria-modal
      aria-labelledby="notification"
      aria-keyshortcuts="Escape"
      onClick={(e) => e.stopPropagation()}
      data-visible={visible}
    >
      {message}
    </div>
  );
}
