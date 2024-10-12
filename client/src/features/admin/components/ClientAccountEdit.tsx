import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ClientAccount } from '../types/ClientAccount';
import { updateClientAccount } from '../services/clientService';

interface ClientAccountEditProps {
  account: ClientAccount;
  onAccountUpdated: () => void;
}

const ClientAccountEdit: React.FC<ClientAccountEditProps> = ({ account, onAccountUpdated }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState(account.password);
  const [fixedDepositAmount, setFixedDepositAmount] = useState(account.fixedDepositAmount);
  const [checkingAccountAmount, setCheckingAccountAmount] = useState(account.checkingAccountAmount);

  const handleSave = () => {
    updateClientAccount(account.id, { username, password, fixedDepositAmount, checkingAccountAmount });
    onAccountUpdated();
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="fixedDepositAmount">
              <Form.Label>Fixed Deposit Amount</Form.Label>
              <Form.Control type="number" value={fixedDepositAmount} onChange={(e) => setFixedDepositAmount(+e.target.value)} />
            </Form.Group>
            <Form.Group controlId="checkingAccountAmount">
              <Form.Label>Checking Account Amount</Form.Label>
              <Form.Control type="number" value={checkingAccountAmount} onChange={(e) => setCheckingAccountAmount(+e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientAccountEdit;
