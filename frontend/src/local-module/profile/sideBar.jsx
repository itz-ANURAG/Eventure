import React from 'react'
import '../../stylesheets/sidebar.css'
import profile from '../../photos/view-profile.png';
import myevents from '../../photos/myevents.png';
import addevents from '../../photos/addevents.png';
import refund from '../../photos/refund.png';
import logout from '../../photos/logout.png';
// import { FaBeer } from "react-icons/fa";
function Sidebar() {
  return (
    <>
    <div className='sidebarcontainer w-64 h-full pt-10  bg-gradient-to-br from-red-950 to to-black'>
        <nav className=' flex-1'>
            <ul className='nav h-screen space-y-2 list-none'>
            <Option value="Profile" image={profile}/>
            <Option value="My Events" image={myevents}/>
            <Option value="Add Events" image={addevents}/>
            <Option value="Refund" image={refund}/>
            <Option value="Log Out" image={logout}/>
            </ul>
        </nav>
    </div>
    </>
  )
}

export default Sidebar

const Option=({
    value,image
})=>{
    return(
    <li className=' hover:bg-gray-700 transition duration-300  rounded border space border-transparent '>
        
                <button className=' text-white w-64 text-2xl block py-2 ml-0  '>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <img className='image-icon w-10 mr-0'src={image}/>
                    {value}
                    </div>
                </button>               
    </li> 
    );
};