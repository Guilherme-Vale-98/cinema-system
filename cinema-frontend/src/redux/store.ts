import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/users/authSlice";
import { authApi } from "./services/users/authApi";
import { testApi } from "./services/test/testApi";
import { cinemaApi } from "./services/api/cinemaApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";



const persistConfig = {
  key: 'root',
  storage
}
const persistedAuthReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    userState: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'persist/PERSIST',
        'persist/REHYDRATE',
      ],
      ignoredPaths: ['register', 'rehydrate'],
    },
  }).concat([authApi.middleware, testApi.middleware, cinemaApi.middleware]),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;