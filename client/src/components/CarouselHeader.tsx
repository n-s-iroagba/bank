import React from 'react';
import { Carousel,  Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from '../assets/images/Generic-Hero-Asset GT 1.png';
import logo2 from '../assets/images/IDSHeild (1).png';
import '../styles/CarouselHeader.css';
import '../styles/GeneralButtonStyles.css'
import '../styles/GeneralStyles.css'
import Login from '../pages/client/Login';



const CarouselHeader: React.FC = () => {
  return (
    <header  className="position-relative">
      
      <Carousel className="home-carousel" indicators={false} controls={false}>
      <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo2}
            alt="Slide 2"
          />
        <Carousel.Caption className="caption-overlay mx-2">
            <h3>Your Security is our top priority</h3>
            <h6 className='text-start'>Protect yourself from ID theft for as little as $5 per month</h6>
            <div className='d-flex justify-content-start'>
            <Button  className="button-radius bg-blue button-width py-2 small-font">GET ID SHIELD</Button>
            </div>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo1}
            alt="Slide 1"
          />
          <Carousel.Caption className="caption-overlay mx-2">
            <h3>Greater Good</h3>
            <h6 className='text-start'>Be part of a credit union that gives back to your community</h6>
            <div className='d-flex justify-content-start'>
            <Button  className="button-radius bg-red button-width py-2 small-font">GREATER GOOD</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="mb-0 position-absolute top-0 z-1 start-0 d-none d-lg-block">
     <Login/>
    </div>
    </header>
  );
};

export default CarouselHeader;
