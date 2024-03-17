import React from 'react';
import '../stylesheets/navbar.css';
import harrypotter from '../HarryPotter/harry-potter.gif';
import logo from '../HarryPotter/logo.png';
import {NavLink,Link,useNavigate} from "react-router-dom" ;
export default function Navbar() {
  const navigate=useNavigate();
  return (
    <>
      <div className='nav-bar flex text-white mt-4 h-10 p-1 text-justify'>
        <div className='left text-blue-700'>
          <Link to='/'><img className='logo' src={logo} alt="logo" /></Link>
        </div>
        <div className='middle'>
           
              <ul className='Middle' >
                <li className='hover:scale-110 transition duration-300'><NavLink to='/' className='h hover:underline cursor-pointer hover:scale-110  text-black'href="">Home</NavLink></li>
                <li className='hover:scale-110 transition duration-300'><NavLink to='/team' className='h hover:underline cursor-pointer hover:scale-110  text-black'href="">Team</NavLink></li>
                <li className='hover:scale-110 transition duration-300'><span className='h hover:underline cursor-pointer hover:scale-110  text-black'href="">Contact Us</span></li>
              </ul>
            
        </div>
        <div className='right'>
          <div className='combined'>
                <button onClick={()=>navigate('/Signin')} className='b1
                hover:opacity-45 transition px-4 duration-300 rounded-l-2xl hover:scale-105'>SIGN IN
                </button>
                <button className='b2 hover:opacity-45 transition px-4 duration-300 rounded-r-2xl hover:scale-105'>
                  REGISTER
                </button>

          </div>
            <button onClick={()=>navigate('my-profile')} className='profile p-3 hover:opacity-70 hover:scale-110 transition duration-200'>
            <img className='harry' src={harrypotter} alt="logo not found"/>
            <div className='Ptext'>Profile</div>
            </button>
        </div>
      </div>
    </>
  )
}


