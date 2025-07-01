export type Notification = {
  body: string;
  createdAt: string;
  isRead: boolean;
  notificationId: string;
  title: string;
  type: string;
  userId: string;
};

export type TQueryNotifications = {
  notifications: Notification[];
  page: {
    next: number;
    page: number;
    perPage: number;
    prev: number;
    total: number;
    totalPage: number;
  };
};
