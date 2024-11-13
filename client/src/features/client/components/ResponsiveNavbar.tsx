import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GeneralButtonStyles.css'
import '../styles/GeneralStyles.css'
import '../styles/ResponsiveNavbar.css'
import '../../common/styles/Logo.css'

import aggLogo from '../assets/agg-icon-circle.svg'
import { useNavigate } from 'react-router-dom';
import Logo from '../../common/components/Logo';
const ResponsiveNavbar: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const navigate = useNavigate()

  const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768); 
  };

  useEffect(() => {
      
      window.addEventListener('resize', handleResize);

      return () => {
         
          window.removeEventListener('resize', handleResize);
      };
  }, []);
  return (
    <div className={`${!isLargeScreen?'':'sticky-top'}`}>
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
      <div className="d-lg-none mb-4 d-flex">
      <Button className='button-radius bg-blue sm-button-width me-2'  href="login">
          Join
        </Button>
        <Button onClick={()=>navigate('/login')} className='button-radius bg-red sm-button-width me-2'  href="login">
          Login
        </Button>
        <img className="agg-logo" src={aggLogo} alt="Scrolled Logo" />
      </div>
    </Navbar>
    </div>
  );
};

export default ResponsiveNavbar;
