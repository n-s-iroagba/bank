import React, { useState } from 'react';
import { Form, Button, Modal, ModalProps } from 'react-bootstrap';
import { Bank, CreateBank } from '../../../types/Bank';

interface CreateBankModalProps extends ModalProps {
  onCreate: (bank: CreateBank) => void;
}

interface EditBankModalProps extends ModalProps {
  bank: Bank;
  onEdit: (updatedBank: Bank) => void;
}

const CreateBankModal: React.FC<CreateBankModalProps> = ({ onCreate, show, onHide }) => {
  const [bankDetails, setBankDetails] = useState<CreateBank>({ name: '', logo: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreate(bankDetails);
    setBankDetails({ name: '', logo: '' });
    onHide?.();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="bankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={bankDetails.name}
              onChange={handleChange}
              placeholder="Enter bank name"
              required
            />
          </Form.Group>

          <Form.Group controlId="bankLogo" className="mt-3">
            <Form.Label>Bank Logo</Form.Label>
            <Form.Control
              type="text"
              name="logo"
              value={bankDetails.logo}
              onChange={handleChange}
              placeholder="Enter logo URL"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Bank
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const EditBankModal: React.FC<EditBankModalProps> = ({ bank, onEdit, show, onHide }) => {
  const [bankDetails, setBankDetails] = useState<Bank>(bank);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onEdit(bankDetails);
    onHide?.();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="editBankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={bankDetails.name}
              onChange={handleChange}
              placeholder="Enter bank name"
              required
            />
          </Form.Group>

          <Form.Group controlId="editBankLogo" className="mt-3">
            <Form.Label>Bank Logo</Form.Label>
            <Form.Control
              type="text"
              name="logo"
              value={bankDetails.logo}
              onChange={handleChange}
              placeholder="Enter logo URL"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={onHide}>
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

export { CreateBankModal, EditBankModal };
