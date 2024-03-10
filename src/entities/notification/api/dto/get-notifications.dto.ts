export interface GetNotificationsDto {
  notifications: [
    {
      body: string;
      createdAt: string;
      isRead: boolean;
      notificationId: string;
      title: string;
      type: string;
      userId: string;
    },
  ];
  page: {
    next: number;
    page: number;
    perPage: number;
    prev: number;
    total: number;
    totalPage: number;
  };
}
