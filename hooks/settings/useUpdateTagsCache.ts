import { useQueryClient } from "@tanstack/react-query";

import { useCallback } from "react";

export default function useUpdateTagsCache() {
  const queryClient = useQueryClient();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["settings", "tags"],
    });
  }, [queryClient]);

  return updateCache;
}
