// src/components/ImageGrid.tsx
import React, { useRef, useState } from 'react';
import '../styles/ImageGrid.css'; // Import the CSS file
import image1 from '../assets/small_manApronBusiness.jpg'
import image2 from '../assets/small_officeMeeting.jpg'
import image3 from '../assets/female hand holding piggy bank.png'
import image4 from '../assets/Rewards Card.png'


import image5 from '../assets/dad and son on computer.png'


import { Col, Row } from 'react-bootstrap';
import Indicator from './Indicator';

const ImageGrid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active help item
  const imageGridRef = useRef<HTMLDivElement | null>(null);




  const images = [
    { src: image1, text: 'BUSINESS CHECKING' },
    { src: image2, text: 'BUSINESS LOANS' },
    { src: image3, text: 'SHARE CERTIFICATES' },
    { src: image4, text: 'CREDIT CARDS' },
    { src: image5, text: 'CHECK OUR RATES' },
  ];


  const handleScroll = () => {
    if (imageGridRef.current) {
      const scrollLeft = imageGridRef.current.scrollLeft;
      const itemWidth = imageGridRef.current.scrollWidth / images.length;
      const currentIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(currentIndex);
    }
  };

  
  return (
    <>
    <Row onScroll={handleScroll} ref={imageGridRef} className="image-grid px-4 mb-4">
      {images.map((image, index) => (
        <Col xs={12} md={4} lg={3} key={index} className="image-item">
          <img src={image.src} alt={image.text} className="image" />
          <div className="overlay">{image.text}</div>
        </Col>
      ))}
    </Row>
      <Indicator  itemCount={images.length} activeIndex={activeIndex} />
      </>
  );
};

export default ImageGrid;
