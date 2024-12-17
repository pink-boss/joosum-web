"use client";

import { useCallback, useEffect, useState } from "react";
import FolderSettingEditor from "./FolderSettingEditor";
import { pickBackgroundColors, pickTitleColors } from "../constants";
import { useOpenDialogStore } from "@/store/useDialogStore";
import useMutateLinkBook from "@/hooks/my-folder/useMutateLinkBook";
import { CreateFormState } from "@/types/linkBook.types";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

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
    <ConfirmDialog
      open={isOpen}
      onCloseCallback={onClose}
      className="w-[792px]"
      close={{ children: "닫기", onClick: onClose }}
      submit={{
        children: linkBook ? "완료" : "생성",
        onClick: handleSubmit,
        disabled: !formState.title,
      }}
    >
      <div className="my-5 text-center text-2xl font-bold">
        폴더 {linkBook ? "수정" : "생성"}
      </div>
      <div className="mb-5">
        <FolderSettingEditor {...formState} setFormState={setFormState} />
      </div>
    </ConfirmDialog>
  );
}
