import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../defaultValues/DefaultValues';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';

const USER_API = `${BASE_URL}/profile`

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (userToken) => {

    const Token = Cookies.get("userToken")

let config = {
    method: "get",
    url: USER_API,
    headers: {
        Authorization: `Bearer ${Token}`
    },
}

    try {


    const res = await axios(config)
    Cookies.set("userInfo", res.data.data)
        return res.data.data

    } catch (error) {
        const ERROR_MESSAGE = error.response.data.message
  
        toast.error(ERROR_MESSAGE, {autoClose: 3000})
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userInfo = Cookies.get("userInfo") || null

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
