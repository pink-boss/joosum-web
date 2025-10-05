import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { Tag } from '@/types/tags.types';

import useUpdateTagsCache from './use-update-tags-cache';

interface Props {
  onSuccess?: () => void;
}

export default function useDeleteTagSetting({ onSuccess }: Props) {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, Tag>({
    mutationFn: async (id: Tag) => {
      return apiCall(`/api/settings/tags/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      updateCache();
      toast({ status: 'success', message: '태그가 삭제되었습니다.' });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });
}
