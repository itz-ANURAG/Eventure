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
import Layout3 from '../../backgroundLayout/Layout3.jsx';
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
    <Layout3>
    <Navbar/>
    <div className="dash-sidebar">
      
      <Sidebar choose={handleChange} />
       
        {
          selected === 'view-profile'?
         <ViewProfile />
         :
          selected === 'myEvents'?
           <MyEvent />
          :
           <CreateEvent /> 
        }

    </div>
    <Footer/>
    </Layout3>
     </>
  )
}

export default Profile

