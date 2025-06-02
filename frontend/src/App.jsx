import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StartPage from './pages/StartPage'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path='/' element={<StartPage />} />
        <Route element={<UserProtectedWrapper />}>
          <Route path='/home' element={<Home />} />
          <Route path='/user/logout' element={<UserLogout />} />
        </Route>
        <Route element={<CaptainProtectedWrapper />}>
          <Route path='/captain-home' element={<CaptainHome />} />
          <Route path='/captain/logout' element={<CaptainLogout />} />
        </Route>
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App