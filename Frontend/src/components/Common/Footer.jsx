// import React from 'react';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBookOpen, FaGraduationCap, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
// import '../Common/css/Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container top-section">
//         <div className="footer-about">
//           <h2><FaBookOpen className="footer-icon" /> About Alumnius</h2>
//           <p>
//             Every country has become a destination for international students seeking a world-class
//             education experience – and has alumni from every corner of the globe.
//           </p>
//         </div>

//         <div className="footer-contact">
//           <h2><FaGraduationCap className="footer-icon" /> Alumnius</h2>
//           <p><FaPhone className="icon" /> +8801723456</p>
//           <p><FaEnvelope className="icon" /> info@Alummius.com</p>
//           <p><FaMapMarkerAlt className="icon" /> Alummius Association</p>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>© Copyright 2025 Alummius Association | All rights reserved</p>
//         {/* <div className="social-icons">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//         </div> */}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
} from 'react-icons/fa';
import axios from 'axios';
import '../Common/css/Footer.css';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/contact/receiveMessage', formData);
      if (response.status === 200) {
        setStatusMessage('Your feedback has been sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // reset form
      }
    } catch (error) {
      setStatusMessage('Failed to send message. Please try again later.');
      console.error(error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container top-section">

        {/* Contact Info */}
        <div className="footer-contact">
          <h2><FaGraduationCap className="footer-icon" /> Get in Touch</h2>
          <p><FaPhone className="icon" /> +8801723456</p>
          <p><FaEnvelope className="icon" /> info@alumnius.com</p>
          <p><FaMapMarkerAlt className="icon" /> Alumnius Association, Campus Road</p>
        </div>

        {/* Contact Us Form */}
        <div className="footer-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              rows="3"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit">Send Message</button>
          </form>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
      </div>

      <p className="footer-bottom">© 2025 Alumnius Association | All rights reserved</p>
    </footer>
  );
};

export default Footer;
