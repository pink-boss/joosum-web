import { useMutation } from "@tanstack/react-query";

import useLinkBookFromTitle from "./useLinkBookFromTitle";
import { apiCall } from "@/utils/error";
import useUpdateLinkCache from "./useUpdateLinkCache";
import { toast } from "@/components/notification/toast/toast";

export default function useDeleteDrawerLink(
  onSuccessCallback: () => void,
  linkId: string,
) {
  const linkBook = useLinkBookFromTitle();
  const updateCache = useUpdateLinkCache();

  return useMutation<undefined, Error>({
    mutationFn: async () =>
      apiCall(`/api/links/${linkId}`, {
        method: "DELETE",
      }),
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
