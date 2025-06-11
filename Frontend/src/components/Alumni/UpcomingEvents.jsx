import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/UpcomingEvents.css";

const EVENTS_PER_PAGE = 2;

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fade, setFade] = useState(true);

  const alumniId = localStorage.getItem("alumniId");

  useEffect(() => {
    fetchUpcomingEvents();
    if (alumniId) {
      fetchRegisteredEvents();
    }
  }, [alumniId]);

  const fetchUpcomingEvents = () => {
    axios
      .get("http://localhost:8080/api/alumni/alumni-upcoming-event")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  };

  const fetchRegisteredEvents = () => {
    axios
      .get(`http://localhost:8080/api/alumni/registered-events/${alumniId}`)
      .then((res) => {
        const formatted = Array.isArray(res.data)
          ? res.data.map((e) => ({
              event_id: e.event_id,
              can_cancel: e.can_cancel,
              cancel_count: e.cancel_count || 0,
            }))
          : [];
        setRegisteredEvents(formatted);
      })
      .catch((err) => console.error(err));
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((e) => e.event_id === eventId);
  };

  const canCancel = (eventId) => {
    const event = registeredEvents.find((e) => e.event_id === eventId);
    return event?.can_cancel ?? false;
  };

  const cancelCount = (eventId) => {
    const event = registeredEvents.find((e) => e.event_id === eventId);
    return event?.cancel_count ?? 0;
  };

  const handleToggleRegistration = (eventId) => {
    if (!alumniId) {
      alert("Alumni not logged in!");
      return;
    }

    const registered = isRegistered(eventId);
    const cancelAllowed = canCancel(eventId);
    const cancelTimes = cancelCount(eventId);

    if (registered) {
      if (!cancelAllowed) {
        alert("You can't cancel this event again. Limit reached.");
        return;
      }

      axios
        .post("http://localhost:8080/api/alumni/cancel-registration", {
          alumni_id: parseInt(alumniId),
          event_id: eventId,
        })
        .then((res) => {
          alert(res.data);
          fetchRegisteredEvents();
        })
        .catch((err) => {
          console.error(err);
          alert("Cancellation failed");
        });
    } else {
      const confirmRegister = window.confirm(
        "Are you sure to register? You can cancel the event only two times."
      );
      if (!confirmRegister) return;

      axios
        .post("http://localhost:8080/api/alumni/register-event", {
          alumni_id: parseInt(alumniId),
          event_id: eventId,
        })
        .then((res) => {
          alert(res.data);
          fetchRegisteredEvents();
        })
        .catch((err) => {
          console.error(err);
          alert("Registration failed");
        });
    }
  };

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = currentPage * EVENTS_PER_PAGE;
  const paginatedEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(newPage);
      setFade(true);
    }, 200);
  };

  return (
    <div>
      <h2 className="past-events-title">Upcoming Alumni Events</h2>

      <div className={`events-container ${fade ? "fade-in" : "fade-out"}`}>
        {paginatedEvents.map((event) => {
          const registered = isRegistered(event.event_id);
          const cancelAllowed = canCancel(event.event_id);
          const cancelTimes = cancelCount(event.event_id);

          return (
            <div className="event-card" key={event.event_id}>
              <div className="event-content">
                <h3 className="event-title">
                  <strong className="strong">{event.title}</strong>
                </h3>
                <p className="event-date">
                  <strong className="strong">Date:</strong>{" "}
                  {new Date(event.event_date).toLocaleDateString()} <br />
                  <strong className="strong">Time:</strong> {event.time}
                </p>
                <p className="event-description">
                  <strong className="strong">Description:</strong>{" "}
                  {event.description}
                </p>
                <p className="event-venue">
                  <strong className="strong">Venue:</strong> {event.venue}
                </p>
              </div>

              <div className="event-actions">
                <button
                  className={`toggle-button ${
                    registered
                      ? cancelAllowed
                        ? "cancel"
                        : "disabled"
                      : "register"
                  }`}
                  onClick={() => handleToggleRegistration(event.event_id)}
                  disabled={registered && !cancelAllowed}
                  title={
                    registered && cancelTimes >= 2
                      ? "You can't cancel more than twice"
                      : registered && !cancelAllowed
                      ? "You can't cancel this event again"
                      : ""
                  }
                >
                  {registered
                    ? cancelAllowed
                      ? "Cancel"
                      : cancelTimes >= 2
                      ? "Cancelled (Limit Reached)"
                      : "Registered"
                    : "Register"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
