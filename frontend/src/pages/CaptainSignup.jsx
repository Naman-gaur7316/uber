import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/images/uberLogo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import Stepper from "../components/Stepper";
import { useCaptain } from "../context/captainContext";
import axios from "axios";
import { getToken, saveToken } from "../utility/helperFunction";

const TOTALSTEPS = 2;
const stepTitles = ["Personal details", "Vehicle details"];
const DEFAULT_DATA = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  vehicleColor: "",
  vehiclePlate: "",
  vehicleCapacity: "",
  vehicleType: "",
};

const CaptainSignup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [error, setError] = useState("")
  const { _, setCaptain } = useCaptain();
  const navigate = useNavigate()

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    if(!Object.keys(formData).every((key) => formData.key !== "")) return;
    console.log(formData)
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/signup`, formData)
      const data = res.data;
      saveToken(data.token);
      setCaptain(data.captain);
      navigate("/captain-home");
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
    }finally {
      setFormData(DEFAULT_DATA);
    }
  };
  return (
    <div className="p-8 flex flex-col justify-between h-screen">
      <div>
        <img className="w-20 mb-10" src={uberLogo} alt="uber" />
        <Stepper step={step} totalSteps={TOTALSTEPS} titles={stepTitles} />
        <form onSubmit={handleFormSubmit}>
          {step === 1 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl mb-4">What's your name</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    name="firstname"
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
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
                  placeholder="example@abc.com*"
                />
              </div>
              <div className="mb-6">
                <h3 className="text-xl mb-4">Your password</h3>
                <div className="relative">
                  <input
                    name="password"
                    className="bg-neutral-200 border border-gray-300 p-2 w-full rounded pr-10"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    required
                    onChange={handleChange}
                    placeholder="Password*"
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
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl mb-4">Color</h3>
                <input
                  type="text"
                  required
                  name="vehicleColor"
                  value={formData.vehicleColor}
                  onChange={handleChange}
                  className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
                  placeholder="eg. indigo blue"
                />
              </div>
              <div className="mb-6">
                <h3 className="text-xl mb-4">Vehicle number</h3>
                <input
                  type="text"
                  required
                  name="vehiclePlate"
                  value={formData.vehiclePlate}
                  onChange={handleChange}
                  className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
                  placeholder="eg. DL00010"
                />
              </div>
              <div className="mb-6">
                <h3 className="text-xl mb-4">Capacity (in Litres)</h3>
                <input
                  type="number"
                  required
                  min="1"
                  name="vehicleCapacity"
                  value={formData.vehicleCapacity}
                  onChange={handleChange}
                  className="bg-neutral-200 border border-gray-300 p-2 w-full rounded no-spinner"
                  placeholder="eg. 5"
                />
              </div>
              <div className="mb-6">
                <h3 className="text-xl mb-4">Vehicle type</h3>
                <select
                  name="vehicleType"
                  className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option defaultValue>Choose a type</option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          )}
          <div className="text-center">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-4 bg-black text-white rounded-full m-2"
              >
                <IoMdArrowRoundBack />
              </button>
            )}
            {step < TOTALSTEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-4 bg-black rounded-full m-2 text-white"
              >
                <IoMdArrowRoundForward />
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 bg-black font-semibold rounded-md w-full text-white py-3 mt-4"
              >
                Review & Submit
              </button>
            )}
          </div>
        </form>
        <p className="text-center my-2">
          Already have account?{" "}
          <Link
            to="/captain-login"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/signup"
          className=" flex font-semibold justify-center px-4 bg-black rounded-md w-full text-white py-3 mt-4"
        >
          Sign up as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
