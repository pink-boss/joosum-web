import { useMutation } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { useSearchLinkFilterStore } from '@/libs/zustand/store';
import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import useUpdateLinkCache from './use-update-link-cache';

interface Props {
  onSuccess: () => void;
  linkId: string;
}

export default function useDeleteDrawerLink({ onSuccess, linkId }: Props) {
  const { folderId: searchFolderId } = useSearchLinkFilterStore();

  const folder = useGetFolderFromTitle();
  const updateCache = useUpdateLinkCache();

  return useMutation<undefined, Error>({
    mutationFn: async () =>
      apiCall(`/api/links/${linkId}`, {
        method: 'DELETE',
      }),
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
