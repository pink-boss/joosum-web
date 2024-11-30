"use client";
import { useOpenDialogStore } from "@/store/useDialog";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import FolderSettingEditor from "./folder-setting-editor";
import { CreateFormState } from "../type";
import { useFormState } from "react-dom";
import { pickBackgroundColors, pickTitleColors } from "./data";

async function handleSubmit(state: CreateFormState) {
  return state;
}

export default function CreateDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const { createFolderDialog: isOpen, openCreateFolderDialog: open } =
    useOpenDialogStore();

  const [state, formAction] = useFormState<CreateFormState>(handleSubmit, {
    backgroundColor: pickBackgroundColors[0],
    titleColor: pickTitleColors[0],
    illustration: "",
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      // dialog 오픈 시, body 스크롤링 방지
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      className={clsx(
        "z-30 h-[644px] w-[792px] rounded-2xl px-10 py-10 shadow-xl",
        isOpen && "flex flex-col items-center gap-5",
      )}
    >
      <div className="text-2xl font-bold">폴더 생성</div>
      <FolderSettingEditor {...state} formAction={formAction} />
      <div className="mt-3 flex justify-center gap-1">
        <button
          className="h-[56px] w-[220.5px] rounded-lg bg-[#BBBBBB] font-bold text-white"
          onClick={() => open(false)}
        >
          닫기
        </button>
        <button
          className="h-[56px] w-[220.5px] rounded-lg bg-background-menu font-bold text-white"
          onClick={() => {}}
          disabled
        >
          생성
        </button>
      </div>
    </dialog>
  );
}
