import { useRef, useState } from "react";

import Drawer from "@/components/drawer/Drawer";
import useSaveLink from "@/hooks/link/useSaveLink";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { useLinkInputStore } from "@/store/useLinkInputStore";
import { SaveFormState, SaveLink } from "@/types/link.types";

import Buttons from "./Buttons";
import { defaultValues } from "./data";
import Folder from "./Folder";
import Header from "./Header";
import LinkInput from "./LinkInput";
import Tag from "./Tag";
import TitleInput from "./TitleInput";

type InputProps = {
  _defaultValues?: SaveLink;
};

export default function LinkSaveDrawer({ _defaultValues }: InputProps) {
  const { isLinkSaveDrawerOpen: isOpen, openLinkSaveDrawer: open } =
    useOpenDrawerStore();
  const { isValid } = useLinkInputStore();
  const [formState, setFormState] = useState<SaveFormState>(
    _defaultValues ?? defaultValues,
  );
  const titleRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    open(false);
  };
  const saveLink = useSaveLink(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveLink.mutate(formState);
  };
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
        <form
          className="flex flex-1 flex-col gap-6 px-10"
          onSubmit={handleSubmit}
        >
          <LinkInput
            value={formState.url}
            titleInput={titleRef.current}
            setFormState={setFormState}
          />
          <TitleInput
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
            }}
            disabled={!isValid}
            inputRef={titleRef}
          />
          <Folder
            linkBookId={formState.linkBookId}
            setLinkBookId={(linkBookName, linkBookId) =>
              setFormState((prev) => ({
                ...prev,
                linkBookId,
              }))
            }
            disabled={!isValid}
          />
          <Tag
            tags={formState.tags}
            setTags={(tags) =>
              setFormState((prev) => ({
                ...prev,
                tags,
              }))
            }
            disabled={!isValid}
          />

          <Buttons
            title={formState.title}
            closeBtnName="취소"
            onCloseCallback={onClose}
            submitBtnName="저장"
          />
        </form>
      </div>
    </Drawer>
  );
}
