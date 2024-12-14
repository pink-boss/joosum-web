import {
  CreateFormState,
  LinkBook,
  TQueryLinkBooks,
} from "@/types/linkBook.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSelectLinkBook from "./useSelectLinkBook";

export default function useMutateLinkBook(onSuccessCallback: () => void) {
  const { linkBook } = useSelectLinkBook();
  const queryClient = useQueryClient();

  return useMutation<LinkBook | ApiError, Error, CreateFormState>({
    mutationFn: async (state) =>
      (
        await fetch(
          `my-folder/api${linkBook ? `/${linkBook.linkBookId}` : ""}`,
          {
            method: linkBook ? "PUT" : "POST",
            body: JSON.stringify(state),
          },
        )
      ).json(),
    onSuccess: (result) => {
      if ("error" in result) {
        alert(result.error);
      } else {
        queryClient.setQueriesData<TQueryLinkBooks>(
          { queryKey: ["linkBookList"] },
          (prevLinkBooks) => {
            if (!prevLinkBooks) {
              return {
                linkBooks: [result],
                totalLinkCount: 1,
              };
            } else if (linkBook) {
              const index = prevLinkBooks!.linkBooks.findIndex(
                (prev) => prev.linkBookId === linkBook?.linkBookId,
              );
              return {
                linkBooks: [
                  ...prevLinkBooks!.linkBooks.slice(0, index),
                  result,
                  ...prevLinkBooks!.linkBooks.slice(index + 1),
                ],
                totalLinkCount: prevLinkBooks.totalLinkCount,
              };
            }
            return {
              linkBooks: [
                prevLinkBooks.linkBooks[0],
                { ...result, linkCount: 0 },
                ...prevLinkBooks.linkBooks.slice(1),
              ],
              totalLinkCount: prevLinkBooks.totalLinkCount + 1,
            };
          },
        );
        onSuccessCallback();
      }
    },
  });
}
