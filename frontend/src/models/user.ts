export interface User {
  email: string;
  password: string;
  fullName: string;
  name: string;
  employeeId: string;
  role: "admin" | "employee" | "security";
  department?: string;
  phoneNumber?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
