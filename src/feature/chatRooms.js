import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CHATROOMS_URL } from "../defaultValues/DefaultValues";
import Cookies from "js-cookie";

const CHATROOMS_API = CHATROOMS_URL;

export const fetchChatRooms = createAsyncThunk(
  "chatrooms/fetchChatRooms",
  async () => {
    const UserInfo = Cookies.get("userInfo");

    let config = {
      method: "get",
      url: CHATROOMS_API,
      headers: {
        Authorization: `Bearer ${UserInfo}`,
      },
    };

    try {
      const res = await axios(config);
      // Cookies.set('chatrooms', res.data.chatrooms)
      localStorage.setItem('chatrooms', res.data.data)

      return res.data.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);


const initialState = {
   allChatRooms: [],
    loading: true,
    error: null
}

const chatRoomsSlice = createSlice({
    name: 'chatrooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChatRooms.pending, (state) => {
            state.loading = true
        })

        .addCase(fetchChatRooms.fulfilled, (state, {payload}) => {
            state.loading = false
            state.allChatRooms = payload
        })

        .addCase(fetchChatRooms.rejected, (state, action) => {
            state.loading = false
        state.error = action.error.message;
        })
    }
})

export default chatRoomsSlice.reducer