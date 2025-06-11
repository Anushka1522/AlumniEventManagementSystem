// src/components/OrganizerLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/OrganizerLogin.css';
import logo from '../../assets/alumni.png'

const OrganizerLogin = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios
      .post('http://localhost:8080/api/organizer/login', { email, password })
      .then((response) => {
        const organizer = response.data;
        if (organizer?.organizer_id) {
          localStorage.setItem('organizer', JSON.stringify(organizer));
          setLoginSuccess(true);

          setTimeout(() => {
            setShowModal(false);
            onClose();
            onLoginSuccess();
            navigate('/organizer/dashboard');
          }, 1500);
        } else {
          setError('Login failed: Invalid response');
          setLoginSuccess(false);
        }
      })
      .catch(() => {
        setError('Invalid email or password');
        setLoginSuccess(false);
      });
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-box">
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>

            {/* ---------- NEW SECTION (logo + headings) ---------- */}
            <div className="logo-wrapper">
              {/* Put your own logo file in /public or /assets and update the src path */}
              <span><img src={logo} alt="Alumni Logo" className="login-logo" /></span>
            </div>
            <h2 className="welcome-head">Welcome Back</h2>
            <p className="welcome-sub">sign in to your account here</p>
            {/* --------------------------------------------------- */}

            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail *"
                className="modal-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password *"
                className="modal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* {error && <div className="error-message">{error}</div>}
              {loginSuccess && (
                <div className="success-message">Login Successful!</div>
              )} */}

              <button type="submit" className="modal-submit">
                Login
              </button>
            </form>
            <div className="extra-links">
              <a href="#" className="link-small">
                Forgot password?
              </a>
              <span className="divider">|</span>
              <a href="#" className="link-small">
                Not a member? <strong>Join today</strong>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizerLogin;
