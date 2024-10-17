import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  toggleDrawer: () => void;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer, userName }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="me-3"
            onClick={toggleDrawer}
            style={{ cursor: 'pointer' }}
          />
          <Navbar.Brand>{userName}</Navbar.Brand>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
