
import { ListGroup, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import useAccountHolders from "../../hooks/useAccountHolders";
import AccountHolderModal from "../../components/AccountHolderModal";
import { useState } from "react";
import useBanks from "../../hooks/useBanks";
import useAuth from "../../hooks/useAuth";

const AccountHolderList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {adminId, superAdminId} = useAuth();
  const {accountHolders} = useAccountHolders(adminId);
  const {banks} = useBanks();

  const handleNavigateToDetail = (accountHolderId: number) => {
    navigate(`/admin/account-holder-details/${accountHolderId}`);
  };

  const handleShowCreateModal = () => {
    if (banks.length) {
      setShowModal(true);
    } else {
      alert("Please add banks first before creating account holders");
    }
  };

  return (
    <AdminDashboardLayout superAdminId={superAdminId}>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Account Holders</h4>
          <Button 
            variant="primary" 
            onClick={handleShowCreateModal}
            className="px-4"
          >
            Add Account Holder
          </Button>
        </div>

        <Row>
          {accountHolders.map((holder) => (
            <Col md={6} lg={4} key={holder.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {holder.firstName} {holder.surname}
                  </Card.Title>
                  <Card.Text>
                    Username: {holder.username}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleNavigateToDetail(holder.id)}
                    className="w-100"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {accountHolders.length === 0 && (
          <div className="text-center mt-4">
            <p>No account holders found. Add your first account holder.</p>
          </div>
        )}
      </div>
      <AccountHolderModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        adminId={adminId}
      />
    </AdminDashboardLayout>
  );
};

export default AccountHolderList;
