import { useMutation } from '@tanstack/react-query';

import { useDialogStore } from '@/libs/zustand/store';
import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import useSelectFolder from './use-select-folder';
import useUpdateFolderCache from './use-update-folder-cache';

interface Props {
  onSuccess: () => void;
}

export default function useDeleteFolder({ onSuccess }: Props) {
  const { key } = useDialogStore();

  const { folder } = useSelectFolder({ _title: key });
  const updateCache = useUpdateFolderCache();

  return useMutation<undefined, Error>({
    mutationFn: async () => {
      return apiCall(`/api/link-books/${folder?.linkBookId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      updateCache();
      toast({ status: 'success', message: '폴더가 삭제되었습니다.' });
      onSuccess();
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
