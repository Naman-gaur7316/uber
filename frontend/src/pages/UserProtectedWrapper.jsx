import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utility/helperFunction";

function UserProtectedWrapper({ children }) {
  const token = getToken();
  return (
    token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default UserProtectedWrapper;
