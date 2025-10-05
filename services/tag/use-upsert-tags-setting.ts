import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { TagList } from '@/types/tags.types';

import useUpdateTagsCache from './use-update-tags-cache';

interface Props {
  onSuccess?: () => void;
}

export default function useUpsertTagsSetting({ onSuccess }: Props) {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, TagList>({
    mutationFn: async (state: TagList) =>
      apiCall(`/api/settings/tags`, {
        method: 'POST',
        body: JSON.stringify(state),
      }),
    onSuccess: () => {
      updateCache();
      toast({ status: 'success', message: '태그가 저장되었습니다.' });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.log(error);
      toast({ status: 'fail', message: error.message });
    },
  });
}
