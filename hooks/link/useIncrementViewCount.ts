import { useMutation } from "@tanstack/react-query";

import { Link } from "@/types/link.types";

import { toast } from "@/components/notification/toast";
import useUpdateLinkCache from "./useUpdateLinkCache";

export default function useIncrementViewCount(link: Link) {
  const updateCache = useUpdateLinkCache();

  const mutation = useMutation<undefined, Error>({
    mutationFn: async () => {
      const result = await fetch(`/api/links/${link.linkId}/read-count`, {
        method: "PUT",
      });
      if (!result.ok) {
        throw new Error("조회수 업데이트에 실패했습니다.");
      }
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
