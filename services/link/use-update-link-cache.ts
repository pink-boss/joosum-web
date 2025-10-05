import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getLinkListQueryKey } from '@/libs/tanstack-query/query-key';
import { useSearchBarStore } from '@/libs/zustand/store';

export default function useUpdateLinkCache() {
  const queryClient = useQueryClient();

  // const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();
  const { title: searchKeyword } = useSearchBarStore();

  const updateCache = useCallback(
    (linkBookId?: string) => {
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(linkBookId, searchKeyword),
      });
    },
    [queryClient, searchKeyword],
  );

  return updateCache;
}
