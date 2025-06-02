import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/images/uberLogo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../context/userContext";
import { saveToken } from "../utility/helperFunction";

const DEFAULT_FORMDATA = {
  firstname: "",
    lastname: "",
    email: "",
    password: "",
}

const UserSignup = () => {
  const [formData, setFormData] = useState(DEFAULT_FORMDATA);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {user, setUser} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!Object.keys(formData).every((key) => formData.key !== "")) return;

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, formData);

    if(res.status === 201) {
      const data = res.data;
      setUser(data.user);
      saveToken(data.token);
      navigate("/home");
    }

    setFormData(DEFAULT_FORMDATA);
    
  }
  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-20 mb-10" src={uberLogo} alt="uber" />
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-xl mb-4">What's your name</h3>
            <div className="flex gap-3">
              <input
                type="text"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
                className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
                placeholder="Firstname*"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
                placeholder="Lastname"
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl mb-4">Email</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
              required
              placeholder="example@abc.com"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-xl mb-4">Your password</h3>
            <div className="relative">
              <input
                className="bg-neutral-200 border border-gray-300 p-2 w-full rounded pr-10"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                name="password"
                required
                onChange={handleChange}
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
            Create account
          </button>
        </form>
        <p className="text-center my-2">
          Existing user?{" "}
          <Link
            to="/login"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-signup"
          className=" flex font-semibold justify-center px-4 bg-black rounded-md w-full text-white py-3 mt-4"
        >
          Sign up as captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
