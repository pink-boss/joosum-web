import { useMutation } from "@tanstack/react-query";

import { Tag } from "@/types/tags.types";
import { toast } from "@/components/notification/toast";
import useUpdateTagsCache from "./useUpdateTagsCache";

export default function useDeleteTagsSetting(onSuccessCallback: () => void) {
  const updateCache = useUpdateTagsCache();

  return useMutation<undefined, Error, Tag>({
    mutationFn: async (state: Tag) => {
      const result = await fetch(`/api/settings/tags/${state}`, {
        method: "DELETE",
      });

      if (!result.ok) {
        throw new Error("태그 삭제에 실패했습니다.");
      }
    },
    onSuccess: () => {
      updateCache();
      toast({ status: "success", message: "태그가 삭제되었습니다." });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
