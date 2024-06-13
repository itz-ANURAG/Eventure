import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyEventUser = () => {
  const [verifyData, setVerifyData] = useState(null); // State to store verify data

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const verify = await axios.get('/myEventUser');
        // console.log(verify);
          console.log(verify.data)
          setVerifyData(verify.data.data); // Store verify data in state
      } catch (error) {
        alert("something went wrong");
      }
    };
    
    fetchData(); // Call the fetchData function

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array, so useEffect runs only once

  return (
    <div>
{
  verifyData==null ?
      <><h1>Loading....</h1></>
      :
    <div className="flex justify-center mt-6 text-white ">
    <table className="-collapse   bg-gradient-to-br from-red-950 to-black rounded-3xl">
      <thead>
        <tr className="">
          <th className="p-4  ">Sr No.</th>
          <th className="p-4  ">Participant Name</th>
          <th className="p-4  ">Event Name</th>
          <th className="p-4  ">Event Date</th>
        </tr>
      </thead>
      <tbody>{
        verifyData.map((row,i)=>(
        <tr className="-b ">
          <td className="p-4  ">{i+1}</td>
          <td className='p-4'>{row.userName}</td>
          <td className="p-4  ">{row.eventName}</td>
          <td className="p-4  ">{row.eventDate}</td>
        </tr>
        ))
        }
      </tbody>
    </table>
  </div>
  }
  </div>
  );
};

export default MyEventUser;

