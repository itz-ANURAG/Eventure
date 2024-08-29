// importing files needed for the sign up log in page.
import "../stylesheets/signUpLogin.css";
import React, { useState } from "react";
import axios from 'axios'
import {toast} from "react-hot-toast"
import {useNavigate, useParams } from 'react-router-dom';

function Reset() {
    let { token } = useParams();
    const [formData, setFormData] = useState({
        password: '',
        token: token
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
    
    // to prevent cors error and facilitate authentication at backend
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try{
          // axios request to reset password successfully
        const reset = await axios.post('/resetPassword', formData)
        console.log(reset)
        if (reset.data.success) {
            toast.success("password reset successful")
            console.log("Success");
            navigate('/Signin')
        }
        else{
          toast.error("Internal server Error")
          navigate('/Signin')
        }
    }catch(error){
            toast.error("internal server error")
            console.log("failure")
            navigate('/')
       }
    };

    return (
        <>
        {/* required jsx for reset password */}
        <div className="flex justify-center items-center h-screen bg-slate-400">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <ul>
              <li className="mb-4">
                <h2 className="text-2xl font-bold">Reset Password</h2>
              </li>
              <li className="mb-4">
                <div>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter the new Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
export default Reset;