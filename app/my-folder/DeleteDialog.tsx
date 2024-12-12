"use client";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";
import clsx from "clsx";
import { useCallback } from "react";
import Dialog from "@/components/Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import useDeleteLinkBook from "@/hooks/my-folder/useDeleteLinkBook";

export default function DeleteDialog() {
  const { deleteFolder: isOpen, openDeleteFolder: open } = useOpenDialogStore();
  const { linkBook, selectLinkBook } = useSelectLinkBookStore();

  const onClose = useCallback(() => {
    if (linkBook) {
      selectLinkBook(undefined);
    }
    open(false);
  }, [open, linkBook, selectLinkBook]);

  const mutation = useDeleteLinkBook(onClose);

  async function handleSubmit() {
    mutation.mutate();
  }

  if (!isOpen) return null;

  if (!linkBook?.linkBookId) {
    alert("해당 폴더를 찾을 수 없습니다.");
    return null;
  }

  return (
    <Dialog open={isOpen} onCloseCallback={onClose} className="w-[421.78px]">
      <div className="flex flex-col items-center gap-5">
        <div className="text-center text-[#2F2F2F]">
          <p>폴더 내의 모든 링크가 삭제됩니다.</p>
          <p>폴더를 삭제하시겠습니까?</p>
        </div>
        <div className="mt-3 flex justify-center gap-1">
          <button
            className="h-[56px] w-[164.89px] rounded-lg bg-[#BBBBBB] font-bold text-white"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={clsx(
              "h-[56px] w-[164.89px] rounded-lg font-bold text-white",
              "bg-primary",
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
