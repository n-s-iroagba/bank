import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Transfer } from '../types/ClientAccount';
import useBeneficiaries from '../hooks/useBeneficiaries';

interface AddTransferFormProps {
  clientId: number;
  show: boolean;
}

const AddTransferForm: React.FC<AddTransferFormProps> = ({ clientId, show }) => {
  const [transferDetails, setTransferDetails] = useState<Transfer>({
    amount: 0,
    date: '',
    description: '',
    beneficiary: {
      id: 0,
      name: '',
      bank: null,
      accountNumber: '',
    },
  });

  const { beneficiaries, loading, error } = useBeneficiaries();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'amount' ? +value : value,
    }));
  };

  const handleBeneficiaryChange = (e: any) => {
    const selectedBeneficiaryId = Number(e.target.value);
    const selectedBeneficiary = beneficiaries.find((b) => b.id === selectedBeneficiaryId);

    if (selectedBeneficiary) {
      setTransferDetails((prevDetails) => ({
        ...prevDetails,
        beneficiary: selectedBeneficiary,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={transferDetails.amount}
          onChange={(e)=>handleChange(e)}
          required
        />
      </Form.Group>

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={transferDetails.date}
          onChange={(e)=>handleChange(e)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={transferDetails.description}
          onChange={(e)=>handleChange(e)}
          required
        />
      </Form.Group>

      <Form.Group controlId="beneficiarySelect">
        <Form.Label>Select Beneficiary</Form.Label>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Form.Control
            as="select"
            value={transferDetails.beneficiary.id || ''}
            onChange={(e)=>handleBeneficiaryChange(e)}
            required
          >
            <option value="">Select a beneficiary...</option>
            {beneficiaries.map((beneficiary) => (
              <option key={beneficiary.id} value={beneficiary.id}>
                {beneficiary.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>

      <Button type="submit">Add Transfer</Button>
    </Form>
  );
};

export default AddTransferForm;
