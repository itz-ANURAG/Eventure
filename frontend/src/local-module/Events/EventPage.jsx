import { useState } from 'react'

import '../../stylesheets/EventPage.css';
import harrypotter from '../../HarryPotter/harry-potter.gif';
import logo from '../../HarryPotter/logo.png';
import concert from '../../HarryPotter/Concert.jpg'
import Quidditch from '../../HarryPotter/quidditch.png';
import battle from '../../HarryPotter/battle.png';
function EventPage() {
  const [count, setCount] = useState(0)
  return (
    <>
    <div className='EventsRows mb-20'>
      <div className='quidditch hover:scale-110 transition duration-1000 mb-11'>
        <img className='logoquidditch  ' src={Quidditch} />
        <button className='quidditchButton text-black p-4 rounded-sm hover:opacity-80 hover:scale-110 transition duration-500'>Click Me</button>
      </div>
      <div className="row2Events">
        <div className='Concert hover:scale-110      transition duration-1000 mb-11'>

              <img className='ConcertEvent' src={concert}/>

              <div className='description1 text-white'>Harry Potter And The Sorcerer's Stone Concert
                  <div className='datetime'>
                      <div className='Time'>7:00 PM</div>
                      <div className='dateConcert text-white'>
                        16/03/2024 
                      </div>
                  </div>
                  <div className='Venue'>
                    Great Hall
                  </div>
              </div>
              <button className='ConcertButton text-black p-4 rounded-sm hover:opacity-80 hover:scale-110 transition duration-500'>Click Me</button>
        </div>
      <div className='Concert hover:scale-110      transition duration-1000 mb-11'>
        <img className='BattleEvent' src={battle}/>
        <div className='description2 text-white'>Battle Of Potion
                  <div className='datetime2'>
                      <div className='Time'>7:00 PM</div>
                      <div className='dateConcert text-white'>
                        16/03/2024 
                      </div>
                  </div>
                  <div className='Venue2'>
                    Dungeons
                  </div>   
              </div>
              <button className='BattleButton text-black p-4 rounded-sm hover:opacity-80 hover:scale-110 transition duration-500'>Click Me</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default EventPage
