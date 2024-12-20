import { TQueryLinkBooks } from "@/types/linkBook.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSelectLinkBook from "./useSelectLinkBook";

export default function useDeleteLinkBook(onSuccessCallback: () => void) {
  const { linkBook } = useSelectLinkBook();

  const queryClient = useQueryClient();
  return useMutation<{ deletedLinks: number }, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/link-books/${linkBook?.linkBookId}`, {
          method: "DELETE",
        })
      ).json(),
    onSuccess: () => {
      queryClient.setQueriesData<TQueryLinkBooks>(
        { queryKey: ["linkBookList"] },
        (prevLinkBooks) => {
          const index = prevLinkBooks!.linkBooks.findIndex(
            (prev) => prev.linkBookId === linkBook?.linkBookId,
          );
          return {
            linkBooks: [
              ...prevLinkBooks!.linkBooks.slice(0, index),
              ...prevLinkBooks!.linkBooks.slice(index + 1),
            ],
            totalLinkCount: prevLinkBooks!.totalLinkCount - 1,
          };
        },
      );
      onSuccessCallback();
    },
  });
}
