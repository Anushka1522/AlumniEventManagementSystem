import React, { useEffect, useState } from 'react';
import aboutImage from '../../assets/girl1.png';
import './css/About.css';
import Footer from "../Common/Footer";
import axios from 'axios';

const About = () => {
  const [stats, setStats] = useState({
    totalAlumni: 0,
    totalOrganizers: 0,
    totalEvents: 0,
    totalYears: 0
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/stats/overview') // Adjust backend URL
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching stats:", error));
  }, []);

  return (
    <>
    
        
      <section className="about-section">
        {/* <div>
          <h2 className="workflow-title-about">About</h2>
        </div> */}
        <div className="about-row">
          
          <div className="about-image-container fade-in-left">
            <img src={aboutImage} alt="Alumni Discussion" className="about-image" />
          </div>

          <div className="about-text-container fade-in-right">
            <h2>About Our Alumni Network</h2>
            <p>
              Our Alumni Event Management System is designed to bring former students and institutions closer.
              We believe in creating a lasting bond through meaningful events, celebrations, and professional
              networking opportunities.
            </p>
            <p>
              The system offers tools for event organization, attendance tracking, and communication, ensuring
              every alumni remains a part of our growing family.
            </p>
            <ul>
              <li>💼 Professional networking and mentorship</li>
              <li>📅 Event announcements and participation tracking</li>
              <li>🤝 Strengthening alumni-institution relationships</li>
              <li>💬 Feedback and continuous engagement</li>
            </ul>
          </div>
        </div>

        <div className="stats-grid fade-in-up">
          <div className="stat-item">
            <h3>{stats.totalEvents}+</h3>
            <p>Events Organized</p>
          </div>
          <div className="stat-item">
            <h3>{stats.totalAlumni}+</h3>
            <p>Alumni Registered</p>
          </div>
          <div className="stat-item">
            <h3>{stats.totalOrganizers}+</h3>
            <p>Active Organizers</p>
          </div>
          <div className="stat-item">
            <h3>{stats.totalYears}+</h3>
            <p>Years of Alumni Engagement</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
