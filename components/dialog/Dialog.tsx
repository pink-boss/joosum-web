"use client";

import { useOpenDialogStore } from "@/store/useDialogStore";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

export type InputProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
  onCloseCallback: () => void;
  testId?: string;
};

export default function Dialog({
  open,
  children,
  className,
  onCloseCallback,
  testId,
}: InputProps) {
  const {
    // linkBook
    isMutateLinkBookOpen,
    isDeleteLinkBookOpen,
    openMutateLinkBook,
    openDeleteLinkBook,

    // link
    isDeleteLinkOpen,
    openDeleteLink,
  } = useOpenDialogStore();

  const onClose = useCallback(() => {
    onCloseCallback();
    if (isMutateLinkBookOpen) openMutateLinkBook(false);
    if (isDeleteLinkBookOpen) openDeleteLinkBook(false);
    if (isDeleteLinkOpen) openDeleteLink(false);
  }, [
    isDeleteLinkBookOpen,
    isDeleteLinkOpen,
    isMutateLinkBookOpen,
    onCloseCallback,
    openDeleteLink,
    openDeleteLinkBook,
    openMutateLinkBook,
  ]);

  if (!open) return null;

  const modal = (
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
          "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2",
          "rounded-2xl bg-white px-10 py-10 shadow-xl",
          className && className,
        )}
        aria-modal
        aria-labelledby="dialog"
        onClick={(e) => e.stopPropagation()}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(modal, modalRoot);
}
