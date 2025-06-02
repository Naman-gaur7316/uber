import React from "react";
import { getToken } from "../utility/helperFunction";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CaptainLogout() {
  const token = getToken();
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
    });
  return <div>CaptainLogout</div>;
}

export default CaptainLogout;
