
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HostedEvent() {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
        eventPrice: ''
    });

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/verify');
                if (response.data.success) {
                    setUserId(response.data.data._id);
                } else {
                    console.error('User verification failed');
                }
            } catch (error) {
                console.error('Error verifying user:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchEvents = async () => {
                try {
                    const response = await axios.get(`/api/user/${userId}/events`);
                    setEvents(response.data);
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            };
            fetchEvents();
        }
    }, [userId]);

    const handleUpdateEventClick = (event) => {
        setCurrentEvent(event);
        setFormData({
            eventName: event.eventName,
            eventDate: new Date(event.eventDate).toISOString().slice(0, 10),
            eventTime: event.eventTime,
            eventDescription: event.eventDescription,
            eventPrice: event.eventPrice
        });
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentEvent(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/event/${currentEvent._id}`, formData);
            alert('Event updated successfully');
            setEvents(events.map(event => event._id === currentEvent._id ? response.data : event));
            handleCloseForm();
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event');
        }
    };

    return (
        <div className="hosted-event-container p-6">
            <h2 className="text-2xl font-bold mb-4">Hosted Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="event-card bg-white p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold">{event.eventName}</h3>
                        <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                        <p><strong>Participants:</strong> {event.userEnrolled.length}</p>
                        <p><strong>Revenue:</strong> ${event.revenue}</p>
                        <p><strong>Ticket Sales:</strong> {event.ticketSales}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleUpdateEventClick(event)}
                        >
                            Update Event
                        </button>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Update Event</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                <input
                                    type="text"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Time</label>
                                <input
                                    type="text"
                                    name="eventTime"
                                    value={formData.eventTime}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Description</label>
                                <textarea
                                    name="eventDescription"
                                    value={formData.eventDescription}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Event Price</label>
                                <input
                                    type="number"
                                    name="eventPrice"
                                    value={formData.eventPrice}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HostedEvent;
