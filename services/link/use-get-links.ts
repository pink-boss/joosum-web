import { ApiError } from 'next/dist/server/api-utils';

import { useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useGetFolders } from '@/services/folder';

import { getLinkListQueryKey } from '@/libs/tanstack-query/query-key';
import { LinkFilterValues, LinkSortState } from '@/libs/zustand/schema';
import { useSearchBarStore } from '@/libs/zustand/store';
import { isBetween } from '@/utils/date';
import { isApiError } from '@/utils/error';
import { sortByKeywordPosition } from '@/utils/sort';
import { toast } from '@/utils/toast';

import { Folder } from '@/types/folder.types';
import { Link, TLinkQueryResult } from '@/types/link.types';

type BaseInputProps = {
  linkFilter: LinkFilterValues;
  linkSort: Omit<LinkSortState, 'setField'>;
};

type AllLinksProps = BaseInputProps & {
  folderId?: never;
  type: 'all';
};

type LinkBookLinksProps = BaseInputProps & {
  folderId?: Folder['linkBookId'];
  type: 'linkBook';
};

type SearchLinksProps = BaseInputProps & {
  folderId?: Folder['linkBookId'];
  type: 'search';
};

type Props = AllLinksProps | LinkBookLinksProps | SearchLinksProps;

export default function useGetLinks({ linkSort, linkFilter, type, folderId }: Props): TLinkQueryResult {
  const { title: searchKeyword } = useSearchBarStore();

  const { isSuccess: isCompleteQueryLinkBook } = useGetFolders('created_at'); // linkBook 쿼리가 먼저 실행되는걸 방지

  const queryOptions = useMemo<
    Record<string, unknown> & {
      pathname: string;
      queryKey: readonly unknown[];
      queryString: string;
    }
  >(() => {
    const queryKey = getLinkListQueryKey(folderId, searchKeyword);
    let pathname: string;
    let queryString: string;

    switch (type) {
      case 'all':
        pathname = 'links';
        queryString = `sort=${linkSort.sort}&order=${linkSort.order}`;
        break;
      case 'linkBook':
        pathname = folderId ? `link-books/${folderId}/links` : 'links';
        queryString = `sort=${linkSort.sort}&order=${linkSort.order}`;
        break;
      case 'search':
        pathname = 'links';
        queryString = `sort=${linkSort.sort}&order=${linkSort.order}&search=${searchKeyword}`;
        break;
    }

    return { pathname, queryString, queryKey };
  }, [type, folderId, linkSort.sort, linkSort.order, searchKeyword]);

  const {
    data = [],
    refetch,
    ...others
  } = useQuery<Link[]>({
    enabled: !!isCompleteQueryLinkBook,
    queryKey: queryOptions.queryKey,
    queryFn: () =>
      fetch(`/api/${queryOptions.pathname}?${queryOptions.queryString}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data: ApiError | Link[]) => {
          if (isApiError(data)) {
            toast({ status: 'fail', message: data.error });
            return [];
          }

          // 정렬 로직
          if (linkSort.field === 'mostViewd') {
            return [...(data as Link[])].sort((prev, next) => next.readCount - prev.readCount);
          } else if (linkSort.field === 'relevance' && type === 'search') {
            return sortByKeywordPosition(data as Link[], searchKeyword);
          }

          return data as Link[];
        }),
  });

  const linkList = useMemo(() => {
    return data?.filter(({ readCount, createdAt, tags: linkTags, linkBookId: linkLinkBookId }) => {
      const unreadFlag = linkFilter.unread ? !readCount : true;

      const datePickerFlag = linkFilter.dateRange.length
        ? linkFilter.dateRange.length === 2 &&
          isBetween(new Date(createdAt), new Date(linkFilter.dateRange[0]), new Date(linkFilter.dateRange[1]), true)
        : true;

      const tagFlag = linkFilter.tags.length && linkTags ? linkFilter.tags.some((tag) => linkTags.includes(tag)) : true;

      // 검색인 경우 폴더 선택 여부 지원
      const folderFlag = type === 'search' && searchKeyword ? (folderId ? linkLinkBookId === folderId : true) : true;

      return unreadFlag && datePickerFlag && tagFlag && folderFlag;
    });
  }, [data, linkFilter.dateRange, linkFilter.unread, linkFilter.tags, folderId, searchKeyword, type]);

  useEffect(() => {
    if (linkSort.field) {
      refetch();
    }
  }, [refetch, linkSort.field]);

  return { ...others, data: linkList, refetch };
}
