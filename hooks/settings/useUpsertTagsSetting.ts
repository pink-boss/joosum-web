import { useMutation } from "@tanstack/react-query";

import { TagList } from "@/types/tags.types";
import useUpdateTagsCache from "./useUpdateTagsCache";
import { toast } from "@/components/notification/toast/toast";
import { apiCall } from "@/utils/error";

export default function useUpsertTagsSetting(onSuccess?: () => void) {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, TagList>({
    mutationFn: async (state: TagList) =>
      apiCall(`/api/settings/tags`, {
        method: "POST",
        body: JSON.stringify(state),
      }),
    onSuccess: () => {
      updateCache();
      toast({ status: "success", message: "태그가 저장되었습니다." });
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      toast({ status: "fail", message: error.message });
    },
  });
}
