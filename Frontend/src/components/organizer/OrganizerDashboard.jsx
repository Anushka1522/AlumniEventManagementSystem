import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import './css/OrganizerDashboard.css';

const OrganizerDashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [organizerEvents, setOrganizerEvents] = useState(0);
  const [organizerDetails, setOrganizerDetails] = useState(null);

  const organizerId = localStorage.getItem('organizer_id');
  const API_BASE = 'http://localhost:8080/api/organizer/dashboard';

  useEffect(() => {
    if (!organizerId) {
      alert("Organizer not logged in.");
      window.location.href = "/";
      return;
    }

    axios.get(`${API_BASE}/Event-total-Count`)
      .then(res => setTotalEvents(res.data))
      .catch(err => console.error('Error fetching total events:', err));

    axios.get(`${API_BASE}/${organizerId}/eventCount`)
      .then(res => setOrganizerEvents(res.data))
      .catch(err => console.error('Error fetching organizer event count:', err));

    axios.get(`${API_BASE}/${organizerId}`)
      .then(res => setOrganizerDetails(res.data))
      .catch(err => console.error('Error fetching organizer details:', err));

  }, [organizerId]);

  return (
    <div className="organizer-dashboard">
      {organizerDetails && (
        <h1 className="welcome-message">
          Welcome,   <br />{organizerDetails.organizer_name} ........! 👋
        </h1>
      )}

      <div className="card-row">
        <div className="card">
          <h3>Total Events</h3>
          <p>
            <CountUp end={totalEvents} duration={1.5} />
          </p>
        </div>
        <div className="card">
          <h3>You Arranged Events</h3>
          <p>
            <CountUp end={organizerEvents} duration={1.5} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
