"use client";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import useCheckLink from "@/hooks/link/useCheckLink";
import useDeleteLink from "@/hooks/link/useDeleteLink";
import { useOpenDialogStore } from "@/store/useDialogStore";

export default function DeleteDialog() {
  const { isDeleteLinkOpen: isOpen, openDeleteLink: open } =
    useOpenDialogStore();
  const { cachedLinks, clearLinks } = useCheckLink();

  const onClose = () => {
    open(false);
  };

  const onSuccessCallback = () => {
    clearLinks();
    onClose();
  };

  const mutation = useDeleteLink(onSuccessCallback, [...cachedLinks]);

  async function handleSubmit() {
    mutation.mutate();
  }

  return (
    <ConfirmDialog
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
          <p>{cachedLinks.size} 개의 링크를</p>
          <p>삭제하겠습니까?</p>
        </div>
        <div>삭제된 링크는 복구되지 않습니다.</div>
      </div>
    </ConfirmDialog>
  );
}
