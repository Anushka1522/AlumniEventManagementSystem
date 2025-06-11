// File: src/pages/Organizer.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar';
import OrganizerProfile from '../components/organizer/OrganizerProfile';
import ManageAlumni from '../components/organizer/ManageAlumni';
import ManageEvents from '../components/organizer/ManageEvents';
import ManageBranch from '../components/organizer/ManageBranch';
import AttendanceTracker from '../components/organizer/AttendanceTracker';
import './css/Organizer.css';
import OrganizerDashboard from '../components/organizer/OrganizerDashboard';
import Enquiries from '../components/organizer/Enquiries'

const Organizer = () => {
  return (
      <div className='organizer'>
          <div className="organizer-body sidebar">
            <Sidebar/> 
          </div>
          <div className="main-content"> 
              <Routes>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="profile" element={<OrganizerProfile />} />
                <Route path="alumni" element={<ManageAlumni />} />
                <Route path="events" element={<ManageEvents />} />
                <Route path="dashboard" element={<OrganizerDashboard/>}/>
                <Route path="branch" element={<ManageBranch/>}/>
                <Route path="attendance" element={<AttendanceTracker/>}/>
                <Route path="enquries" element={<Enquiries/>}/>
              </Routes>      
          </div>
      </div>
  );
};

export default Organizer;