import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, UpdateFormState } from "@/types/link.types";
import { getLinkListQueryKey } from "@/utils/queryKey";

import useLinkBookFromTitle from "./useLinkBookFromTitle";
import { toast } from "@/components/notification/toast";
import { isApiError } from "@/utils/error";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";

type SuccessResult = [Link, { status: 204 }];

export default function useUpdateLink() {
  const prevLinkBook = useLinkBookFromTitle();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();
  const queryClient = useQueryClient();
  const { title: searchKeyword } = useSearchBarStore();

  return useMutation<boolean, Error, UpdateFormState>({
    mutationFn: async (state) => {
      const work: Promise<Link | ApiError | { status: number }>[] = [];

      const linkUpdateResult: Promise<Link | ApiError> = (
        await fetch(`/api/links/${state.linkId ?? ""}`, {
          method: state.linkId ? "PUT" : "POST",
          body: JSON.stringify(state),
        })
      ).json();
      work.push(linkUpdateResult);

      if (state.linkId) {
        const linkBookUpdateResult: Promise<{ status: number } | ApiError> = (
          await fetch(
            `/api/links/${state.linkId}/link-book-id/${state.linkBookId}`,
            {
              method: "PUT",
            },
          )
        ).json();
        work.push(linkBookUpdateResult);
      }

      const result = await Promise.all(work);

      if (!isSuccessfulResponse(result)) {
        console.error(result.find((item) => isApiError(item)));
        toast({ status: "fail", message: "링크 수정을 실패했습니다." });
        return false;
      }

      toast({ status: "success", message: "링크가 저장되었습니다." });
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(prevLinkBook?.linkBookId),
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
    },
  });
}

const isSuccessfulResponse = (
  response: (Link | ApiError | { status: number })[],
): response is SuccessResult => {
  return response.every((item) => !("error" in item));
};
