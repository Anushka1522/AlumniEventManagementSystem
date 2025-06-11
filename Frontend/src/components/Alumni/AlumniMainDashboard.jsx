import React, { useEffect, useState } from "react";
import "./css/AlumniMainDashboard.css";
import axios from "axios";

const AlumniMainDashboard = () => {
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [totalAttended, setTotalAttended] = useState(0);

  useEffect(() => {
    const alumniId = localStorage.getItem("alumniId");
    if (!alumniId) return;

    axios.get(`http://localhost:8080/api/alumni/registered-events/count/${alumniId}`)
      .then(res => setTotalRegistered(res.data))
      .catch(err => console.error("Error fetching registered:", err));

    axios.get(`http://localhost:8080/api/alumni/attended-events/count/${alumniId}`)
      .then(res => setTotalAttended(res.data))
      .catch(err => console.error("Error fetching attended:", err));
  }, []);

  return (
    <div className="alumni-dashboard-container">
      <h2 className="dashboard-heading">Welcome to Alumni Dashboard</h2>
      <div className="dashboard-card-container">
        <div className="dashboard-card">
          <div className="card-content">
            <h3>Total Registered Events</h3>
            <p>{totalRegistered}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h3>Total Attended Events</h3>
            <p>{totalAttended}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniMainDashboard;
