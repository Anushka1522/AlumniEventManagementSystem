import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaEnvelope,
  FaUserEdit,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import defaultAvatar from '../../assets/prof.png';

import './css/AlumniProfile.css';

const AlumniProfile = () => {
  const [alumni, setAlumni] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const alumniId = localStorage.getItem('alumniId');

  useEffect(() => {
    if (!alumniId) {
      Swal.fire({
        icon: 'error', 
        title: 'Unauthorized',
        text: 'Please log in first',
      }).then(() => window.location.href = "/");
      return;
    }

    axios.get(`http://localhost:8080/api/alumni/profile/${alumniId}`)
      .then(res => {
        setAlumni(res.data);
        setFormData(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to load profile',
        });
      });
  }, [alumniId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:8080/api/alumni/profile/update', formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          showConfirmButton: false,
          timer: 1500
        });

        axios.get(`http://localhost:8080/api/alumni/profile/${alumniId}`)
          .then(res => {
            setAlumni(res.data);
            setFormData(res.data);
          });

        setEditing(false);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Please try again.',
        });
      });
  };

  if (!alumni) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <img src={defaultAvatar} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          {editing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <label>Name</label>
              <input
                type="text"
                name="alumni_name"
                value={formData.alumni_name}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="alumni_email"
                value={formData.alumni_email}
                onChange={handleChange}
                required
              />

              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn save"><FaSave /> Save</button>
                <button type="button" className="btn cancel" onClick={() => setEditing(false)}><FaTimes /> Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h2>{alumni.alumni_name}</h2>
              <p><strong> Alumni ID:</strong> {alumni.alumni_id}</p> {/* 👈 Added Alumni ID */}
              <p><strong><FaEnvelope /> Email: </strong>{alumni.alumni_email}</p>
              <p><strong>Branch:</strong> {alumni.branch_name}</p>
              <button className="btn edit" onClick={() => setEditing(true)}><FaUserEdit /> Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
