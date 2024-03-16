import React ,{ useState, useEffect } from 'react'
import axios from 'axios'


const MyEvent = () => {
  var data;

    useEffect(() => {
        let isMounted = true; // Flag to track whether the component is mounted
    
        const fetchData = async () => {
          try {
            const verify = await axios.get('/myEventAdmin');
            console.log(verify);
            if (isMounted && !verify.data.status) {
              data=verify.data.data;
            }
            data=verify.eventName;
          } catch (error) {
            alert("something went wrong");
          }
        };
    
        fetchData(); // Call the fetchData function
    
        // Cleanup function to set isMounted to false when the component unmounts
        return () => {
          isMounted = false;
        };
      }, []); // Adding navigate as a dependency to useEffect

  return (
    <div>
      {data}
    </div>
  )
}

export default MyEvent
