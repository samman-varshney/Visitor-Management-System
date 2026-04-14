export interface LoginResponseDTO {
  authToken: string;
  userid: string;
}
export interface LoginRequestDTO {
  email: string;
  password: string;
}
