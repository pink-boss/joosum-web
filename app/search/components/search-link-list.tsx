import { useGetSearchLinks } from '@/services/link';

import LinkList from '@/components/link-list';

import { LinkFilterValues } from '@/libs/zustand/schema';
import { useSearchLinkFilterStore, useSearchLinkSortStore } from '@/libs/zustand/store';

interface Props {
  defaultEditMode?: boolean;
  linkFilter: LinkFilterValues;
}

// 정렬, 편집/편집 종료, 링크 리스트, 케밥
export default function SearchLinkList({ defaultEditMode = false, linkFilter }: Props) {
  const linkSort = useSearchLinkSortStore();
  const { folderId } = useSearchLinkFilterStore();

  const links = useGetSearchLinks({
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
      type="searchResult"
    />
  );
}
