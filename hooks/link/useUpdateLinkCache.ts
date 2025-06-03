import { useQueryClient } from "@tanstack/react-query";

import { useCallback } from "react";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { getLinkListQueryKey } from "@/utils/queryKey";

export default function useUpdateLinkCache() {
  const queryClient = useQueryClient();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();
  const { title: searchKeyword } = useSearchBarStore();

  const updateCache = useCallback(
    (linkBookId?: string) => {
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(linkBookId),
      });
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(),
      });

      if (searchKeyword) {
        queryClient.invalidateQueries({
          queryKey: ["search", "linkList"],
        });
        if (searchLinkBookId) {
          queryClient.invalidateQueries({
            queryKey: ["search", "linkList", searchLinkBookId],
          });
        }
      }
    },
    [queryClient, searchKeyword, searchLinkBookId],
  );

  return updateCache;
}
