import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from "react-redux";
import {setLoading} from "../../slices/authSlice"
import Spinner from "../Spinner"
const MyEvent = () => {
  const [verifyData, setVerifyData] = useState(null); // State to store verify data 
  const dispatch=useDispatch();
  const loading =useSelector((state)=>(state.auth.loading))

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted
    const fetchData = async () => {
      dispatch(setLoading(true))
      try {
        const verify = await axios.get('/myEventUser');
        console.log(verify.data.data)
          setVerifyData(verify.data.data); // Store verify data in state
      } catch (error) {
        alert("something went wrong");
      }
    };
    fetchData(); // Call the fetchData function
    dispatch(setLoading(false))
    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  
  }, []); // Empty dependency array, so useEffect runs only once

  return (
    <div>
      {loading?<Spinner/>:<>
  {
  verifyData==null ?
      <><h1 className='text-white'>Wow So Empty</h1></>
      :
    <div className="flex justify-center mt-6 text-white ">
    <table className="-collapse   bg-gradient-to-br from-red-950 to-black rounded-3xl">
      <thead>
        <tr className="">
          <th className="p-4  ">Sr No.</th>
          <th className="p-4  ">Event Name</th>
          <th className="p-4  ">Event Date</th>
          <th className="p-4  ">Event Time</th>
          <th className="p-4  ">Registration Date</th>
          <th className="p-4  ">Price</th>
        </tr>
      </thead>
      <tbody>{
        verifyData.map((row,i)=>(
        <tr className="-b ">
          <td className="p-4  ">{i+1}</td>
          <td className="p-4  ">{row.eventName}</td>
          <td className="p-4  ">{row.eventDate}</td>
          <td className="p-4  ">{row.eventTime}</td>
          <td className="p-4  ">{row.createDate}</td>
          <td className="p-4  ">{row.eventPrice}</td>
        </tr>
        ))
        }
      </tbody>
    </table>
  </div>
  }
</>}
  </div>
  );
};

export default MyEvent;