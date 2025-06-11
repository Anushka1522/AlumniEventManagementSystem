import React from 'react';
import img1 from '../../assets/imgs1.jpg';
import img2 from '../../assets/img2.avif';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.webp';
import img6 from '../../assets/img6.webp';

const images = [img1, img2, img3, img4, img5, img6];

const AlumniImageSlider = () => {
  const doubledImages = [...images, ...images]; // Doubled for smooth infinite loop

  return (
    <div className="image-slider-section">
      <h2 className="workflow-title">Gallary</h2>
      <style>
        {`
          .image-slider-section {
            background-color: #f5f5f5;
            padding: 40px 0;
            overflow: hidden;
          }

          .slider-container {
            display: flex;
            flex-direction: column;
            gap: 30px; /* Spacing between rows */
          }

          .slider-row {
            display: flex;
            width: max-content;
            animation: scroll-left 60s linear infinite;
            gap: 20px;
          }

          .slider-row.reverse {
            animation: scroll-right 60s linear infinite;
          }

          .slider-image {
            width: 200px;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div className="slider-container">
        {/* First Row - Scroll Left */}
        <div className="slider-row">
          {doubledImages.map((img, index) => (
            <img key={`row1-${index}`} src={img} alt={`alumni-${index}`} className="slider-image" />
          ))}
        </div>

        {/* Second Row - Scroll Right */}
        <div className="slider-row reverse">
          {doubledImages.map((img, index) => (
            <img key={`row2-${index}`} src={img} alt={`alumni-${index}`} className="slider-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniImageSlider;
