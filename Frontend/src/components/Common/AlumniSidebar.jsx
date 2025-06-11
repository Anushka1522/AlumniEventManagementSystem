import React from "react";
import { Link } from "react-router-dom";
import "./css/AlumniSidebar.css";

import {
  FaUser,
  FaTachometerAlt,
  FaCalendarAlt,
  FaClipboardCheck,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";

const AlumniSidebar = () => {
  return (
    <div className="alumni-sidebar open">
      <div className="sidebar-header">
        <h2 className="alumni-panel-title">Alumni</h2>
      </div>

      <ul className="alumni-nav-list">
        <li className="alumni-nav-item">
          <Link to="/alumni/dashboard/alumni-profile" className="alumni-nav-link">
            <FaUser />
            <span className="nav-text show">Profile</span>
          </Link>
        </li>

        <li className="alumni-nav-item">
          <Link to="/alumni/dashboard/main-dashboard" className="alumni-nav-link">
            <FaTachometerAlt />
            <span className="nav-text show">Dashboard</span>
          </Link>
        </li>

        <li className="alumni-nav-item">
          <Link to="/alumni/dashboard/upcoming-events" className="alumni-nav-link">
            <FaCalendarAlt />
            <span className="nav-text show">Upcoming Events</span>
          </Link>
        </li>

        <li className="alumni-nav-item">
          <Link to="/alumni/dashboard/registered-events" className="alumni-nav-link">
            <FaClipboardCheck />
            <span className="nav-text show">Registered Events</span>
          </Link>
        </li>

        <li className="alumni-nav-item">
          <Link to="/alumni/dashboard/attended-events" className="alumni-nav-link">
            <FaCheckCircle />
            <span className="nav-text show">Attended Events</span>
          </Link>
        </li>

        <li className="alumni-nav-item">
          <Link to="/alumni/dashboard/past-events" className="alumni-nav-link">
            <FaHistory />
            <span className="nav-text show">Past Events</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AlumniSidebar;
