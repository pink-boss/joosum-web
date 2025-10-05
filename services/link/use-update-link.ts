import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { getTagsQueryKey } from '@/libs/tanstack-query/query-key';
import { useSearchLinkFilterStore } from '@/libs/zustand/store';
import { isApiError } from '@/utils/error';
import { toast } from '@/utils/toast';
import { isSuccessfulResponse } from '@/utils/type-guard';

import { Link, UpdateFormState } from '@/types/link.types';

import useUpdateLinkCache from './use-update-link-cache';

interface Props {
  onSuccess: () => void;
}

export default function useUpdateLink({ onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { folderId: searchFolderId } = useSearchLinkFilterStore();
  const prevFolder = useGetFolderFromTitle();

  const updateCache = useUpdateLinkCache();

  return useMutation<undefined, Error, UpdateFormState>({
    mutationFn: async (state) => {
      if (!state.linkId) {
        throw new Error('링크 ID가 없습니다.');
      }

      const work: Promise<{ status: number } | ApiError | Link>[] = [];

      const linkUpdateResult: Promise<ApiError | Link> = (
        await fetch(`/api/links/${state.linkId}`, {
          method: 'PUT',
          body: JSON.stringify(state),
        })
      ).json();
      work.push(linkUpdateResult);

      const linkBookUpdateResult: Promise<{ status: number } | ApiError> = (
        await fetch(`/api/links/${state.linkId}/link-book-id/${state.linkBookId}`, {
          method: 'PUT',
        })
      ).json();
      work.push(linkBookUpdateResult);

      const result = await Promise.all(work);

      if (!isSuccessfulResponse<Link>(result)) {
        const error = result.find((item) => isApiError(item));
        console.log(error);
        throw new Error('링크 수정에 실패했습니다.');
      }
    },
    onSuccess: () => {
      updateCache(prevFolder?.linkBookId || searchFolderId);
      queryClient.invalidateQueries({
        queryKey: getTagsQueryKey('used'),
      });
      onSuccess();
      toast({ status: 'success', message: '링크가 수정되었습니다.' });
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
