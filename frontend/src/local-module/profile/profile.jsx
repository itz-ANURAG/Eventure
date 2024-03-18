import React, { useState, useEffect } from 'react'
import "../../stylesheets/profile.css";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer.jsx";
import Navbar from "../Navbar.jsx";
import ViewProfile from "./ViewProfile.jsx";
import MyEvent from "./MyEvent.jsx";
import CreateEvent from "./CreateEvent.jsx";

import Sidebar from "./sideBar.jsx";


function Profile  () {



// Your code 
//   // const navigate=useNavigate();
 const [selected,setSelected]=useState('view-profile');
 const handleChange1=(value)=>{
      setSelected(`${value}`)

 }

// <----------------------------------Aryan Code------------------------------------------------->



// axios.defaults.withCredentials = true;
// const navigate = useNavigate();
// const [eventData , setEventData ]= useState([]);
// const [ data , setdata ] = useState([]);
// const [ isOpen , setIsOpen ] = useState(false);
// const [ eData , seteData] = useState([]);
// // Routr protection start here

// useEffect(() => {
//   let isMounted = true; // Flag to track whether the component is mounted

//   const fetchData = async () => {
//     try {
//       const verify = await axios.get('/verify');
//       // console.log("verify response ", verify);

//       // Check if the component is still mounted before performing state updates
//       if (isMounted && !verify.data.success) {
//         alert("Login First");
//         navigate(verify.data.path);
//       }
//       setdata(verify.data.data)
//       // console.log("user data from verification is:",verify)
//     } catch (error) {
//       alert("something went wrong");
//     }
//   };

//   fetchData(); // Call the fetchData function




//   // Cleanup function to set isMounted to false when the component unmounts
//   return () => {
//     isMounted = false;
//   };
// }, [navigate]); // Adding navigate as a dependency to useEffect



// useEffect(() => {
//   let isMounted = true; // Flag to track whether the component is mounted

//   const EventData = async () => {
//     try {
//       const verify = await axios.get('/eventdata');
//       // console.log("verify response ", verify.data.data);
//       setEventData(verify.data.data);
//     } catch (error) {
//       alert("something went wrong");
//     }
//   };
  
//   EventData(); // Call the fetchData function
//   // console.log("Event Data",eventData);
//   // console.log("User Data",data)




//   // Cleanup function to set isMounted to false when the component unmounts
//   return () => {
//     isMounted = false;
//   };
// }, [navigate]);


// // Routr protection end here


// const [toggle, SetToggle] = useState(false);

// const handleLogout = async (event) => {
//   event.preventDefault();
//   try {
//     console.log("trying to logout")
//     const response = await axios.get('/logout');
//     console.log("logout");
//     navigate('/')
//   } catch (error) {
//     alert("something went wrong")
//   }
//   // Add your form submission logic here

// };


// const [formData, setFormData] = useState({
//   eventName: '',
//   eventDate: '',
//   eventTime: '',
//   eventId:'',
//   userId: '',
//   userName: '',
//   userEmail:'',
//   phoneNo:''
// });

// const handleRegister = (event) => {
//   //  setEventId(event._id);
//   setFormData({
//     userId:data._id,
//     eventDate:event.eventDate,
//     eventName:event.eventName,
//     eventTime:event.eventTime,
//     eventId:event._id
//   })
//    setIsOpen(true);
// }

// const handleChange = (event) => {
//   const { name, value } = event.target;
//   // Handle form field changes
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// const handleSubmitForm = () => {
//   console.log("formData",formData);
//   setIsOpen(false);
// }





// <-----------------------------------------Aryan Code--------------------------------------------->


  return (
    <>
    <Navbar/>
    <div className="dash-sidebar">
      
      <Sidebar choose={handleChange1} />
       
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
     </>
  )
}

export default Profile

