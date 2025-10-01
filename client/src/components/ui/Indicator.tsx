import React from 'react';
import '../../styles/Indicator.css'; // Import styles for the indicators

interface IndicatorProps {
  itemCount: number; // Total number of items
  activeIndex: number; // The current active index
}

const Indicator: React.FC<IndicatorProps> = ({ itemCount, activeIndex }) => {
  return (
    <div className="indicator-container">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className={`indicator-dot ${activeIndex === index ? 'active' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default Indicator;

