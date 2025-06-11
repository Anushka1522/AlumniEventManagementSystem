import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Enquiries.css';

const Enquiries = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/contact/AllMessages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiries-container">
      <h2>Contact Enquiries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg.id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Enquiries;
