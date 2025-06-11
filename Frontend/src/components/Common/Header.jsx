import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../Common/css/Header.css';
// import logoImage from '../../assets/ALOGO.png';
import logoImage from '../../assets/alumni.png'
import OrganizerLogin from '../organizer/OrganizerLogin';
import AlumniLogin from '../Alumni/AlumniLogin';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [showAlumniModal, setShowAlumniModal] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [isAlumniLoggedIn, setIsAlumniLoggedIn] = useState(false);
  const [isOrganizerLoggedIn, setIsOrganizerLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect login from localStorage on route change
  useEffect(() =>
  { 
    const alumni = JSON.parse(localStorage.getItem('alumni'));
    const organizer = JSON.parse(localStorage.getItem('organizer'));
    setIsAlumniLoggedIn(!!alumni);
    setIsOrganizerLoggedIn(!!organizer);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setShowDropdown(false);
    if (option === 'Admin') setShowOrganizerModal(true);
    if (option === 'User') setShowAlumniModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('organizer');
    localStorage.removeItem('alumni');
    setIsAlumniLoggedIn(false);
    setIsOrganizerLoggedIn(false);
    navigate('/');
  };

  const handleAlumniLoginSuccess = () => {
    setShowAlumniModal(false);
    setIsAlumniLoggedIn(true);
    localStorage.setItem('alumni', JSON.stringify({ loggedIn: true }));
    setLoginSuccessMessage('Alumni Login Successful!');
    setTimeout(() => setLoginSuccessMessage(''), 3000);
    navigate('/alumni/dashboard');
  };

  const handleOrganizerLoginSuccess = () => {
    setShowOrganizerModal(false);
    setIsOrganizerLoggedIn(true);
    localStorage.setItem('organizer', JSON.stringify({ loggedIn: true }));
    setLoginSuccessMessage('Organizer Login Successful!');
    setTimeout(() => setLoginSuccessMessage(''), 3000);
    navigate('/organizer');
  };

  return (
    <div className="header">
      {loginSuccessMessage && (
        <div className="login-success-banner">{loginSuccessMessage}</div>
      )}

      <img src={logoImage} alt="Logo" className="logo" />

      <nav className="navbar">
        <ul>
          <li><ScrollLink to="hero" smooth={true} duration={500}>Home</ScrollLink></li>
          <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
          <li><ScrollLink to="gallery" smooth={true} duration={500}>Gallery</ScrollLink></li>
          <li><ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink></li>
          {/* <li><Link to="/">HOME</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/About">Gallary</Link></li>
          <li><Link to="/About">Contact</Link></li> */}
          {/* <li><Link to="/">Profile</Link><li/> */}

          {(!isAlumniLoggedIn && !isOrganizerLoggedIn) ? (
            <li className="login-dropdown" ref={dropdownRef}>
              <button className="login-link" onClick={handleLoginClick}>
                Login ▼
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={() => handleOptionClick('Admin')}>Admin Login</button>
                  <button onClick={() => handleOptionClick('User')}>User Login</button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li className="logout-button">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {showOrganizerModal && (
        <OrganizerLogin
          onClose={() => setShowOrganizerModal(false)}
          onLoginSuccess={handleOrganizerLoginSuccess}
        />
      )}

      {showAlumniModal && (
        <AlumniLogin
          onClose={() => setShowAlumniModal(false)}
          onLoginSuccess={handleAlumniLoginSuccess}
        />
      )}
    </div>
  );
};

export default Header;
