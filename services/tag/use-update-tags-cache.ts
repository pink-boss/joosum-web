import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getTagsQueryKey } from '@/libs/tanstack-query/query-key';

export default function useUpdateTagsCache() {
  const queryClient = useQueryClient();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: getTagsQueryKey('created'),
    });
    queryClient.invalidateQueries({
      queryKey: getTagsQueryKey('used'),
    });
  }, [queryClient]);

  return updateCache;
}
