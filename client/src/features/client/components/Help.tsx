import React, { useState, useRef } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import '../styles/Help.css';
import Indicator from './Indicator'; // Import the Indicator component
import helpImage1 from '../assets/Open Account.png';
import helpImage2 from '../assets/80 x 80 - Check Form.png';
import helpImage3 from '../assets/Loan Payment.png';
import helpImage4 from '../assets/Mobile App.png';

interface help {
  src: string;
  alt: string;
  text: string;
}

const helps: help[] = [
  {
    src: helpImage1,
    alt: 'Auto Loan',
    text: 'OPEN ACCOUNT',
  },
  {
    src: helpImage2,
    alt: 'Home Equity',
    text: 'CHECK STATUS',
  },
  {
    src: helpImage3,
    alt: 'Graph Up',
    text: 'MAKE A LOAN PAYMENT',
  },
  {
    src: helpImage4,
    alt: 'Graph Up',
    text: 'DOWNLOAD OUR APP',
  },
];

const Help: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active help item
  const helpRef = useRef<HTMLDivElement | null>(null);




  

  const handleScroll = () => {
    if (helpRef.current) {
      const scrollLeft = helpRef.current.scrollLeft;
      const itemWidth = helpRef.current.scrollWidth / helps.length;
      const currentIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(currentIndex);
    }
  };

  return (
    <div className='mb-4'>
      <h5 className="text-center px-3">
        Here to help you with every part of your financial life.
      </h5>
      <Row className="help" ref={helpRef} onScroll={handleScroll}>
        {helps.map((help, index) => (
          <Col
            key={index}
            xs={12}
            md={6}
            lg={4}
            className="mb-4 d-flex flex-column align-items-center help-item"
          >
            <Image className='mb-3' src={help.src} alt={help.alt} fluid />
            <a href="/home">{help.text}</a>
          </Col>
        ))}
      </Row>
      {/* Use the reusable Indicator component */}
      <Indicator itemCount={helps.length} activeIndex={activeIndex} />
    </div>
  );
};

export default Help
