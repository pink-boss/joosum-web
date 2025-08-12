"use client";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import useCheckLink from "@/hooks/link/useCheckLink";
import useDeleteLink from "@/hooks/link/useDeleteLink";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

export default function DeleteDialog() {
  const { isDeleteLinkOpen: isOpen, openDeleteLink: open } =
    useOpenDialogStore();
  const { cachedLinks, clearLinks } = useCheckLink();

  const onClose = () => {
    open(false);
  };

  const onClickClose = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.cancel_deleteLink_editOn_searchResult"
          : "click.cancel_deleteLink_editOn_linkList",
    });
    onClose();
  };

  const onSuccessCallback = () => {
    clearLinks();
    onClose();
  };

  const mutation = useDeleteLink(onSuccessCallback, [...cachedLinks]);

  const pathname = usePathname();

  async function handleSubmit() {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.delete_deleteLink_editOn_searchResult"
          : "click.delete_deleteLink_editOn_linkList",
    });
    mutation.mutate();
  }

  return (
    <ConfirmDialog
      open={isOpen}
      onCloseCallback={onClickClose}
      closeProps={{ children: "취소", onClick: onClickClose }}
      submitProps={{
        children: "삭제",
        onClick: handleSubmit,
      }}
      submitLoading={mutation.isPending}
    >
      <div className="flex flex-col gap-4 text-center">
        <div className="text-center text-gray-ink">
          <p>{cachedLinks.size} 개의 링크를</p>
          <p>삭제하겠습니까?</p>
        </div>
        <div>삭제된 링크는 복구되지 않습니다.</div>
      </div>
    </ConfirmDialog>
  );
}
