import type { LoginRequestDTO } from "../../dtos/auth/login";
import { authActionTypes } from "./constants";

export const loginRequest = (payload: LoginRequestDTO) => ({
  type: authActionTypes.LOGIN_REQUEST,
  payload: payload,
});

export const logoutRequest = () => ({
  type: authActionTypes.LOGOUT_REQUEST,
});
