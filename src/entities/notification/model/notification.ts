export interface Notification {
  body: string;
  createdAt: Date;
  isRead: boolean;
  notificationId: string;
  title: string;
  type: string;
  userId: string;
}
