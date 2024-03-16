// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import { useState, useEffect } from "react";
import google from "../images/google.png";
import axios from 'axios'
// import navigate from 'navigate'
import { Link, useNavigate } from 'react-router-dom';





function SignUpLogin() {
  // using useState hook for creating desired logIn signUp effect.

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


  // Routr protection start here

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const verify = await axios.get('/verify');
        // console.log("verify response ", verify);

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



  const url = '/createEvent'
  const [action, setAction] = useState("Sign Up");


  const [formData, setFormData] = useState({
    createrId: '',
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDiscription: '',
    eventPrice: ''
  });

  // writing rquired js for the handling onClick event.
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Handle form field changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      console.log("from user side")
      console.log(formData)
      const response = await axios.post(url, formData);
      alert(response.data.massage)
      console.log(response.data.path);
      // alert(response.data.massage)
      navigate(response.data.path)
    } catch (error) {
      alert("something went wrong")
    }
    // Add your form submission logic here

  };


  // const handleClick = () => {
  //     (action==="Sign Up")?setAction("Log In"):setAction("Sign Up");
  //   }

  return (
    <>
      <div className="sbox">
        <div className="scontainer">
          <div className="sheader">
            <div className="stext">{action}</div>
            <div className="sunderline"></div>
          </div>

          <div className="sinput">
            <input type="text" name="createrId" className="sinput_style" placeholder="creater_id" value={formData.createrId} onChange={handleChange} />
          </div>
          <div className="sinput">
            <input type="text" name='eventName' className="sinput_style" placeholder="eventName" value={formData.eventName} onChange={handleChange} />
          </div>


          {/* we can add few icons of email password and user but i removed because i was unable to get the desired look in it. */}


          <div className="sinput">
            <input type="date" name="eventDate" className="sinput_style" placeholder="eventDate" value={formData.eventDate} onChange={handleChange} />
          </div>
          <div className="sinput">
            <input type="time" name="eventTime" className="sinput_style" placeholder="eventTime" value={formData.eventTime} onChange={handleChange} />
          </div>
          <div className="sinput">
            <input type="text" name="eventDiscription" className="sinput_style" placeholder="eventDiscription" value={formData.eventDiscription} onChange={handleChange} />
          </div>
          <div className="sinput">
            <input type="number" name="eventPrice" className="sinput_style" placeholder="eventPrice" value={formData.eventPrice} onChange={handleChange} />
            <button onClick={handleSubmit} >submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
// exporting our function to embedd it in app.js. 
export default SignUpLogin;