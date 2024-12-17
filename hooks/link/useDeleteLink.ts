import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@/types/link.types";
import useLinkBookFromTitle from "./useLinkBookFromTitle";

export default function useDeleteLink(
  onSuccessCallback: () => void,
  linkIds: string[],
) {
  const linkBook = useLinkBookFromTitle();

  const queryClient = useQueryClient();
  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/links`, {
          method: "DELETE",
          body: JSON.stringify({ linkIds }),
        })
      ).json(),
    onSuccess: () => {
      queryClient.setQueriesData<Link[]>(
        { queryKey: ["linkList", linkBook?.linkBookId] },
        (prevLinks) =>
          prevLinks?.filter((link) => ![...linkIds].includes(link.linkId)),
      );
      onSuccessCallback();
    },
  });
}
