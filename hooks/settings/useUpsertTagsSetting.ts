import { useMutation } from "@tanstack/react-query";

import { TagList } from "@/types/tags.types";
import useUpdateTagsCache from "./useUpdateTagsCache";
import { toast } from "@/components/notification/toast";

export default function useUpsertTagsSetting() {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, TagList>({
    mutationFn: async (state: TagList) => {
      const result = await fetch(`/api/settings/tags`, {
        method: "POST",
        body: JSON.stringify(state),
      });

      if (!result.ok) {
        throw new Error("태그 생성에 실패했습니다.");
      }
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
