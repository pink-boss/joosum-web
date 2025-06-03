import { useQueryClient } from "@tanstack/react-query";

import { useCallback } from "react";

export default function useUpdateLinkBookCache() {
  const queryClient = useQueryClient();

  const updateCache = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["linkBookList"],
    });
  }, [queryClient]);

  return updateCache;
}
