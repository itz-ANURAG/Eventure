import React, { useState, useEffect } from 'react'
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Profile() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // Routr protection start here

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const verify = await axios.get('/verify');
        console.log("verify response ", verify);

        // Check if the component is still mounted before performing state updates
        if (isMounted && !verify.data.success) {
          // alert("Login First");
          navigate(verify.data.path);
        }
      } catch (error) {
        alert("something went wrong");
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [navigate]); // Adding navigate as a dependency to useEffect


  // Routr protection end here


  const [toggle, SetToggle] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      console.log("trying to logout")
      const response = await axios.get('/logout');
      console.log("logout");
      navigate('/')
    } catch (error) {
      alert("something went wrong")
    }
    // Add your form submission logic here

  };


  return (
    <>
      <div className='bg-[#2699fb] p-4'>
        <div className=' mx auto flex   justify-between items-center'>
          {
            toggle ?
              <TfiAlignJustify className=' text-white  text-3xl mr-[50px]' onClick={() => SetToggle(!toggle)}></TfiAlignJustify>
              :
              <TfiClose className=' text-white text-3xl mr-[50px]' onClick={() => SetToggle(!toggle)} ></TfiClose>
          }
          <div className='text-6xl font-bold ml-[82px] mr-[82px]' >
            welcome to web
          </div>

          <ul className='flex text-white gap-10'>
            <li className='text-3xl'> <Link to={'/'}>
              Home</Link>
            </li>
            <li className='text-3xl'><Link to={'/Contact'}>
              Contact</Link>
            </li>
            <li className='text-3xl' >
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li className='text-3xl'><Link to={'/blogs'}>
              Blogs</Link>
            </li>
          </ul>
          <CgProfile className='text-4xl' />

        </div>
        {/* *  Hidden Dashboard  */}

        {
          toggle ?
            <></>
            :
            <ul className=' bg-emerald-400 fixed left-[0]  top-[92px] text-white gap-10 items-start w-[500px] h-[1000px]'>
              <li className='m-[40px] p-[20px] text-5xl' ><Link to={'/myEvents'}>
                My Events</Link>
              </li >
              <li className='m-[40px] p-[20px] text-5xl '><Link to={'/createEvents'}>
                Create Events</Link>
              </li>
              <li className=' m-[40px] p-[20px] text-5xl'>
                Logout
              </li>
              <li className=' m-[40px] p-[20px] text-5xl'>
                Blogs
              </li>
            </ul>
        }
      </div>
    </>
  )
}

export default Profile


// import React from 'react';
// import { useLocation } from 'react-router-dom';

// function Profile() {
//   const location = useLocation();
//   console.log(location.state.data)
//   const { username, fullname, email } = location.state.data || {};

//   return (
//     <div>
//       <div>{username}</div>
//       <div>{fullname}</div>
//       <div>{email}</div>
//     </div>
//   );
// }

// export default Profile;

