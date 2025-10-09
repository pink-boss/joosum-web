import { useCallback, useEffect, useState } from 'react';

import { useDeleteDrawerLink, useUpdateLink } from '@/services/link';

import DefaultDrawer from '@/components/default-drawer';
import ImageWithFallback from '@/components/image-with-fallback';
import LinkShareButton from '@/components/link-share-button';

import { useDrawerStore } from '@/libs/zustand/store';
import { krDateFormatter } from '@/utils/date';

import { FolderIcon } from '@/assets/icons';

import { CreateFormState } from '@/types/link.types';

import { LINK_DRAWER_DEFAULT_VALUES } from './constants';
import LinkDrawerFolder from './link-drawer-folder';
import LinkDrawerHeader from './link-drawer-header';
import LinkDrawerLinkInput from './link-drawer-link-input';
import LinkDrawerPrimaryButton from './link-drawer-primary-button';
import LinkDrawerSecondaryButton from './link-drawer-secondary-button';
import LinkDrawerTag from './link-drawer-tag';
import LinkDrawerTitleInput from './link-drawer-title-input';

// 링크 상세/수정 화면
export default function LinkMutateDrawer() {
  const { link, isLinkDrawerOpen: isOpen, openLinkDrawer: open, mode } = useDrawerStore();

  const [formState, setFormState] = useState<CreateFormState>(LINK_DRAWER_DEFAULT_VALUES);

  const handleClose = useCallback(() => {
    setFormState(LINK_DRAWER_DEFAULT_VALUES);
    open(false);
  }, [open]);

  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateLink({ onSuccess: handleClose });
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteDrawerLink({
    onSuccess: handleClose,
    linkId: link?.linkId || '',
  });

  const handleSubmit = useCallback(async () => {
    updateMutate(formState as Required<CreateFormState>);
  }, [updateMutate, formState]);

  const handleDelete = useCallback(() => {
    deleteMutate();
  }, [deleteMutate]);

  useEffect(() => {
    setFormState(link ?? LINK_DRAWER_DEFAULT_VALUES);
  }, [link, link?.linkBookId, setFormState]);

  if (mode !== 'mutate' || !link) return null;

  return (
    <DefaultDrawer open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-1 flex-col gap-10">
        <LinkDrawerHeader
          dataTestId="close_detail_link_linkList"
          right={<LinkShareButton dataTestId="share_detail_link_linkList" link={link} />}
          onClose={handleClose}
          center={
            <div className="flex items-center gap-1">
              <FolderIcon aria-hidden="true" className="size-5 shrink-0 text-gray-500" />
              <span className="text-gray-700">{link.linkBookName}</span>
            </div>
          }
        />
        <div className="flex flex-col gap-6 px-10">
          <div className="relative h-65 w-103.5 flex-none">
            <ImageWithFallback
              unoptimized
              useFill
              alt="thumbnail"
              className="rounded-lg object-scale-down"
              dataTestId="thumbnail_detail_link_linkList"
              index={link.index ?? 0}
              src={link.thumbnailURL}
            />
          </div>
          <LinkDrawerLinkInput disabled={true} setFormState={setFormState} value={formState.url} />
          <LinkDrawerTitleInput
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
            }}
          />
          <LinkDrawerFolder
            disabled={false}
            folderId={formState.linkBookId}
            setFolderId={(linkBookName, linkBookId) =>
              setFormState((prev) => ({
                ...prev,
                linkBookName,
                linkBookId,
              }))
            }
          />
          <LinkDrawerTag setTags={(tags) => setFormState((prev) => ({ ...prev, tags }))} tags={formState.tags ?? []} />
          <div className="mt-10 flex gap-1 text-xs text-gray-600">
            <span>{krDateFormatter(link.createdAt)}에 주섬주섬</span>
            <span>|</span>
            <span>{link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}</span>
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-center gap-3 px-10">
        <LinkDrawerSecondaryButton
          dataTestId="delete_detail_link_linkList"
          loading={isDeletePending}
          onClick={handleDelete}
        >
          삭제
        </LinkDrawerSecondaryButton>
        <LinkDrawerPrimaryButton
          dataTestId="edit_detail_link_linkList"
          loading={isUpdatePending}
          title={formState.title}
          onClick={handleSubmit}
        >
          수정
        </LinkDrawerPrimaryButton>
      </div>
    </DefaultDrawer>
  );
}
