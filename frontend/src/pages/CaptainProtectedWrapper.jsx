import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utility/helperFunction";

function CaptainProtectedWrapper() {
  const token = getToken();
  return (
    token ? <Outlet /> : <Navigate to="/captain-login" />
  )
}

export default CaptainProtectedWrapper