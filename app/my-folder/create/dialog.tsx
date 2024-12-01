"use client";
import { useOpenDialogStore } from "@/store/useDialog";
import clsx from "clsx";
import { useCallback, useState } from "react";
import FolderSettingEditor from "./folder-setting-editor";
import { CreateFormState, LinkBook } from "../type";
import { createPortal } from "react-dom";
import { pickBackgroundColors, pickTitleColors } from "./data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TQueryLinkBooks } from "@/components/layout/menu";

const defaultValues = {
  title: "",
  backgroundColor: pickBackgroundColors[0],
  titleColor: pickTitleColors[0],
  illustration: "",
};

export default function CreateDialog() {
  const { createFolderDialog: isOpen, openCreateFolderDialog: open } =
    useOpenDialogStore();

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);

  const onClose = useCallback(() => open(false), [open]);

  const queryClient = useQueryClient();
  const mutation = useMutation<LinkBook, Error, CreateFormState>({
    mutationFn: async (state) =>
      (
        await fetch("my-folder/api", {
          method: "POST",
          body: JSON.stringify(state),
        })
      ).json(),
    onSuccess: (newLinkBook) => {
      queryClient.setQueryData<TQueryLinkBooks>(
        ["linkBooks"],
        (prevLinkBooks) =>
          !prevLinkBooks
            ? {
                linkBooks: [newLinkBook],
                totalLinkCount: 1,
              }
            : {
                linkBooks: [...prevLinkBooks.linkBooks, newLinkBook],
                totalLinkCount: prevLinkBooks.totalLinkCount + 1,
              },
      );
      onClose();
    },
  });
  async function handleSubmit() {
    // TODO: 이미 있는 타이틀인 경우 토스트 팝업으로 안내
    mutation.mutate(formState);
  }

  if (!isOpen) return null;

  const modal = (
    <>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        className={clsx(
          "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2",
          "w-[792px] rounded-2xl bg-white px-10 py-10 shadow-xl",
        )}
        aria-modal
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="my-5 text-center text-2xl font-bold">폴더 생성</div>
        <div className="flex flex-col items-center gap-5">
          <FolderSettingEditor {...formState} setFormState={setFormState} />
          <div className="mt-3 flex justify-center gap-1">
            <button
              className="h-[56px] w-[220.5px] rounded-lg bg-[#BBBBBB] font-bold text-white"
              onClick={onClose}
            >
              닫기
            </button>
            <button
              className={clsx(
                "h-[56px] w-[220.5px] rounded-lg font-bold text-white",
                !formState.title
                  ? "cursor-not-allowed bg-background-menu"
                  : "bg-primary",
              )}
              disabled={!formState.title}
              onClick={handleSubmit}
            >
              생성
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(modal, modalRoot);
}
