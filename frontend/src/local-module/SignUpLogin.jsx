// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import {useState} from "react";
// import google from "../images/google.png";
import axios from 'axios'
// import navigate from 'navigate'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import env from "react-dotenv";

function SignUpLogin() {
  // using useState hook for creating desired logIn signUp effect.
 
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  // const dispatch=useDispatch();
  const [action,setAction] = useState("Sign Up");
  
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
//    Here We call open window because axios gave CORS error
      window.open('http://localhost:5000/api/googleAuth/callback',"_self")

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
    console.log(formData);
    if(action==="Sign Up"){
    try {
      console.log("For SignIn")
      console.log(formData)
      const response = await axios.post("/user/signUp", formData);
      console.log("created");
      console.log(response);
      navigate(response.data.path)
    } catch (error) {
      alert(error);
    }
  }
  else{
    try {
      console.log("For Login")
      console.log(formData)
      // console.log(process.env.LOG_IN_URL)
      const response = await axios.post("/user/login", formData);
      console.log("created");
      console.log(response.data.path);
      navigate(response.data.path)
    } catch (error) {
      alert("something went wrong")
    }
  }
    // Add your form submission logic here

  };
}

  const validateForm = () => {
    if (action === 'Sign Up') {
      if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address.');
        return false;
      }
    }
    // if (!validatePassword(formData.password)) {
    //   alert('Password must be at least 6 characters long and include a mix of upper and lower case letters, digits, and special characters.');
    //   return false;
    // }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  //   return passwordRegex.test(password);
  // };
 




  const handleClick =async () => {
      (action==="Sign Up")?setAction("Log In"):setAction("Sign Up");
    }

  return (
    <>
       <div className="sbox">
      <div className="scontainer">
        <div className="sheader">
          <div className="stext">{action}</div>
          <div className="sunderline"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
      {action === "Sign Up" && (
        <>
          <div className="sinput">
            <input
              type="email"
              name="email"
              className="sinput_style"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sinput">
            <input
              type="text"
              name="fullName"
              className="sinput_style"
              placeholder="FullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div className="sinput">
        <input
          type="text"
          name="username"
          className="sinput_style"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="sinput">
        <input
          type="password"
          name="password"
          className="sinput_style"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {action !== "Sign Up" && (
          <div className="lostpassword">
            Lost Password? <span>click here</span>
          </div>
        )}
      </div>

      <button type="submit" className={action === "Sign Up" ? "signSubmit" : "logSubmit"}>
        Submit
      </button>
      
      <h3 className="pseudoClass">
        <span className="or">or</span>
      </h3>
      
      {action === "Sign Up" && (
        <div className="google-cont">
          <button type="button" className="google-auth-button" onClick={handleGoogle}>
            Sign up with Google
          </button>
        </div>
      )}

      <div className="haveAccount">
        {action === "Sign Up" ? "Already" : "Don't"} have an account?
        <span onClick={handleClick}>
          {" "}{action === "Sign Up" ? "Log In" : "Sign Up"}
        </span>
      </div>
    </form>
    </div>
    </div>
    </>
  );
}
// exporting our function to embedd it in app.js. 
export default SignUpLogin;