import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { visitorReducer } from "./visitorSlice";
export const RESET_STATE_ACTION_TYPE = "RESET_STATE";
export const resetAppState = () => ({
  type: RESET_STATE_ACTION_TYPE as typeof RESET_STATE_ACTION_TYPE,
});
const appReducer = combineReducers({
  auth: authReducer,
  visitor: visitorReducer,
});
const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
