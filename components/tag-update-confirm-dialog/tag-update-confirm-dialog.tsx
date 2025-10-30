import { useCallback } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useDeleteTagsSetting } from '@/services/tag';

import ConfirmDialog from '@/components/confirm-dialog';

import { useSubDialogStore } from '@/libs/zustand/store';
import { toast } from '@/utils/toast';

// NOTES: 사용안함?
// TODO: 태그 수정 엔터를 치면 오픈, 업데이트 완료시 입력창 초기화하고 TagMore까지 닫기
export default function TagUpdateConfirmDialog() {
  const { isDeleteTagConfirmOpen: isOpen, openDeleteTagConfirm: open, key } = useSubDialogStore();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const deleteTag = useDeleteTagsSetting({ onSuccess: handleClose });

  const handleDelete = useCallback(() => {
    if (key) {
      deleteTag.mutate(key);
    } else {
      toast({ status: 'fail', message: '태그를 찾을 수 없습니다.' });
    }
  }, [key, deleteTag]);

  return (
    <ConfirmDialog
      open={isOpen}
      submitLoading={deleteTag.isPending}
      onCloseCallback={handleClose}
      closeProps={{
        children: '취소',
        onClick: handleClose,
      }}
      submitProps={{
        children: '확인',
        onClick: handleDelete,
      }}
    >
      <Dialog.Title className="text-24-32 font-bold text-black">삭제 하시겠습니까?</Dialog.Title>
      <Dialog.Description className="text-16-19 font-normal text-gray-800">
        기존 게시글에 추가된 태그도 삭제되고,
        <br />
        다시 복구할 수 없습니다.
      </Dialog.Description>
    </ConfirmDialog>
  );
}
