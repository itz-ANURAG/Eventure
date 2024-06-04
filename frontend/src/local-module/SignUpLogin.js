// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import {useState} from "react";
import google from "../images/google.png";
import axios from 'axios'
// import navigate from 'navigate'
import { Link, useNavigate } from 'react-router-dom';


function SignUpLogin() {
  // using useState hook for creating desired logIn signUp effect.
  const [action,setAction] = useState("Sign Up");
  const handleClick = () => {
    (action==="Sign Up")?setAction("Log In"):setAction("Sign Up");
    console.log(action);
  }

  const url='/users/register'
  const url1='/login'


  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
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
  const handleGoogle = async(event) => {
    event.preventDefault();
    console.log("googleAuth invoked")
      // const response = await axios.get('api/googleAuth/callback')
      window.open('http://localhost:5000/api/googleAuth/callback',"_self")
      // navigate('/api/googleAuth/callback')

  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if(action=="Sign Up"){
    try {
      console.log("from user side")
      console.log(formData)
      const response = await axios.post(url, formData);
      console.log("created");
      console.log(response.data.path);
      navigate(response.data.path, {state:{ data : response.data.data}})
    } catch (error) {
      alert("something went wrong")
    }
  }
  else{
    try {
      console.log("from admin side")
      console.log(formData)
      const response = await axios.post(url1, formData);
      console.log("created");
      console.log(response.data.path);
      navigate(response.data.path, {state:{ data : response.data.data}})
    } catch (error) {
      alert("something went wrong")
    }
  }
    // Add your form submission logic here

  };




  return (
    <>
       <div className="sbox">
      <div className="scontainer">
        <div className="sheader">
          <div className="stext">{action}</div>
          <div className="sunderline"></div>
        </div>
        
        {action==="Sign Up"?<div className="sinput">
          <input type='email' required name="email" className="sinput_style" placeholder="email"  value={formData.email} onChange={handleChange}/>
        </div>
        :<></>}
        {action==="Sign Up"?<div className="sinput">
          <input type="text" name="fullName" className="sinput_style" placeholder="Full Name"  value={formData.fullName} onChange={handleChange}/>
        </div>
        :<></>}


         {/* we can add few icons of email password and user but i removed because i was unable to get the desired look in it. */}
        
        
        <div className="sinput">
          <input type="username" name="username" className="sinput_style"placeholder="username" value={formData.username} onChange={handleChange}/>
        </div>
        <div className="sinput">
          <input type="password" name="password" className="sinput_style" placeholder="password" value={formData.password} onChange={handleChange}/>
          {action==="Sign Up"?<></>:<div className="lostpassword">
          {" "}
          Lost Password?<a href="/forget">clickhere</a>
        </div>}
          
        </div>
        {/* embedding js in jsx for the desired layout. */}
        <button className={action==="Sign Up"?"signSubmit":"logSubmit"} onClick={handleSubmit} >submit</button>
        <h3 className="pseudoClass">
        <span className="or">or</span>
        </h3>
        {action==="Sign Up"?<div className="google-cont">
           <button className="google-auth-button" onClick={handleGoogle}>
            <img src={google} alt="Google Logo" className="google-logo" />
             Sign up with Google
             </button> 
             </div>:<></>}

        <div className="haveAccount">{action==="Sign Up"?"Already":"don\'t"} have an account?<span onClick={handleClick} >{" "}{ action==="Sign Up"?"Log In":"Sign Up"}</span></div>
      </div>
      </div>
    </>
  );
}
// exporting our function to embedd it in app.js. 
export default SignUpLogin;