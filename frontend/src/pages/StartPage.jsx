import React from 'react'
import uberLogo from '../assets/images/uberLogo.png'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

const StartPage = () => {
  return (
    <div className='bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-screen w-full pt-8 flex justify-between flex-col bg-red-400'>
        <img className='w-20 ml-9' src={ uberLogo } alt="uber" />
        <div className="bg-white py-6 px-8">
            <h2 className='text-3xl font-bold'>Get Started</h2>
            <Link to="/login" className='flex justify-between px-4 bg-black rounded-md w-full text-white py-3 mt-4'>
            <span className='text-xl font-semibold'>Continue</span>
            <FaArrowRight size={24} />
            </Link>
        </div>
    </div>
  )
}

export default StartPage