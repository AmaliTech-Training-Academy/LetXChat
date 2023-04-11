import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const userToken = Cookies.get("userToken") || null;

const initialState = {
  loading: false,
  userInfo: {},
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

// export const { sendMessage } = chatSlice.actions;
export default authSlice.reducer;
