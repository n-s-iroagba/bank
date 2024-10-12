import serviceImage1 from '../assets/Auto Loan.png'
import serviceImage2 from '../assets/Home Equity.png'
import serviceImage3 from '../assets/80 x 80 - Graph Up.png'
import '../styles/Services.css'

import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

interface Service {
  src: string;
  alt: string;
  percentage: number;
  percentageText: string;
  text:string

}


const services: Service[] = [
    {
        src: serviceImage1,
        alt: 'Auto Loan',
        text:'as low as',
        percentage: 95,
           percentageText:'APR'
  },
  {
    src: serviceImage2,
    alt: 'Auto Loan',
    text:'as low as',
    percentage: 95,
       percentageText:'APR'
},
 {
    src: serviceImage3,
    alt: 'Auto Loan',
    text:'as high as',
    percentage: 95,
    percentageText:'APY'
}
]
const Services: React.FC = () => {
  return (
    <div className='services'>
      <Row>
        {services.map((service, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4 text-center">
            <Image src={service.src} alt={service.alt} fluid />
            <p>{service.text}</p>
            <p className="mt-2 bg-danger mb-1 red-text service-font">
              <strong>{service.percentage}% {service.percentageText}</strong>
              {'*'}
            </p>
            <a className='' href={'/home'}>
              Learn More
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;
