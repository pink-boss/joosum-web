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
        queryKey: getLinkListQueryKey(linkBookId, searchKeyword),
      });
    },
    [queryClient, searchKeyword, searchLinkBookId],
  );

  return updateCache;
}
