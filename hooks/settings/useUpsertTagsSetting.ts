import { useMutation } from "@tanstack/react-query";

import { TagList } from "@/types/tags.types";
import useUpdateTagsCache from "./useUpdateTagsCache";
import { toast } from "@/components/notification/toast";
import { apiCall } from "@/utils/error";

export default function useUpsertTagsSetting() {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, TagList>({
    mutationFn: async (state: TagList) => {
      return apiCall(`/api/settings/tags`, {
        method: "POST",
        body: JSON.stringify(state),
      });
    },
    onSuccess: () => {
      updateCache();
      toast({ status: "success", message: "태그가 생성되었습니다." });
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
