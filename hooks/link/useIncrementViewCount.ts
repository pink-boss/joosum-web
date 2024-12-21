import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Link } from "@/types/link.types";
import { getLinkListQueryKey } from "@/utils/queryKey";

export default function useIncrementViewCount(link: Link) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => (
      await fetch(`/api/links/${link.linkId}/read-count`), { method: "PUT" }
    ),
    onSuccess: (result) => {
      if ("error" in result) {
        alert(result.error);
      } else {
        queryClient.invalidateQueries({
          queryKey: getLinkListQueryKey(),
        });
        window.open(link.url, "_blank");
      }
    },
  });

  return mutation;
}
