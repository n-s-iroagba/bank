import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  faBank,
  faUsers,
  faUserCheck,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button, Offcanvas, Nav } from "react-bootstrap";
import "../../styles/AdminSidebar.css";

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: faBank, label: "Banks", path: "/admin/banks" },
  { icon: faUsers, label: "Second Parties", path: "/admin/second-parties" },
  { icon: faUserCheck, label: "Account Holders", path: "/admin/account-holders" },

];

const AdminSidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const renderNavLinks = (onClick?: () => void) =>
    navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <Nav.Link
          as={Link}
          to={item.path}
          key={item.path}
          onClick={onClick}
          className={`nav-item-custom ${isActive ? "active" : ""}`}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={`nav-icon ${isActive ? "text-white" : "text-danger"}`}
          />
          {item.label}
        </Nav.Link>
      );
    });

  return (
    <div className="admin-sidebar">
      {/* Mobile Offcanvas */}
      <Offcanvas
        show={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        className="offcanvas-custom d-lg-none"
      >
        <Offcanvas.Header className="offcanvas-header-custom">
          <Offcanvas.Title className="offcanvas-title-custom">
            Admin Menu
          </Offcanvas.Title>
          <Button
            variant="link"
            onClick={() => setSidebarOpen(false)}
            className="btn-close-custom p-0"
          >
            <FontAwesomeIcon icon={faTimes} className="text-white" />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3">
          <Nav className="flex-column">{renderNavLinks(() => setSidebarOpen(false))}</Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Desktop Sidebar + Content */}
      <Row className="g-0">
        {/* Sidebar */}
        <Col lg={3} className="d-none d-lg-block sidebar-container vh-100 sticky-top">
          <div className="sidebar-header">
            <h5 className="sidebar-title">Admin Menu</h5>
          </div>
          <div className="p-3 sidebar-transition">
            <Nav className="flex-column">{renderNavLinks()}</Nav>
          </div>
        </Col>

        {/* Main Content */}
        <Col lg={9} className="main-content">
          {/* Mobile top bar */}
          <div className="mobile-top-bar d-flex d-lg-none align-items-center">
            <Button
              variant="outline"
              className="toggle-btn me-3"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
            </Button>
            <h5 className="mobile-title">Admin Dashboard</h5>
          </div>

          {/* Nested child routes will render here */}
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminSidebar;