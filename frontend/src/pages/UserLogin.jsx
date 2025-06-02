import React, { useState } from "react";
import uberLogo from "../assets/images/uberLogo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import axios from "axios";
import { saveToken } from "../utility/helperFunction";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        { email, password }
      );

      const data = res.data;
      setUser(data.user);
      saveToken(data.token)
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-20 mb-10" src={uberLogo} alt="uber" />
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-xl mb-4">What's your email</h3>
            <input
              type="email"
              className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@abc.com"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-xl mb-4">Your password</h3>
            <div className="relative">
              <input
                className="bg-neutral-200 border border-gray-300 p-2 w-full rounded pr-10"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 bg-black font-semibold rounded-md w-full text-white py-3 mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-center my-2">
          New here?{" "}
          <Link
            to="/signup"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className=" flex font-semibold justify-center px-4 bg-black rounded-md w-full text-white py-3 mt-4"
        >
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
