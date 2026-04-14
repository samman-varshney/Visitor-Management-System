import type { PayloadAction } from "@reduxjs/toolkit";
import { setAuthMessage, setAuthStatus } from "../slices/authSlice";
import { statusEnum } from "../slices/authSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import type { LoginRequestDTO } from "../../dtos/auth/login";
import { authservice } from "../../service/authService";
import { localStorageService } from "../../service/localStorageService";
import { resetAppState } from "../slices/rootReducer";
import { authActionTypes } from "../actions/constants";

function* handleLogin(action: PayloadAction<LoginRequestDTO>): Generator {
  try {
    yield put(setAuthStatus(statusEnum.LOADING));
    const response = yield call(authservice.login, action.payload);
    localStorageService.set("token", response);
    yield put(setAuthStatus(statusEnum.SUCCESS));
  } catch (e: any) {
    yield put(setAuthStatus(statusEnum.ERROR));
    yield put(setAuthMessage(e.message || "login Failed"));
  }
}

function* handleLogout() {
  try {
    yield put(setAuthStatus(statusEnum.LOADING));
    localStorageService.clear();
    yield put(resetAppState());
    yield put(setAuthStatus(statusEnum.SUCCESS));
  } catch (e: any) {
    yield put(setAuthStatus(statusEnum.ERROR));
    yield put(setAuthMessage(e.message || "logout Failed"));
  }
}

export function* authSaga() {
  yield takeLatest(authActionTypes.LOGIN_REQUEST, handleLogin);
  yield takeLatest(authActionTypes.LOGOUT_REQUEST, handleLogout);
}
