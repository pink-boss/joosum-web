import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/notification/toast/toast";
import { apiCall } from "@/utils/error";
import {
  UpdateFormResult,
  UpdateFormState,
} from "@/types/notification/settings.types";

// TODO: 알림 기본 설정 변경 요청
export default function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateFormResult | ApiError | undefined,
    Error,
    UpdateFormState
  >({
    mutationFn: async (notification) => {
      return apiCall(`/api/settings/notification`, {
        method: "PUT",
        body: JSON.stringify(notification),
      });
    },
    onSuccess: (result) => {
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
