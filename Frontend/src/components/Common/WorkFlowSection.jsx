import React from 'react';
import '../Common/css/WorkFlowSection.css'
import Login from "../../assets/reg3.jpg"; 
import Plan from "../../assets/plan.jpg"; 
import Connect from "../../assets/attend.jpg"; 
import Memories from '../../assets/feedback.jpg'

const WorkFlowSection = () => {
  return (  
    <section className="workflow-section">
      <div className="workflow-container">
        <h2 className="workflow-title">How It Works</h2>

        <div className="workflow-steps">
          <div className="step">
            <div className="step-number"><img src={Login} alt="reg3" /></div>
            <h3>Login</h3>
            <p>Alumni and organizers login to the system securely.</p>
          </div>
          <div className="step">
            <div className="step-number"><img src={Plan} alt="plan.jpg" /></div>
            <h3>Manage Events</h3>
            <p>Organizers create, update, and manage alumni events with ease.</p>
          </div>
          <div className="step">
            <div className="step-number"><img src={Connect} alt="attend.jpg" /></div>
            <h3>Attend & Connect</h3>
            <p>Alumni can RSVP, attend events, and connect with others.</p>
          </div>
          <div className="step">
            <div className="step-number"><img src={Memories} alt="feedback.jpg" /></div>
            <h3>Memories</h3>
            <p>Participants can  view event highlights.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkFlowSection;
