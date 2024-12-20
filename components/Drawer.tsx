"use client";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

type InputProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
  onCloseCallback: () => void;
};

export default function Drawer({
  open,
  children,
  className,
  onCloseCallback,
}: InputProps) {
  const { isLinkDrawerOpen, openLinkDrawer } = useOpenDrawerStore();

  const onClose = useCallback(() => {
    onCloseCallback();
    if (isLinkDrawerOpen) openLinkDrawer(false);
  }, [isLinkDrawerOpen, onCloseCallback, openLinkDrawer]);

  if (!open) return null;

  const drawer = (
    <>
      <div
        role="presentation"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        className={clsx(
          "fixed right-0 top-0 z-20 h-full w-[494px]",
          "border-gray-ghost border",
          "bg-white pb-20 pt-5",
          "flex flex-col gap-10",
          className && className,
        )}
        aria-modal
        aria-labelledby="drawer"
        aria-keyshortcuts="Escape"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );

  const drawerRoot = document.getElementById("drawer-root");
  if (!drawerRoot) return null;

  return createPortal(drawer, drawerRoot);
}
