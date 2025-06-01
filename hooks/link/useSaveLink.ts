import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, SaveFormState } from "@/types/link.types";
import { getLinkListQueryKey } from "@/utils/queryKey";
import { isApiError } from "@/utils/error";
import { toast } from "@/components/notification/toast";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";

export default function useSaveLink(onClose: () => void) {
  const queryClient = useQueryClient();
  const { title: searchKeyword } = useSearchBarStore();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();

  return useMutation<Link, Error, SaveFormState>({
    mutationFn: async (state) => {
      return (
        await fetch(`/api/links`, {
          method: "POST",
          body: JSON.stringify(state),
        })
      ).json();
    },
    onSuccess: (result) => {
      if (isApiError(result)) {
        toast({ status: "fail", message: "링크 생성에 실패했습니다." });
      } else {
        queryClient.invalidateQueries({
          queryKey: getLinkListQueryKey(result.linkBookId),
        });
        queryClient.invalidateQueries({
          queryKey: getLinkListQueryKey(),
        });

        if (searchKeyword) {
          queryClient.invalidateQueries({
            queryKey: ["search", "linkList"],
          });
          if (searchLinkBookId) {
            queryClient.invalidateQueries({
              queryKey: ["search", "linkList", searchLinkBookId],
            });
          }
        }
      }
      toast({ status: "success", message: "링크가 저장되었습니다." });
      onClose();
    },
  });
}
