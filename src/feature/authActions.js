import axios from "axios";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const LoginUser = createAsyncThunk(
  "auth/login",
  async (
    {
      employee_id,
      email,
      password,
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("employee_id", employee_id);
      formData.append("email", email);
      formData.append("password", password);
    

      const config = {
        header: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const res = await axios.post(
        `${BASE_URL}/login`,

        formData,
        config
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);