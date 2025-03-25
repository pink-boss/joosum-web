import { useMutation } from "@tanstack/react-query";

import { TQueryThumbnail, TQueryThumbnailArgs } from "@/types/link.types";

export default function useQueryThumbnail() {
  return useMutation<TQueryThumbnail, Error, TQueryThumbnailArgs>({
    mutationFn: async (state) => {
      return (
        await fetch(`/api/links/thumbnail`, {
          method: "POST",
          body: JSON.stringify(state),
        })
      ).json();
    },
  });
}
