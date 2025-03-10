import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Notification, UpdateFormState } from "@/types/settings.types";

export default function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation<Notification, Error, UpdateFormState>({
    mutationFn: async () => {
      return (
        await fetch(`/api/settings/notification`, {
          method: "PUT",
        })
      ).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "notification"],
      });
    },
  });
}
