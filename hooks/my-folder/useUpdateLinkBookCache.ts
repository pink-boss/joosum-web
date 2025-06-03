import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";
import { useLinkBookSortStore } from "@/store/useLinkBookSortStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { useQueryClient } from "@tanstack/react-query";

import { useCallback } from "react";

export default function useUpdateLinkBookCache() {
  const queryClient = useQueryClient();
  const { sort } = useLinkBookSortStore();
  const { sort: searchSort } = useSearchLinkSortStore();
  const { title: searchKeyword } = useSearchBarStore();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["linkBookList"],
    });
    queryClient.invalidateQueries({
      queryKey: ["linkBookList", "created_at"],
    });
    queryClient.invalidateQueries({
      queryKey: ["linkBookList", sort],
    });
    if (searchKeyword) {
      queryClient.invalidateQueries({
        queryKey: ["linkBookList", searchSort],
      });
    }
  }, [queryClient, sort, searchKeyword, searchSort]);

  return updateCache;
}
