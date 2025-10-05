import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getTagsQueryKey } from '@/libs/tanstack-query/query-key';
import { isApiError } from '@/utils/error';
import { toast } from '@/utils/toast';
import { isSuccessfulResponse } from '@/utils/type-guard';

import { Link, SaveFormState } from '@/types/link.types';

import useUpdateLinkCache from './use-update-link-cache';

interface Props {
  onClose: () => void;
}

export default function useSaveLink({ onClose }: Props) {
  const queryClient = useQueryClient();

  const updateCache = useUpdateLinkCache();

  return useMutation<Link, Error, SaveFormState>({
    mutationFn: async (state) => {
      const work: Promise<{ status: number } | ApiError | Link>[] = [];

      const linkSaveResult: Promise<ApiError | Link> = (
        await fetch(`/api/links`, {
          method: 'POST',
          body: JSON.stringify(state),
        })
      ).json();
      work.push(linkSaveResult);

      const result = await Promise.all(work);

      if (!isSuccessfulResponse<Link>(result)) {
        const error = result.find((item) => isApiError(item));
        console.log(error);
        throw new Error('링크 저장에 실패했습니다.');
      }

      return result[0] as Link;
    },
    onSuccess: () => {
      updateCache();

      queryClient.invalidateQueries({
        queryKey: getTagsQueryKey('used'),
      });

      toast({ status: 'success', message: '링크가 저장되었습니다.' });
      onClose();
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
