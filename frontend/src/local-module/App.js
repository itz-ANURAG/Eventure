import React from 'react';
import HomePage from './HomePage.js';
import SignUpLogin from './SignUpLogin';
import Profile from './profile.jsx'
import AdminProfile from './AdminProfile.jsx'
import CreateEvent from './CreateEvent.jsx'
import ForgetPassword from '../local-module/forget.jsx'

import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Navigate
} from 'react-router-dom'



export default function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route
              path='/' element={<HomePage />}
            />
            <Route
              path='/Signin' element={<SignUpLogin />}
            />
            <Route
              path='/userProfile' element={<Profile />}
            />
            <Route
              path='/adminProfile' element={<AdminProfile />}
            />
            <Route
              path='/createEvent' element={<CreateEvent />}
            />
            <Route
              path='/forget' element={<ForgetPassword />}
            />
          </Routes>
        </Router>
      </div>
    </>
  )
}