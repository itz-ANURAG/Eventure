// to import files and images in our landing pages from different component and folders.

import "../../stylesheets/homePage.css";
import React from "react";
import Footer from "../Footer.jsx";
import Navbar from "../Navbar.jsx";
import '../../stylesheets/EventPage.css';
import concert from '../../HarryPotter/Concert.jpg';
import Quidditch from '../../HarryPotter/quidditch.png';
import battle from '../../HarryPotter/battle.png';
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Layout from "../../backgroundLayout/Layout.jsx";
import { useState } from "react";
import {toast} from "react-hot-toast"

export default function HomePage() {

  // this is the logic of autowrite function
  const [text] = useTypewriter({
    words: [`Explore Hogwarts `,`Unravel mysteries`, `, & let the magic ignite.`],
    loop: {},
  });


  // some states and function for the contact us form
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: emailPattern.test(value) ? '' : 'Invalid email address',
      });
    }

    if (name === 'phone') {
      const phonePattern = /^\d{10}$/;
      setErrors({
        ...errors,
        phone: phonePattern.test(value) ? '' : 'Phone number must be 10 digits',
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.email || errors.phone) {
      alert('Please fix the errors in the form.');
      return;
    }
    // Send the formData to the backend (e.g., using axios)
    console.log('Form submitted', contactFormData);

    toast.success("we will contact u soon");
    setContactFormData({ name: '', email: '', phone: '' });
  };


  return (
    <>
      <Layout>
      <Navbar />

      {/* jsx code for the first section which serves the purpose of our website intro.  */}
      {/* navbar added */}
      
      <section className="firstSection">
        <div className="typewrite text-white">
        "Enter the wizarding realm, where magic thrives and adventures await."{""}
          {/* code of that autowrite library in jsx */}
          <span style={{ color: "white", fontWeight: "bold" }}>{text}</span>
          <span style={{ color: "white" }}>
            <Cursor cursorStyle="|" />
          </span>
        </div>
      </section>
      {/* event page creaTED BY chirag added here as homempage jsx */}
      <div className='EventsRows mb-36'>
        <div className='quidditch hover:scale-110 transition duration-1000 mb-11'>
          <Link to='events-page'><img className='logoquidditch  ' src={Quidditch} alt="QWC event logo" /></Link>
          {/* <button className='quidditchButton text-black p-4 rounded-sm hover:opacity-80 hover:scale-110 transition duration-500'>Click Me</button> */}
        </div>
        <div className="row2Events">
          <div className='Concert hover:scale-110   transition duration-1000 mb-11'>
            <Link to='event-des'><img className='ConcertEvent' src={concert} alt="concert event logo"/></Link>
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
            {/* <button className='ConcertButton text-black p-4 rounded-sm hover:opacity-80 hover:scale-110 transition duration-500'>Click Me</button> */}
          </div>
          <div className='Concert hover:scale-110      transition duration-1000 mb-11'>
            <Link to='event-des'><img className='BattleEvent' src={battle} alt="battle event logo"/></Link>
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
            {/* <button className='BattleButton text-black p-4 rounded-sm hover:opacity-80 hover:scale-110 transition duration-500'>Click Me</button> */}
          </div>
        </div>
      </div>

      {/* fourth section for the users to contact the website admins in case of any query. */}
      <section className="fourthSection">
      <div className="left4" id="ContactUs">
        <form onSubmit={handleSubmit}>
          <h2>Contact Us</h2>

          <label htmlFor="name">Name:</label>
          <input
            className="bg-gradient-to-br from-red-950 to-black"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={contactFormData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            className="bg-gradient-to-br from-red-950 to-black"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={contactFormData.email}
            onChange={handleChange}
            required
          />
           {errors.email && <p className="error">{errors.email}</p>}


          <label htmlFor="phone">Phone No:</label>
          <input
            className="bg-gradient-to-br from-red-950 to-black"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone No"
            value={contactFormData.phone}
            onChange={handleChange}
            required
          />
           {errors.phone && <p className="error">{errors.phone}</p>}

          <button className="bg-gradient-to-br from-red-950 to-black" type="submit">
            Submit
          </button>
        </form>

      </div>
    </section>

      {/* usual foorter creation. */}
      <Footer />
      </Layout>
    </>
  );
}

