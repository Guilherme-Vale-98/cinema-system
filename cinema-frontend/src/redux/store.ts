import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/users/authSlice";
import { authApi } from "./services/users/authApi";
import { testApi } from "./services/test/testApi";
import { cinemaApi } from "./services/api/cinemaApi";

export const store = configureStore({
  reducer: {
    authState: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authApi.middleware, testApi.middleware, cinemaApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;