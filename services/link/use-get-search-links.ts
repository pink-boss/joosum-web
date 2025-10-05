import { useGetLinks } from '@/services/link';

import { LinkFilterValues, LinkSortState } from '@/libs/zustand/schema';

import { Folder } from '@/types/folder.types';

interface Props {
  folderId?: Folder['linkBookId'];
  linkFilter: LinkFilterValues;
  linkSort: Omit<LinkSortState, 'setField'>;
}

export default function useGetSearchLinks({ linkSort, linkFilter, folderId }: Props) {
  return useGetLinks({ linkSort, linkFilter, folderId, type: 'search' });
}
