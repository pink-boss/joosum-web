"use client";

import { useOpenDialogStore } from "@/store/useDialogStore";
import useCheckLink from "@/hooks/link/useCheckLink";
import useReassignLinkBook from "@/hooks/link/useReassignLinkBook";
import SelectLinkBook from "./SelectLinkBook";
import { useState } from "react";
import { LinkBook } from "@/types/linkBook.types";
import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

export default function ReassignLinkBookDialog() {
  const { isReassignLinkBookOpen: isOpen, openReassignLinkBook: open } =
    useOpenDialogStore();
  const [toLinkBookId, setToLinkBookId] = useState<
    LinkBook["linkBookId"] | undefined
  >(undefined);
  const { cachedLinks, clearLinks } = useCheckLink();
  const fromLinkBook = useLinkBookFromTitle();

  const onClose = () => {
    clearLinks();
    open(false);
  };

  const mutation = useReassignLinkBook(onClose);

  async function handleSubmit() {
    if (toLinkBookId && cachedLinks.size) {
      mutation.mutate({
        toLinkBookId,
        linkIds: [...cachedLinks],
      });
    }
  }

  return (
    <ConfirmDialog
      open={isOpen}
      onCloseCallback={onClose}
      closeProps={{ children: "취소", onClick: onClose }}
      submitProps={{
        children: "이동",
        onClick: handleSubmit,
        disabled: !toLinkBookId,
      }}
    >
      <div className="flex flex-col gap-4 text-center">
        <div className="text-gray-ink text-center">
          <p>{cachedLinks.size} 개의 링크가</p>
          <p>이동할 폴더를 선택해주세요.</p>
        </div>
        <SelectLinkBook
          linkBookId={toLinkBookId}
          setLinkBookId={(name, id) => setToLinkBookId(id)}
          fromLinkBookId={fromLinkBook?.linkBookId}
          className="w-[305px]"
        />
      </div>
    </ConfirmDialog>
  );
}
