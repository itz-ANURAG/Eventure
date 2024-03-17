import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyEvent = () => {
  const [verifyData, setVerifyData] = useState(null); // State to store verify data

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        const verify = await axios.get('/myEventAdmin');
        // console.log(verify);
        //   console.log(verify.data)
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
      {verifyData==null ?
        <><h1>Loading....</h1></>
        :
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              verifyData.map((row,i)=>(
                <tr>
                  <td>
                    {(i+1)}
                  </td>
                  <td>{row.eventName}</td>
                  <td>{row.eventDate}</td>
                  <td>{row.eventPrice}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </div>
  );
};

export default MyEvent;
