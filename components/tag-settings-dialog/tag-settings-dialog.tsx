import { useCallback } from 'react';

import clsx from 'clsx';

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
            <span className="text-2xl font-bold">태그 관리</span>
            <button type="button" onClick={handleClose}>
              <CloseDialogIcon aria-hidden="true" className="size-6 text-gray-900" />
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          className="h-12 w-full rounded-lg border border-gray-200 bg-gray-200 pl-3"
          placeholder="태그를 생성하여 목록에 추가해보세요."
          onKeyUp={handleInput}
        />
        <TagList tagList={tags} />
        <div className="w-full pt-3">
          <button
            className={clsx('bg-primary-500 font-bold text-white', 'h-14 w-full rounded-lg')}
            type="button"
            onClick={handleButtonClick}
          >
            저장
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}

function TagList({ tagList }: { tagList?: TagListType }) {
  return (
    <div>
      <div className="py-2.5 pl-2.5 text-lg font-bold text-black">태그 목록</div>
      {tagList?.length ? (
        <div className="mini-scroll h-60 w-full overflow-scroll px-5">
          {tagList.map((tag, index) => (
            <TagCard key={index} tag={tag} />
          ))}
        </div>
      ) : (
        <div className={clsx('h-34.5 pt-[18.5px]', 'text-center text-lg font-semibold text-gray-500')}>
          아직 등록된 태그가 없어요.
        </div>
      )}
    </div>
  );
}

function TagCard({ tag }: { tag: Tag }) {
  return (
    <div className="flex justify-between border-b border-gray-300 py-3">
      <div className="text-lg text-gray-700">{tag}</div>
      <TagMore label={tag} />
    </div>
  );
}
