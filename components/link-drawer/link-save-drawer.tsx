import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useGetFolders } from '@/services/folder';
import { useSaveLink } from '@/services/link';

import DefaultDrawer from '@/components/default-drawer';

import { useDrawerStore } from '@/libs/zustand/store';

import { SaveFormState, SaveLink } from '@/types/link.types';

import { LINK_DRAWER_DEFAULT_VALUES } from './constants';
import LinkDrawerFolder from './link-drawer-folder';
import LinkDrawerHeader from './link-drawer-header';
import LinkDrawerLinkInput from './link-drawer-link-input';
import LinkDrawerPrimaryButton from './link-drawer-primary-button';
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

  const handleSubmit = useCallback(() => saveLinkMutation.mutate(formState), [saveLinkMutation, formState]);

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
    <DefaultDrawer open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-1 flex-col gap-10">
        <LinkDrawerHeader
          dataTestId="close_saveLink"
          right={<div />}
          onClose={handleClose}
          center={
            <Dialog.Title className="text-16-24 font-semibold tracking-[-0.2px] text-gray-900">링크 저장</Dialog.Title>
          }
        />
        <div className="flex flex-1 flex-col gap-6 px-10">
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
            <LinkDrawerPrimaryButton
              dataTestId="save_saveLink"
              loading={saveLinkMutation.isPending}
              title={formState.title}
              onClick={handleSubmit}
            >
              저장
            </LinkDrawerPrimaryButton>
          </div>
        </div>
      </div>
    </DefaultDrawer>
  );
}
