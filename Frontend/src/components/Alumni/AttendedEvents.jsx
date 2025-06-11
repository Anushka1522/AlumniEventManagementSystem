import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/AttendedEvents.css';

const AttendedEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const alumniId = localStorage.getItem('alumniId');

    if (!alumniId || isNaN(alumniId)) {
      console.error('Invalid or missing alumniId in localStorage');
      setError('Alumni ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/attendance/attended/${alumniId}`)
      .then((res) => {
        setEvents(res.data);
        setError('');
      })
      .catch((err) => {
        console.error('Error fetching attended events:', err);
        setError('Failed to fetch attended events.');
      })
      .finally(() => setLoading(false));
  }, []);

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="attended-events-loading">Loading attended events...</div>;
  if (error) return <div className="attended-events-error">{error}</div>;

  return (
    <div className="attended-events-wrapper">
      <h2 className="attended-events-title">Attended Events</h2>
      {events.length === 0 ? (
        <p className="attended-events-empty">No events attended yet.</p>
      ) : (
        <>
          <div className="attended-events-grid">
            {currentEvents.map((event) => (
              <div key={event.event_id} className="attended-event-card">
                <h3>{event.event_title}</h3>
                <p>Date: <strong>{event.event_date}</strong></p>
                <p>Status: <span className={`status ${event.status.toLowerCase()}`}>{event.status}</span></p>
              </div>
            ))}
          </div>

          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AttendedEvents;
