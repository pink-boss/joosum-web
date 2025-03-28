import Drawer from "@/components/drawer/Drawer";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { useRef, useState } from "react";
import { SaveFormState, SaveLink } from "@/types/link.types";
import { defaultValues } from "./data";
import Folder from "./Folder";
import Buttons from "./Buttons";

import Header from "./Header";
import LinkInput from "./LinkInput";
import TitleInput from "./TitleInput";
import Tag from "./Tag";
import { useLinkInputStore } from "@/store/useLinkInputStore";
import useSaveLink from "@/hooks/link/useSaveLink";

// TODO: 실제 기능 구현

type InputProps = {
  _defaultValues?: SaveLink;
};

export default function LinkSaveDrawer({ _defaultValues }: InputProps) {
  const { isLinkSaveDrawerOpen: isOpen, openLinkSaveDrawer: open } =
    useOpenDrawerStore();
  const { isValid } = useLinkInputStore();
  const titleRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    open(false);
  };
  const saveLink = useSaveLink(onClose);

  async function handleSubmit(formData: FormData) {
    "use server";

    const rawFormData = {
      url: formData.get("url"),
      title: formData.get("title"),
      linkBookId: formData.get("linkBookId") ?? defaultValues.linkBookId,
      tags: formData.get("tags"),
      thumbnail: formData.get("thumbnail"),
    } as unknown as SaveFormState;

    saveLink.mutate(rawFormData);
  }

  const [formState, setFormState] = useState<SaveFormState>(
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
        <form
          className="flex flex-1 flex-col gap-6 px-10"
          action={handleSubmit}
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
          <input
            data-testid="thumbnailURL"
            id="thumbnailURL"
            name="thumbnailURL"
            className="hidden"
            value={formState.thumbnailURL}
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
