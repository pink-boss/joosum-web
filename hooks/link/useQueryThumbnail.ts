import { useMutation } from "@tanstack/react-query";

import { TQueryThumbnail, TQueryThumbnailArgs } from "@/types/link.types";
import { apiCall } from "@/utils/error";
import { toast } from "@/components/notification/toast/toast";

export default function useQueryThumbnail() {
  return useMutation<
    TQueryThumbnail | ApiError | undefined,
    Error,
    TQueryThumbnailArgs
  >({
    mutationFn: async (state) => {
      const timeout = 2000;
      return Promise.race<
        [Promise<TQueryThumbnail | ApiError | undefined>, Promise<ApiError>]
      >([
        apiCall(`/api/links/thumbnail`, {
          method: "POST",
          body: JSON.stringify(state),
        }),
        new Promise<ApiError>((_, reject) =>
          setTimeout(() => reject("응답이 없습니다."), timeout),
        ),
      ]);
    },
    onError: (error) => {
      console.log(error);
      toast({ status: "fail", message: "썸네일 불러오기를 실패했습니다." });
    },
  });
}
