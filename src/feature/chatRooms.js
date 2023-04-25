import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CHATROOMS_URL } from "../defaultValues/DefaultValues";
import Cookies from "js-cookie";

// const userToken = Cookies.get("userToken");
// let config = {
//   method: "get",
//   url: `${CHATROOMS_URL}`,
//   headers: {
//     Authorization: `Bearer ${userToken}`,
//   },
// };
const getHeaders = () => {
  const userToken = Cookies.get("userToken");
  return {
    Authorization: `Bearer ${userToken}`,
  };
};

const getUserInfo = Cookies.get("userInfo");
const userInfo = JSON.parse(getUserInfo);
const username = userInfo?.username;
export const fetchChatRooms = createAsyncThunk(
  "userChatrooms/fetchChatRooms",
  async () => {
    const headers = getHeaders();
    try {
      const res = await axios(CHATROOMS_URL, { headers });

      return res.data.data;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
);

const initialState = {
  allChatRooms: [],
  loading: true,
  error: null,
};

const chatRoomsSlice = createSlice({
  name: "userChatrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchChatRooms.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.allChatRooms = payload;
      })

      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chatRoomsSlice.reducer;
