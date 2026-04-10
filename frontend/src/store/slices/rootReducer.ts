import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  authReducer: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
