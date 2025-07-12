import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect, useMemo } from "react";

import { Link } from "@/types/link.types";

import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterValues } from "@/store/link-filter/schema";
import useQueryLinkBooks from "../my-folder/useQueryLinkBooks";
import { isApiError } from "@/utils/error";
import { toast } from "@/components/notification/toast/toast";

type InputProps = {
  linkSort: Omit<LinkSortState, "setField">;
  linkFilter: LinkFilterValues;
};

export default function useQueryAllLinks({ linkSort, linkFilter }: InputProps) {
  const { isSuccess: isCompleteQueryLinkBook } =
    useQueryLinkBooks("created_at"); // queryLink가 먼저 실행되는 걸 방지

  const {
    data = [],
    refetch,
    ...others
  } = useQuery<Link[]>({
    enabled: !!isCompleteQueryLinkBook,
    queryKey: ["linkList", "all"],
    queryFn: () =>
      fetch(`/api/links?sort=${linkSort.sort}&order=${linkSort.order}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: Link[] | ApiError) => {
          if (isApiError(data)) {
            toast({ status: "fail", message: data.error });
            return [];
          }
          return data as Link[];
        }),
  });

  const linkList = useMemo(() => {
    return data?.filter(({ readCount }) => {
      const unreadFlag = linkFilter.unread ? !readCount : true;

      return unreadFlag;
    });
  }, [data, linkFilter.unread]);

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
