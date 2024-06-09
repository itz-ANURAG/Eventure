import React  from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const SingleCardQwc = ({
  title,
  description,
  location,
  time,
  decide
}) => {
  
  const navigate = useNavigate();
  const handleSubmit = async()=>{
    try {
      console.log("Checking")
      const responce = await axios.get("http://localhost:5000/verify");
      // console.log(responce)
      if(responce.success){
        decide(true);
      }
      else {
        alert("Login First to Register an Event")
        navigate('/Signin')
      }
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }
  
  return (
    <>
      <div className="bx bg-gradient-to-br from-red-950 to-black rounded-lg shadow-md p-6 relative hover:cursor-pointer hover:shadow-slate-100 
      transition duration-300">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white pt-4 pb-3">{description}</p>
          <span className='text-white font-extrabold'>Location:</span><span className='text-white'>  {location}</span>
          <p className='mt-4'><span className='text-white font-extrabold'>Timings:</span><span className='text-white'>{time}</span></p>
          <p className='pt-2'><button onClick={handleSubmit} className='p-2 bg-white rounded-lg'>Register Now</button></p>
        </div>
      </div>
    </>
  );
};

export default SingleCardQwc