// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import {useState} from "react";
import google from "../images/google.png";
import axios from 'axios'
// import navigate from 'navigate'
import { Link, useNavigate } from 'react-router-dom';


function SignUpLogin() {
  const url='/users/register'


  const [formData, setFormData] = useState({
    email: '',
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
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const reset = await axios.post('/forgetPassword',formData)
    if(reset.status){
    console.log("Success");
    alert("Check Your Email for Reset Link");
    navigate('/Signin')
  }
    else console.log("failure")
    // Add your form submission logic here

  };




  return (
    <>
       <div className="sbox">
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste commodi amet libero ut optio adipisci nostrum, molestias quibusdam suscipit assumenda culpa voluptate fugiat totam modi officiis magnam magni voluptatibus cum.</h1>
      <div className="scontainer">
        <div className="sheader">
          <div className="stext"></div>
          <div className="sunderline"></div>
        </div>
        <div className="sinput">
          <input type="text" name="email" className="sinput_style" placeholder="email"  value={formData.email} onChange={handleChange}/>
        </div>
        {/* embedding js in jsx for the desired layout. */}
        <button onClick={handleSubmit} >submit</button>
      </div>
      </div>
    </>
  );
}
// exporting our function to embedd it in app.js. 
export default SignUpLogin;