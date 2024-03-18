import React from 'react'
import SingleCardQwc from './SingleCardQwc.jsx'
import Layout from '../../backgroundLayout/Layout.jsx'
function QWCevent() {
  return (
<>
<Layout>
<div className="min-h-screen ">
    <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <SingleCardQwc title="Gryffindor Lions Vs Ravenclaw Eagles"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"/>
            <SingleCardQwc title="Hufflepuff Badgers Vs Slytherin Serpents"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"/>
            <SingleCardQwc title="Snape's 7 Vs Dumbledore's 7"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"/>
            <SingleCardQwc title="Muggles' 7 Vs Weasely's 7"
                        description="Experience the thrill of Quidditch, the most exhilarating and magical sport in the wizarding world! Join us for an action-packed match filled with soaring broomsticks, thundering Bludgers, and the pursuit of the elusive Golden Snitch. Whether you're a die-hard fan or a curious Muggle, our Quidditch match promises excitement for all"
                        location="Quidditch Pitch"
                        time="  3:00PM"/>
        </div>
    </div>
</div>
</Layout>
</>
  )
}
export default QWCevent
