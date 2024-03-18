import React, { useState, useEffect } from 'react'
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Profile() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [eventData , setEventData ]= useState([]);
  const [ data , setdata ] = useState([]);
  const [ isOpen , setIsOpen ] = useState(false);
  const [ eData , seteData] = useState([]);
  // Routr protection start here

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const verify = await axios.get('/verify');
        // console.log("verify response ", verify);

        // Check if the component is still mounted before performing state updates
        if (isMounted && !verify.data.success) {
          alert("Login First");
          navigate(verify.data.path);
        }
        setdata(verify.data.data)
        // console.log("user data from verification is:",verify)
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



  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const EventData = async () => {
      try {
        const verify = await axios.get('/eventdata');
        // console.log("verify response ", verify.data.data);
        setEventData(verify.data.data);
      } catch (error) {
        alert("something went wrong");
      }
    };
    
    EventData(); // Call the fetchData function
    // console.log("Event Data",eventData);
    // console.log("User Data",data)




    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [navigate]);


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

  
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventId:'',
    userId: '',
    userName: '',
    userEmail:'',
    phoneNo:''
  });
  
  const handleRegister = (event) => {
    //  setEventId(event._id);
    setFormData({
      userId:data._id,
      eventDate:event.eventDate,
      eventName:event.eventName,
      eventTime:event.eventTime,
      eventId:event._id
    })
     setIsOpen(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Handle form field changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = async() => {
    console.log("formData",formData);
    setIsOpen(false);
    try {
      const responce = await axios.post('/eventRegister',formData);
      console.log(responce.data)
      alert(responce.data.message);
      navigate('/userProfile')
    } catch (error) {
      alert("some error occured");
      navigate('/userProfile')
    }
  }




  return (
    <>
      {isOpen && <div>
        {/* {setFormData(userId=data._id)}
        {setFormData(eventName=data._id)}
        {setFormData(eventData=data.eventDate)}
        {setFormData(eventTime=data.eventTime)} */}
        <div className="scontainer">
          <div className="sheader">
            <div className="stext"></div>
            <div className="sunderline"></div>
          </div>

          {/* <div className="sinput">
            <input type="text" name="createrId" className="sinput_style" placeholder="creater_id" value={formData.createrId} onChange={handleChange} />
          </div> */}
          <div className="sinput">
            <input type="text" name="userName" className="sinput_style" placeholder="Full Name" value={formData.userName} onChange={handleChange} />
          </div>
          <div className="sinput">
            <input type='email' name="userEmail" className="sinput_style" placeholder="email" value={formData.userEmail} onChange={handleChange} />
          </div>
          <div className="sinput">
            <input type='number' name="phoneNo" className="sinput_style" placeholder="Mobile No." value={formData.phoneNo} onChange={handleChange} />
            <button onClick={handleSubmitForm} >submit</button>
          </div>
        </div>
        </div>}
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
      


  <ul>{
  eventData?.map((data,index) => {
    return (
      <li>
        <div>
          {data.eventName}
        </div>
        <button onClick={(e) => { 
          e.preventDefault();
          seteData(data)
          handleRegister(data)}}>
          register
        </button>
      </li>
    )
  })}
  </ul>


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

