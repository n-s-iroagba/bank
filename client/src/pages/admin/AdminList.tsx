import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import AdminModal from "../../components/AdminModal";
import { BaseAdmin } from "../../types/Admin";
import useAdmins from "../../hooks/useAdmins";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import useAuth from "../../hooks/useAuth";

const SpyControl = ({ superAdminId, adminId, isSpying, onSpyChange }) => {
  const handleSpyChange = (event) => {
    onSpyChange(event.target.checked);
  };

  return (
    <div>
      <label>
        Spy on {adminId}:
        <input
          type="checkbox"
          checked={isSpying}
          onChange={handleSpyChange}
          disabled={!superAdminId}
        />
      </label>
    </div>
  );
};


const AdminList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<BaseAdmin | null>(null);
  const [admins, setAdmins] = useState([]); //Added state to manage admins locally.

  const { adminId, superAdminId } = useAuth();
  const { fetchAdmins } = useAdmins(adminId); //Assuming useAdmins now returns a function to fetch

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAdmins = await fetchAdmins();
      setAdmins(fetchedAdmins);
    }
    fetchData();
  }, [fetchAdmins]);

  const handleEditClick = (admin: BaseAdmin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const handleDeleteClick = (adminId: number) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      //Implementation to delete admin
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
                  {superAdminId && (
                    <SpyControl
                      superAdminId={superAdminId}
                      adminId={admin.id}
                      isSpying={admin.isBeingSpiedOn || false} // Provide default value
                      onSpyChange={(isSpying) => {
                        // Update local state, assuming server-side update happens concurrently
                        setAdmins(admins.map((a) =>
                          a.id === admin.id
                            ? { ...a, isBeingSpiedOn: isSpying }
                            : a
                        ));
                      }}
                    />
                  )}
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