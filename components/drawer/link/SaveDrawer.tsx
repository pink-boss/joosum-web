import clsx from "clsx";

import Drawer from "@/components/drawer/Drawer";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { useState } from "react";
import { CreateFormState } from "@/types/link.types";
import { defaultValues } from "./data";
import Folder from "./Folder";
import Buttons from "./Buttons";

import FormItem from "./FormItem";

import Header from "./Header";

// TODO: 테스트 작성
// TODO: 실제 기능 구현

export default function LinkSaveDrawer() {
  const { isLinkSaveDrawerOpen: isOpen, openLinkSaveDrawer: open } =
    useOpenDrawerStore();

  const onClose = () => {
    open(false);
  };

  const handleSubmit = () => {};

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);
  return (
    <Drawer open={isOpen} onCloseCallback={onClose}>
      <div className="flex flex-1 flex-col gap-10">
        <Header
          onClose={onClose}
          center={
            <div className="font-semibold text-gray-black">링크 저장</div>
          }
          right={<div />}
        />
        <div className="flex flex-1 flex-col gap-6 px-10">
          <FormItem
            label="링크"
            name="url"
            value={formState.url}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                url: value,
              }));
            }}
            inputProps={{
              placeholder: "URL을 입력하거나 붙여넣어주세요.",
            }}
          />
          <FormItem
            label="제목"
            name="title"
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
            }}
            inputProps={{
              placeholder: "제목을 입력해주세요.",
            }}
          />

          <Folder
            linkBookId={formState.linkBookId}
            setLinkBookId={(linkBookName, linkBookId) =>
              setFormState((prev) => ({
                ...prev,
                linkBookName,
                linkBookId,
              }))
            }
          />

          <div className="flex flex-col gap-2 text-gray-black">
            <div className="flex justify-between px-2">
              <label htmlFor="title" className="text-lg font-semibold">
                태그
              </label>
              <span className="text-sm">{formState.tags.length}/10</span>
            </div>
            <input
              className={clsx(
                "h-[48px] w-full p-3",
                "rounded-lg border border-gray-ghost bg-gray-ghost",
              )}
              placeholder="태그를 추가해보세요."
              value={formState.tags}
            />
          </div>

          <Buttons
            title={formState.title}
            closeBtnName="취소"
            onCloseCallback={onClose}
            submitBtnName="저장"
            onSubmitCallback={handleSubmit}
          />
        </div>
      </div>
    </Drawer>
  );
}
