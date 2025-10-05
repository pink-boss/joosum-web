'use client';

import { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';

import { useMutateFolder, useSelectFolder } from '@/services/folder';

import ConfirmDialog from '@/components/confirm-dialog';

import { FOLDER_BACKGROUND_COLORS, FOLDER_TITLE_COLORS } from '@/constants';
import { useDialogStore } from '@/libs/zustand/store';

import { CreateFormState } from '@/types/folder.types';

import FolderMutateDialogEditor from './folder-mutate-dialog-editor';

const DEFAULT_VALUES: CreateFormState = {
  title: '',
  backgroundColor: FOLDER_BACKGROUND_COLORS[0],
  titleColor: FOLDER_TITLE_COLORS[0],
  illustration: null,
};

// 폴더 생성/수정 모달
export default function FolderMutateDialog() {
  const { isMutateFolderOpen: isOpen, openMutateFolder: open, key, folderDataTestId } = useDialogStore();
  const { folder, clearFolder } = useSelectFolder({ _title: key });

  const [formState, setFormState] = useState<CreateFormState>(DEFAULT_VALUES);

  const handleClose = useCallback(() => {
    clearFolder();
    setFormState(DEFAULT_VALUES);
    open(false);
  }, [clearFolder, open]);

  const mutation = useMutateFolder({ onSuccess: handleClose });

  const handleSubmit = useCallback(async () => {
    mutation.mutate(formState);
  }, [mutation, formState]);

  useEffect(() => {
    setFormState(folder ?? DEFAULT_VALUES);
  }, [setFormState, folder]);

  return (
    <ConfirmDialog
      cancelDataTestId={folderDataTestId === 'addFolder' ? 'close_folderTitle_addFolder' : 'close_addFolder_saveLink'}
      className="w-[792px]"
      open={isOpen}
      submitDataTestId={folderDataTestId === 'addFolder' ? 'save_folderTitle_addFolder' : 'confirm_addFolder_saveLink'}
      submitLoading={mutation.isPending || !formState.title}
      onCloseCallback={handleClose}
      closeProps={{
        className: 'w-[220.5px] h-[56px] bg-gray-silver',
        children: '닫기',
        onClick: handleClose,
      }}
      submitProps={{
        className: clsx(['h-[56px] w-[220.5px]']),
        children: folder ? '완료' : '생성',
        onClick: handleSubmit,
        disabled: !formState.title,
      }}
    >
      <div className="my-5 text-center text-2xl font-bold">폴더 {folder ? '수정' : '생성'}</div>
      <FolderMutateDialogEditor {...formState} setFormState={setFormState} />
    </ConfirmDialog>
  );
}
