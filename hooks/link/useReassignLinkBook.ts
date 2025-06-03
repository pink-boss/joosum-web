import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link } from "@/types/link.types";
import { LinkBook } from "@/types/linkBook.types";
import { getLinkListQueryKey } from "@/utils/queryKey";

import useCheckLink from "./useCheckLink";
import useLinkBookFromTitle from "./useLinkBookFromTitle";
import { toast } from "@/components/notification/toast";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";

interface ReassignParams {
  toLinkBookId: LinkBook["linkBookId"];
  linkIds: string[];
}

interface ReassignResponse {
  toLinkBookId: LinkBook["linkBookId"];
}

interface BatchResult {
  success: boolean;
  linkId: string;
  error?: any;
}

export default function useReassignLinkBook(onSuccessCallback: () => void) {
  const { cachedLinks } = useCheckLink();
  const fromLinkBook = useLinkBookFromTitle();
  const { title: searchKeyword } = useSearchBarStore();
  const { linkBookId: searchLinkBookId } = useSearchLinkFilterStore();
  const queryClient = useQueryClient();

  return useMutation<ReassignResponse, Error, ReassignParams>({
    mutationFn: async ({ toLinkBookId, linkIds }) => {
      const results: BatchResult[] = [];
      const batchSize = 3;

      for (let i = 0; i < linkIds.length; i += batchSize) {
        const batch = linkIds.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (linkId) => {
            try {
              const response = await fetch(
                `/api/links/${linkIds}/link-book-id/${toLinkBookId}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    linkBookId: toLinkBookId,
                    linkIds,
                  }),
                },
              );

              if (!response.ok) {
                return { success: false, linkId, error: await response.json() };
              }

              return { success: true, linkId };
            } catch (error) {
              return { success: false, linkId, error };
            }
          }),
        );
        results.push(...batchResults);
      }

      const failedUpdates = results.filter((res) => !res.success);
      if (failedUpdates.length > 0) {
        throw new Error(
          `${linkIds.length}개 중, ${failedUpdates.length}개의 폴더이동이 실패했습니다.`,
        );
      }

      return { toLinkBookId };
    },
    onSuccess: () => {
      if (searchKeyword) {
        queryClient.invalidateQueries({
          queryKey: ["search", "linkList"],
        });
        if (searchLinkBookId) {
          queryClient.invalidateQueries({
            queryKey: ["search", "linkList", searchLinkBookId],
          });
        }
      } else {
        queryClient.invalidateQueries({
          queryKey: getLinkListQueryKey(fromLinkBook?.linkBookId),
        });
      }

      toast({
        status: "success",
        message: "폴더이동이 완료되었습니다.",
      });

      onSuccessCallback();
    },
    onError: ({ message }) => {
      toast({
        status: "fail",
        message,
      });
    },
  });
}
