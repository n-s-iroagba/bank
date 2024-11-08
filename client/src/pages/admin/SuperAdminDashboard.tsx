import React, { useState } from 'react';
import { Accordion, Button, Container, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EditAdminModal from '../../features/admin/components/EditAdminModal';
import CreateAdminModal from '../../features/admin/components/CreateAdminModal';
import { BaseAdmin, CreateAdmin } from '../../types/Admin';
import BankDashboard from '../../features/admin/components/BankDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const admins: BaseAdmin[] = [
  {
    id: 1,
    
    email: 'Doe',
    username: '',
    password: ''
  },
  {
    id: 2,

  email: 'Smith',
    username: '',
    password: ''
  }
];

const SuperAdminDashboard: React.FC = () => {
  const [showEditAdminModal, setShowEditAdminModal] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<BaseAdmin | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);  // State to control the drawer visibility
  const [selectedSection, setSelectedSection] = useState<'admin' | 'bank'>('admin'); // State for toggling sections

  const handleShowEditAdmin = (admin: BaseAdmin) => {
    setSelectedAdmin(admin);
    setShowEditAdminModal(true);
  };

  const handleShowCreateAdmin = () => {
    // Handle creating admin heres
  };

  const handleShowDeleteAdmin = () => {
    // Handle deleting admin here
  };

  const handleToggleDrawer = () => setShowDrawer(!showDrawer);  // Toggles drawer visibility
  const handleSelectSection = (section: 'admin' | 'bank') => {
    setSelectedSection(section);
    setShowDrawer(false);  // Close the drawer after selecting a section
  };

  return (
    <div>
    

      {/* Hamburger Icon for Drawer */}
      <Button className="mb-3" onClick={handleToggleDrawer}>
        <FontAwesomeIcon icon={faBars} />
      </Button>

      {/* Offcanvas Drawer */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="link" onClick={() => handleSelectSection('admin')}>
            Admin Dashboard
          </Button>
          <Button variant="link" onClick={() => handleSelectSection('bank')}>
            Bank Dashboard
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container className="mt-4">
        {selectedSection === 'admin' ? (
          <div>
             <Button className="mb-3" onClick={handleShowCreateAdmin}>
        Create Admin
      </Button>
            <Accordion defaultActiveKey="0">
              {admins.map((admin, adminIndex) => (
                <Accordion.Item eventKey={`admin-${adminIndex}`} key={admin.id}>
                  <Accordion.Header>{admin.username}</Accordion.Header>
                  <Accordion.Body>
                    <Link to={`/admin-dashboard/${admin.id}`}>
                      <Button variant="link" className="ms-3">See More</Button>
                    </Link>
                    <Button variant="link" className="ms-3" onClick={() => handleShowEditAdmin(admin)}>
                      Edit Admin
                    </Button>
                    <Button variant="link" className="ms-3" onClick={handleShowDeleteAdmin}>
                      Delete Admin
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ) : (
          <BankDashboard />
        )}
      </Container>

      {/* Modals */}
      {selectedAdmin && (
        <EditAdminModal
          show={showEditAdminModal}
          onClose={() => setShowModal(false)}
          adminToEdit={selectedAdmin}
          onSubmit={(adminData: BaseAdmin) => {
            console.log('Updating admin data:', adminData);
            setShowModal(false);
          }}
        />
      )}
      <CreateAdminModal
        show={false}
        onClose={() => {}}
        onSubmit={(adminData: CreateAdmin) => {
          console.log('Creating new admin:', adminData);
        }}
      />
    </div>
  );
};

export default SuperAdminDashboard;
