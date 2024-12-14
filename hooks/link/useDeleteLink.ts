import { LinkBookIdParam } from "@/types/linkBook.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCheckLink from "./useCheckLink";
import { Link } from "@/types/link.types";
import { useParams } from "next/navigation";

export default function useDeleteLink(onSuccessCallback: () => void) {
  const { cachedLinks } = useCheckLink();
  const { linkBookId } = useParams<LinkBookIdParam>();

  const queryClient = useQueryClient();
  return useMutation<unknown, Error>({
    mutationFn: async () =>
      (
        await fetch(`/api/links`, {
          method: "DELETE",
          body: JSON.stringify({ linkIds: cachedLinks }),
        })
      ).json(),
    onSuccess: () => {
      queryClient.setQueriesData<Link[]>(
        { queryKey: ["linkList", linkBookId] },
        (prevLinks) =>
          prevLinks?.filter((link) => ![...cachedLinks].includes(link.linkId)),
      );
      onSuccessCallback();
    },
  });
}
