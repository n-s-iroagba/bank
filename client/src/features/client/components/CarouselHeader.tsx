import React from 'react';
import { Carousel,  Button } from 'react-bootstrap';
import LoginForm from './LoginForm'; // Import the LoginForm component
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from '../assets/Generic-Hero-Asset GT 1.png';
import logo2 from '../assets/IDSHeild (1).png';
import '../styles/CarouselHeader.css';
import '../styles/GeneralButtonStyles.css'
import '../styles/GeneralStyles.css'

const CarouselHeader: React.FC = () => {
  return (
    <div style={{marginTop:'0%'}}  className="position-relative pt-0 cas">
      
      <Carousel style={{marginTop:'0%'}} className="home-carousel cas">
      <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo2}
            alt="Slide 2"
          />
        <Carousel.Caption className="caption-overlay">
            <h3>Your Security is our top priority</h3>
            <h6 className='text-start'>Protect yourself from ID theft for as little as $5 per month</h6>
            <div className='d-flex justify-content-start'>
            <Button  className="button-radius bg-red button-width py-2">Learn More</Button>
            </div>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo1}
            alt="Slide 1"
          />
        
          <Carousel.Caption className="caption-overlay">
            <h3>Greater Good</h3>
            <h6 className='text-start'>Be part of a credit union that gives back to your community</h6>
            <div className='d-flex justify-content-start'>
            <Button  className="button-radius bg-red button-width py-2">Learn More</Button>
            </div>
           
          </Carousel.Caption>
        </Carousel.Item>
        
       

      </Carousel>

      {/* Login Form */}
      <div className="mb-0 position-absolute w-33 top-0 z-1 start-0 p-3 d-none d-lg-block">
        <div className='py-3 px-3 bg-red text-light'>
          <h5>Your Feedback Matters</h5>
          <p className='small-font '>Questions? Comments?</p>
          <p className='small-font '>Complaints? We're here to help. </p>
          <p className='small-font pt-3'><span className='underline'>Feedback</span> | <span className='underline'>Complaints</span></p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default CarouselHeader;
