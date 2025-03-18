import Image from "next/image";
import Dialog from "../Dialog";
import { useOpenDialogStore } from "@/store/useDialogStore";

import clsx from "clsx";
import { Tag, TagList as TagListType } from "@/types/tags.types";

import TagMore from "./TagMore";

import useUpsertTags from "@/hooks/settings/useUpsertTags";

export default function TagSettingDialog() {
  const { isTagSettingOpen: isOpen, openTagSetting: open } =
    useOpenDialogStore();

  const onClose = () => {
    open(false);
  };
  const { handleInput, inputRef, tags } = useUpsertTags();

  return (
    <Dialog
      testId="tag-setting"
      className="w-[500px] px-11 py-10"
      open={isOpen}
      onCloseCallback={onClose}
    >
      <div className="flex flex-col gap-5">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <span className="text-2xl font-bold">태그 관리</span>
            <button onClick={onClose}>
              <Image
                src="/icons/basic-close.png"
                alt="close"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <input
          ref={inputRef}
          className="h-12 w-full rounded-lg border border-gray-ghost bg-gray-ghost pl-3"
          placeholder="태그를 생성하여 목록에 추가해보세요."
          onKeyUp={handleInput}
        />

        <TagList tagList={tags} />

        <div className="w-full pt-3">
          <button
            className={clsx(
              "bg-primary-500 font-bold text-white",
              "h-14 w-full rounded-lg",
            )}
          >
            저장
          </button>
        </div>
      </div>
    </Dialog>
  );
}

type TagListProps = {
  tagList?: TagListType;
};

function TagList({ tagList }: TagListProps) {
  return (
    <div>
      <div className="py-[10px] pl-[10px] text-lg font-bold text-black">
        태그 목록
      </div>
      {tagList?.length ? (
        <div
          data-testid="tag-list"
          className="mini-scroll h-60 w-full overflow-scroll px-5"
        >
          {tagList.map((tag) => (
            <TagCard tag={tag} />
          ))}
        </div>
      ) : (
        <div
          className={clsx(
            "h-[138px] pt-[18.5px]",
            "text-center text-lg font-semibold text-gray-silver",
          )}
        >
          아직 등록된 태그가 없어요.
        </div>
      )}
    </div>
  );
}

type TagCardInputProps = {
  tag: Tag;
};

export function TagCard({ tag }: TagCardInputProps) {
  return (
    <div className="flex justify-between border-b border-gray-vapor py-3">
      <div className="text-lg text-gray-dim">{tag}</div>
      <TagMore label={tag} />
    </div>
  );
}
