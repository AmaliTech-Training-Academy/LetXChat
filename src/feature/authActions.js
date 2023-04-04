import axios from "axios";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      image,
      fullname,
      employee_id,
      username,
      email,
      password,
      password_confirmation,
    },
    { rejectWithValue }
  ) => {
    try {

      const formData = new FormData()

      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("employee_id", employee_id);
      formData.append("email", email);
      formData.append("image", image);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
  

      const config = {
        header: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

   const res =  await axios.post(
        `${BASE_URL}/register`,

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
