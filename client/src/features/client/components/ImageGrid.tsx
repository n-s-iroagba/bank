// src/components/ImageGrid.tsx
import React from 'react';
import '../styles/ImageGrid.css'; // Import the CSS file
import image1 from '../assets/small_manApronBusiness.jpg'
import image2 from '../assets/small_officeMeeting.jpg'
import image3 from '../assets/female hand holding piggy bank.png'
import image4 from '../assets/Rewards Card.png'


import image5 from '../assets/dad and son on computer.png'


import { Col, Row } from 'react-bootstrap';

const ImageGrid: React.FC = () => {
  const images = [
    { src: image1, text: 'BUSINESS CHECKING' },
    { src: image2, text: 'BUSINESS LOANS' },
    { src: image3, text: 'SHARE CERTIFICATES' },
    { src: image4, text: 'CREDIT CARDS' },
    { src: image5, text: 'CHECK OUR RATES' },
  ];

  
  return (
    <Row className="image-grid px-4">
      {images.map((image, index) => (
        <Col xs={12} md={4} lg={3} key={index} className="image-item">
          <img src={image.src} alt={image.text} className="image" />
          <div className="overlay">{image.text}</div>
        </Col>
      ))}
    </Row>
  );
};

export default ImageGrid;
