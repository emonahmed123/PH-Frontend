/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: null | object;
  token: null | string;
  // exp: null | string;
  // iat: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  // exp: null,
  // iat: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      (state.token = null), (state.user = null);
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const userCurrentToken = (state: any) => state.auth.token;
export const userCurrentUser = (state: any) => state.auth.user;
export default authSlice.reducer;
