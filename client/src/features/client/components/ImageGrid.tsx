// src/components/ImageGrid.tsx
import React from 'react';
import '../styles/ImageGrid.css'; // Import the CSS file
import image1 from '../assets/Rewards Card.png'
import { Col, Row } from 'react-bootstrap';

const ImageGrid: React.FC = () => {
  const images = [
    { src: image1, text: 'Image 1' },
    { src: image1, text: 'Image 1' },
    { src: image1, text: 'Image 1' },
    { src: image1, text: 'Image 1' },
    { src: image1, text: 'Image 1' },
  ];

  
  return (
    <Row className="image-grid">
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
