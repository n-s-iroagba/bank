import React, { useState, useEffect } from "react";
import {  Button,  Modal, Form } from "react-bootstrap";
import { TermDepositAccount } from "../../../types/TermDepositAccount";

// Edit Term Deposit Modal
const EditTermDepositModal: React.FC<{
  show: boolean;
  onClose: () => void;
  account: TermDepositAccount | null;
  onSave: (updatedAccount: TermDepositAccount) => void;
}> = ({ show, onClose, account, onSave }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [durationInDays, setDurationInDays] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [amountDeposited, setAmountDeposited] = useState(0);

  useEffect(() => {
    if (account) {
      setStartDate(account.startDate);
      setDurationInDays(account.durationInDays);
      setInterestRate(account.interestRate);
      setAmountDeposited(account.amountDeposited);
    }
  }, [account]);

  const handleSave = () => {
    if (account && startDate) {
      onSave({
        ...account,
        startDate,
        durationInDays,
        interestRate,
        amountDeposited,
      });
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Term Deposit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="durationInDays" className="mt-3">
            <Form.Label>Duration (Days)</Form.Label>
            <Form.Control
              type="number"
              value={durationInDays}
              onChange={(e) => setDurationInDays(parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="interestRate" className="mt-3">
            <Form.Label>Interest Rate (%)</Form.Label>
            <Form.Control
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="amountDeposited" className="mt-3">
            <Form.Label>Amount Deposited ($)</Form.Label>
            <Form.Control
              type="number"
              value={amountDeposited}
              onChange={(e) => setAmountDeposited(parseFloat(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditTermDepositModal