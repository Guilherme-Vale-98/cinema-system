import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user?: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    userInfo: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
    },
  },
});

export const { logout, userInfo } = authSlice.actions;
export default  authSlice.reducer;

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}