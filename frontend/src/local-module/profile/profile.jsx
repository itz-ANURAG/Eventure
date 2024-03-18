import React, { useState } from 'react'
import "../../stylesheets/profile.css";
// import { TfiAlignJustify , TfiClose} from "react-icons/tfi";

// import { CgProfile } from "react-icons/cg";
import Footer from "../Footer.jsx";
import Navbar from "../Navbar.jsx";
import ViewProfile from "./ViewProfile.jsx";
import MyEvent from "./MyEvent.jsx";
import CreateEvent from "./CreateEvent.jsx";

import Sidebar from "./sideBar.jsx";
// import Dashboard from "./dashboard.jsx";

 // const [toggle, SetToggle] = useState(false);


function Profile  () {
  // const navigate=useNavigate();
 const [selected,setSelected]=useState('view-profile');
 const handleChange=(value)=>{
      setSelected(`${value}`)
 }
  return (
    <>
    <Navbar/>
    <div className='content-container'>
    <div className="dash-sidebar h-screen">
      
      <Sidebar className="sidebar" choose={handleChange} />
    </div>
    <div className='main-content'>
        {
          selected === 'view-profile'?
         <ViewProfile className="view-profile" />
         :
          selected === 'myEvents'?
           <MyEvent />
          :
           <CreateEvent /> 
        }
      </div>
    </div>
    <Footer className="footer"/>
     </>
  )
}

export default Profile

