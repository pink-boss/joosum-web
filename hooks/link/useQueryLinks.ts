import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect, useMemo } from "react";

import { Link } from "@/types/link.types";
import { isBetween } from "@/utils/date";
import { getLinkListQueryKey } from "@/utils/queryKey";

import { useSearchBarStore } from "@/store/useSearchBarStore";
import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkBook } from "@/types/linkBook.types";
import { sortByKeywordPosition } from "@/utils/sort";
import useQueryLinkBooks from "../my-folder/useQueryLinkBooks";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

// TODO: 검색에서 링크북 선택하면 검색이 적용안됨
export function useQueryLinks({
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  const { isSuccess: isCompleteQueryLinkBook } =
    useQueryLinkBooks("created_at"); // queryLink가 먼저 실행되는 걸 방지
  const { title: searchKeyword } = useSearchBarStore();

  const queryOptions = useMemo<
    Record<string, unknown> & {
      queryKey: readonly unknown[];
    }
  >(() => {
    let pathname = linkBookId ? `link-books/${linkBookId}/links` : `links`;
    let queryString = `sort=${linkSort.sort}&order=${linkSort.orderBy}`;
    let queryKey = getLinkListQueryKey(linkBookId);

    if (searchKeyword) {
      queryString += `&search=${searchKeyword}`;
      queryKey = ["search", "linkList"];
      if (linkBookId) queryKey.push(linkBookId);
    }

    return { pathname, queryString, queryKey };
  }, [linkBookId, linkSort.sort, linkSort.orderBy, searchKeyword]);

  const {
    data = [],
    refetch,
    ...others
  } = useQuery<Link[], ApiError>({
    enabled: !!isCompleteQueryLinkBook,
    queryKey: queryOptions.queryKey,
    queryFn: () =>
      fetch(`/api/${queryOptions.pathname}?${queryOptions.queryString}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: Link[]) => {
          if (linkSort.field === "mostViewd") {
            return [...data].sort(
              (prev, next) => next.readCount - prev.readCount,
            );
          } else if (linkSort.field === "relevance") {
            return sortByKeywordPosition(data, searchKeyword);
          }
          return data;
        }),
  });

  const linkList = useMemo(() => {
    return data.filter(({ readCount, createdAt, tags: linkTags }) => {
      const unreadFlag = linkFilter.unread ? !readCount : true;
      const datePickerFlag = linkFilter.dateRange.length
        ? linkFilter.dateRange.length == 2 &&
          isBetween(
            new Date(createdAt),
            new Date(linkFilter.dateRange[0]),
            new Date(linkFilter.dateRange[1]),
            true,
          )
        : true;
      const tagFlag = linkFilter.tags.length
        ? linkFilter.tags.some((tag) => linkTags.includes(tag))
        : true;
      return unreadFlag && datePickerFlag && tagFlag;
    });
  }, [data, linkFilter.dateRange, linkFilter.unread, linkFilter.tags]);

  useEffect(() => {
    if (linkSort.field) {
      refetch();
    }
  }, [refetch, linkSort.field]);

  return { ...others, data: linkList, refetch };
}
