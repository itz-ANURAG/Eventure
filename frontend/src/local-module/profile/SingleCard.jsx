// importing files
import React from 'react'

const SingleCard = ({
  image,
  CardDescription,
  CardTitle,
}) => {

  return (
    <>
      <div className="mb-5 overflow-hidden rounded-lg  bg-gradient-to-br from-red-950 to-black shadow-1 hover:scale-105 transition duration-200 flex flex-col  items-center ">
    <img src={image} alt="" className="w-100%" />
    <div className="p-2 text-center sm:p-5 md:p-4 xl:p-5 ">
        <h3>
            <a
            className="mb-2 text-white block text-lg font-semibold text-dark hover:text-primary sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-xl"
            >
            {CardTitle}
            </a>
        </h3>
        <p className=" text-white text-w text-sm leading-snug text-body-color">
            {CardDescription}
        </p>
    </div>
</div>
    </>
  );
};

export default SingleCard