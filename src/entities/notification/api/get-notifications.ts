import { HttpMethod, fetcher } from "@/shared/lib/fetcher";
import type { GetNotificationsDto } from "./dto/get-notifications.dto";
import { mapNotifications } from "./mapper/notifications.map";

export const getNotifications = (page: number) =>
  fetcher
    .fetch<GetNotificationsDto>(HttpMethod.GET, "/notifications", {
      query: {
        page,
      },
    })
    .then(mapNotifications);
