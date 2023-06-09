import axios from "axios";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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
      const formData = new FormData();

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

      const res = await axios.post(
        `${BASE_URL}/register`,

        formData,
        config
      );

      return res.data.data;
    } catch (error) {
      const ERROR_MESSAGE = error.response.data.message;
      toast.error(ERROR_MESSAGE, { autoClose: 3000 });
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (values) => {
  try {
    // Changing emailID to email and chat_id
    if (values.emailID.includes("@")) {
      values.email = values.emailID;
    } else {
      values.chat_id = values.emailID;
    }
    delete values.emailID;



    let data = JSON.stringify({ ...values });
    const config = {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    };


    const response = await axios.post(`${BASE_URL}/login`, data, config);
    const SUCCESS_MESSAGE = response.data.message;
    toast.success(SUCCESS_MESSAGE, { autoClose: 3000 });

    return response.data.token;
  } catch (error) {
    const ERROR_MESSAGE = error.response.data.message;
    toast.warn(ERROR_MESSAGE);
  }
});
