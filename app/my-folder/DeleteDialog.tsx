"use client";

import clsx from "clsx";
import Dialog from "@/components/dialog/Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import useDeleteLinkBook from "@/hooks/my-folder/useDeleteLinkBook";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";

export default function DeleteDialog() {
  const {
    isDeleteLinkBookOpen: isOpen,
    openDeleteLinkBook: open,
    key,
  } = useOpenDialogStore();
  const { clearLinkBook } = useSelectLinkBook(key);

  const onClose = () => {
    clearLinkBook();
    open(false);
  };

  const mutation = useDeleteLinkBook(onClose);

  async function handleSubmit() {
    mutation.mutate();
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
