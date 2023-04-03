import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isLoading = false;
      Cookies.set("token", action.payload.token);
    },
    registerFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.isLoading = false;
      Cookies.remove("token");
    },
  },
});

export const { registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
