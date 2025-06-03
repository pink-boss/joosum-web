import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/notification/toast";
import { apiCall } from "@/utils/error";

export default function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation<undefined, Error, boolean>({
    mutationFn: async (state: boolean) => {
      return apiCall(`/api/settings/notification`, {
        method: "POST",
        body: JSON.stringify({ notification: state }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "notification"],
      });
      toast({ status: "success", message: "알림 설정이 변경되었습니다." });
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
