export interface Notification {
  userId: string;
  type:
    | "visit_request"
    | "approval"
    | "rejection"
    | "checkin"
    | "checkout"
    | "request";
  title: string;
  message: string;
  isRead: boolean;
  read: boolean;
  relatedId?: string;
  createdAt: Date;
  updatedAt: Date;
}
