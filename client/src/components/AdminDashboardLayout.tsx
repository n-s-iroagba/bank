
import React, { useState } from "react";
import { Link, useLocation,  } from "react-router-dom";
import { 


  faUsers, 
 
  faBars, 
  faTimes, 
  faUserAlt,
  faBank
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Offcanvas, Nav, NavItem } from "react-bootstrap";

interface NavItem {
  icon: any; // FontAwesomeIcon type
  label: string;
  path: string;
}


const AdminDashboardLayout :React.FC<{navItems:NavItem[],children:React.ReactNode}> =({
  children,
  navItems
})=> {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  // const { id } = useParams<{ id: string }>();
  
  
  return (
    <div className="">
      {/* Mobile menu button */}
     

      {/* Sidebar */}
      <Offcanvas
        show={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Actions</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for larger screens */}
      <Row >
        <Col
          lg={4}
          className="d-none d-lg-block bg-light vh-100 border-end"
        >
          <div className="p-4">
            <h4>Admin Dashboard</h4>
          </div>
          <Nav className="flex-column ">
            {navItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.path}
                className={location.pathname === item.path ? "d-flex active -100  " : "d-flex w-100  "}
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                <p className="w-100 ">{item.label}</p>
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* Main content */}
        <Col lg={8} className="p-4">
        <div className="d-flex d-lg-none mb-2">
        <Button
        variant="light"
        className="d-lg-none me-2  "
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
      </Button>
        <h4 className="d-lg-none w-100 text-center">Admin Dashoboard</h4>
        </div>
          {children}
        </Col>
      </Row>
    </div>
  );
}
export default  AdminDashboardLayout