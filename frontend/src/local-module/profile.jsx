import React, { useState } from 'react'
import { TfiAlignJustify , TfiClose} from "react-icons/tfi";
import {Link} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";


function Profile  () {
  
  const [toggle, SetToggle] = useState(false);



  return (
    <>
    <div className='bg-[#2699fb] p-4'>
      <div className=' mx auto flex   justify-between items-center'>
      { 
        toggle ?
        <TfiAlignJustify className=' text-white  text-3xl mr-[50px]'onClick={()=> SetToggle(!toggle)}></TfiAlignJustify>
        :
        <TfiClose className=' text-white text-3xl mr-[50px]'onClick={()=> SetToggle(!toggle)} ></TfiClose>
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
          <li className='text-3xl'><Link to={'/logout'}>
            Logout</Link>
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

