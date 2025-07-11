// app/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  token: tokenFromStorage,
  isAuthenticated: Boolean(tokenFromStorage),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    reset(state) {
      return initialState;
    },
  },
});

export const { loginSuccess, logout, reset } = authSlice.actions;
export default authSlice.reducer;
