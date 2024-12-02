"use client";
import { useSelectLinkBookStore } from "@/store/useLinkBook";
import clsx from "clsx";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@/components/dialog";
import { useOpenDialogStore } from "@/store/useDialog";

export default function DeleteFolderDialog() {
  const { deleteFolder: isOpen, openDeleteFolder: open } = useOpenDialogStore();
  const { linkBook } = useSelectLinkBookStore();

  const onClose = useCallback(() => open(false), [open]);

  const queryClient = useQueryClient();
  const remove = useMutation<{ deletedLinks: number }, Error>({
    mutationFn: async () =>
      (
        await fetch(`my-folder/api/${linkBook?.linkBookId}`, {
          method: "DELETE",
        })
      ).json(),
    onSuccess: () => {
      queryClient.setQueriesData<TQueryLinkBooks>(
        { queryKey: ["linkBooks"] },
        (prevLinkBooks) => {
          const index = prevLinkBooks!.linkBooks.findIndex(
            (prev) => prev.linkBookId === linkBook?.linkBookId,
          );
          return {
            linkBooks: [
              ...prevLinkBooks!.linkBooks.slice(0, index),
              ...prevLinkBooks!.linkBooks.slice(index + 1),
            ],
            totalLinkCount: prevLinkBooks!.totalLinkCount - 1,
          };
        },
      );
      onClose();
    },
  });
  async function handleSubmit() {
    remove.mutate();
  }

  if (!isOpen) return null;

  if (!linkBook?.linkBookId) {
    alert("해당 폴더를 찾을 수 없습니다.");
    return null;
  }

  return (
    <Dialog open={isOpen} className="w-[421.78px]">
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
