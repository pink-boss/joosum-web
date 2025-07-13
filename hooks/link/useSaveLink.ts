import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, SaveFormState } from "@/types/link.types";

import { isApiError } from "@/utils/error";
import { toast } from "@/components/notification/toast/toast";

import useUpdateLinkCache from "./useUpdateLinkCache";
import { isSuccessfullResponse } from "@/utils/type-guard";
import { getTagsQueryKey } from "@/utils/queryKey";

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

      const result = await Promise.all(work);

      if (!isSuccessfullResponse<Link>(result)) {
        const error = result.find((item) => isApiError(item));
        console.log(error);
        throw new Error("링크 저장에 실패했습니다.");
      }

      return result[0] as Link;
    },
    onSuccess: () => {
      updateCache();

      queryClient.invalidateQueries({
        queryKey: getTagsQueryKey("used"),
      });

      toast({ status: "success", message: "링크가 저장되었습니다." });
      onClose();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
