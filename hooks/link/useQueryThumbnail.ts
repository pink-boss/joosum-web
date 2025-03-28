import { useMutation } from "@tanstack/react-query";

import { TQueryThumbnail, TQueryThumbnailArgs } from "@/types/link.types";

export default function useQueryThumbnail() {
  return useMutation<TQueryThumbnail | ApiError, Error, TQueryThumbnailArgs>({
    mutationFn: async (state) => {
      const response = await fetch(`/api/links/thumbnail`, {
        method: "POST",
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      return response.json();
    },
  });
}
