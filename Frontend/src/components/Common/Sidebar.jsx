import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaTachometerAlt,
  FaBuilding,
  FaCheckSquare
} from 'react-icons/fa';
import './css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">Organizer Panel</h2>
        <hr />
        <nav className="sidebar-nav">
          <NavLink to="/organizer/profile" className="nav-link" data-tooltip="Profile">
            <FaUser className="icon" />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/organizer/dashboard" className="nav-link" data-tooltip="Dashboard">
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/organizer/alumni" className="nav-link" data-tooltip="Manage Alumni">
            <FaUsers className="icon" />
            <span>Manage Alumni</span>
          </NavLink>

          <NavLink to="/organizer/events" className="nav-link" data-tooltip="Manage Events">
            <FaCalendarAlt className="icon" />
            <span>Manage Events</span>
          </NavLink>

          <NavLink to="/organizer/branch" className="nav-link" data-tooltip="Manage Branches">
            <FaBuilding className="icon" />
            <span>Manage Branches</span>
          </NavLink>

          <NavLink to="/organizer/attendance" className="nav-link" data-tooltip="View Attendance">
            <FaCheckSquare className="icon" />
            <span>View Attendance</span>
          </NavLink>

          <NavLink to="/organizer/enquries" className="nav-link" data-tooltip="Manage Alumni">
            <FaUsers className="icon" />
            <span>Enquries</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
