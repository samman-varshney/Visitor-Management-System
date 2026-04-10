import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../models/user";

export enum statusEnum {
  IDLE = "IDLE",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

interface AuthState {
  id: string | null;
  status: statusEnum;
  role: Role | null;
  message?: string | null;
}

const initialState: AuthState = {
  id: null,
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
      action: PayloadAction<{ id: string; role: Role | null }>,
    ) {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },

    resetAuthState() {
      return initialState;
    },
  },
  selectors: {
    selectAuth: (state: AuthSliceState) => state,
    selectUser: (state: AuthSliceState) => state.id,
    selectRole: (state: AuthSliceState) => state.role,
    selectStatus: (state: AuthSliceState) => state.status,
    selectMessage: (state: AuthSliceState) => state.message,
  },
});

export const { setAuthMessage, setAuthStatus, setAuthUserId } =
  authSlice.actions;

export const authSelectors = authSlice.selectors;
export default authSlice.reducer;
