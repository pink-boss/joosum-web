import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useFolderSortStore, useSearchBarStore, useSearchLinkSortStore } from '@/libs/zustand/store';

export default function useUpdateFolderCache() {
  const queryClient = useQueryClient();

  const { sort } = useFolderSortStore();
  const { sort: searchSort } = useSearchLinkSortStore();
  const { title: searchKeyword } = useSearchBarStore();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['linkBookList'],
    });
    queryClient.invalidateQueries({
      queryKey: ['linkBookList', 'created_at'],
    });
    queryClient.invalidateQueries({
      queryKey: ['linkBookList', sort],
    });
    if (searchKeyword) {
      queryClient.invalidateQueries({
        queryKey: ['linkBookList', searchSort],
      });
    }
  }, [queryClient, sort, searchKeyword, searchSort]);

  return updateCache;
}
