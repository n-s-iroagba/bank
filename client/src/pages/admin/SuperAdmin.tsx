import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminList from '../../features/admin/components/AdminList';
import CreateAdminModal from '../../features/admin/components/CreateAdminModal';
import Drawer from '../../features/admin/components/Drawer';
import EditAdminModal from '../../features/admin/components/EditAdminModal';
import Header from '../../features/admin/components/Header';
import AdminDashboard from './AdminDashboard';


const SuperAdmin: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [admins, setAdmins] = useState<{ id: number; name: string; workingAccounts: number }[]>([
    { id: 1, name: 'Admin One', workingAccounts: 5 },
    { id: 2, name: 'Admin Two', workingAccounts: 3 },
  ]);

  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showEditAdminModal, setShowEditAdminModal] = useState<number | null>(null);
  const [currentAdminName, setCurrentAdminName] = useState('');

  const handleDrawerOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const handleCreateAdmin = (name: string, password: string) => {
    setAdmins([...admins, { id: Date.now(), name, workingAccounts: 0 }]);
    setShowCreateAdminModal(false);
  };

  const handleEditAdmin = (adminId: number, name: string) => {
    const updatedAdmins = admins.map((admin) =>
      admin.id === adminId ? { ...admin, name } : admin
    );
    setAdmins(updatedAdmins);
    setShowEditAdminModal(null);
  };

  const openEditAdminModal = (adminId: number) => {
    const admin = admins.find((admin) => admin.id === adminId);
    if (admin) {
      setCurrentAdminName(admin.name);
      setShowEditAdminModal(admin.id);
    }
  };

  const handleDeleteAdmin = (adminId: number) => {
    setAdmins(admins.filter((admin) => admin.id !== adminId));
  };

  return (
    <div className="super-admin-dashboard">
      <Header toggleDrawer={toggleDrawer} userName="Super Admin" /> {/* Header with hamburger */}
      
      <Container fluid>
        <Row>
          {/* Drawer */}
          {isDrawerVisible && (
            <Col xs={3} className="z-1">
              <Drawer onSelectOption={handleDrawerOptionClick} />
            </Col>
          )}

          {/* Content Area */}
          <Col xs={12} className="z-0">
            {selectedOption === 'AdminAccounts' ? (
              <>
                <AdminList
                  admins={admins}
                  onCreateAdminClick={() => setShowCreateAdminModal(true)}
                  onEditAdminClick={openEditAdminModal}
                  onDeleteAdminClick={handleDeleteAdmin}
                />
                <CreateAdminModal
                  show={showCreateAdminModal}
                  onClose={() => setShowCreateAdminModal(false)}
                  onCreate={handleCreateAdmin}
                />
                {showEditAdminModal !== null && (
                  <EditAdminModal
                    show={!!showEditAdminModal}
                    onClose={() => setShowEditAdminModal(null)}
                    onEdit={(name) => handleEditAdmin(showEditAdminModal, name)}
                    currentName={currentAdminName}
                  />
                )}
              </>
            ) : selectedOption === 'WorkingAccounts' ? (
              <AdminDashboard />
            ) : (
              <div>Please select an option from the drawer.</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SuperAdmin;
