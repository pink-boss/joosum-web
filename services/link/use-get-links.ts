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
  console.log('🔍 useGetLinks 호출됨:', { linkSort, linkFilter, type, folderId });

  const { title: searchKeyword } = useSearchBarStore();
  console.log('🔍 searchKeyword:', searchKeyword);

  const { isSuccess: isCompleteQueryLinkBook } = useGetFolders({ sort: 'created_at' }); // linkBook 쿼리가 먼저 실행되는걸 방지

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

    console.log('🔍 queryOptions 생성됨:', { pathname, queryString, queryKey });
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
          console.log('🔍 API 응답 데이터:', data);
          if (isApiError(data)) {
            console.log('🔍 API 에러 발생:', data.error);
            toast({ status: 'fail', message: data.error });
            return [];
          }

          // 정렬 로직
          if (linkSort.field === 'mostViewd') {
            console.log('🔍 mostViewed 정렬 적용');
            return [...(data as Link[])].sort((prev, next) => next.readCount - prev.readCount);
          } else if (linkSort.field === 'relevance' && type === 'search') {
            console.log('🔍 relevance 정렬 적용');
            return sortByKeywordPosition(data as Link[], searchKeyword);
          }

          console.log('🔍 기본 정렬 적용');
          return data as Link[];
        }),
  });

  const linkList = useMemo(() => {
    if (!data || data.length === 0) {
      console.log('🔍 필터링 건너뜀 - 데이터 없음');
      return [];
    }

    console.log('🔍 필터링 시작 - 원본 데이터 개수:', data?.length);
    console.log('🔍 필터링 조건:', {
      type,
      searchKeyword,
      folderId,
      unread: linkFilter.unread,
      dateRange: linkFilter.dateRange,
      tags: linkFilter.tags,
    });

    return data.filter(({ readCount, createdAt, tags: linkTags, linkBookId: linkLinkBookId }) => {
      const unreadFlag = linkFilter.unread ? !readCount : true;

      const datePickerFlag = linkFilter.dateRange.length
        ? linkFilter.dateRange.length === 2 &&
          isBetween(new Date(createdAt), new Date(linkFilter.dateRange[0]), new Date(linkFilter.dateRange[1]), true)
        : true;

      const tagFlag = linkFilter.tags.length && linkTags ? linkFilter.tags.some((tag) => linkTags.includes(tag)) : true;

      // 검색인 경우 폴더 선택 여부 지원
      const folderFlag = type === 'search' && searchKeyword ? (folderId ? linkLinkBookId === folderId : true) : true;

      const result = unreadFlag && datePickerFlag && tagFlag && folderFlag;

      if (type === 'search') {
        console.log('🔍 링크 필터링 결과:', {
          linkId: linkLinkBookId,
          linkBookId: linkLinkBookId,
          folderId,
          unreadFlag,
          datePickerFlag,
          tagFlag,
          folderFlag,
          result,
        });
      }

      return result;
    });
  }, [data, linkFilter.dateRange, linkFilter.unread, linkFilter.tags, folderId, searchKeyword, type]);

  console.log('🔍 필터링 완료 - 결과 데이터 개수:', linkList?.length);

  useEffect(() => {
    if (linkSort.field) {
      console.log('🔍 정렬 필드 변경으로 refetch 실행:', linkSort.field);
      refetch();
    }
  }, [refetch, linkSort.field]);

  return { ...others, data: linkList, refetch };
}
