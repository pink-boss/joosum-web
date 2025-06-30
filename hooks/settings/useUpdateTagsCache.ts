import { useQueryClient } from "@tanstack/react-query";

import { useCallback } from "react";

export default function useUpdateTagsCache() {
  const queryClient = useQueryClient();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["settings", "tags"],
    });
    queryClient.invalidateQueries({
      queryKey: ["tags"],
    });
  }, [queryClient]);

  return updateCache;
}
