import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/RegisterEvent.css';

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const fetchRegisteredEvents = async () => {
    try {
      const alumniId = localStorage.getItem('alumniId');
      if (!alumniId) {
        setError('Alumni ID not found. Please log in again.');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/alumni/registered-events/${alumniId}`);
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching registered events:', err);
      setError('Failed to fetch events. Please try again later.');
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="register-events-container">
      {/* <h2 className="section-title">Registered Events</h2> */}
      <h2 className="past-events-title">Registered Events</h2>
      {error && <p className="error-message">{error}</p>}
      {currentEvents.length === 0 ? (
        <p>No registered events found.</p>
      ) : (
        <div className="event-grid">
          {currentEvents.map((event) => (
            <div className="event-card" key={event.event_id}>
              <h3 className="event-title"><strong className="strong">{event.title}</strong></h3>
              <p className="event-date">
                <strong className="strong">Date:</strong> {new Date(event.event_date).toLocaleDateString()}<br />
                <strong className="strong">Time:</strong> {event.time}
              </p>
              <p className="event-description"><strong className="strong">Description:</strong> {event.description}</p>
              <p className="event-venue"><strong className="strong"> Venue:</strong> {event.venue}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;
