
import React, { useEffect,useState} from 'react';
import HomePage from './home/HomePage.jsx';
import SignUpLogin from './SignUpLogin';
import Profile from './profile/profile.jsx';
import Team from "./Team.jsx"
import {Routes,Route} from 'react-router-dom';
// import CreateEvent from './profile/CreateEvent.jsx';
import CreateEventPage from './profile/CreateEventPage.jsx';
import MyEvent from './profile/MyEvent.jsx';
import ViewProfile from './profile/ViewProfile.jsx';
import Refund from './profile/HostedEvent.jsx';
import QWCevent from "./Events/QWCevent.jsx";
import EventsDescription from "./Events/EventsDescripition.jsx";
import Reset from './resetPassword.jsx'
import Forget from './forget.jsx'

import AllEvents from './AllEvents.jsx';
import GoogleCallback from "./GoogleCallback.jsx"
import NotFound from "./NotFound"
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import {useSelector,useDispatch} from "react-redux";
import { setToken,clearToken} from '../slices/authSlice.js';
import Spinner from './Spinner.jsx';

// import RegisterForm from "./Events/RegisterForm.jsx";


const  App=()=>{
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(()=>{
    // dispatch(clearToken());
    // const token = localStorage.getItem('token');
    //     if (token) {
    //         dispatch(setToken(token));
    //     }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        dispatch(setToken(storedToken));
    }
    setInitialLoad(false);
  },[dispatch]);
  return (
  <>    
       <Routes>
       
         <Route path='/' element={<HomePage/>}/>
         <Route path="/google-callback/:token" element={<GoogleCallback />} />
         <Route path='team' element={<Team/>}/>
         <Route path='getAllEvents' element={<AllEvents/>}/>
         <Route path='Signin' element={<SignUpLogin/>}/>
         <Route path='/forget-password' element={<Forget/>}/>
         <Route path='/reset-password/:token' element={<Reset/>}/>

         <Route path='my-profile' element={<Profile/>}>
            <Route index element={<ViewProfile/>}/>
            <Route path='view-profile' element={<ViewProfile/>}></Route>
            <Route path='myEvents' element={<MyEvent/>}></Route>
            <Route path='createEventPage' element={<CreateEventPage/>}></Route>
            <Route path='hostedEvent' element={<Refund/>}></Route>
            <Route path=' ' element={<HomePage/>}/>
         </Route>
         <Route path='events-page' element={<QWCevent/>}/>
         <Route path='event-des' element={<EventsDescription/>}/>  
         <Route path='*' element={<NotFound/>}/>
       </Routes> 
       <Toaster />
  </>
  )
}
export default App;
