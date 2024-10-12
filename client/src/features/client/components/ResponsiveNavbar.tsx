import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GeneralButtonStyles.css'
import '../styles/GeneralStyles.css'
import '../styles/ResponsiveNavbar.css'
import Logo from './Logo';
const ResponsiveNavbar: React.FC = () => {
  return (
    <>
    <Logo/>
    <Navbar className='d-flex justify-content-center' expand="lg" >


      {/* Navigation links, centered in collapse */}
      <div className='nav-bar d-flex justify-content-center'>
      <Navbar.Collapse id="basic-navbar-" className="justify-content-center">
        <Nav className="text-center">
          <Nav.Link className='nav-border' href="#home">Home</Nav.Link>
          <Nav.Link className='nav-border' href="#link">Account</Nav.Link>
          <Nav.Link className='nav-border' href="#about">Loans</Nav.Link>
          <Nav.Link className='nav-border' href="#contact">Rates</Nav.Link>
          <Nav.Link className='nav-border' href="#home">Services</Nav.Link>
        
          <Nav.Link className='nav-border' href="#about">About</Nav.Link>
          <Nav.Link className='nav-border' href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </div>

      {/* Login Button visible on small and medium screens */}
      <div className="d-lg-none ">
        <Button className='button-radius bg-red button-width'  href="login">
          Login
        </Button>
      </div>
    </Navbar>
    </>
  );
};

export default ResponsiveNavbar;
