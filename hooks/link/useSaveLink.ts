import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, SaveFormState } from "@/types/link.types";

import { isApiError } from "@/utils/error";
import { toast } from "@/components/notification/toast/toast";

import { isSuccessfullLinkResponse } from "@/utils/link";
import useUpdateLinkCache from "./useUpdateLinkCache";

export default function useSaveLink(onClose: () => void) {
  const queryClient = useQueryClient();
  const updateCache = useUpdateLinkCache();

  return useMutation<Link, Error, SaveFormState>({
    mutationFn: async (state) => {
      const work: Promise<Link | ApiError | { status: number }>[] = [];

      const linkSaveResult: Promise<Link | ApiError> = (
        await fetch(`/api/links`, {
          method: "POST",
          body: JSON.stringify(state),
        })
      ).json();
      work.push(linkSaveResult);

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
        throw new Error("링크 저장에 실패했습니다.");
      }

      return result[0] as Link;
    },
    onSuccess: (result) => {
      updateCache(result.linkBookId);

      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });

      toast({ status: "success", message: "링크가 저장되었습니다." });
      onClose();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
