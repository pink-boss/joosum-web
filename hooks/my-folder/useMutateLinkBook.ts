import {
  CreateFormState,
  LinkBook,
  TQueryLinkBooks,
} from "@/types/linkBook.types";
import { useSelectLinkBookStore } from "@/store/useLinkBookStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutateLinkBook(onSuccessCallback: () => void) {
  const { linkBook } = useSelectLinkBookStore();
  const queryClient = useQueryClient();

  return useMutation<LinkBook, Error, CreateFormState>({
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
    onSuccess: (newLinkBook) => {
      queryClient.setQueriesData<TQueryLinkBooks>(
        { queryKey: ["linkBooks"] },
        (prevLinkBooks) => {
          if (!prevLinkBooks) {
            return {
              linkBooks: [newLinkBook],
              totalLinkCount: 1,
            };
          } else if (linkBook) {
            const index = prevLinkBooks!.linkBooks.findIndex(
              (prev) => prev.linkBookId === linkBook?.linkBookId,
            );
            return {
              linkBooks: [
                ...prevLinkBooks!.linkBooks.slice(0, index),
                newLinkBook,
                ...prevLinkBooks!.linkBooks.slice(index + 1),
              ],
              totalLinkCount: prevLinkBooks.totalLinkCount,
            };
          }
          return {
            linkBooks: [
              prevLinkBooks.linkBooks[0],
              { ...newLinkBook, linkCount: 0 },
              ...prevLinkBooks.linkBooks.slice(1),
            ],
            totalLinkCount: prevLinkBooks.totalLinkCount + 1,
          };
        },
      );
      onSuccessCallback();
    },
  });
}
