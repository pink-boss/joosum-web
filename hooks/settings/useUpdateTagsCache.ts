import { getTagsQueryKey } from "@/utils/queryKey";
import { useQueryClient } from "@tanstack/react-query";

import { useCallback } from "react";

export default function useUpdateTagsCache() {
  const queryClient = useQueryClient();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: getTagsQueryKey("created"),
    });
    queryClient.invalidateQueries({
      queryKey: getTagsQueryKey("used"),
    });
  }, [queryClient]);

  return updateCache;
}
