import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { Notification } from "@/types/notification.types";

export function useQueryNotificationSetting() {
  const { data, refetch, ...others } = useQuery<Notification, ApiError>({
    queryKey: ["settings", "notification"],
    queryFn: () =>
      fetch(`/api/settings/notification`, {
        method: "GET",
      }).then((res) => res.json()),
  });

  return { ...others, data, refetch };
}
