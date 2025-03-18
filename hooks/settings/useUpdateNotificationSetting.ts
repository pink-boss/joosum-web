import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateFormResult, UpdateFormState } from "@/types/notification.types";

export default function useUpdateNotificationSetting() {
  const queryClient = useQueryClient();

  return useMutation<UpdateFormResult, Error, UpdateFormState>({
    mutationFn: async (state: UpdateFormState) => {
      return (
        await fetch(`/api/settings/notification`, {
          method: "PUT",
          body: JSON.stringify(state),
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
