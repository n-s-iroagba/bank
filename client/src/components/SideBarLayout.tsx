
import React, { useState } from "react";
import { Link, useLocation,  } from "react-router-dom";
import { 
  faBank,
  faBars, 
  faTimes, 
  faUsersRectangle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Row, Col, Button, Offcanvas, Nav,  } from "react-bootstrap";

interface NavItem {
  icon: any; // FontAwesomeIcon type
  label: string;
  path: string;
}


const SideBarLayout :React.FC<{navItems:NavItem[],children:React.ReactNode,superAdminId:number|null}> =({
  children,
  navItems,
  superAdminId
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
            {
              superAdminId && 
               <Nav.Link
                as={Link}
                to={`/super-admin/admins/${superAdminId}`}
               >
                <FontAwesomeIcon icon ={faUsersRectangle} className="me-2" />
                  My Admins
               </Nav.Link>   
            }
               
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
          {
              superAdminId && (
                <>
               <Nav.Link
                as={Link}
                to={`/super-admin/admins/${superAdminId}`}
               >
                <FontAwesomeIcon icon ={faUsersRectangle} className="me-2" />
                  My Admins
               </Nav.Link>
                <Nav.Link
                 as={Link}
                 to={'/super-admin/banks'}
                >
                <FontAwesomeIcon icon ={faBank} className="me-2" />
                  Banks
               </Nav.Link>
               </>
               
              )
            }
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
export default  SideBarLayout