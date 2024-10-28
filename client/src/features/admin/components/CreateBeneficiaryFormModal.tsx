import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import useBanks from '../../common/hooks/useBanks';

interface CreateBeneficiaryFormProps {
  onSubmit: (beneficiaryData: { name: string; bank: string; accountNumber: string }) => void;
  onCancel: () => void;
}

const CreateBeneficiaryForm: React.FC<CreateBeneficiaryFormProps> = ({ onSubmit, onCancel }) => {
  const { banks } = useBanks();
  const [beneficiaryDetails, setBeneficiaryDetails] = useState({
    name: '',
    bank: '',
    accountNumber: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBeneficiaryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(beneficiaryDetails);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="beneficiaryName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={beneficiaryDetails.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
      </Form.Group>

      <Form.Group controlId="beneficiaryBank" className="mt-3">
        <Form.Label>Bank</Form.Label>
        <Form.Control
          as="select"
          name="bank"
          value={beneficiaryDetails.bank}
          onChange={handleChange}
          required
        >
          <option value="">Select a bank...</option>
          {banks.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="beneficiaryAccountNumber" className="mt-3">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          name="accountNumber"
          value={beneficiaryDetails.accountNumber}
          onChange={handleChange}
          placeholder="Enter account number"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Create Beneficiary
        </Button>
      </div>
    </Form>
  );
};

const CreateBeneficiaryFormModal: React.FC<{ initialShow: boolean }> = ({ initialShow }) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  useEffect(() => {
    setShowCreateModal(initialShow);
  }, [initialShow]);

  const handleAddBeneficiary = (beneficiaryData: { name: string; bank: string; accountNumber: string }) => {
    setShowCreateModal(false);
    // Add the beneficiary handling logic here
    console.log('New Beneficiary:', beneficiaryData);
  };

  return (
    <>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Beneficiary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBeneficiaryForm
            onSubmit={handleAddBeneficiary}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateBeneficiaryFormModal;
