import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';

import { useDialogStore, useDrawerStore } from '@/libs/zustand/store';
import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { CreateFormState, Folder } from '@/types/folder.types';
import { Link } from '@/types/link.types';

import useSelectFolder from './use-select-folder';
import useUpdateFolderCache from './use-update-folder-cache';

interface Props {
  onSuccess: () => void;
}

export default function useMutateFolder({ onSuccess }: Props) {
  const { key } = useDialogStore();
  const { link: drawerLink, isLinkDrawerOpen, openLinkDrawer, mode } = useDrawerStore();

  const { folder } = useSelectFolder({ _title: key });
  const updateCache = useUpdateFolderCache();

  const updateDrawerLink = useCallback(
    (result: Folder) => {
      if (isLinkDrawerOpen && mode === 'mutate') {
        openLinkDrawer(true, 'mutate', {
          ...drawerLink,
          linkBookId: result.linkBookId,
          linkBookName: result.title,
          updatedAt: new Date().toISOString(),
        } as Link);
      }

      if (isLinkDrawerOpen && mode === 'save') {
        openLinkDrawer(true, 'save', {
          linkBookId: result.linkBookId,
          linkBookName: result.title,
        } as Link);
      }
    },
    [isLinkDrawerOpen, mode, drawerLink, openLinkDrawer],
  );

  return useMutation<Folder, Error, CreateFormState>({
    mutationFn: (state) => {
      const pathname = folder ? `/api/link-books/${folder.linkBookId}` : '/api/link-books';

      return apiCall<Folder>(pathname, {
        method: folder ? 'PUT' : 'POST',
        body: JSON.stringify(state),
      }) as Promise<Folder>;
    },
    onSuccess: (result) => {
      updateCache();
      updateDrawerLink(result);
      const type = folder ? '수정' : '생성';
      toast({ status: 'success', message: `폴더가 ${type}되었습니다.` });
      onSuccess();
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
