import { useEffect, useRef, useState } from "react";

import Drawer from "@/components/drawer/Drawer";
import useSaveLink from "@/hooks/link/useSaveLink";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { SaveFormState, SaveLink } from "@/types/link.types";

import { defaultValues } from "./data";
import Folder from "./Folder";
import Header from "./Header";
import LinkInput from "./LinkInput";
import { PrimaryUIButton } from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Tag from "./Tag";
import TitleInput from "./TitleInput";
import { sendGTMEvent } from "@next/third-parties/google";

type InputProps = {
  _defaultValues?: SaveLink;
};

export default function LinkSaveDrawer({ _defaultValues }: InputProps) {
  const {
    link,
    isLinkDrawerOpen: isOpen,
    openLinkDrawer: open,
    mode,
  } = useOpenDrawerStore();
  const { data } = useQueryLinkBooks("created_at");
  const defaultLinkBookId = data?.linkBooks?.[0]?.linkBookId;

  const [formState, setFormState] = useState<SaveFormState>(
    _defaultValues ?? defaultValues,
  );
  const titleRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    open(false);
  };

  const onClickClose = () => {
    sendGTMEvent({
      event: "click.close_saveLink",
    });
    onClose();
  };

  const onClickCancel = () => {
    sendGTMEvent({
      event: "click.cancel_saveLink",
    });
    onClose();
  };

  const saveLinkMutation = useSaveLink(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendGTMEvent({
      event: "click.save_saveLink",
    });
    saveLinkMutation.mutate(formState);
  };

  const onClickUrl = () => {
    sendGTMEvent({
      event: "click.url_saveLink",
    });
  };

  const onClickTitle = () => {
    sendGTMEvent({
      event: "click.title_saveLink",
    });
  };

  const onClickCreateFolder = () => {
    sendGTMEvent({
      event: "click.addFolder_saveLink",
    });
  };

  const onClickSelectFolder = () => {
    sendGTMEvent({
      event: "click.selectFolder_saveLink",
    });
  };

  const onClickTagInput = () => {
    sendGTMEvent({
      event: "click.tag_saveLink",
    });
  };

  useEffect(() => {
    setFormState((state) => ({
      ...state,
      linkBookId: link?.linkBookId || defaultLinkBookId,
      linkBookName: link?.title,
    }));
  }, [link, link?.linkBookId, setFormState, defaultLinkBookId]);

  if (mode !== "save") return null;

  return (
    <Drawer open={isOpen} onCloseCallback={onClickClose}>
      <div className="flex flex-1 flex-col gap-10">
        <Header
          onClose={onClickClose}
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
            onClickCallback={onClickUrl}
          />
          <input
            hidden
            value={formState.thumbnailURL}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                thumbnailURL: e.target.value,
              }))
            }
            data-testid="thumbnailURL"
          />
          <TitleInput
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
            }}
            inputRef={titleRef}
            onClickCallback={onClickTitle}
          />
          <Folder
            linkBookId={formState.linkBookId}
            setLinkBookId={(linkBookName, linkBookId) =>
              setFormState((prev) => ({
                ...prev,
                linkBookId,
              }))
            }
            onClickCreateFolderCallback={onClickCreateFolder}
            onClickSelectFolderCallback={onClickSelectFolder}
          />
          <Tag
            tags={formState.tags}
            setTags={(tags) =>
              setFormState((prev) => ({
                ...prev,
                tags,
              }))
            }
            onClickTagInputCallback={onClickTagInput}
          />
          <div className="mt-auto flex justify-center gap-3">
            <SecondaryButton
              loading={saveLinkMutation.isPending}
              onClick={onClickCancel}
            >
              취소
            </SecondaryButton>

            <PrimaryUIButton
              type="submit"
              loading={saveLinkMutation.isPending}
              disabled={!formState.title}
            >
              저장
            </PrimaryUIButton>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
