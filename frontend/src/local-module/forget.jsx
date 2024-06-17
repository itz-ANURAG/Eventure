// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import {useState} from "react";
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
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if(validateEmail(formData.email)){
      try {
        const reset = await axios.post('/forgetPassword',formData)
        if(reset.status){
        console.log("Success");
        alert("Check Your Email for Reset Link");
        navigate('/Signin')
        }
        else {
          console.log("error")
          alert("Soething went wrong")
          navigate('/forget-password')
        }
      } 
      catch (error) {
        
      }
    }
    else alert("Enter a Valid Email")
  }
    // Add your form submission logic here
    
    
    
    
    return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-400">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <ul>
            <li className="mb-4">
              <h2 className="text-2xl font-bold">Enter the registered Email Id</h2>
            </li>
            <li className="mb-4">
              <div>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  />
              </div>
            </li>
            <li>
              <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
                Submit
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
// exporting our function to embedd it in app.js. 
export default SignUpLogin;