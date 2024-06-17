
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer.jsx";
import Navbar from "../Navbar.jsx";
import ViewProfile from "./ViewProfile.jsx";
import MyEvent from "./MyEvent.jsx";
import CreateEventPage from './CreateEventPage.jsx';
import RegistrationForm from '../Events/RegisterForm.jsx';
import Sidebar from "./sideBar.jsx";
import Layout3 from '../../backgroundLayout/Layout3.jsx';
import HostedEvent from './HostedEvent.jsx';
import {toast} from "react-hot-toast"

function Profile() {
    const [selected, setSelected] = useState('view-profile');
    // const [eventData, setEventData] = useState([]);
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
                  toast.error("internal server error")
                  navigate("/")
                } else {

                    setUserData(verify.data.data);
                    console.log(verify.data.data);
                }
            } catch (error) {
                toast.error("plz Login/Signup first")
                navigate("/")
            }
        };
        fetchData();
    }, [navigate]);

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
                />
            ) : (
                <Layout3>
                    <Navbar userId={userData._id} />
                    <div className='flex h-screen'>
                        <Sidebar className="sidebar" choose={handleChange1} />
                        <div className="flex-1 p-6 overflow-auto">
                            {selected === 'view-profile' ? (
                                <ViewProfile email={userData.email} username={userData.username} fullName={userData.fullName} />
                            ) : selected === 'myEvents' ? (
                                <MyEvent userId={userData._id} />
                            ) : selected === 'createEventPage' ? (
                                <CreateEventPage />
                            ) : (
                                <HostedEvent />
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
