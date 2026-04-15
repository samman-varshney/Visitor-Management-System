export interface User {
  email: string;
  password: string;
  fullName: string;
  name: string;
  employeeId: string;
  role: Role;
  department?: string;
  phoneNumber?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  admin,
  employee,
  security,
}
