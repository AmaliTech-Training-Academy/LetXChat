import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import Cookies from "js-cookie";
import { loginUser } from "./authActions";
=======
import { registerUser } from "./authActions";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const userToken = Cookies.get("userToken") || null;
>>>>>>> 99a3f85 (Feature/ChatPage: Migrating functionalities to chatSlice)

// Initialize userToken from Cookie
const userToken = Cookies.get("userToken") ? Cookies.get("userToken") : null;
const userInfo = Cookies.get("userInfo") ? Cookies.get("userInfo") : null;
const initialState = {
  loading: false,
<<<<<<< HEAD
  userInfo,
=======
  userInfo: {},
>>>>>>> 99a3f85 (Feature/ChatPage: Migrating functionalities to chatSlice)
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
<<<<<<< HEAD
  reducers: {},
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
=======
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
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
>>>>>>> 99a3f85 (Feature/ChatPage: Migrating functionalities to chatSlice)

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

// export const { sendMessage } = chatSlice.actions;
export default authSlice.reducer;
