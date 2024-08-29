// imported files to embedd in this component
import React, { useEffect } from 'react';
import '../stylesheets/navbar.css';
import harrypotter from '../HarryPotter/harry-potter.gif';
import logo from '../HarryPotter/logo.png';
import {NavLink,Link,useNavigate,useLocation} from "react-router-dom" ;
import {useSelector,useDispatch} from "react-redux";
import { setToken } from '../slices/authSlice';
import { useState } from 'react';

export default function Navbar({userId}) {

  const navigate=useNavigate();
  const location=useLocation();
  const dispatch = useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        dispatch(setToken(storedToken));
    }
    setInitialLoad(false);
}, [dispatch]);

  const isAllEventsPage = location.pathname === '/getAllEvents';
  
  return (
    <>
      <div className='nav-bar flex text-white mt-4 h-10 p-1 pt-4 text-justify'>
        <div className='left text-blue-700'>
          <Link to='/'><img className='logo' src={logo} alt="logo" /></Link>
        </div>
        <div className='middle'>
           
              <ul className='Middle' >
                <li className='hover:scale-110 transition duration-300'><NavLink to='/' className='h hover:underline cursor-pointer hover:scale-110  text-white font-extrabold text-5xl'href="">Home</NavLink></li>
                <li className='hover:scale-110 transition duration-300'><NavLink to='/team' className='h hover:underline cursor-pointer hover:scale-110  text-white font-extrabold'href="">Team</NavLink></li>
                <li className='hover:scale-110 transition duration-300'><NavLink to='/getAllEvents' className='h hover:underline cursor-pointer hover:scale-110  text-white font-extrabold'state={{userId}}>All Events</NavLink></li>
              </ul>
        </div>
        <div className='right'>
           { !token &&<div className='combined'>
                <button onClick={()=>navigate('/Signin')} className='b1
                hover:opacity-45 transition px-4 duration-300 rounded-2xl hover:scale-105'>Register
                </button>

          </div>}
           
           {/*will show register if user not logged in else profile */}
           { token && <button onClick={()=>navigate('/my-profile')} className='profile p-3 hover:opacity-70 hover:scale-110 transition duration-200 pt-4'>
            <img className='harry ' src={harrypotter} alt="logo not found "/>
            <div className='Ptext pt-1'>Profile</div>
            </button>
            }
        </div>
      </div>
    </>
  )
}


