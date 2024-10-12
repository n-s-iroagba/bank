import React from 'react';
import '../styles/NewsContainer.css'; // Import the CSS file
import { Col, Row } from 'react-bootstrap';

const NewsContainer: React.FC = () => {
  const newsItems = [
    { title: 'Company A launches new product', image: 'https://via.placeholder.com/150' },
    { title: 'Company B wins prestigious award',  image: 'https://via.placeholder.com/150' },
    { title: 'Company C expands to new markets', image: 'https://via.placeholder.com/150' },
    { title: 'Company D reports record profits', image: 'https://via.placeholder.com/150' },
    { title: 'Company E partners with startup', image: 'https://via.placeholder.com/150' },
    { title: 'Company F initiates sustainability program', image: 'https://via.placeholder.com/150' },
    // Add more items as needed
  ];

  // Helper function to calculate the dynamic date based on index
  const getDynamicDate = (index: number) => {
    const today = new Date();
    today.setDate(today.getDate() - (index + 1) * 7); // Subtract (index + 1) weeks
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <Row className="news-container">
      {newsItems.map((news, index) => (
        <Col xs={12} md={6} lg={4} key={index} className="news-item">
          <img src={news.image} alt={news.title} className="news-image" />
          <p className="news-date">{getDynamicDate(index)}</p> 
          <h3 className="news-title">{news.title}</h3>
        </Col>
      ))}
    </Row>
  );
};

export default NewsContainer;

