import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import AdminModal from "../../components/AdminModal";
import { BaseAdmin } from "../../types/Admin";
import useAdmins from "../../hooks/useAdmins";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import useAuth from "../../hooks/useAuth";

const AdminList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<BaseAdmin | null>(null);

  const { adminId, superAdminId } = useAuth();
  const { admins } = useAdmins(adminId);

  const handleEditClick = (admin: BaseAdmin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const handleDeleteClick = (adminId: number) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
    }
  };

  return (
    <>
      <AdminDashboardLayout superAdminId={superAdminId}>
        <div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Admin
          </Button>
        </div>

        <Accordion>
          {admins.map((admin: BaseAdmin, index: number) => (
            <Accordion.Item eventKey={index.toString()} key={admin.id}>
              <Accordion.Header>
                {admin.username} ({admin.email})
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEditClick(admin)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDeleteClick(admin.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {showModal && selectedAdmin && superAdminId && (
          <AdminModal
            show={showModal}
            onClose={() => setShowModal(false)}
            adminToBeUpdated={selectedAdmin}
            superAdminId={superAdminId}
          />
        )}
        {showModal && !selectedAdmin && superAdminId && (
          <AdminModal
            show={showModal}
            onClose={() => setShowModal(false)}
            superAdminId={superAdminId}
          />
        )}
      </AdminDashboardLayout>
    </>
  );
};

export default AdminList;
