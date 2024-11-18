import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo1 from '../../../assets/images/download.jpeg';
import logo2 from '../../../assets/images/download (1).jpeg'
import logo3 from '../../../assets/images/cuna.svg';
import logo4 from '../../../assets/images/nafcu.svg';
import logo5 from '../../../assets/images/co-op.svg';
import logo6 from '../../../assets/images/verified-by-visa.svg'

import '../styles/TopFooter.css'; 


const TopFooter: React.FC = () => {
    return (
        <footer className="px-3 d-flex flex-column align-items-center my-5">
       
                <Row>
                    {/* Div 2 */}
                    <Col xs={12} md={1} className="text-center mb-4 mb-md-0">
                        <div className="d-flex justify-content-center">
                            <img src={logo1} alt="Logo 1" className="footer-logo1 mx-2" />
                            <img src={logo2} alt="Logo 2" className="footer-logo1" />
                        </div>
                    </Col>

                    {/* Div 1 */}
             <Col xs={12} md={8}>
  <div className="footer-div1 d-flex flex-column flex-md-row justify-content-center text-center h-100 align-items-center mb-4">
    <a href={'/home'} className="footer-link link-grey small-font text-center mx-2">PRIVACY NOTICES</a>
    <a href={'/home'} className="footer-link link-grey small-font text-center mx-2">ACCOUNT DISCLOSURES</a>
    <a href={'/home'} className="footer-link link-grey small-font text-center mx-2">ABOUT US</a>
    <a href={'/home'} className="footer-link link-grey small-font text-center mx-2">CAREERS</a>
  </div>
</Col>


                    {/* Div 3 */}
                    <Col xs={12} md={3} className="text-center">
                        <div className="d-flex justify-content-center">
                            <img src={logo3} alt="Logo 3" className="footer-logo" />
                            <img src={logo4} alt="Logo 4" className="footer-logo" />
                            <img src={logo5} alt="Logo 5" className="footer-logo" />
                            <img src={logo6} alt="Logo 6" className="footer-logo" />
                        </div>
                    </Col>
                </Row>
                <p className='link-grey small-font mt-3'>© 2024 Greater Texas Credit Union.</p>
      
        </footer>
    );
};

export default TopFooter;
