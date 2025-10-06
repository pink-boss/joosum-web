import { useMemo } from 'react';

import { useGetLinks } from '@/services/link';

import { LinkFilterValues, LinkSortState } from '@/libs/zustand/schema';

import { Folder } from '@/types/folder.types';

interface Props {
  folderId?: Folder['linkBookId'];
  linkFilter: LinkFilterValues;
  linkSort: Omit<LinkSortState, 'setField'>;
}

export default function useGetFolderLinks({ linkSort, linkFilter, folderId }: Props) {
  const queryOptions = useMemo(
    () =>
      folderId
        ? { linkSort, linkFilter, type: 'linkBook' as const, folderId }
        : { linkSort, linkFilter, type: 'all' as const },
    [linkSort, linkFilter, folderId],
  );

  return useGetLinks(queryOptions);
}
