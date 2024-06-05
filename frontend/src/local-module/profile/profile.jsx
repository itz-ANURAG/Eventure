import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer.jsx";
import Navbar from "../Navbar.jsx";
import ViewProfile from "./ViewProfile.jsx";
import MyEvent from "./MyEvent.jsx";
import CreateEvent from "./CreateEvent.jsx";
import RegistrationForm from '../Events/RegisterForm.jsx';
import Sidebar from "./sideBar.jsx";
import Layout3 from '../../backgroundLayout/Layout3.jsx';

function Profile() {
    const [selected, setSelected] = useState('view-profile');
    const [eventData, setEventData] = useState([]);
    const [userData, setUserData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const navigate = useNavigate();

    const handleChange1 = (value) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const verify = await axios.get('/verify');
                if (!verify.data.success) {
                    alert("Login First");
                    navigate('/Signin');
                } else {
                    setUserData(verify.data.data);
                }
            } catch (error) {
                alert("something went wrong");
            }
        };
        fetchData();
    }, [navigate]);

    useEffect(() => {
        const EventData = async () => {
            try {
                const response = await axios.get('/eventdata');
                setEventData(response.data.data);
            } catch (error) {
                alert("something went wrong");
            }
        };
        EventData();
    }, []);

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await axios.get('/logout');
            navigate('/');
        } catch (error) {
            alert("something went wrong");
        }
    };

    const handleRegister = (event) => {
        setCurrentEvent(event);
        setIsOpen(true);
    };


    const handleIsOpen = (value) => {
        setIsOpen(value);
    };

    return (
        <>
            {isOpen ? (
                <RegistrationForm
                    event={currentEvent}
                    userData={userData}
                    setOpen={handleIsOpen}
                    // onSubmit={handleSubmitForm}
                />
            ) : (
                <Layout3>
                    <Navbar />
                    <div className='content-container'>
                        <div className="dash-sidebar h-screen">
                            <Sidebar className="sidebar" choose={handleChange1} />
                        </div>
                        <div className='main-content'>
                            {eventData == null ? (
                                <h1>Loading......</h1>
                            ) : (
                                <div className="flex justify-center mt-6 text-white">
                                    <table className="-collapse bg-gradient-to-br from-red-950 to-black rounded-3xl">
                                        <thead>
                                            <tr>
                                                <th className="p-4">Sr No.</th>
                                                <th className="p-4">Event Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventData.map((data, i) => (
                                                <tr key={i}>
                                                    <td className="p-4">{i + 1}</td>
                                                    <td className="p-4">{data.eventName}</td>
                                                    <td className="p-4">
                                                        <button onClick={() => handleRegister(data)}>Register</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {selected === 'view-profile' ? (
                                <ViewProfile email={userData.email} username={userData.username} />
                            ) : selected === 'myEvents' ? (
                                <MyEvent />
                            ) : (
                                <CreateEvent />
                            )}
                        </div>
                    </div>
                    <Footer className="footer" />
                </Layout3>
            )}
        </>
    );
}

export default Profile;
