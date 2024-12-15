"use client";

import clsx from "clsx";
import Dialog from "@/components/dialog/Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import useCheckLink from "@/hooks/link/useCheckLink";
import useReassignLinkBook from "@/hooks/link/useReassignLinkBook";
import SelectLinkBook from "./SelectLinkBook";
import { useState } from "react";
import { LinkBook } from "@/types/linkBook.types";

// TODO: confirm dialog
export default function ReassignLinkBookDialog() {
  const { isReassignLinkBookOpen: isOpen, openReassignLinkBook: open } =
    useOpenDialogStore();
  const [linkBook, setLinkBook] = useState<LinkBook | null>(null);
  const { cachedLinks, clearLinks } = useCheckLink();

  const onClose = () => {
    clearLinks();
    open(false);
  };

  const mutation = useReassignLinkBook(onClose);

  async function handleSubmit() {
    if (linkBook && cachedLinks.size) {
      mutation.mutate({
        toLinkBook: linkBook,
        linkIds: [...cachedLinks],
      });
    }
  }

  return (
    <Dialog open={isOpen} onCloseCallback={onClose} className="w-[421.78px]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-4 text-center">
          <div className="text-center text-[#2F2F2F]">
            <p>{cachedLinks.size} 개의 링크가</p>
            <p>이동할 폴더를 선택해주세요.</p>
          </div>
          <SelectLinkBook selected={linkBook} setSelected={setLinkBook} />
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
            disabled={!linkBook}
          >
            이동
          </button>
        </div>
      </div>
    </Dialog>
  );
}
