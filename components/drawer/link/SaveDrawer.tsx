import Drawer from "@/components/drawer/Drawer";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { useState } from "react";
import { CreateFormState, SaveLink } from "@/types/link.types";
import { defaultValues } from "./data";
import Folder from "./Folder";
import Buttons from "./Buttons";

import Header from "./Header";
import LinkInput from "./LinkInput";
import TitleInput from "./TitleInput";
import Tag from "./Tag";

// TODO: 테스트 작성
// TODO: 실제 기능 구현

type InputProps = {
  _defaultValues?: SaveLink;
};

export default function LinkSaveDrawer({ _defaultValues }: InputProps) {
  const { isLinkSaveDrawerOpen: isOpen, openLinkSaveDrawer: open } =
    useOpenDrawerStore();

  const onClose = () => {
    open(false);
  };

  const handleSubmit = () => {};

  const [formState, setFormState] = useState<CreateFormState>(
    _defaultValues ?? defaultValues,
  );
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
          <LinkInput
            value={formState.url}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                url: value,
              }));
            }}
          />
          <TitleInput
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
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

          <Tag
            tags={formState.tags}
            setTags={(tags) =>
              setFormState((prev) => ({
                ...prev,
                tags,
              }))
            }
          />

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
