import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ event, userData, setOpen }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        phoneNo: '',
        userId: userData._id,
        eventDate: event.eventDate,
        eventName: event.eventName,
        eventTime: event.eventTime,
        eventId: event._id
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        console.log(formData)
        try {
            const response = await axios.post('/eventRegister', formData);
            if (response.data.status) {
                console.log(response)
            alert("Registered successfully");
            }
        else alert("Something went wrong");
        } catch (error) {
            console.log("error", error);
            alert("Something went wrong");
            navigate('/my-profile');
        }
        setOpen(false);
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-xl px-6 py-12">
                <div className="bg-gradient-to-b from-red-950 to-black grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 rounded-xl">
                    <h1 className='px-4 pt-4 pb-0 text-white font-bold text-xl md:col-span-2'>REGISTRATION FORM</h1>
                    <div className="md:col-span-1 p-4 pt-1 pr-3 pb-0">
                        <label htmlFor="firstName" className="text-white">
                            First Name<span className="text-red-500">*</span>
                        </label>
                        <input id="firstName" placeholder='First Name' type="text" name='userName' value={formData.userName} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-black text-l" required />
                    </div>
                    <div className="md:col-span-2 p-4 pb-2 pt-1">
                        <label htmlFor="email" className="text-white">
                            E-mail<span className="text-red-500">*</span>
                        </label>
                        <input id="email" placeholder='E-mail' name='userEmail' value={formData.userEmail} type="text" onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-black text-l" required />
                    </div>
                    <div className="md:col-span-1 p-4 pt-0 pr-3 pb-0">
                        <label htmlFor="phone" className="text-white">
                            Phone<span className="text-red-500">*</span>
                        </label>
                        <input id="phone" placeholder='Phone' type="text" name='phoneNo' value={formData.phoneNo} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-black text-l" required />
                    </div>
                    <div className='md:col-span-1 p-4 pb-2 pt-1 px-40 flex justify-between items-center'>
                        <button className='text-white bg-gradient-to-br from-red-950 to-black p-2' onClick={handleRegister}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
