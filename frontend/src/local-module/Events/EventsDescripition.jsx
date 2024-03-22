// description for event component will be given here
import "../../stylesheets/EventDescription.css";
import React from 'react'
import concert from "../../HarryPotter/Concert.jpg";
import axios from 'axios'
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import Layout4 from "../../backgroundLayout/Layout4";
import { useNavigate } from "react-router-dom";

function EventsDescripition() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = async () => {
    try {
      const responce = await axios.get('/verify')
      if (responce.success) {
        setIsOpen(~isOpen)
      }
      else {
        alert("Login First to book  tickets");
        navigate('/Signin')
      }
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }
  const handleRegSubmit = (value) => {
    setIsOpen(value);
  }
  return (
    <>
      {
        isOpen ?
          <RegisterForm decide={handleRegSubmit} />
          :
          <Layout4>
            <div className="flex flex-col items-center justify-center min-h-screen pt-5 pb-5 scale-95">

              <img src={concert} className="description max-w-3xl mx-auto px-4 rounded-xl overflow-hidden" alt="Concert" />
              <div className="max-w-3xl mx-auto px-4 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between">
                  <div className="md:text-left mb-6 md:mb-0">
                    <h2 className="text-xl font-bold mb-2">Harry Potter Concert</h2>
                    <p><span className="font-bold">Date:</span> August 20, 2024</p>
                    <p><span className="font-bold">Time:</span> 7:00 PM - 10:00 PM</p>
                    <p><span className="font-bold">Location:</span> Forbidden Forest</p>
                    <p><span className="font-bold">Description:</span> Join us for the most exhilarating event of the wizarding world - the Battle of Potions! Prepare to witness a spectacle of magical mastery as talented witches and wizards from across the realm compete in a thrilling display of potion-making prowess</p>
                  </div>
                  <button onClick={() => handleOpen()} className="bg-gradient-to-br from-red-950 to-black hover:opacity-80 transition duration-300 text-white font-bold py-2 px-4 rounded">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </Layout4>
      }

    </>
  )
}

export default EventsDescripition
