'use client';

import LinkFilter from '@/components/link-filter';

import { LINK_FILTER_DEFAULT_VALUES } from '@/libs/zustand/schema';
import { useSearchBarStore, useSearchLinkFilterStore } from '@/libs/zustand/store';

import { SearchLinkList, SearchTab } from './components';

// 검색 결과 페이지
export default function Search() {
  const { title } = useSearchBarStore();
  const linkFilter = useSearchLinkFilterStore();

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10" data-testid="searchResult">
      <div className="text-[32px] font-extrabold leading-10 text-gray-ink">
        {title ? `'${title}' ` : undefined}검색 결과
      </div>
      {/* 탭 */}
      <SearchTab />
      {/*  읽지 않음, 기간 필터, 태그 필터 */}
      <LinkFilter
        {...linkFilter}
        dateDataTestId="dateFilter_searchResult"
        defaultValues={LINK_FILTER_DEFAULT_VALUES}
        tagDataTestId="tagFilter_searchResult"
        unreadDataTestId="unreadFilter_searchResult"
      />
      {/* 정렬, 편집, 링크 리스트 */}
      <SearchLinkList linkFilter={linkFilter} />
    </div>
  );
}
