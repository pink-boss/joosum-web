import { useMutation } from "@tanstack/react-query";

import useUpdateTagsCache from "./useUpdateTagsCache";
import { toast } from "@/components/notification/toast";
import { apiCall } from "@/utils/error";

export default function useDeleteTagSetting() {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, string>({
    mutationFn: async (id: string) => {
      return apiCall(`/api/settings/tags/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      updateCache();
      toast({ status: "success", message: "태그가 삭제되었습니다." });
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
