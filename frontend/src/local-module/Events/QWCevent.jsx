import React from 'react'
function QWCevent() {
  return (
<>
<div className="min-h-screen ">
    <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <SingleCard title="Gryffindor Lions Vs Ravenclaw Eagles"
                        description="Get Ready !"/>
            <SingleCard title="Hufflepuff Badgers Vs Slytherin Serpents"
                        description="Get Ready !"/>
            <SingleCard title="Snape's 7 Vs Dumbledore's 7"
                        description="Get Ready !"/>
            <SingleCard title="Muggles' 7 Vs Weasely's 7"
                        description="Get Ready !"/>
        </div>
    </div>
</div>
</>
  )
}
export default QWCevent
const SingleCard = ({
  title ,
  description
}) => {
  return (
    <>
    <a href="">
      <div className="bx bg-gradient-to-br from-red-950 to-black rounded-lg shadow-md p-6 relative hover:cursor-pointer hover:shadow-slate-100 
      transition duration-300">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white">{description}</p>
        </div>   
      </div>
    </a>

    </>
  );
};