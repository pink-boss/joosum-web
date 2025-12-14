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

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value as 'latest' | 'unread');
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
        <div className="flex items-center gap-6" data-testid="tab_home">
          <label className="flex items-center gap-2" htmlFor="filter-latest">
            <input
              defaultChecked
              className="peer sr-only"
              id="filter-latest"
              name="filter"
              type="radio"
              value="latest"
              onChange={handleFilter}
            />
            <div className="hidden size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:flex">
              <div className="size-3 rounded-full bg-primary-500" />
            </div>
            <div className="block size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:hidden" />
            <span className="text-18-26 font-semibold tracking-[-0.2px] text-gray-700">최근 저장</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="filter-unread">
            <input
              className="peer sr-only"
              id="filter-unread"
              name="filter"
              type="radio"
              value="unread"
              onChange={handleFilter}
            />
            <div className="hidden size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:flex">
              <div className="size-3 rounded-full bg-primary-500" />
            </div>
            <div className="block size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:hidden" />
            <span className="text-18-26 font-semibold tracking-[-0.2px] text-gray-700">읽지 않음</span>
          </label>
        </div>
        <NextLink data-testid="viewAll_home" href="/link-book" onClick={handleClick}>
          <div className="flex items-center gap-1 pl-5">
            <span className="text-18-26 font-semibold tracking-[-0.2px]">전체보기</span>
            <ChevronRightSmallIcon aria-hidden="true" className="size-6 text-black" />
          </div>
        </NextLink>
      </div>
      {data.length ? (
        <div ref={scrollContainerRef} className="flex w-full flex-col items-start gap-8 overflow-auto">
          {/* TC로 올라왔던 이슈 */}
          <div className="flex w-full flex-wrap items-start justify-center gap-x-5.5 gap-y-5">
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
