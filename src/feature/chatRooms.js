import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CHATROOMS_URL } from "../defaultValues/DefaultValues";
import Cookies from "js-cookie";

const CHATROOMS_API = CHATROOMS_URL;

export const fetchChatRooms = createAsyncThunk(
  "chatrooms/fetchChatRooms",
  async () => {
    const Token = Cookies.get("userToken");

    let config = {
      method: "get",
      url: CHATROOMS_API,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    try {
      const res = await axios(config);
      Cookies.set('chatrooms', res.data.data)
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);


const chatroomsInfo = Cookies.get('chatrooms') || null

const chatRoomsSlice = createSlice({
    name: 'chatrooms',
    initialState: {
        chatroomsInfo,
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChatRooms.pending, (state) => {
            state.loading = true
        })

        .addCase(fetchChatRooms.fulfilled, (state, action) => {
            state.loading = false
            state.chatroomsInfo = action.payload;
        })

        .addCase(fetchChatRooms.rejected, (state, action) => {
            state.loading = false
        state.error = action.error.message;
        })
    }
})

export default chatRoomsSlice.reducer