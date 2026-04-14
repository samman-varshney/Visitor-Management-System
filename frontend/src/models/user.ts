export enum Role {
  HOST = "HOST",
  GUARD = "GUARD",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  roles: Role;
}
