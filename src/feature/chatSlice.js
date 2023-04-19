import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";
import { BASE_URL } from "../defaultValues/DefaultValues";
import Cookies from "js-cookie";

// Initialize userToken from Cookie
const userToken = Cookies.get("userToken") || null;
const initialState = {
  loading: false,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
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
        state.userToken = userToken;
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      });
  },

});

// export const { sendMessage } = chatSlice.actions;
export default authSlice.reducer;

