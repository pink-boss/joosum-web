import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateFormState } from "@/types/notification.types";
import { toast } from "@/components/notification/toast";

export default function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation<undefined, Error, UpdateFormState>({
    mutationFn: async (state: UpdateFormState) => {
      const result = await fetch(`/api/settings/notification`, {
        method: "PUT",
        body: JSON.stringify(state),
      });

      if (!result.ok) {
        throw new Error("알림 설정 저장에 실패했습니다.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "notification"],
      });
      toast({ status: "success", message: "알림 설정이 저장되었습니다." });
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
