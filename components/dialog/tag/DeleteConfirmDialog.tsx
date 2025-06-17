import clsx from "clsx";

import useDeleteTagsSetting from "@/hooks/settings/useDeleteTagSetting";
import { useOpenSubDialogStore } from "@/store/useSubDialogStore";

import ConfirmDialog from "../ConfirmDialog";
import { toast } from "@/components/notification/toast";

export default function DeleteConfirmDialog() {
  const {
    isDeleteTagConfirmOpen: isOpen,
    openDeleteTagConfirm: open,
    key,
  } = useOpenSubDialogStore();

  const onClose = () => {
    open(false);
  };

  const deleteTag = useDeleteTagsSetting(onClose);

  async function handleDelete() {
    if (key) {
      deleteTag.mutate(key);
    } else {
      toast({ status: "fail", message: "태그를 찾을 수 없습니다." });
    }
  }

  return (
    <ConfirmDialog
      testId="delete-tag-confirm"
      open={isOpen}
      onCloseCallback={onClose}
      closeProps={{
        className:
          "w-[165px] h-[56px] rounded-lg bg-gray-silver font-bold text-white",
        children: "취소",
        onClick: onClose,
      }}
      submitProps={{
        className: clsx([
          ["h-[56px] w-[165px] rounded-lg bg-primary-500 font-bold text-white"],
        ]),
        children: "확인",
        onClick: handleDelete,
      }}
    >
      <span className="text-2xl font-bold">삭제 하시겠습니까?</span>
      <div className="mt-4 text-gray-ink">
        <p>기존 게시글에 추가된 태그도 삭제되고,</p>
        <p>다시 복구할 수 없습니다.</p>
      </div>
    </ConfirmDialog>
  );
}
