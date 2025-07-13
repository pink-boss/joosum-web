import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect, useMemo } from "react";

import { Link, TLinkQueryResult } from "@/types/link.types";
import { isBetween } from "@/utils/date";
import { getLinkListQueryKey } from "@/utils/queryKey";

import { useSearchBarStore } from "@/store/useSearchBarStore";
import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkBook } from "@/types/linkBook.types";
import { sortByKeywordPosition } from "@/utils/sort";
import useQueryLinkBooks from "../my-folder/useQueryLinkBooks";
import { isApiError } from "@/utils/error";
import { toast } from "@/components/notification/toast/toast";

type BaseInputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
};

type AllLinksProps = BaseInputProps & {
  type: "all";
  linkBookId?: never;
};

type LinkBookLinksProps = BaseInputProps & {
  type: "linkBook";
  linkBookId?: LinkBook["linkBookId"];
};

type SearchLinksProps = BaseInputProps & {
  type: "search";
  linkBookId?: LinkBook["linkBookId"];
};

type InputProps = AllLinksProps | LinkBookLinksProps | SearchLinksProps;

export function useQueryLinks({
  linkSort,
  linkFilter,
  type,
  linkBookId,
}: InputProps): TLinkQueryResult {
  const { isSuccess: isCompleteQueryLinkBook } =
    useQueryLinkBooks("created_at"); // linkBook 쿼리가 먼저 실행되는걸 방지

  const { title: searchKeyword } = useSearchBarStore();

  const queryOptions = useMemo<
    Record<string, unknown> & {
      queryKey: readonly unknown[];
      pathname: string;
      queryString: string;
    }
  >(() => {
    const queryKey = getLinkListQueryKey(linkBookId, searchKeyword);
    let pathname: string;
    let queryString: string;

    switch (type) {
      case "all":
        pathname = "links";
        queryString = `sort=${linkSort.sort}&order=${linkSort.order}`;
        break;
      case "linkBook":
        pathname = linkBookId ? `link-books/${linkBookId}/links` : "links";
        queryString = `sort=${linkSort.sort}&order=${linkSort.order}`;
        break;
      case "search":
        pathname = "links";
        queryString = `sort=${linkSort.sort}&order=${linkSort.order}&search=${searchKeyword}`;
        break;
    }

    return { pathname, queryString, queryKey };
  }, [type, linkBookId, linkSort.sort, linkSort.order, searchKeyword]);

  const {
    data = [],
    refetch,
    ...others
  } = useQuery<Link[]>({
    enabled: !!isCompleteQueryLinkBook,
    queryKey: queryOptions.queryKey,
    queryFn: () =>
      fetch(`/api/${queryOptions.pathname}?${queryOptions.queryString}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: Link[] | ApiError) => {
          if (isApiError(data)) {
            toast({ status: "fail", message: data.error });
            return [];
          }

          // 정렬 로직
          if (linkSort.field === "mostViewd") {
            return [...(data as Link[])].sort(
              (prev, next) => next.readCount - prev.readCount,
            );
          } else if (linkSort.field === "relevance" && type === "search") {
            return sortByKeywordPosition(data as Link[], searchKeyword);
          }

          return data as Link[];
        }),
  });

  const linkList = useMemo(() => {
    return data?.filter(
      ({
        readCount,
        createdAt,
        tags: linkTags,
        linkBookId: linkLinkBookId,
      }) => {
        const unreadFlag = linkFilter.unread ? !readCount : true;

        const datePickerFlag = linkFilter.dateRange.length
          ? linkFilter.dateRange.length === 2 &&
            isBetween(
              new Date(createdAt),
              new Date(linkFilter.dateRange[0]),
              new Date(linkFilter.dateRange[1]),
              true,
            )
          : true;

        const tagFlag =
          linkFilter.tags.length && linkTags
            ? linkFilter.tags.some((tag) => linkTags.includes(tag))
            : true;

        // 검색인 경우 폴더 선택 여부 지원
        const folderFlag =
          type === "search" && searchKeyword
            ? linkBookId
              ? linkLinkBookId === linkBookId
              : true
            : true;

        return unreadFlag && datePickerFlag && tagFlag && folderFlag;
      },
    );
  }, [
    data,
    linkFilter.dateRange,
    linkFilter.unread,
    linkFilter.tags,
    linkBookId,
    searchKeyword,
    type,
  ]);

  useEffect(() => {
    if (linkSort.field) {
      refetch();
    }
  }, [refetch, linkSort.field]);

  return {
    ...others,
    data: linkList,
    refetch,
  };
}
