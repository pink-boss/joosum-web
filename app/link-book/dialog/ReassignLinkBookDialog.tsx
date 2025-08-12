"use client";

import { useEffect, useState } from "react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import useCheckLink from "@/hooks/link/useCheckLink";
import useLinkBookFromTitle from "@/hooks/link/useLinkBookFromTitle";
import useReassignLinkBook from "@/hooks/link/useReassignLinkBook";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { LinkBook } from "@/types/linkBook.types";

import SelectLinkBook from "./SelectLinkBook";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export default function ReassignLinkBookDialog() {
  const { data: linkBooks } = useQueryLinkBooks("created_at");
  const { isReassignLinkBookOpen: isOpen, openReassignLinkBook: open } =
    useOpenDialogStore();
  const [toLinkBookId, setToLinkBookId] = useState<
    LinkBook["linkBookId"] | undefined
  >(undefined);
  const { cachedLinks, clearLinks } = useCheckLink();
  const fromLinkBook = useLinkBookFromTitle();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();

  const onClose = () => {
    open(false);
  };

  const onClickClose = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.cancel_moveFolder_editOn_searchResult"
          : "click.cancel_moveFolder_editOn_linkList",
    });
    onClose();
  };

  const onSuccessCallback = () => {
    clearLinks();
    onClose();
  };

  const mutation = useReassignLinkBook(onSuccessCallback);

  const pathname = usePathname();

  async function handleSubmit() {
    if (toLinkBookId && cachedLinks.size) {
      sendGTMEvent({
        event:
          pathname === "/search"
            ? "click.confirm_moveFolder_editOn_searchResult"
            : "click.confirm_moveFolder_editOn_linkList",
      });
      mutation.mutate({
        toLinkBookId,
        linkIds: [...cachedLinks],
      });
    }
  }
  useEffect(() => {
    if (linkBooks) {
      setToLinkBookId(linkBooks.linkBooks?.[0]?.linkBookId);
    }
  }, [linkBooks]);

  return (
    <ConfirmDialog
      open={isOpen}
      onCloseCallback={onClickClose}
      closeProps={{ children: "취소", onClick: onClickClose }}
      submitProps={{
        children: "이동",
        onClick: handleSubmit,
        disabled: !toLinkBookId,
      }}
      submitLoading={mutation.isPending}
    >
      <div className="flex flex-col gap-4 text-center">
        <div className="text-center text-gray-ink">
          <p>{cachedLinks.size} 개의 링크가</p>
          <p>이동할 폴더를 선택해주세요.</p>
        </div>
        <SelectLinkBook
          linkBookId={toLinkBookId}
          setLinkBookId={(name, id) => setToLinkBookId(id)}
          fromLinkBookId={fromLinkBook?.linkBookId || searchLinkBookId}
          className="w-[305px]"
        />
      </div>
    </ConfirmDialog>
  );
}
