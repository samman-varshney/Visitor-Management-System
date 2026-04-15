export interface Visitor {
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
  status: "checked-in" | "checked-out";
  qrCode?: string;
  idProof?: string;
  requestId?: string;
  checkoutEmailSent: boolean;
  checkedInBy: {
    userId: string;
    name: string;
    role: string;
  };
  checkedOutBy?: {
    userId: string;
    name: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
