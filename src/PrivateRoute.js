import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  return Cookies.get("userToken") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
