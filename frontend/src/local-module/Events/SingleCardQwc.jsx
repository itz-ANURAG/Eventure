import React from 'react'

const SingleCardQwc = ({
  title ,
  description,
  location,
  time
}) => {
  return (
    <>
      <div className="bx bg-gradient-to-br from-red-950 to-black rounded-lg shadow-md p-6 relative hover:cursor-pointer hover:shadow-slate-100 
      transition duration-300">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white pt-4 pb-3">{description}</p>
          <span className='text-white font-extrabold'>Location:</span><span  className='text-white'>  {location}</span>
          <p className='mt-4'><span className='text-white font-extrabold'>Timings:</span><span  className='text-white'>{time}</span></p>
          <p className='pt-2'><button className='p-2 bg-white rounded-lg'>Register Now</button></p>
        </div>   
      </div>
    </>
  );
};

export default SingleCardQwc