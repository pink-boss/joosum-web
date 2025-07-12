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
import { isApiError } from "@/utils/error";
import { toast } from "@/components/notification/toast/toast";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

export function useQueryLinkBookLinks({
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  const { isSuccess: isCompleteQueryLinkBook } =
    useQueryLinkBooks("created_at"); // queryLink가 먼저 실행되는 걸 방지

  const queryOptions = useMemo<
    Record<string, unknown> & {
      queryKey: readonly unknown[];
    }
  >(() => {
    let pathname = linkBookId ? `link-books/${linkBookId}/links` : `links`;
    let queryString = `sort=${linkSort.sort}&order=${linkSort.order}`;
    let queryKey = getLinkListQueryKey(linkBookId);

    return { pathname, queryString, queryKey };
  }, [linkBookId, linkSort.sort, linkSort.order]);

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
          if (linkSort.field === "mostViewd") {
            return [...(data as Link[])].sort(
              (prev, next) => next.readCount - prev.readCount,
            );
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
          ? linkFilter.dateRange.length == 2 &&
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

        return unreadFlag && datePickerFlag && tagFlag;
      },
    );
  }, [data, linkFilter.dateRange, linkFilter.unread, linkFilter.tags]);

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
