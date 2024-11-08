import React, { useState } from "react";
import { Row, Col, Button, Accordion } from "react-bootstrap";
import { TermDepositAccount } from "../../../types/TermDepositAccount";
import EditTermDepositModal from "./EditTermDepositModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";





const TermDepositAccountAccordion: React.FC<{ account: TermDepositAccount }> = ({ account }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const handleSave = (updatedAccount: TermDepositAccount) => {
    console.log("Updated account:", updatedAccount);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    console.log("Deleted account ID:", account.id);
    setShowConfirmDeleteModal(false);
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Term Deposit Account ID: {account.id}</Accordion.Header>
          <Accordion.Body>
            <p><strong>Start Date:</strong> {account.startDate.toDateString()}</p>
            <p><strong>End Date:</strong> {(new Date(account.startDate.getTime() + account.durationInDays * 24 * 60 * 60 * 1000)).toDateString()}</p>
            <p><strong>Interest Rate:</strong> {account.interestRate}%</p>
            <p><strong>Amount Deposited:</strong> ${account.amountDeposited}</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Row>
        <Col lg={3} md={4} sm={12}>
          <Button variant="info" className="w-100 mb-2">
            View Term Deposit Account Details
          </Button>
        </Col>
        <Col lg={3} md={4} sm={12}>
          <Button variant="info" className="w-100 mb-2" onClick={() => setShowEditModal(true)}>
            Edit Term Deposit Account Details
          </Button>
        </Col>
        <Col lg={3} md={4} sm={12}>
          <Button variant="danger" className="w-100 mb-2" onClick={() => setShowConfirmDeleteModal(true)}>
            Delete Term Deposit Account
          </Button>
        </Col>
      </Row>

      {/* Edit Modal */}
      <EditTermDepositModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        account={account}
        onSave={handleSave}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        show={showConfirmDeleteModal}
        onClose={() => setShowConfirmDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TermDepositAccountAccordion;