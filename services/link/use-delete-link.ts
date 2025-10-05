import { useMutation } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { useSearchLinkFilterStore } from '@/libs/zustand/store';
import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import useUpdateLinkCache from './use-update-link-cache';

interface Props {
  onSuccess: () => void;
  linkIds: string[];
}

export default function useDeleteLink({ onSuccess, linkIds }: Props) {
  const { folderId: searchFolderId } = useSearchLinkFilterStore();

  const folder = useGetFolderFromTitle();
  const updateCache = useUpdateLinkCache();

  return useMutation<unknown, Error>({
    mutationFn: async () => {
      return apiCall(`/api/links`, {
        method: 'DELETE',
        body: JSON.stringify({ linkIds }),
      });
    },
    onSuccess: () => {
      updateCache(folder?.linkBookId || searchFolderId);
      toast({ status: 'success', message: '링크가 삭제되었습니다.' });
      onSuccess();
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
