import { useMutation } from "@tanstack/react-query";

import useLinkBookFromTitle from "./useLinkBookFromTitle";
import { apiCall } from "@/utils/error";
import useUpdateLinkCache from "./useUpdateLinkCache";
import { toast } from "@/components/notification/toast/toast";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";

export default function useDeleteDrawerLink(
  onSuccessCallback: () => void,
  linkId: string,
) {
  const linkBook = useLinkBookFromTitle();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();
  const updateCache = useUpdateLinkCache();

  return useMutation<undefined, Error>({
    mutationFn: async () =>
      apiCall(`/api/links/${linkId}`, {
        method: "DELETE",
      }),
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
