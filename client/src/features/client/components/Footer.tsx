import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/Footer.css'; // Custom CSS for the footer

const Footer: React.FC = () => {
  return (
    <footer className="footer px-5 ">

        <Row className="text-center text-md-left">
          {/* Column 1 */}
          <Col xs={12} md={2} className="footer-item d-flex justify-content-center">
            <p className=" small-font text-light">P: (800) 749-9732</p>
          </Col>
          {/* Column 2 */}
          <Col xs={12} md={2} className="footer-item d-flex justify-content-center">
            <p className=" small-font text-light">Routing Number: 314977337</p>
          </Col>
          {/* C */}
          <Col xs={12} md={2} className="footer-item d-flex justify-content-center">
            <p className=" small-font text-light">HOURS & INFO</p>
          </Col>
          {/* Column 4 */}
          <Col xs={12} md={2} className="footer-item d-flex justify-content-center">
            <p className=" small-font text-light">COMPLAINTS</p>
          </Col>
          {/* Column 5 */}
          <Col xs={12} md={2} className="footer-item d-flex justify-content-center">
            <p className=" small-font text-light">FORMS</p>
          </Col>
        </Row>

    </footer>
  );
};

export default Footer;
