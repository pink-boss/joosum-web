import { useGetFolderLinks } from '@/services/link';

import LinkList from '@/components/link-list';

import { LinkFilterValues } from '@/libs/zustand/schema';
import { useFolderLinkSortStore } from '@/libs/zustand/store';

import { Folder } from '@/types/folder.types';

interface Props {
  defaultEditMode?: boolean;
  folderId?: Folder['linkBookId'];
  linkFilter: LinkFilterValues;
}

export default function LinkBookLinkList({ defaultEditMode = false, linkFilter, folderId }: Props) {
  const linkSort = useFolderLinkSortStore();

  const links = useGetFolderLinks({
    linkSort,
    linkFilter,
    folderId,
  });

  return (
    <LinkList
      defaultEditMode={defaultEditMode}
      folderId={folderId}
      linkFilter={linkFilter}
      linkSort={linkSort}
      queryResult={links}
      type="linkList"
    />
  );
}
