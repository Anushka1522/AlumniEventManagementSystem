import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/PastEvent.css'; // Make sure this CSS file is in the same folder

const ITEMS_PER_PAGE = 6;

const PastEvents = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/alumni/event/past-events')
      .then((res) => {
        setPastEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch past events');
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(pastEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = pastEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="past-events-container">
      <h2 className="past-events-title">Past Alumni Events</h2>

      {loading && <p className="text-center">Loading past events...</p>}
      {error && <p className="text-center text-error">{error}</p>}
      {!loading && !error && pastEvents.length === 0 && (
        <p className="text-center text-muted">No past events available.</p>
      )}

      <div className="events-grid">
        {paginatedEvents.map((event) => {
          const formattedDate = new Date(event.event_date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          const formattedTime = new Date(event.event_date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div className="event-card" key={event.event_id}>
              <h3 className="event-title"><strong className="strong">{event.title}</strong></h3>
              <div className="event-info">
                <p>📅 <strong className="strong">Date:</strong> {formattedDate}</p>
                <p>🕒 <strong className="strong">Time:</strong> {formattedTime}</p>
                <p>📍 <strong className="strong">Venue:</strong> {event.venue || 'Not specified'}</p>
              </div>
              <p className="event-description">{event.event_description}</p>
            </div>
          );
        })}
      </div>

      {pastEvents.length > ITEMS_PER_PAGE && (
        <div className="pagination-controls">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-text">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PastEvents;
