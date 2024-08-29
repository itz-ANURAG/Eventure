// importing files needed for the sign up log in page.
import React from "react";
import "../stylesheets/signUpLogin.css";
import {useState} from "react";
import axios from 'axios'
import {useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {setToken,setLoading} from "../slices/authSlice"
import {toast} from "react-hot-toast"
import Spinner from "./Spinner";


function SignUpLogin() {
  // using useState hook for creating desired logIn signUp effect
  const user=useSelector((state)=>state.profile);
  const dispatch=useDispatch();
  const loading =useSelector((state)=>(state.auth.loading))
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
     toast.success("signed in successfully")
  };

  const handleSubmit = async (event) => {
    event.preventDefault();//to prevent the default action of form handling
    if (validateForm()) {
    dispatch(setLoading(true))
    if(action==="Sign Up"){
    try {
      console.log("For SignIn")
      const response = await axios.post("/user/signUp", formData);
      dispatch(setToken(response.data.token));
      toast.success("signed in successfuly")
      navigate(response.data.path)
    } catch (error) {
      toast.error("internal server error")
      alert(error);
    }
  }
  else{
    try {
      console.log("For Login")
      const response = await axios.post("/user/login", formData);
      if(response.data.success){
      toast.success("logged in successfuly")
      dispatch(setToken(response.data.token));
      navigate(response.data.path)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("internal server error")
      alert("something went wrong")
    }
  }
   dispatch(setLoading(false))
  };
}

  const validateForm = () => {
    if (action === 'Sign Up') {
      if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address.');
        return false;
      }
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClick =async () => {
      (action==="Sign Up")?setAction("Log In"):setAction("Sign Up");
    }

  return (
    <>{
      // to create spinner effect while fetching data from backend
      loading?<Spinner/>:(
       <div className="sbox">
      <div className="scontainer">
        <div className="sheader">
          <div className="stext">{action}</div>
          <div className="sunderline"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* to decide exactly which jsx to show signup or login */}
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
            Lost Password? <a href="/forget-password">click here</a>
          </div>
        )}
      </div>

      <button type="submit" className={action === "Sign Up" ? "signSubmit" : "logSubmit"}>
        Submit
      </button>
      
      <h3 className="pseudoClass">
        <span className="or">or</span>
      </h3>
        <div className="google-cont">
          <button type="button" className="google-auth-button" onClick={handleGoogle}>
            Sign up with Google
          </button>
        </div>
      <div className="haveAccount">
        {action === "Sign Up" ? "Already" : "Don't"} have an account?
        <span onClick={handleClick}>
          {" "}{action === "Sign Up" ? "Log In" : "Sign Up"}
        </span>
      </div>
    </form>
    </div>
    </div>
      )
  }
    </>
  );
}

// exporting our function to embedd it in app.js. 
export default SignUpLogin;