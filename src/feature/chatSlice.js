import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },

    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
