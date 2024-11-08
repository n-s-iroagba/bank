import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { BaseAccountHolder } from "../../../types/AccountHolder";
import EditAccountHolderModal from "./EditAccountHolder";

// Confirmation Modal Component
const ConfirmDeleteModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ show, onClose, onConfirm }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this account holder?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

const AccountHolderDetails: React.FC<{ accountHolder: BaseAccountHolder }> = ({ accountHolder }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean>(false);

  const handleDelete = () => {
    // Logic to delete the account holder
    console.log("Account holder deleted:", accountHolder);
    setShowConfirmDeleteModal(false);
  };

  return (
    <>
      <p><strong>Username:</strong> {accountHolder.username}</p>
      <p><strong>Password:</strong> {accountHolder.password}</p>

      <Row>
        <Col lg={3} md={4} sm={12}>
          <Button variant="info" className="w-100 mb-2" onClick={() => setShowEditModal(true)}>
            Edit Account Holder Details
          </Button>
        </Col>
        <Col lg={3} md={4} sm={12}>
          <Button variant="danger" className="w-100 mb-2" onClick={() => setShowConfirmDeleteModal(true)}>
            Delete Client
          </Button>
        </Col>
      </Row>

      {/* Edit Modal */}
      <EditAccountHolderModal show={showEditModal} onClose={() => setShowEditModal(false)} accountHolder={accountHolder} />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        show={showConfirmDeleteModal}
        onClose={() => setShowConfirmDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AccountHolderDetails;
