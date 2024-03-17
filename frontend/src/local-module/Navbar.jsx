import React from 'react';
import '../stylesheets/navbar.css';
import harrypotter from '../HarryPotter/harry-potter.gif';
import logo from '../HarryPotter/logo.png';
export default function Navbar() {
  return (
    <>
      <div className='nav-bar flex text-white mt-4 h-10 p-1 text-justify'>
        <div className='left text-blue-700'>
          <img className='logo' src={logo} alt="logo" />
        </div>
        <div className='middle'>
           
              <ul className='Middle' >
                <li className='hover:scale-110 transition duration-300'><a className='h hover:underline cursor-pointer hover:scale-110  text-black'href="">Home</a></li>
                <li className='hover:scale-110 transition duration-300'><a className='h hover:underline cursor-pointer hover:scale-110  text-black'href="">Team</a></li>
                <li className='hover:scale-110 transition duration-300'><a className='h hover:underline cursor-pointer hover:scale-110  text-black'href="">Contact Us</a></li>
              </ul>
            
        </div>
        <div className='right'>
          <div className='combined'>
                <button className='b1
                hover:opacity-45 transition px-4 duration-300 rounded-l-2xl hover:scale-105'>SIGN IN
                </button>
                <button className='b2 hover:opacity-45 transition px-4 duration-300 rounded-r-2xl hover:scale-105'>
                  REGISTER
                </button>
          </div>
            <button className='profile p-3 hover:opacity-70 hover:scale-110 transition duration-200'>
            <img className='harry' src={harrypotter} alt="logo not found"/>
            <div className='Ptext'>Profile</div>
            </button>
        </div>
      </div>
    </>
  )
}

