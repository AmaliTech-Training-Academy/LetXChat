import Cookies from "js-cookie";
import React from "react";
import {  Navigate, Outlet } from "react-router";

const PrivateRoute = ({children}) => {
  // return Cookies.get("userToken") ? <Outlet /> : <Navigate to='/login' />;
  const Token = Cookies.get("userToken")
  const User = Cookies.get('userInfo')
  if (!Token) {
    return <Navigate to='/login' />
  }
  return children
};

export default PrivateRoute;
