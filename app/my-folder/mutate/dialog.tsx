"use client";
import { useSelectLinkBookStore } from "@/store/useLinkBook";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import FolderSettingEditor from "./folder-setting-editor";
import { CreateFormState, LinkBook } from "../type";
import { pickBackgroundColors, pickTitleColors } from "./data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@/components/dialog";
import { useOpenDialogStore } from "@/store/useDialog";

const defaultValues: CreateFormState = {
  title: "",
  backgroundColor: pickBackgroundColors[0],
  titleColor: pickTitleColors[0],
  illustration: null,
};

export default function MutateDialog() {
  const { mutateFolder: isOpen, openMutateFolder: open } = useOpenDialogStore();
  const { linkBook, selectLinkBook } = useSelectLinkBookStore();

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);

  const onClose = useCallback(() => {
    if (linkBook) {
      selectLinkBook(undefined);
    }
    setFormState(defaultValues);
    open(false);
  }, [open, linkBook, selectLinkBook]);

  const queryClient = useQueryClient();
  const mutation = useMutation<LinkBook, Error, CreateFormState>({
    mutationFn: async (state) =>
      (
        await fetch(
          `my-folder/api${linkBook ? `/${linkBook.linkBookId}` : ""}`,
          {
            method: linkBook ? "PUT" : "POST",
            body: JSON.stringify(state),
          },
        )
      ).json(),
    onSuccess: (newLinkBook) => {
      queryClient.setQueriesData<TQueryLinkBooks>(
        { queryKey: ["linkBooks"] },
        (prevLinkBooks) => {
          if (!prevLinkBooks) {
            return {
              linkBooks: [newLinkBook],
              totalLinkCount: 1,
            };
          } else if (linkBook) {
            const index = prevLinkBooks!.linkBooks.findIndex(
              (prev) => prev.linkBookId === linkBook?.linkBookId,
            );
            return {
              linkBooks: [
                ...prevLinkBooks!.linkBooks.slice(0, index),
                newLinkBook,
                ...prevLinkBooks!.linkBooks.slice(index + 1),
              ],
              totalLinkCount: prevLinkBooks.totalLinkCount,
            };
          }
          return {
            linkBooks: [
              prevLinkBooks.linkBooks[0],
              { ...newLinkBook, linkCount: 0 },
              ...prevLinkBooks.linkBooks.slice(1),
            ],
            totalLinkCount: prevLinkBooks.totalLinkCount + 1,
          };
        },
      );
      onClose();
    },
  });
  async function handleSubmit() {
    // TODO: 같은 이름으로 생성시 막기
    mutation.mutate(formState);
  }

  useEffect(() => {
    if (linkBook) {
      setFormState(linkBook);
    }
  }, [setFormState, linkBook]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} className="w-[792px]">
      <div className="my-5 text-center text-2xl font-bold">
        폴더 {linkBook ? "수정" : "생성"}
      </div>
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
            {linkBook ? "완료" : "생성"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
