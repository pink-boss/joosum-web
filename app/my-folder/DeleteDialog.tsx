"use client";

import { useOpenDialogStore } from "@/store/useDialogStore";
import useDeleteLinkBook from "@/hooks/my-folder/useDeleteLinkBook";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

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
    <ConfirmDialog
      open={isOpen}
      onCloseCallback={onClose}
      closeProps={{ children: "취소", onClick: onClose }}
      submitProps={{
        children: "삭제",
        onClick: handleSubmit,
      }}
    >
      <div className="text-center text-[#2F2F2F]">
        <p>폴더 내의 모든 링크가 삭제됩니다.</p>
        <p>폴더를 삭제하시겠습니까?</p>
      </div>
    </ConfirmDialog>
  );
}
