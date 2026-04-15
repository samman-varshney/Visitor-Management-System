export interface VisitRequest {
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  visitorCompany?: string;
  visitorPhotoUrl?: string;
  purpose: string;
  requestedDate: Date;
  requestedTime: string;
  hostEmployeeId: string;
  hostEmployeeName: string;
  hostEmployeeEmail: string;
  status: VisitRequestStatus;
  qrCode?: string;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  canReverse: boolean;
  reversalDeadline?: Date;
  isPreApproval: boolean;
  emailSent: boolean;
  notificationSent: boolean;
  expiresAt: Date;
  createdBy: string;
  requestedBy?: {
    userId: string;
    name: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export enum VisitRequestStatus {
  pending,
  approved,
  rejected,
}
