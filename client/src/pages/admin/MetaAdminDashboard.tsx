import React, { useState } from 'react';
import { Button, Container, Offcanvas, Accordion } from 'react-bootstrap';

import { SuperAdmin } from '../../types/SuperAdmin';  // Make sure this type is properly defined
import { Admin } from '../../types/Admin'; // Assuming you have an Admin type defined
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';




const MetaAdminDashboard: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false); 
  const [superAdmins,setSuperAdmin] = useState<SuperAdmin[]>([])
  const [selectedSuperAdmin, setSelectedSuperAdmin] = useState<SuperAdmin | null>(null);
  const [selectedSection, setSelectedSection] = useState<'superAdmins' | 'myAccount'>('superAdmins'); // Section toggle
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // State to show edit modal

  const handleToggleDrawer = () => setShowDrawer(!showDrawer);  // Toggles drawer visibility

  const handleDeleteSuperAdmin = (id: number) => {
    // Logic for deleting superadmin (you can make an API call here)
    alert(`SuperAdmin with ID ${id} deleted`);
  };

  const handleSelectSection = (section: 'superAdmins' | 'myAccount') => {
    setSelectedSection(section);
    setShowDrawer(false);  // Close the drawer after selecting a section
  };

  const handleEditSuperAdmin = (superAdmin: SuperAdmin) => {
    setSelectedSuperAdmin(superAdmin);
    setShowEditModal(true);
  };

  return (
    <div>
      {/* Hamburger Icon for Drawer */}
      <Button className="mb-3" onClick={handleToggleDrawer}>
        <FontAwesomeIcon icon={faBars}/>
      </Button>

      {/* Offcanvas Drawer */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="link" onClick={() => handleSelectSection('superAdmins')}>
            Super Admins
          </Button>
          <Button variant="link" onClick={() => handleSelectSection('myAccount')}>
            My Admins
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container className="mt-4">
        {selectedSection === 'superAdmins' ? (
          <div>
            <Accordion defaultActiveKey="0">
              {superAdmins.map((superAdmin, index) => (
                <Accordion.Item eventKey={`superadmin-${index}`} key={superAdmin.id}>
                  <Accordion.Header>
                    {superAdmin.username}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Button variant="link" className="ms-3" onClick={() => handleEditSuperAdmin(superAdmin)}>
                      View More
                    </Button>
                    <Button
                      variant="link"
                      className="ms-3"
                      onClick={() => handleDeleteSuperAdmin(superAdmin.id)}
                    >
                      Delete Super Admin
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ) : selectedSection === 'myAccount' ? (
          <div>
            {/* Replace with your content or logic for "My Account" */}
            <h3>My Super Admin Account</h3>
            {/* You can add details for the current super admin here */}
          </div>
        ) : (
          <div>
            {/* You can add your content or logic for "My Admin Account" */}
            <h3>My Admin Account</h3>
          </div>
        )}
      </Container>

     
    </div>
  );
};

export default MetaAdminDashboard;

