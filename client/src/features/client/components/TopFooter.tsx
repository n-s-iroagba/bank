import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo1 from '../assets/download.jpeg';
import logo2 from '../assets/download (1).jpeg'
import logo3 from '../assets/cuna.svg';
import logo4 from '../assets/nafcu.svg';
import logo5 from '../assets/co-op.svg';
import logo6 from '../assets/verified-by-visa.svg'

import '../styles/TopFooter.css'; // Optional: If you need additional styling

const TopFooter: React.FC = () => {
    return (
        <footer className="top-footer">
            <Container>
                <Row>
                    {/* Div 2 */}
                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                        <div className="footer-div2">
                            <img src={logo1} alt="Logo 1" className="footer-logo" />
                            <img src={logo2} alt="Logo 2" className="footer-logo" />
                        </div>
                    </Col>

                    {/* Div 1 */}
                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                        <div className="footer-div1 d-flex justify-content-center flex-wrap">
                            <a href={'/home'} className="footer-link">Link 1</a>
                            <a href={'/home'} className="footer-link">Link 2</a>
                            <a href={'/home'} className="footer-link">Link 3</a>
                            <a href={'/home'} className="footer-link">Link 4</a>
                        </div>
                    </Col>

                    {/* Div 3 */}
                    <Col xs={12} md={4} className="text-center">
                        <div className="footer-div3">
                            <img src={logo3} alt="Logo 3" className="footer-logo" />
                            <img src={logo4} alt="Logo 4" className="footer-logo" />
                            <img src={logo5} alt="Logo 5" className="footer-logo" />
                            <img src={logo6} alt="Logo 6" className="footer-logo" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default TopFooter;
