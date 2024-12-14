"use client";

import clsx from "clsx";
import Dialog from "@/components/dialog/Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import useDeleteLink from "@/hooks/link/useDeleteLink";
import useCheckLink from "@/hooks/link/useCheckLink";

export default function DeleteDialog() {
  const { isDeleteLinkOpen: isOpen, openDeleteLink: open } =
    useOpenDialogStore();
  const { cachedLinks, clearLinks } = useCheckLink();

  const onClose = () => {
    clearLinks();
    open(false);
  };

  const mutation = useDeleteLink(onClose);

  async function handleSubmit() {
    mutation.mutate();
  }

  return (
    <Dialog open={isOpen} onCloseCallback={onClose} className="w-[421.78px]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-4 text-center">
          <div className="text-center text-[#2F2F2F]">
            <p>{cachedLinks.size} 개의 링크를</p>
            <p>삭제하겠습니까?</p>
          </div>
          <div>삭제된 링크는 복구되지 않습니다.</div>
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
