import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser } from "./authActions";

// Initialize userToken from Cookie
const userToken = Cookies.get("userToken") ? Cookies.get("userToken") : null;
const userInfo = Cookies.get("userInfo") ? Cookies.get("userInfo") : null;
const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = userInfo;
        state.success = true;
        state.userToken = userToken
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
