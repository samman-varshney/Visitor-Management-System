import type { PayloadAction } from "@reduxjs/toolkit";
import { setAuthMessage, setAuthStatus } from "../slices/authSlice";
import { statusEnum } from "../slices/authSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import type { LoginRequestDTO } from "../../dtos/auth/login";
import { authservice } from "../../service/authService";

function* handleLogin(action: PayloadAction<LoginRequestDTO>) {
  try {
    yield put(setAuthStatus(statusEnum.LOADING));
    yield call(authservice.login, action.payload);
    yield put(setAuthStatus(statusEnum.SUCCESS));
  } catch (e: any) {
    yield put(setAuthStatus(statusEnum.ERROR));
    yield put(setAuthMessage(e.message || "login Failed"));
  }
}

export function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", handleLogin);
}
