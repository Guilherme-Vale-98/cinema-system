import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/UserType";
import { useNavigate } from "react-router-dom";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;