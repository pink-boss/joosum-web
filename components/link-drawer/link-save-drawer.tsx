import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import { useGetFolders } from '@/services/folder';
import { useSaveLink } from '@/services/link';

import DefaultDrawer from '@/components/default-drawer';

import { useDrawerStore } from '@/libs/zustand/store';

import { SaveFormState, SaveLink } from '@/types/link.types';

import { LINK_DRAWER_DEFAULT_VALUES } from './constants';
import LinkDrawerFolder from './link-drawer-folder';
import LinkDrawerHeader from './link-drawer-header';
import LinkDrawerLinkInput from './link-drawer-link-input';
import LinkDrawerSecondaryButton from './link-drawer-secondary-button';
import LinkDrawerTag from './link-drawer-tag';
import LinkDrawerTitleInput from './link-drawer-title-input';

interface Props {
  _defaultValues?: SaveLink;
}

// 링크 저장 화면
export default function LinkSaveDrawer({ _defaultValues }: Props) {
  const { link, isLinkDrawerOpen: isOpen, openLinkDrawer: open, mode } = useDrawerStore();

  const { data } = useGetFolders({ sort: 'created_at' });

  const titleRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState<SaveFormState>(_defaultValues ?? LINK_DRAWER_DEFAULT_VALUES);

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const saveLinkMutation = useSaveLink({ onClose: handleClose });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      saveLinkMutation.mutate(formState);
    },
    [saveLinkMutation, formState],
  );

  const defaultFolderId = useMemo(() => data?.linkBooks?.[0]?.linkBookId, [data?.linkBooks]);

  useEffect(() => {
    setFormState((state) => ({
      ...state,
      linkBookId: link?.linkBookId || defaultFolderId,
      linkBookName: link?.title,
    }));
  }, [link, link?.linkBookId, setFormState, defaultFolderId]);

  if (mode !== 'save') return null;

  return (
    <DefaultDrawer dataTestId="saveLink" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-1 flex-col gap-10">
        <LinkDrawerHeader
          center={<div className="font-semibold text-gray-900">링크 저장</div>}
          dataTestId="close_saveLink"
          right={<div />}
          onClose={handleClose}
        />
        <form className="flex flex-1 flex-col gap-6 px-10" onSubmit={handleSubmit}>
          <LinkDrawerLinkInput setFormState={setFormState} titleInput={titleRef.current} value={formState.url} />
          <input
            hidden
            name="thumbnailUrl"
            value={formState.thumbnailURL}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                thumbnailURL: e.target.value,
              }))
            }
          />
          <LinkDrawerTitleInput
            inputRef={titleRef}
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
            }}
          />
          <LinkDrawerFolder
            buttonDataTestId="addFolder_saveLink"
            dropdownDataTestId="selectFolder_saveLink"
            folderId={formState.linkBookId}
            setFolderId={(_, linkBookId) =>
              setFormState((prev) => ({
                ...prev,
                linkBookId,
              }))
            }
          />
          <LinkDrawerTag
            tags={formState.tags}
            setTags={(tags) =>
              setFormState((prev) => ({
                ...prev,
                tags,
              }))
            }
          />
          <div className="mt-auto flex justify-center gap-3">
            <LinkDrawerSecondaryButton
              dataTestId="cancel_saveLink"
              loading={saveLinkMutation.isPending}
              onClick={handleClose}
            >
              취소
            </LinkDrawerSecondaryButton>
            <button
              data-testid="save_saveLink"
              disabled={!formState.title}
              type="submit"
              className={clsx(
                'h-14 w-[220.5px] rounded-lg font-bold text-white',
                'flex items-center justify-center gap-2',
                saveLinkMutation.isPending ? 'cursor-not-allowed bg-gray-300' : 'bg-primary-500',
              )}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </DefaultDrawer>
  );
}
