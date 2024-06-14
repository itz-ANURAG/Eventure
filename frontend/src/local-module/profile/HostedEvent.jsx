import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HostedEvent() {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);

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

    const handleUpdateEvent = async (eventId) => {
        try {
            const updateData = { /* event update data */ };
            const response = await axios.put(`/api/event/${eventId}`, updateData);
            alert('Event updated successfully');
            // Update the local state to reflect the changes
            setEvents(events.map(event => event._id === eventId ? response.data : event));
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event');
        }
    };

    return (
        <div className="hosted-event-container p-6">
            <h2 className="text-2xl text-gray-200 font-bold mb-4">Hosted Events</h2>
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
                            onClick={() => handleUpdateEvent(event._id)}
                        >
                            Update Event
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HostedEvent;
