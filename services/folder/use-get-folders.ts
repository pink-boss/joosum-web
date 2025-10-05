import { useQuery } from '@tanstack/react-query';

import { FolderSort } from '@/libs/zustand/store';

import { TQueryFolders } from '@/types/folder.types';

export default function useGetFolders(sort: FolderSort) {
  return useQuery<TQueryFolders>({
    queryKey: ['linkBookList', sort],
    queryFn: () =>
      fetch(`/api/link-books?sort=${sort}`, {
        method: 'GET',
      }).then((res) => res.json()),
  });
}
