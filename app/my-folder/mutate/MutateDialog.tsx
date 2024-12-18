"use client";

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import FolderSettingEditor from "./FolderSettingEditor";
import { pickBackgroundColors, pickTitleColors } from "../constants";
import Dialog from "@/components/dialog/Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import useMutateLinkBook from "@/hooks/my-folder/useMutateLinkBook";
import { CreateFormState } from "@/types/linkBook.types";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";

const defaultValues: CreateFormState = {
  title: "",
  backgroundColor: pickBackgroundColors[0],
  titleColor: pickTitleColors[0],
  illustration: null,
};

export default function MutateDialog() {
  const {
    isMutateLinkBookOpen: isOpen,
    openMutateLinkBook: open,
    key,
  } = useOpenDialogStore();
  const { linkBook, clearLinkBook } = useSelectLinkBook(key);

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);

  const onClose = useCallback(() => {
    clearLinkBook();
    setFormState(defaultValues);
    open(false);
  }, [clearLinkBook, open]);

  const mutation = useMutateLinkBook(onClose);
  async function handleSubmit() {
    mutation.mutate(formState);
  }

  useEffect(() => {
    setFormState(linkBook ?? defaultValues);
  }, [setFormState, linkBook]);

  return (
    <Dialog open={isOpen} onCloseCallback={onClose} className="w-[792px]">
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
