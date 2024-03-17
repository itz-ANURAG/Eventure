
import React from 'react';
import HomePage from './home/HomePage.jsx';
import SignUpLogin from './SignUpLogin';
import Profile from './profile/profile.jsx';
import Team from "./Team.jsx"
import {Routes,Route} from 'react-router-dom';
import CreateEvent from './profile/CreateEvent.jsx';
import MyEvent from './profile/MyEvent.jsx';
import ViewProfile from './profile/ViewProfile.jsx';
import Refund from './profile/Refund.jsx';
import Sidebar from './profile/sideBar.jsx'
import Navbar from './navbar.jsx';




export default function App() {
  return (
  <>
  <Navbar/>
{/* //       <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='team' element={<Team/>}/>
//         <Route path='Signin' element={<SignUpLogin/>}/>
//         <Route path='my-profile' element={<Profile/>}>
//            <Route path='view-profile' element={<ViewProfile/>}></Route>
//            <Route path='myEvents' element={<MyEvent/>}></Route>
//            <Route path='createEvent' element={<CreateEvent/>}></Route>
//            <Route path='refund' element={<Refund/>}></Route>
//            <Route path=' ' element={<HomePage/>}></Route>
//         </Route>
//       </Routes>    */}
  </>
  )
}

//  import { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Link,
//   Route,
//   Navigate
// } from 'react-router-dom'