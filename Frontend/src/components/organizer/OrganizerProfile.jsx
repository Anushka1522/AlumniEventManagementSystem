import React, { useEffect, useState } from 'react';
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
import './css/OrganizerProfile.css';
import defaultAvatar from '../../../src/assets/prof.png';

const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState(null);
  const [branchName, setBranchName] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const organizerId = localStorage.getItem('organizer_id');

  useEffect(() => {
    if (!organizerId) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Please log in first',
      }).then(() => window.location.href = "/");
      return;
    }

    axios.get(`http://localhost:8080/api/organizer/branchName/${organizerId}`)
      .then(res => {
        setOrganizer(res.data);
        setFormData(res.data);
        setBranchName(res.data.branch_name);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to load profile',
        });
      });
  }, [organizerId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:8080/api/organizer/update', formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          showConfirmButton: false,
          timer: 1500
        });

        axios.get(`http://localhost:8080/api/organizer/branchName/${organizerId}`)
          .then(res => {
            setOrganizer(res.data);
            setFormData(res.data);
            setBranchName(res.data.branch_name);
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

  if (!organizer) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <img src={defaultAvatar} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          {editing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <label>Name</label>
              <input className='organizer_name'
                type="text"
                name="organizer_name"
                value={formData.organizer_name}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="organizer_email"
                value={formData.organizer_email}
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
             {/* <FaEnvelope /> */}
              <h2>{organizer.organizer_name}</h2>
              <p><strong>Mail: </strong>{organizer.organizer_email}</p>
              <p><strong>Branch:</strong> {branchName}</p>
              <button className="btn edit" onClick={() => setEditing(true)}><FaUserEdit /> Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
