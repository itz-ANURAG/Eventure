// importing files needed for the sign up log in page.
// import React from "react";
import "../stylesheets/signUpLogin.css";
import React, { useState } from "react";
// import google from "../images/google.png";
import axios from 'axios'
import {toast} from "react-hot-toast"
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try{
        const reset = await axios.post('/resetPassword', formData)
        if (reset.status) {
            toast.success("password reset successful")
            console.log("Success");
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
            <div className="sbox">
                <div className="scontainer">
                    <div className="sheader">
                        <div className="stext"></div>
                        <div className="sunderline"> Enter Recovery Password</div>
                    </div>
                    <div className="sinput">
                        <input type="password" name="password" className="sinput_style" placeholder="password" value={formData.password} onChange={handleChange} />
                    </div>
                    {/* embedding js in jsx for the desired layout. */}
                    <button onClick={handleSubmit} >submit</button>
                </div>
            </div>
        </>
    );
}
// exporting our function to embedd it in app.js. 
export default Reset;