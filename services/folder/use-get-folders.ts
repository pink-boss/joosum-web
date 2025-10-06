import { useQuery } from '@tanstack/react-query';

import { FolderSort } from '@/libs/zustand/store';

import { TQueryFolders } from '@/types/folder.types';

interface Props {
  sort: FolderSort;
}

export default function useGetFolders({ sort }: Props) {
  return useQuery<TQueryFolders>({
    queryKey: ['linkBookList', sort],
    queryFn: () =>
      fetch(`/api/link-books?sort=${sort}`, {
        method: 'GET',
      }).then((res) => res.json()),
  });
}
