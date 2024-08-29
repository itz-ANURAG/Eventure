import React from 'react'
import SingleCardQwc from './SingleCardQwc.jsx'
import Layout2 from '../../backgroundLayout/Layout2.jsx'
import RegisterForm from './RegisterForm.jsx';
import { useState } from 'react';

function QWCevent() {
  const [isopen, setIsopen] = useState(false);
  const handleDecide=(value)=>{
    setIsopen(value);
  }
  return (
<>
{
        isopen ?
           <RegisterForm decide={handleDecide}/>
          :
<Layout2>
<div className="min-h-screen ">
    <div className="mx-auto max-w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mt-16">
            <SingleCardQwc title="Gryffindor Lions Vs Ravenclaw Eagles"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"
                        decide={handleDecide}/>
            <SingleCardQwc title="Hufflepuff Badgers Vs Slytherin Serpents"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"
                        decide={handleDecide}/>
            <SingleCardQwc title="Snape's 7 Vs Dumbledore's 7"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"
                        decide={handleDecide}/>
            <SingleCardQwc title="Muggles' 7 Vs Weasely's 7"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"
                        decide={handleDecide}/>
        </div>
    </div>
</div>
</Layout2>
}
</>
  )
}
export default QWCevent
