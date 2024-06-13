import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEventPage = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
        eventPrice: '',
        eventBanner: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/createEvent', formData);
            if (response.data.success) {
                alert(response.data.message);
                navigate(response.data.path);
            } else {
                alert('Failed to create event');
            }
        } catch (error) {
            console.error('There was an error creating the event:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-950">
            <h2 className="text-4xl font-bold text-red-500 mb-6">Create Event</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-red-400 text-sm font-bold mb-2">Event Name</label>
                    <input 
                        type="text" 
                        name="eventName" 
                        value={formData.eventName} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 text-red-700 bg-gray-700 border border-red-500 rounded focus:outline-none focus:border-red-400" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-400 text-sm font-bold mb-2">Event Date</label>
                    <input 
                        type="date" 
                        name="eventDate" 
                        value={formData.eventDate} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 text-red-700 bg-gray-700 border border-red-500 rounded focus:outline-none focus:border-red-400" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-400 text-sm font-bold mb-2">Event Time</label>
                    <input 
                        type="time" 
                        name="eventTime" 
                        value={formData.eventTime} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 text-red-700 bg-gray-700 border border-red-500 rounded focus:outline-none focus:border-red-400" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-400 text-sm font-bold mb-2">Event Description</label>
                    <textarea 
                        name="eventDescription" 
                        value={formData.eventDescription} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 text-red-700 bg-gray-700 border border-red-500 rounded focus:outline-none focus:border-red-400" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-400 text-sm font-bold mb-2">Event Price</label>
                    <input 
                        type="number" 
                        name="eventPrice" 
                        value={formData.eventPrice} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 text-red-700 bg-gray-700 border border-red-500 rounded focus:outline-none focus:border-red-400" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-red-400 text-sm font-bold mb-2">Event Banner URL</label>
                    <input 
                        type="text" 
                        name="eventBanner" 
                        value={formData.eventBanner} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 text-red-700 bg-gray-700 border border-red-500 rounded focus:outline-none focus:border-red-400" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded transition duration-200"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;
