import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import teamReducer from "@/features/team/teamSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
});

export default rootReducer;
