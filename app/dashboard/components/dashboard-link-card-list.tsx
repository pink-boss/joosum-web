'use client';

import NextLink from 'next/link';

import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

import { useGetAllLinks } from '@/services/link';

import LinkEmpty from '@/components/link-empty';
import LoadMoreButton from '@/components/load-more-button';

import { usePaginationWithDeps } from '@/hooks/utils';
import { LINK_FILTER_DEFAULT_VALUES } from '@/libs/zustand/schema';
import { useFolderLinkFilterStore } from '@/libs/zustand/store';

import { ChevronRightSmallIcon } from '@/assets/icons';

import DashboardLinkCard from './dashboard-link-card';

export default function DashboardLinkCardList() {
  const { setUnread } = useFolderLinkFilterStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'latest' | 'unread'>('latest');

  const { linkFilter, linkSort } = useMemo(() => {
    return {
      linkFilter: {
        ...LINK_FILTER_DEFAULT_VALUES,
        unread: filter === 'unread',
      },
      linkSort: {
        field: 'lastest' as const,
        sort: 'created_at' as const,
        order: 'desc' as const,
      },
    };
  }, [filter]);

  const { data = [] } = useGetAllLinks({
    linkFilter,
    linkSort,
  });

  const { currentItems, hasNextPage, loadNextPage, totalItems } = usePaginationWithDeps({
    items: data,
    itemsPerPage: 30,
    additionalDeps: [filter], // filter 변경 시 페이징 리셋
    scrollTargetRef: scrollContainerRef,
  });

  const handleFilter = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    setFilter(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    if (filter === 'unread') {
      setUnread(true);
    }
  }, [filter, setUnread]);

  const handleLoadMore = useCallback(() => {
    loadNextPage();
  }, [loadNextPage]);

  return (
    <div className="flex h-full flex-1 flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <form className="flex gap-6 text-gray-dim" data-testid="tab_home" onChange={handleFilter}>
          <div className="flex gap-2">
            <input
              defaultChecked
              className="size-6 accent-primary-500"
              id="filter-latest"
              name="filter"
              type="radio"
              value="latest"
            />
            <label htmlFor="filter-latest">최근 저장</label>
          </div>
          <div className="flex gap-2">
            <input className="size-6 accent-primary-500" id="filter-unread" name="filter" type="radio" value="unread" />
            <label htmlFor="filter-unread">읽지 않음</label>
          </div>
        </form>
        <NextLink data-testid="viewAll_home" href="/link-book" onClick={handleClick}>
          <div className="flex gap-1 pl-5">
            <span className="text-lg font-semibold">전체보기</span>
            <ChevronRightSmallIcon aria-hidden="true" className="size-6 text-black" />
          </div>
        </NextLink>
      </div>
      {data.length ? (
        <div ref={scrollContainerRef} className="flex flex-col items-start gap-8 overflow-auto">
          <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-5">
            {currentItems.map((link, index) => (
              <DashboardLinkCard key={index} index={index} link={link} />
            ))}
          </div>
          {hasNextPage && (
            <LoadMoreButton
              dataTestId="more_home"
              remainingCount={totalItems - currentItems.length}
              textPrefix={filter === 'latest' ? '저장한' : '읽지 않은'}
              variant="card"
              onClick={handleLoadMore}
            />
          )}
        </div>
      ) : (
        <LinkEmpty unread={filter === 'unread'} />
      )}
    </div>
  );
}
