import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

// Initialize userToken from Cookie
const userToken = Cookies.get("userToken") || null;
const userInfo = Cookies.get("userInfo") ? Cookies.get("userInfo") : null;
const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,

  text: "",
};

// Chat Rooms and Messages
const CHAT_ROOM_URL = `${BASE_URL}/chatrooms`;
const socket = io.connect(`${CHAT_ROOM_URL}`);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      // const user =

      const messageObj = {
        message: state.text,
        author: username,
        date: new Date(),
      };

      socket.emit("send_message", { ...messageObj });
      state.text;
    },
  },
  extraReducers: (builder) => {
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
