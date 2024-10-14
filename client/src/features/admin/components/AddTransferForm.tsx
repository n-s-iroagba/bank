// /components/AddTransferForm.tsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addTransfer } from '../services/clientService';
import { Transfer } from '../types/ClientAccount';

interface AddTransferFormProps {
  clientId: number;
  onTransferAdded: () => void;
}

const AddTransferForm: React.FC<AddTransferFormProps> = ({ clientId, onTransferAdded }) => {
  const [amount, setAmount] = useState(0);
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransfer: Transfer = {
      id: 0,
      transferDate: new Date().toISOString(),
      amount,
      recipientName,
      recipientAccountNumber,
      date: undefined,
      description: ''
    };
    addTransfer(clientId, newTransfer);
    onTransferAdded();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="recipientName">
        <Form.Label>Recipient Name</Form.Label>
        <Form.Control type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="recipientAccountNumber">
        <Form.Label>Recipient Account Number</Form.Label>
        <Form.Control type="text" value={recipientAccountNumber} onChange={(e) => setRecipientAccountNumber(e.target.value)} required />
      </Form.Group>
      <Button type="submit">Add Transfer</Button>
    </Form>
  );
};

export default AddTransferForm;
