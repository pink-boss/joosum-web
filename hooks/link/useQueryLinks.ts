import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect, useMemo } from "react";

import { useFolderLinkFilterStore } from "@/store/link-filter/useFolderStore";
import { useFolderLinkSortStore } from "@/store/link-sort/useFolderStore";
import { Link } from "@/types/link.types";
import { isBetween } from "@/utils/date";
import { getLinkListQueryKey } from "@/utils/queryKey";

import useLinkBookFromTitle from "./useLinkBookFromTitle";

export function useQueryLinks() {
  const linkBook = useLinkBookFromTitle();

  const linkSort = useFolderLinkSortStore();
  const { unread, dateRange, tags } = useFolderLinkFilterStore();

  const pathname = linkBook
    ? `link-books/${linkBook.linkBookId}/links`
    : `links`;
  const queryString = `sort=${linkSort.sort}&order=${linkSort.orderBy}`;

  const {
    data = [],
    refetch,
    ...others
  } = useQuery<Link[], ApiError>({
    queryKey: getLinkListQueryKey(linkBook?.linkBookId),
    queryFn: () =>
      fetch(`/api/${pathname}?${queryString}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: Link[]) => {
          if (linkSort.field === "mostViewd") {
            return [...data].sort(
              (prev, next) => next.readCount - prev.readCount,
            );
          }
          return data;
        }),
  });

  const linkList = useMemo(() => {
    return data.filter(({ readCount, createdAt, tags: linkTags }) => {
      const unreadFlag = unread ? !readCount : true;
      const datePickerFlag = dateRange.length
        ? dateRange.length == 2 &&
          isBetween(
            new Date(createdAt),
            new Date(dateRange[0]),
            new Date(dateRange[1]),
            true,
          )
        : true;
      const tagFlag = tags.length
        ? tags.some((tag) => linkTags.includes(tag))
        : true;
      return unreadFlag && datePickerFlag && tagFlag;
    });
  }, [data, dateRange, unread, tags]);

  useEffect(() => {
    if (linkSort.field) {
      refetch();
    }
  }, [refetch, linkSort.field]);

  return { ...others, data: linkList, refetch };
}
