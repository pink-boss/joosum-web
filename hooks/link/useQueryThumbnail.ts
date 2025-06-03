import { useMutation } from "@tanstack/react-query";

import { TQueryThumbnail, TQueryThumbnailArgs } from "@/types/link.types";
import { apiCall } from "@/utils/error";
import { toast } from "@/components/notification/toast";

export default function useQueryThumbnail() {
  return useMutation<TQueryThumbnail | ApiError, Error, TQueryThumbnailArgs>({
    mutationFn: async (state) => {
      return apiCall(`/api/links/thumbnail`, {
        method: "POST",
        body: JSON.stringify(state),
      });
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
