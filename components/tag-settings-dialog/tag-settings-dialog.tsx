import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useUpsertTags } from '@/services/tag';

import { DefaultDialog } from '@/components/default-dialog';

import { useDialogStore } from '@/libs/zustand/store';

import { CloseDialogIcon } from '@/assets/icons';

import { Tag, TagList as TagListType } from '@/types/tags.types';

import TagMore from './tag-more';

// 태그 관리 모달
export default function TagSettingsDialog() {
  const { isTagSettingOpen: isOpen, openTagSetting: open } = useDialogStore();

  const { handleInput, handleButtonClick, inputRef, tags } = useUpsertTags({});

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  return (
    <DefaultDialog className="w-125 px-11 py-10" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col gap-5">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 justify-between">
            <div className="invisible size-6" />
            <Dialog.Title className="text-24-32 font-bold text-black">태그 관리</Dialog.Title>
            <button type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          className="h-12 w-full rounded-lg border border-gray-200 bg-gray-200 p-2.75 text-16-24 font-normal tracking-[-0.2px] text-gray-900 placeholder:text-gray-600 focus:border-primary-500 focus:bg-primary-100 focus:font-semibold focus:placeholder:font-normal focus:placeholder:text-gray-900"
          maxLength={10}
          placeholder="태그를 생성하여 목록에 추가해보세요."
          type="text"
          onInput={(e) => {
            // 한글 초과 입력 처리
            if (e.currentTarget.value.length > 10) {
              e.currentTarget.value = e.currentTarget.value.slice(0, 10);
            }
          }}
          onKeyUp={handleInput}
        />
        <TagList tagList={tags} />
        <div className="w-full pt-3">
          <button className="h-14 w-full rounded-lg bg-primary-500" type="button" onClick={handleButtonClick}>
            <span className="text-16-24 font-bold tracking-[-0.2px] text-white">저장</span>
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}

function TagList({ tagList }: { tagList?: TagListType }) {
  return (
    <div>
      <span className="py-2.5 pl-2.5 text-18-22 font-bold tracking-[-0.2px] text-gray-900">태그 목록</span>
      {tagList?.length ? (
        <div className="mini-scroll h-60 w-full overflow-scroll px-5">
          {tagList.map((tag, index) => (
            <TagCard key={index} tag={tag} />
          ))}
        </div>
      ) : (
        <span className="h-34.5 pt-[18.5px] text-center text-18-21 font-semibold text-gray-500">
          아직 등록된 태그가 없어요.
        </span>
      )}
    </div>
  );
}

function TagCard({ tag }: { tag: Tag }) {
  return (
    <div className="flex justify-between border-b border-gray-300 py-3">
      <span className="text-18-24 font-normal tracking-[-0.2px] text-gray-700">{tag}</span>
      <TagMore label={tag} />
    </div>
  );
}
