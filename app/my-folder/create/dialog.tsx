"use client";
import { useOpenDialogStore } from "@/store/useDialog";
import clsx from "clsx";
import { useCallback } from "react";
import FolderSettingEditor from "./folder-setting-editor";
import { CreateFormState } from "../type";
import { createPortal, useFormState } from "react-dom";
import { pickBackgroundColors, pickTitleColors } from "./data";

async function handleSubmit(state: CreateFormState) {
  return state;
}

export default function CreateDialog() {
  const { createFolderDialog: isOpen, openCreateFolderDialog: open } =
    useOpenDialogStore();

  const [state, formAction] = useFormState<CreateFormState>(handleSubmit, {
    backgroundColor: pickBackgroundColors[0],
    titleColor: pickTitleColors[0],
    illustration: "",
  });

  const onClose = useCallback(() => open(false), [open]);

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
          isOpen && "flex flex-col items-center gap-5",
        )}
        aria-modal
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-2xl font-bold">폴더 생성</div>
        <FolderSettingEditor {...state} formAction={formAction} />
        <div className="mt-3 flex justify-center gap-1">
          <button
            className="h-[56px] w-[220.5px] rounded-lg bg-[#BBBBBB] font-bold text-white"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="h-[56px] w-[220.5px] rounded-lg bg-background-menu font-bold text-white"
            onClick={() => {
              // TODO: 이미 있는 타이틀인 경우 토스트 팝업으로 안내
            }}
            disabled // TODO: 타이틀 적으면 해제
          >
            생성
          </button>
        </div>
      </div>
    </>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(modal, modalRoot);
}
