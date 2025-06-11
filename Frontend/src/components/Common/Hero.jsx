import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import '../Common/css/Hero.css';
import studyVideo from '../../assets/clg.mp4';

const Hero = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate(); // ✅ create navigate instance

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="hero-container">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={studyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <h1 id="headline">Welcome to the Alumni Event</h1>
        <p id="para">Reconnect. Celebrate. Inspire.</p>
       
      </div>
    </div>
  );
};

export default Hero;
