import React from "react";
import { Routes, Route } from "react-router-dom";
import AlumniSidebar from "../Common/AlumniSidebar";
import AlumniProfile from "./AlumniProfile";
import UpcomingEvents from "./UpcomingEvents";
import AlumniMainDashboard from './AlumniMainDashboard'
import AttendedEvents from "./AttendedEvents";
import PastEvents from "./PastEvent";
import RegisteredEvents from "./RegisteredEvents";
import "./css/AlumniDashboard.css";



const AlumniDashboard = () => {
  const alumniId = localStorage.getItem("alumniId") || 1;
  return (
    <div className="dashboard-container">
      <div className="sidebar-wrapper">
        <AlumniSidebar />
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="alumni-profile" element={<AlumniProfile />} />
          <Route path="main-dashboard" element={<AlumniMainDashboard />} />
           <Route path="upcoming-events" element={<UpcomingEvents />} />
          <Route path="attended-events" element={<AttendedEvents />} />
          <Route path="registered-events" element={<RegisteredEvents />} />
          <Route path="past-events" element={<PastEvents />} />
        </Routes>
      </div>
    </div>
  );
};

export default AlumniDashboard;
