import axios from "axios";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD
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
=======


export const LoginUser = createAsyncThunk(
  "auth/login",
  async (
    {
      employee_id,
      email,
      password,
>>>>>>> 6a0da87 (Feature/Login: Working on integrating backend with frontend)
    },
    { rejectWithValue }
  ) => {
    try {
<<<<<<< HEAD

      const formData = new FormData()

      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("employee_id", employee_id);
      formData.append("email", email);
      formData.append("image", image);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
  
=======
      const formData = new FormData();

      formData.append("employee_id", employee_id);
      formData.append("email", email);
      formData.append("password", password);
    
>>>>>>> 6a0da87 (Feature/Login: Working on integrating backend with frontend)

      const config = {
        header: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

<<<<<<< HEAD
   const res =  await axios.post(
        `${BASE_URL}/register`,
=======
      const res = await axios.post(
        `${BASE_URL}/login`,
>>>>>>> 6a0da87 (Feature/Login: Working on integrating backend with frontend)

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
<<<<<<< HEAD
);


export const loginUser = createAsyncThunk("auth/login", async (values) => {
  

  // Changing emailID to email and chat_id
  if (values.emailID.includes("@")) {
    values.email = values.emailID;
  } else {
    values.chat_id = values.emailID;
  }
  delete values.emailID;

  let data = JSON.stringify({ ...values });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    // url: "https://letxchat.takoraditraining.com/api/v1/login",
    url: `${BASE_URL}/login`,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      Cookies.set('userToken', response.data.token)
      console.log(response.data.token);
      console.log(response.data.data);
      Cookies.set('userInfo', JSON.stringify(response.data.data))
      const SUCCESS_MESSAGE = response.data.message;
      toast.success(SUCCESS_MESSAGE, {autoClose: 1000,});
    })
    .catch((error) => {
      const ERROR_MESSAGE = error.response.data.message;
      toast.warn(ERROR_MESSAGE);
    });
});
=======
);
>>>>>>> 6a0da87 (Feature/Login: Working on integrating backend with frontend)
