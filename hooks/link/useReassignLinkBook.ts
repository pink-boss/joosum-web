import { LinkBook, LinkBookIdParam } from "@/types/linkBook.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCheckLink from "./useCheckLink";
import { Link } from "@/types/link.types";
import { useParams } from "next/navigation";

interface ReassignParams {
  toLinkBook: LinkBook;
  linkIds: string[];
}

interface ReassignResponse {
  toLinkBook: LinkBook;
}

interface BatchResult {
  success: boolean;
  linkId: string;
  error?: any;
}

export default function useReassignLinkBook(onSuccessCallback: () => void) {
  const { cachedLinks } = useCheckLink();
  const { linkBookId: fromLinkBookId } = useParams<LinkBookIdParam>();
  const queryClient = useQueryClient();

  return useMutation<ReassignResponse, Error, ReassignParams>({
    mutationFn: async ({ toLinkBook, linkIds }) => {
      const results: BatchResult[] = [];
      const batchSize = 3;

      for (let i = 0; i < linkIds.length; i += batchSize) {
        const batch = linkIds.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (linkId) => {
            try {
              const response = await fetch(
                `/api/links/${linkIds}/link-book-id/${toLinkBook.linkBookId}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    linkBookId: toLinkBook.linkBookId,
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

      return { toLinkBook };
    },
    onSuccess: ({ toLinkBook }) => {
      queryClient.setQueriesData<Link[]>(
        { queryKey: ["linkList", fromLinkBookId] },
        (prevLinks) =>
          prevLinks?.filter((link) => !cachedLinks.has(link.linkId)),
      );
      queryClient.invalidateQueries({
        queryKey: ["linkList", toLinkBook.linkBookId],
      });

      onSuccessCallback();
    },
    onError: ({ message }) => {
      alert(message);
    },
  });
}
