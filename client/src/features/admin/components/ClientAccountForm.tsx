import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createClientAccount } from '../services/clientService';

interface ClientAccountFormProps {
  onAccountCreated: () => void;
}

const ClientAccountForm: React.FC<ClientAccountFormProps> = ({ onAccountCreated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fixedDepositAmount, setFixedDepositAmount] = useState(0);
  const [checkingAccountAmount, setCheckingAccountAmount] = useState(0);
  const [transferStartDate, setTransferStartDate] = useState('');
  const [transferEndDate, setTransferEndDate] = useState('');
  const [numberOfTransfers, setNumberOfTransfers] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClientAccount({
      username, password, fixedDepositAmount, checkingAccountAmount,
      numberOfTransfers,
      transferStartDate: '',
      transferEndDate: ''
    });
    onAccountCreated();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="fixedDepositAmount">
        <Form.Label>Fixed Deposit Amount</Form.Label>
        <Form.Control type="number" value={fixedDepositAmount} onChange={(e) => setFixedDepositAmount(+e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="checkingAccountAmount">
        <Form.Label>Checking Account Amount</Form.Label>
        <Form.Control type="number" value={checkingAccountAmount} onChange={(e) => setCheckingAccountAmount(+e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="checkingAccountAmount">
        <Form.Label>Number of Transfers</Form.Label>
        <Form.Control type="number" value={checkingAccountAmount} onChange={(e) => setCheckingAccountAmount(+e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="checkingAccountAmount">
        <Form.Label>Transfer End Date</Form.Label>
        <Form.Control type="number" value={checkingAccountAmount} onChange={(e) => setCheckingAccountAmount(+e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="checkingAccountAmount">
        <Form.Label>Transfer start Date</Form.Label>
        <Form.Control type="number" value={checkingAccountAmount} onChange={(e) => setCheckingAccountAmount(+e.target.value)} required />
      </Form.Group>
      <Button type="submit">Create Account</Button>
    </Form>
  );
};

export default ClientAccountForm;
