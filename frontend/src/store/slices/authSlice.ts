import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../models/User";

export enum statusEnum {
  IDLE = "IDLE",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

interface AuthState {
  userId: string | null;
  status: statusEnum;
  role: Role | null;
  message?: string | null;
}

const initialState: AuthState = {
  userId: null,
  role: null,
  status: statusEnum.IDLE,
  message: null,
};

type AuthSliceState = typeof initialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<statusEnum>) {
      state.status = action.payload;
    },

    setAuthMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },

    setAuthUserId(
      state,
      action: PayloadAction<{ userId: string; role: Role | null }>,
    ) {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },

    resetAuthState() {
      return initialState;
    },
  },
  selectors: {
    selectAuth: (state: AuthSliceState) => state,
    selectUserId: (state: AuthSliceState) => state.userId,
    selectRole: (state: AuthSliceState) => state.role,
    selectStatus: (state: AuthSliceState) => state.status,
    selectMessage: (state: AuthSliceState) => state.message,
  },
});

export const { setAuthMessage, setAuthStatus, setAuthUserId } =
  authSlice.actions;

export const authSelectors = authSlice.selectors;
export default authSlice.reducer;
