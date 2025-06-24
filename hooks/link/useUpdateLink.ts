import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, UpdateFormState } from "@/types/link.types";

import useLinkBookFromTitle from "./useLinkBookFromTitle";
import { toast } from "@/components/notification/toast/toast";
import { isApiError } from "@/utils/error";

import { isSuccessfullLinkResponse } from "@/utils/link";
import useUpdateLinkCache from "./useUpdateLinkCache";

export default function useUpdateLink(onSuccessCallback: () => void) {
  const prevLinkBook = useLinkBookFromTitle();
  const queryClient = useQueryClient();

  const updateCache = useUpdateLinkCache();

  return useMutation<undefined, Error, UpdateFormState>({
    mutationFn: async (state) => {
      if (!state.linkId) {
        throw new Error("링크 ID가 없습니다.");
      }

      const work: Promise<Link | ApiError | { status: number }>[] = [];

      const linkUpdateResult: Promise<Link | ApiError> = (
        await fetch(`/api/links/${state.linkId}`, {
          method: "PUT",
          body: JSON.stringify(state),
        })
      ).json();
      work.push(linkUpdateResult);

      const linkBookUpdateResult: Promise<{ status: number } | ApiError> = (
        await fetch(
          `/api/links/${state.linkId}/link-book-id/${state.linkBookId}`,
          {
            method: "PUT",
          },
        )
      ).json();
      work.push(linkBookUpdateResult);

      if (state.tags.length) {
        const tagsResult: Promise<{ status: number } | ApiError> = (
          await fetch(`/api/settings/tags`, {
            method: "POST",
            body: JSON.stringify(state.tags),
          })
        ).json();
        work.push(tagsResult);
      }

      const result = await Promise.all(work);

      if (!isSuccessfullLinkResponse(result)) {
        const error = result.find((item) => isApiError(item));
        console.log(error);
        throw new Error("링크 수정에 실패했습니다.");
      }
    },
    onSuccess: () => {
      updateCache(prevLinkBook?.linkBookId);
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });

      onSuccessCallback();
      toast({ status: "success", message: "링크가 수정되었습니다." });
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
