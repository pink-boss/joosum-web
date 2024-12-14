import { LinkBookIdParam } from "@/types/linkBook.types";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import { useLinkSortStore } from "@/store/useLinkSortStore";
import { isBetween } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Link } from "@/types/link.types";

export function useQueryLinks() {
  const { linkBookId } = useParams<LinkBookIdParam>();

  const linkSort = useLinkSortStore();
  const { unread, dateRange, tags } = useLinkFilterStore();

  const {
    data = [],
    refetch,
    ...others
  } = useQuery<Link[], ApiError>({
    queryKey: ["links", linkBookId],
    queryFn: () =>
      fetch(
        `/api/links/${linkBookId}?sort=${linkSort.sort}&order=${linkSort.orderBy}`,
        {
          method: "GET",
        },
      )
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
  console.log(dateRange, unread, tags);

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
