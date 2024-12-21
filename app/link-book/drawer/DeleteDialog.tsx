"use client";

import clsx from "clsx";

import Dialog from "@/components/dialog/Dialog";
import useDeleteDrawerLink from "@/hooks/link/useDeleteDrawerLink";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function DeleteDialog() {
  const { isDeleteDrawerLinkOpen: isOpen, openDeleteDrawerLink: open } =
    useOpenDialogStore();
  const { link, openLinkDrawer } = useOpenDrawerStore();

  const onClose = () => {
    open(false);
    openLinkDrawer(false);
  };

  const mutation = useDeleteDrawerLink(onClose, link?.linkId!);

  async function handleSubmit() {
    mutation.mutate();
  }

  if (!link) return null;

  return (
    <Dialog
      open={isOpen}
      onCloseCallback={onClose}
      className="w-[421.78px]"
      testId="delete-dialog"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-4 text-center">
          <div className="text-center text-gray-ink">
            <p>삭제하겠습니까?</p>
          </div>
          <div>삭제된 링크는 복구되지 않습니다.</div>
        </div>
        <div className="mt-3 flex justify-center gap-1">
          <button
            className="h-[56px] w-[164.89px] rounded-lg bg-gray-silver font-bold text-white"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={clsx(
              "h-[56px] w-[164.89px] rounded-lg font-bold text-white",
              "bg-primary-500",
            )}
            onClick={handleSubmit}
          >
            삭제
          </button>
        </div>
      </div>
    </Dialog>
  );
}
