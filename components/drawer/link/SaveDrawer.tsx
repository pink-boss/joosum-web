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
import { useLinkInputStore } from "@/store/useLinkInputStore";

// TODO: 테스트 작성
// TODO: 실제 기능 구현

type InputProps = {
  _defaultValues?: SaveLink;
};

export default function LinkSaveDrawer({ _defaultValues }: InputProps) {
  const { isLinkSaveDrawerOpen: isOpen, openLinkSaveDrawer: open } =
    useOpenDrawerStore();
  const { isValid } = useLinkInputStore();

  const onClose = () => {
    open(false);
  };

  async function handleSubmit(formData: FormData) {
    "use server";

    const rawFormData = {
      url: formData.get("url"),
      title: formData.get("title"),
      linkBookId: formData.get("linkBookId"),
      tags: formData.get("tags"),
      thumbnail: formData.get("thumbnail"),
    };

    console.log(rawFormData);
    // mutate data
    // revalidate cache
  }

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
        <form
          className="flex flex-1 flex-col gap-6 px-10"
          action={handleSubmit}
        >
          <LinkInput
            value={formState.url}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                url: value,
              }));
            }}
            setThumbnail={(values) =>
              setFormState((prev) => ({
                ...prev,
                ...values,
              }))
            }
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
