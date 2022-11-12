export interface INotification {
  fullName: string;
  avatar: string;
  createdAt: string;
  text: string;
  isRead: boolean;
  uuid: string | undefined;
  roomId: number;
}
