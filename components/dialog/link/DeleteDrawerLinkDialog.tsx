"use client";

import useDeleteDrawerLink from "@/hooks/link/useDeleteDrawerLink";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

import ConfirmDialog from "../ConfirmDialog";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export default function DeleteDialog() {
  const { isDeleteDrawerLinkOpen: isOpen, openDeleteDrawerLink: open } =
    useOpenDialogStore();
  const { link, openLinkDrawer } = useOpenDrawerStore();
  const pathname = usePathname();

  const onClose = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.cancel_deleteConfirm_detail_link_searchResult"
          : "click.cancel_deleteConfirm_detail_link_linkList",
    });
    open(false);
    openLinkDrawer(false);
  };

  const mutation = useDeleteDrawerLink(onClose, link?.linkId!);

  async function handleSubmit() {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.delete_deleteConfirm_detail_link_searchResult"
          : "click.delete_deleteConfirm_detail_link_linkList",
    });
    mutation.mutate();
  }

  if (!link) return null;

  return (
    <ConfirmDialog
      testId="delete-dialog"
      open={isOpen}
      onCloseCallback={onClose}
      closeProps={{ children: "취소", onClick: onClose }}
      submitProps={{
        children: "삭제",
        onClick: handleSubmit,
      }}
      submitLoading={mutation.isPending}
    >
      <div className="flex flex-col gap-4 text-center">
        <div className="text-center text-gray-ink">
          <p>삭제하겠습니까?</p>
        </div>
        <div>삭제된 링크는 복구되지 않습니다.</div>
      </div>
    </ConfirmDialog>
  );
}
