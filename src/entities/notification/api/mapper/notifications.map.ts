import { Notification } from "../../model/notification";
import type { GetNotificationsDto } from "../dto/get-notifications.dto";

export const mapNotifications = (
  response: GetNotificationsDto,
): {
  notifications: Notification[];
  page: GetNotificationsDto["page"];
} => {
  return {
    notifications: response.notifications.map((notification) => ({
      ...notification,
      createdAt: new Date(notification.createdAt),
    })),
    page: response.page,
  };
};
