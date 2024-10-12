import helpImage1 from '../assets/Auto Loan.png'
import helpImage2 from '../assets/Home Equity.png'
import helpImage3 from '../assets/80 x 80 - Graph Up.png'

import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

interface help {
  src: string;
  alt: string;
  text:string

}


const helps: help[] = [
    {
        src: helpImage1,
        alt: 'Auto Loan',
        text:'as low as',
  },
  {
    src: helpImage2,
    alt: 'Auto Loan',
    text:'as low as',
},
 {
    src: helpImage3,
    alt: 'Auto Loan',
    text:'as high as',
}
]
const Help: React.FC = () => {
  return (
    <div className='helps'>
      <Row>
        {helps.map((help, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4 text-center">
            <Image src={help.src} alt={help.alt} fluid />
            <a className='' href={'/home'}>{help.text}</a>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Help;
