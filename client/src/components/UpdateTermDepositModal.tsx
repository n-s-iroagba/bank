import React, { useState} from "react";
import {  Button,  Modal, Form } from "react-bootstrap";
import { TermDepositAccount } from "../types/TermDepositAccount";


// Update Term Deposit Modal
const UpdateTermDepositModal: React.FC<{
  show: boolean;
  onClose: () => void;
  account: TermDepositAccount;
  onSave: (updatedAccount: TermDepositAccount) => void;
}> = ({ show, onClose, account, onSave }) => {
  const [depositDate, setdepositDate] = useState<Date>(account.depositDate);
  const [payoutDate, setPayoutDate] =useState<Date>(account.payoutDate);
  const [interestRate, setInterestRate] = useState(account.interestRate);
  const [amountDeposited, setAmountDeposited] = useState(account.amountDeposited);



  const handleSave = () => {
    if (account && depositDate) {
      onSave({
        ...account,
        depositDate,
        payoutDate,
        interestRate,
        amountDeposited,
      });
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Term Deposit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="depositDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={depositDate ? depositDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setdepositDate(new Date(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="durationInDays" className="mt-3">
            <Form.Label>Duration (Days)</Form.Label>
            <Form.Control
              type="date"
              value={payoutDate ? payoutDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setPayoutDate(new Date(e.target.value))}
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
export default UpdateTermDepositModal