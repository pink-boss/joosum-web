import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@/types/link.types";
import useLinkBookFromTitle from "./useLinkBookFromTitle";

export default function useDeleteDrawerLink(
  onSuccessCallback: () => void,
  linkId: string,
) {
  const linkBook = useLinkBookFromTitle();

  const queryClient = useQueryClient();
  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/links/${linkId}`, {
          method: "DELETE",
        })
      ).json(),
    onSuccess: () => {
      queryClient.setQueriesData<Link[]>(
        { queryKey: ["linkList", linkBook?.linkBookId] },
        (prevLinks) =>
          prevLinks?.filter((link) => ![linkId].includes(link.linkId)),
      );
      onSuccessCallback();
    },
  });
}
