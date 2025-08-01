import { useMutation } from "@tanstack/react-query";

import useLinkBookFromTitle from "./useLinkBookFromTitle";
import useUpdateLinkCache from "./useUpdateLinkCache";
import { toast } from "@/components/notification/toast/toast";
import { apiCall } from "@/utils/error";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";

export default function useDeleteLink(
  onSuccessCallback: () => void,
  linkIds: string[],
) {
  const linkBook = useLinkBookFromTitle();
  const updateCache = useUpdateLinkCache();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();

  return useMutation<unknown, Error>({
    mutationFn: async () => {
      return apiCall(`/api/links`, {
        method: "DELETE",
        body: JSON.stringify({ linkIds }),
      });
    },
    onSuccess: () => {
      updateCache(linkBook?.linkBookId || searchLinkBookId);
      toast({ status: "success", message: "링크가 삭제되었습니다." });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
