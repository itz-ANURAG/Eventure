// importing importqatnt files
import React from 'react'
import '../../stylesheets/sidebar.css'
import profile from '../../photos/view-profile.png';
import myevents from '../../photos/myevents.png';
import addevents from '../../photos/addevents.png';
import refund from '../../photos/refund.png';
import {useNavigate} from "react-router-dom";
import axios  from 'axios';
import {setToken} from "../../slices/authSlice"
import {useDispatch} from "react-redux";
import {toast} from "react-hot-toast"
import logout from '../../photos/logout.png';

function Sidebar(props) {
  const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
          console.log("trying to logout")
          const response = await axios.get('/logout');
          console.log("logout");
          console.log(response.data.success)
          dispatch(setToken(null));
          toast.success("logged out")
          navigate('/')
        } catch (error) {
         toast.error("internal server error")
        }
      };

  return (
    <>
    <div className='sidebarcontainer w-64 h-full pt-10  bg-gradient-to-br from-red-950 to to-black'>
        <nav className=' flex-1'>
            <ul className='nav h-screen space-y-2 list-none'>
            <button onClick={()=>props.choose('view-profile')}><Option value="Profile" image={profile} alt="profile png"/></button>
            <button onClick={()=>props.choose('myEvents')}><Option value="My Events" image={myevents} alt="my event png"/></button>
            <button onClick={()=>props.choose('createEventPage')}><Option value="Add Events" image={addevents} alt=" addevent png"/></button>
            <button onClick={()=>props.choose('hostedEvents')}><Option value="Hosted Event" image={refund} alt="refund png"/></button>
            <button onClick={handleLogout}><Option value="Log Out" image={logout} alt=" logout png"/></button>
            </ul>
        </nav>
    </div>
    </>
  )
}

export default Sidebar;

const Option=({
    value,image
})=>{
    return(
    <li className=' hover:bg-gray-700 transition duration-300  rounded border space border-transparent '>
        
                <button className=' text-white w-64 text-2xl block py-2 ml-0  '>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <img className='image-icon w-10 mr-0'src={image} alt=" profile icon"/>
                    {value}
                    </div>
                </button>               
    </li> 
    );
};