export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponseDTO {
  authToken: string;
  userid: string;
}
