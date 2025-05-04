import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authReducer from "@/features/auth/authSlice";

export const makeStore = () => {
  const persistedState =
    typeof window !== "undefined" && localStorage.getItem("reduxState")!
      ? JSON.parse(localStorage.getItem("reduxState")!)
      : null;

  let preloadedState = null;

  if (persistedState) {
    preloadedState = persistedState;
  }

  const store = configureStore({
    reducer: rootReducer,
    ...(preloadedState ? { preloadedState } : {}),
  });

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
