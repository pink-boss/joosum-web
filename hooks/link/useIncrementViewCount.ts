import { useMutation } from "@tanstack/react-query";

import { Link } from "@/types/link.types";

import { toast } from "@/components/notification/toast/toast";
import useUpdateLinkCache from "./useUpdateLinkCache";
import { apiCall } from "@/utils/error";

export default function useIncrementViewCount(link: Link) {
  const updateCache = useUpdateLinkCache();

  const mutation = useMutation<undefined, Error>({
    mutationFn: async () => {
      return apiCall(`/api/links/${link.linkId}/read-count`, {
        method: "PUT",
      });
    },
    onSuccess: () => {
      updateCache();
      window.open(link.url, "_blank");
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });

  return mutation;
}
