
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import AccountHolderLayout from "../../components/AccountHolderLayout";
import UpdateAccountHolderModal from "../../components/UpdateAccountHolderModal";
import useGetAccountHolderDetails from "../../hooks/useGetAccountHolderDetails";
import { deleteAccountHolder } from "../../services/accountHolderService";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const AccountHolderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { accountHolder, loading, error } = useGetAccountHolderDetails(id as string);

  const handleDelete = async () => {
    try {
      await deleteAccountHolder(accountHolder?.id as number);
      navigate("/admin/account-holders");
    } catch (error) {
      console.error("Failed to delete account holder:", error);
      alert("Failed to delete account holder");
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (error || !accountHolder) {
    return <Alert variant="danger">Failed to load account holder details</Alert>;
  }

  return (
    <AccountHolderLayout accountHolderId={id as string}>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Account Holder Details</h4>
          <div>
            <Button 
              variant="outline-primary" 
              onClick={() => setShowEditModal(true)}
              className="me-2"
            >
              Edit
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Personal Information</Card.Header>
              <Card.Body>
                <p><strong>First Name:</strong> {accountHolder.firstName}</p>
                <p><strong>Surname:</strong> {accountHolder.surname}</p>
                <p><strong>Middle Name:</strong> {accountHolder.middlename || 'N/A'}</p>
                <p><strong>Username:</strong> {accountHolder.username}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <UpdateAccountHolderModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          accountHolder={accountHolder}
        />

        <ConfirmDeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Account Holder"
          message="Are you sure you want to delete this account holder? This action cannot be undone."
        />
      </div>
    </AccountHolderLayout>
  );
};

export default AccountHolderDetails;
