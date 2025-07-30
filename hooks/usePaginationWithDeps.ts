import { useEffect, RefObject } from "react";
import { usePagination } from "./usePagination";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkSortState } from "@/store/link-sort/schema";

interface UsePaginationWithDepsProps {
  items: any[];
  itemsPerPage?: number;
  linkFilter?: LinkFilterValues;
  linkSort?: LinkSortState;
  // 추가 의존성들 (예: filter state)
  additionalDeps?: any[];
  // 스크롤 대상 요소의 ref (필터/정렬 변경 시 최상단으로 스크롤)
  scrollTargetRef?: RefObject<HTMLElement>;
}

export function usePaginationWithDeps({
  items,
  itemsPerPage = 30,
  linkFilter,
  linkSort,
  additionalDeps = [],
  scrollTargetRef,
}: UsePaginationWithDepsProps) {
  const paginationResult = usePagination({ items, itemsPerPage });
  const { resetPagination } = paginationResult;

  // 필터나 정렬이 변경될 때마다 페이징 초기화 및 스크롤
  useEffect(() => {
    resetPagination();

    // 스크롤 대상이 있다면 최상단으로 스크롤
    if (scrollTargetRef?.current) {
      scrollTargetRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [
    // linkFilter 의존성들
    ...(linkFilter
      ? [linkFilter.unread, linkFilter.tags, linkFilter.dateRange]
      : []),
    // linkSort 의존성들
    ...(linkSort ? [linkSort.field, linkSort.sort, linkSort.order] : []),
    // 추가 의존성들
    ...additionalDeps,
    resetPagination,
    scrollTargetRef,
  ]);

  return paginationResult;
}
