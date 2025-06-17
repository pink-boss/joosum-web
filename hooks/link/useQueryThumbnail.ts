import { useMutation } from "@tanstack/react-query";

import { TQueryThumbnail, TQueryThumbnailArgs } from "@/types/link.types";
import { apiCall } from "@/utils/error";
import { toast } from "@/components/notification/toast";

export default function useQueryThumbnail() {
  return useMutation<TQueryThumbnail | ApiError, Error, TQueryThumbnailArgs>({
    mutationFn: async (state) => {
      const timeout = 2000;
      return Promise.race<
        [Promise<TQueryThumbnail | ApiError>, Promise<never>]
      >([
        apiCall(`/api/links/thumbnail`, {
          method: "POST",
          body: JSON.stringify(state),
        }),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("썸네일 불러오기를 실패했습니다.")),
            timeout,
          ),
        ),
      ]) as Promise<TQueryThumbnail | ApiError>;
    },
    onError: (error) => {
      console.log(error);
      toast({ status: "fail", message: "썸네일 불러오기를 실패했습니다." });
    },
  });
}
