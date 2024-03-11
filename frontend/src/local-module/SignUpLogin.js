// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import {useState} from "react";
import google from "../images/google.png";

function SignUpLogin() {
  // using useState hook for creating desired logIn signUp effect.
  const [action,setAction] = useState("Sign Up");
  
  // writing rquired js for the handling onClick event.
  const handleClick=()=>{
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
        
        {action==="Sign Up"?<div className="sinput">
          <input type="text" className="sinput_style" placeholder="username" />
        </div>:<></>} 
         {/* we can add few icons of email password and user but i removed because i was unable to get the desired look in it. */}
        
        <div className="sinput">
          <input type="email" className="sinput_style"placeholder="email" />
        </div>
        <div className="sinput">
          <input type="password" className="sinput_style" placeholder="password" />
          {action==="Sign Up"?<></>:<div className="lostpassword">
          {" "}
          Lost Password?<span>{" "}clickhere</span>
        </div>}
          
        </div>
        {/* embedding js in jsx for the desired layout. */}
        <button className={action==="Sign Up"?"signSubmit":"logSubmit"}>submit</button>
        <h3 className="pseudoClass">
        <span className="or">or</span>
        </h3>
        {action==="Sign Up"?<div className="google-cont">
           <a href="#" className="google-auth-button">
            <img src={google} alt="Google Logo" className="google-logo"/>
             Sign up with Google
             </a>
             </div>:<></>}

        <div className="haveAccount">{action==="Sign Up"?"Already":"don\'t"} have an account?<span onClick={handleClick}>{" "}{ action==="Sign Up"?"Log In":"Sign Up"}</span></div>
      </div>
      </div>
    </>
  );
}
// exporting our function to embedd it in app.js. 
export default SignUpLogin;