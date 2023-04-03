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
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
