"use client";
import { useOpenDialogStore } from "@/store/useDialog";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

type InputProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
};

export default function Dialog({ open, children, className }: InputProps) {
  const { mutateFolder, deleteFolder, openMutateFolder, openDeleteFolder } =
    useOpenDialogStore();

  const onClose = useCallback(() => {
    if (mutateFolder) openMutateFolder(false);
    if (deleteFolder) openDeleteFolder(false);
  }, [deleteFolder, mutateFolder, openDeleteFolder, openMutateFolder]);

  if (!open) return null;

  const modal = (
    <>
      <div
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
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(modal, modalRoot);
}
