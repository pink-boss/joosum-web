'use client';

import { useCallback, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

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
      className="w-198"
      open={isOpen}
      submitDataTestId={folderDataTestId === 'addFolder' ? 'save_folderTitle_addFolder' : 'confirm_addFolder_saveLink'}
      submitLoading={mutation.isPending}
      onCloseCallback={handleClose}
      closeProps={{
        className: 'w-[220.5px] h-14',
        children: '닫기',
        onClick: handleClose,
      }}
      submitProps={{
        className: 'h-14 w-[220.5px]',
        children: folder ? '완료' : '생성',
        onClick: handleSubmit,
        disabled: !formState.title,
      }}
    >
      <Dialog.Title className="my-5 text-center text-24-32 font-bold text-black">
        폴더 {folder ? '수정' : '생성'}
      </Dialog.Title>
      <FolderMutateDialogEditor {...formState} setFormState={setFormState} />
    </ConfirmDialog>
  );
}
