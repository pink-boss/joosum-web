"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import useMutateLinkBook from "@/hooks/my-folder/useMutateLinkBook";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { CreateFormState } from "@/types/linkBook.types";

import FolderSettingEditor from "./FolderSettingEditor";
import { pickBackgroundColors, pickTitleColors } from "../constants";

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

  const onClickClose = () => {
    sendGTMEvent({
      event: "click.close_folderTitle_addFolder",
    });
    onClose();
  };

  const mutation = useMutateLinkBook(onClose);
  async function handleSubmit() {
    sendGTMEvent({
      event: "click.save_folderTitle_addFolder",
    });
    mutation.mutate(formState);
  }

  useEffect(() => {
    setFormState(linkBook ?? defaultValues);
  }, [setFormState, linkBook]);

  return (
    <ConfirmDialog
      open={isOpen}
      onCloseCallback={onClickClose}
      className="w-[792px]"
      closeProps={{
        className: "w-[220.5px] h-[56px] bg-gray-silver",
        children: "닫기",
        onClick: onClickClose,
      }}
      submitProps={{
        className: clsx(["h-[56px] w-[220.5px]"]),
        children: linkBook ? "완료" : "생성",
        onClick: handleSubmit,
        disabled: !formState.title,
      }}
      submitLoading={mutation.isPending || !formState.title}
    >
      <div className="my-5 text-center text-2xl font-bold">
        폴더 {linkBook ? "수정" : "생성"}
      </div>
      <FolderSettingEditor {...formState} setFormState={setFormState} />
    </ConfirmDialog>
  );
}
