import axios from "axios";
import { BASE_URL } from "../defaultValues/DefaultValues";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { redirect } from "react-router";

export const loginUser = createAsyncThunk("auth/login", async (values) => {
  // try {

  //   const dataVal = JSON.stringify({
  //     emailID: emailID,
  //     password: password
  //   })

  //   const config = {
  //     header: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };

  //   const response = await axios.post(
  //     `${BASE_URL}/login`,

  //     dataVal,
  //     config
  //     );

  //     if (response.data.success) {

  //       const {data} = response.data
  //       console.log(data, "Data");
  //       console.log("Success");
  //     }

  //       // Cookies.set('userToken', data.access-token)
  //       console.log(response.data, "Data");
  //     return response.data

  // } catch (error) {
  //   const ERROR_MESSAGE =  error.response.data.message

  //   toast.warn(ERROR_MESSAGE)

  // }

  // Changing emailID to email and employee_id
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
    url: "https://letxchat.takoraditraining.com/api/v1/login",
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
