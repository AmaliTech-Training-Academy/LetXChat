import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const USER_API = `${BASE_URL}/profile`;

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (userToken) => {
    let config = {
      method: "get",
      url: `${USER_API}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const res = await axios(config);
      Cookies.set("userInfo", JSON.stringify(res.data.data));
      return res.data.data;
    } catch (error) {
      const ERROR_MESSAGE = error.response.data.message;

      toast.error(ERROR_MESSAGE, { autoClose: 3000 });
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUserInfo",
  async (submitValues, { rejectWithValue }) => {
    const userToken = Cookies.get("userToken");

    let config = {
      method: "PATCH",
      url: "https://letxchat.takoraditraining.com/api/v1/profile/edit",
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: submitValues,
    };

    try {
      const res = await axios.request(config);
      console.log(res);

      if (res.data.data) {
        const SUCCESS_MESSAGE = "User details updated successfully!";
        toast.success(SUCCESS_MESSAGE, { autoClose: 3000 });
        return res.data.data;
      }
    } catch (err) {
      const ERROR_MSG = err.message;
      toast.error(ERROR_MSG, { autoClose: 3000 });
      return rejectWithValue(err.message);
    }
  }
);


const getUserInfo = Cookies.get("userInfo") || null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getUserInfo ? JSON.parse(getUserInfo) : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove("userInfo");
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        Cookies.set("userInfo", JSON.stringify(payload));

        console.log(payload);
        // state.userInfo = { ...state.userInfo, payload };
        state.userInfo = { ...state.userInfo, ...payload };

      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { logout, payload } = userSlice.actions;
export default userSlice.reducer;
