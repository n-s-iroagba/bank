import React, { useState } from 'react';
import { Accordion, Button, Container, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import CreateAdminModal from '../../features/admin/components/CreateAdminModal';
import { BaseAdmin, CreateAdmin } from '../../types/Admin';
import BankDashboard from '../../features/admin/components/BankDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useAdmins from '../../hooks/useAdmins';
import AdminDashboard from './AdminDashboard';
import UpdateAdminModal from '../../features/admin/components/UpdateAdminModal';



const SuperAdminDashboard: React.FC<{id:number}> = ({id}) => {
  const [showUpdateAdminModal, setShowUpdateAdminModal] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<BaseAdmin | null>(null);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);  
  const [selectedSection, setSelectedSection] = useState<'admin' | 'bank'|'accounts'>('admin'); 
  const {admins,adminLoading,adminError} = useAdmins(id)
 console.log(admins,adminLoading,adminError)
  const handleShowUpdateAdmin = (admin: BaseAdmin) => {
    setSelectedAdmin(admin);
    setShowUpdateAdminModal(true);
  };

  const handleShowCreateAdmin = () => {
    setShowCreateAdminModal(true);
    
  };

  const handleShowDeleteAdmin = () => {
    // Handle deleting admin here
  };

  const handleToggleDrawer = () => setShowDrawer(!showDrawer);  // Toggles drawer visibility
  const handleSelectSection = (section: 'admin' | 'bank'|'accounts') => {
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
          <Button variant="link" onClick={() => handleSelectSection('accounts')}>
            My Working Accounts
          </Button>
          <Button variant="link" onClick={() => handleSelectSection('bank')}>
            Bank Dashboard
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container className="mt-4">
      {/* Render content based on selected section */}
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
                  <Link to={`/admindashboard/${admin.id}`}>
                    <Button variant="link" className="ms-3">See More</Button>
                  </Link>
                  <Button variant="link" className="ms-3" onClick={() => handleShowUpdateAdmin(admin)}>
                    Update Admin
                  </Button>
                  <Button variant="link" className="ms-3" onClick={handleShowDeleteAdmin}>
                    Delete Admin
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ) : selectedSection === 'accounts' ? (
        <AdminDashboard adminId={id} isAdmin={true} />
      ) : (
        <BankDashboard />
      )}
    </Container>

      {/* Modals */}
      {selectedAdmin && (
        <UpdateAdminModal
          show={showUpdateAdminModal}
          onClose={() => {
            setShowUpdateAdminModal(false);
            setSelectedAdmin(null);
          } }
          adminToUpdate={selectedAdmin} 
          onSubmit={function (adminData: BaseAdmin): void {
            throw new Error('Function not implemented.');
          } }        
        />
      )}
      <CreateAdminModal
        show={showCreateAdminModal}
        onClose={() => {}}
        onSubmit={(adminData: CreateAdmin) => {
          console.log('Creating new admin:', adminData);
        }}
      />
    </div>
  );
};

export default SuperAdminDashboard;
