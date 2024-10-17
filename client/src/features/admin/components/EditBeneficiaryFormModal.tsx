import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

interface Beneficiary {
  id: number;
  name: string;
  bank: string;
  accountNumber: string;
}

interface EditBeneficiaryFormProps {
  show: boolean;
  handleClose: () => void;
  beneficiary: Beneficiary;
  onSubmit: (beneficiaryId: number, updatedData: { name: string; bank: string; accountNumber: string }) => void;
}

const EditBeneficiaryFormModal: React.FC<EditBeneficiaryFormProps> = ({ show, handleClose, beneficiary, onSubmit }) => {
  const [name, setName] = useState(beneficiary.name);
  const [bank, setBank] = useState(beneficiary.bank);
  const [accountNumber, setAccountNumber] = useState(beneficiary.accountNumber);

  useEffect(() => {
    setName(beneficiary.name);
    setBank(beneficiary.bank);
    setAccountNumber(beneficiary.accountNumber);
  }, [beneficiary]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(beneficiary.id, { name, bank, accountNumber });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Beneficiary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="beneficiaryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="beneficiaryBank" className="mt-3">
            <Form.Label>Bank</Form.Label>
            <Form.Control
              type="text"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="Enter bank name"
              required
            />
          </Form.Group>

          <Form.Group controlId="beneficiaryAccountNumber" className="mt-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBeneficiaryFormModal;
