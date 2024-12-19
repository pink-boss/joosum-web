import { Link } from "@/types/link.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        queryClient.setQueryData<Link>(
          ["link", "title", link.title],
          (prevLink) => {
            if (prevLink) {
              return {
                ...prevLink,
                readCount: prevLink.readCount + 1,
              };
            }
            return prevLink;
          },
        );
        window.open(link.url, "_blank");
      }
    },
  });

  return mutation;
}
