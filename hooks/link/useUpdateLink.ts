import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, UpdateFormState } from "@/types/link.types";
import useLinkBookFromTitle from "./useLinkBookFromTitle";
import { getLinkListQueryKey } from "@/utils/queryKey";

type SuccessResult = [Link, { status: 204 }];

export default function useUpdateLink(onSuccessCallback: () => void) {
  const prevLinkBook = useLinkBookFromTitle();
  const queryClient = useQueryClient();

  return useMutation<Link, Error, UpdateFormState>({
    mutationFn: async (state) => {
      const work: Promise<Link | ApiError | { status: 204 }>[] = [];

      const linkUpdateResult: Promise<Link | ApiError> = (
        await fetch(`/api/links/${state.linkId ?? ""}`, {
          method: state.linkId ? "PUT" : "POST",
          body: JSON.stringify(state),
        })
      ).json();
      work.push(linkUpdateResult);

      if (state.linkId) {
        const linkBookUpdateResult: Promise<{ status: 204 } | ApiError> = (
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
        const errorResponse = result.find(
          (item) => "error" in item,
        ) as ApiError;
        throw new Error(errorResponse.error);
      }

      return {
        ...result[0],
        linkBookId: state.linkBookId,
        linkBookName: state.linkBookName,
        updatedAt: new Date().toISOString(),
      };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(prevLinkBook?.linkBookId),
      });
      onSuccessCallback();
    },
  });
}

const isSuccessfulResponse = (
  response: (Link | ApiError | { status: 204 })[],
): response is SuccessResult => {
  return response.every((item) => !("error" in item));
};
