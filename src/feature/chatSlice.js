import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";
import Cookies from "js-cookie";

const getUserInfo = Cookies.get("userInfo") || null;
const initialState = {
  loading: false,
  userToken: null,
  error: null,
  success: false,
  userInfo: getUserInfo ? JSON.parse(getUserInfo) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      Cookies.remove("userToken");
      state.loading = false;
      state.userToken = null;
      state.error = null;
    },


  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userAccount = payload;
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userToken = payload;
        Cookies.set("userToken", payload);
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
