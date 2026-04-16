export interface Notification {
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  read: boolean;
  relatedId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum NotificationType {
  visit_request,
  approval,
  rejection,
  checkin,
  checkout,
  request,
}
