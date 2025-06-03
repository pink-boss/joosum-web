import { useMutation } from "@tanstack/react-query";

import useLinkBookFromTitle from "./useLinkBookFromTitle";

import useUpdateLinkCache from "./useUpdateLinkCache";
import { toast } from "@/components/notification/toast";

export default function useDeleteLink(
  onSuccessCallback: () => void,
  linkIds: string[],
) {
  const linkBook = useLinkBookFromTitle();
  const updateCache = useUpdateLinkCache();

  return useMutation<unknown, Error>({
    mutationFn: async () => {
      const result = await fetch(`/api/links`, {
        method: "DELETE",
        body: JSON.stringify({ linkIds }),
      });

      if (!result.ok) {
        throw new Error("링크 삭제에 실패했습니다.");
      }
    },
    onSuccess: () => {
      updateCache(linkBook?.linkBookId);
      toast({ status: "success", message: "링크가 삭제되었습니다." });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
