import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Folder, TQueryFolders } from '@/types/folder.types';

interface Props {
  _title?: string;
}

export default function useSelectFolder({ _title }: Props) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(_title);
  const [folder, setFolder] = useState<Folder | undefined>();

  const queryKey = useMemo(() => ['linkBook', 'title', title], [title]);

  const { refetch } = useQuery({
    queryKey,
    enabled: !!title && queryClient.getQueryState(['linkBookList', 'created_at'])?.status === 'success',
    queryFn: () => {
      const folders = queryClient.getQueryData<TQueryFolders>(['linkBookList', 'created_at']);

      if (!folders) return undefined;

      const found = folders.linkBooks?.find((folder) => {
        return folder.title === title;
      });

      if (found) {
        queryClient.setQueryData(queryKey, found);
      }

      return found;
    },
    staleTime: Infinity,
  });

  const clearFolder = useCallback(() => {
    setTitle(undefined);
    setFolder(undefined);
  }, []);

  useEffect(() => {
    if (_title) setTitle(_title);
  }, [_title]);

  useEffect(() => {
    if (title) {
      setFolder(queryClient.getQueryData<Folder>(queryKey));
    }
  }, [queryClient, queryKey, title]);

  return { folder, clearFolder, refetch };
}
