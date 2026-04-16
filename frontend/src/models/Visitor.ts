export interface Visitor {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  company?: string;
  purpose: string;
  hostEmployeeId: string;
  hostEmployeeName: string;
  hostEmployeeEmail: string;
  photoUrl: string;
  checkInTime: Date;
  checkOutTime?: Date;
  visitDuration?: string;
  status: VisitorStatus;
  qrCode?: string;
  idProof?: string;
  requestId?: string;
  checkoutEmailSent: boolean;
  checkedInBy: {
    userId: number;
    name: string;
    role: string;
  };
  checkedOutBy?: {
    userId: number;
    name: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export enum VisitorStatus {
  checkedIn,
  checkedOut,
}
